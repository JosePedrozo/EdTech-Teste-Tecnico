class DotAudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const src = this.getAttribute("src") ?? "";

    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        font-family: system-ui, -apple-system, sans-serif;
      }

      section {
        max-width: 930px;
        margin-inline: auto;
      }

      .player {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        background: #F9FAFB;
        border-radius: 12px;
        padding: 12px 16px;
        border: 1px solid #E5E7EB;
        box-shadow: 0px 4px 6px -4px #0000001A;
        box-sizing: border-box;
      }

      button {
        border: none;
        background: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        flex-shrink: 0;
        transition: transform 0.1s ease;
      }

      button:active { transform: scale(0.95); }

      svg {
        width: 20px;
        height: 20px;
        fill: #374151;
      }

      button:hover svg { fill: #111827; }

      .progress-container {
        flex: 1;
        height: 6px;
        background: #E5E7EB;
        border-radius: 999px;
        position: relative;
        cursor: pointer;
        min-width: 50px;
      }

      .bar {
        height: 100%;
        width: 0%;
        background: #76B900;
        border-radius: 999px;
        position: relative;
        pointer-events: none;
      }

      .thumb {
        position: absolute;
        right: -7px;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: white;
        border: 2px solid #76B900;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }

      .time {
        font-size: 0.75rem;
        color: #6B7280;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }

      .volume-control {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      input[type="range"] {
        width: 60px;
        cursor: pointer;
        accent-color: #76B900;
      }

      @media (max-width: 480px) {
        .player {
          gap: 8px;
          padding: 10px;
        }
        input[type="range"] {
          display: none; 
        }
        .time {
            font-size: 0.7rem;
        }
      }
    </style>

    <section>
      <div class="player">
        <button class="play" aria-label="Play">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        </button>

        <div class="progress-container">
          <div class="bar">
            <div class="thumb"></div>
          </div>
        </div>

        <div class="time">00:00 / 00:00</div>

        <div class="volume-control">
          <button class="mute" aria-label="Mute">
            <svg class="icon-volume" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <input type="range" class="volume-slider" min="0" max="1" step="0.01" value="1">
        </div>

        <audio src="${src}" preload="metadata"></audio>
      </div>
    </section>
    `;

    this.setup();
  }

  setup() {
    const audio = this.shadowRoot.querySelector("audio");
    const playBtn = this.shadowRoot.querySelector(".play");
    const progressContainer = this.shadowRoot.querySelector(".progress-container");
    const bar = this.shadowRoot.querySelector(".bar");
    const timeDisplay = this.shadowRoot.querySelector(".time");
    const volumeSlider = this.shadowRoot.querySelector(".volume-slider");
    const muteBtn = this.shadowRoot.querySelector(".mute");

    const icons = {
      play: '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>',
      pause: '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
      volumeHigh: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
      volumeMute: '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
    };

    const format = s => {
      if (isNaN(s) || !isFinite(s)) return "00:00";
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    const updateTimeDisplay = () => {
        timeDisplay.textContent = `${format(audio.currentTime)} / ${format(audio.duration)}`;
    };

    playBtn.onclick = () => {
      if (audio.paused) {
        audio.play();
        playBtn.innerHTML = icons.pause;
      } else {
        audio.pause();
        playBtn.innerHTML = icons.play;
      }
    };

    audio.onloadedmetadata = updateTimeDisplay;
    
    if (audio.readyState >= 1) updateTimeDisplay();

    audio.ontimeupdate = () => {
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      bar.style.width = `${percent}%`;
      updateTimeDisplay();
    };

    progressContainer.onclick = (e) => {
      if (!audio.duration) return;
      const rect = progressContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pos * audio.duration;
    };

    volumeSlider.oninput = () => {
      audio.volume = volumeSlider.value;
      audio.muted = (audio.volume === 0);
      muteBtn.innerHTML = audio.muted ? icons.volumeMute : icons.volumeHigh;
    };

    muteBtn.onclick = () => {
      audio.muted = !audio.muted;
      muteBtn.innerHTML = audio.muted ? icons.volumeMute : icons.volumeHigh;
    };
    
    audio.onended = () => {
        playBtn.innerHTML = icons.play;
        bar.style.width = "0%";
    };
  }
}

customElements.define("dot-audio-player", DotAudioPlayer);