class DotVideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const videoUrl = this.getAttribute("video") ?? "";
        const title = this.getAttribute("title") ?? "Video player";
        const videoId = this.getYoutubeId(videoUrl);

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        section {
          max-width: 1024px;
          margin-inline: auto;
          padding: 0 20px 40px; 
          box-sizing: border-box;
        }

        .video-wrapper {
          width: 100%; 
          max-width: 930px; 
          margin-inline: auto;
          
          aspect-ratio: 16 / 9; 
          
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04);
          
          display: flex;
          align-items: center;
          justify-content: center;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .error-msg {
          color: #ef4444;
          font-family: sans-serif;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          section {
            padding: 0 32px 64px;
          }
        }
      </style>

      <section>
        <div class="video-wrapper">
          ${videoId
                ? `<iframe
                  src="https://www.youtube.com/embed/${videoId}"
                  title="${title}"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>`
                : `<p class="error-msg">URL de vídeo inválida</p>`
            }
        </div>
      </section>
    `;
    }

    getYoutubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=)|(shorts\/))([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[8].length === 11) ? match[8] : null;
    }
}

customElements.define("dot-video-player", DotVideoPlayer);