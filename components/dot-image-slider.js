class DotImageSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.index = 0;
    }

    connectedCallback() {
        const imagesAttr = this.getAttribute("images") ?? "";

        this.images = imagesAttr
            .split(",")
            .map(url => url.trim())
            .filter(Boolean);

        this.render();
        this.attachEvents();
    }

    render() {

        const slides = this.images.map((img) => `
      <div class="slide">
        <img src="${img}" loading="lazy" alt="">
      </div>
    `).join("");

        const dots = this.images.map((_, i) => `
      <button class="dot ${i === 0 ? "active" : ""}" data-index="${i}"></button>
    `).join("");

        this.shadowRoot.innerHTML = `
      <style>

        :host {
            display:block;
        }

        section {
            max-width:940px;
            margin-inline:auto;
        }

        .slider{
        position:relative;
        overflow:hidden;
        border-radius:12px 12px 0 0;
        }

        .slides{
        display:flex;
        transition:transform .4s ease;
        }

        .slide{
        min-width:100%;
        }

        img{
        width:100%;
        height:auto;
        display:block;
        }

        .controls{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:16px;
        padding:24px 0;
        background:var(--white-color);
        border-radius: 0 0 16px 16px;
        border: 1px solid #F3F4F6;
        box-shadow: 0px 1px 2px 0px #0000000D;
        }


        button{
        border:none;
        background:#1C232F;
        color:white;
        width:40px;
        height:40px;
        border-radius:8px;
        cursor:pointer;
        transition:.2s ease;
        }

        button:hover:not(:disabled){
        background: var(--highlight-color);
        }

        button:disabled {
        background:#E5E7EB;
        color:#9CA3AF;
        cursor:not-allowed;
        }


        .dots {
            display:flex;
            gap:8px;
        }

        .dot {
            width:8px;
            height:12px;
            border-radius:50%;
            background:#E5E7EB;
            border:none;
            cursor:pointer;
            transition:.2s ease;
        }

        .dot:hover {
            background: (--highlight-color);
        }

        .dot.active {
            background:#1C232F;
        }

        @media (max-width:768px) {
            section{
                padding:0 20px 48px;
            }
        }

      </style>

      <section>

        <div class="slider">
          <div class="slides">
            ${slides}
          </div>
        </div>

        <div class="controls">

          <button class="prev">‹</button>

          <div class="dots">
            ${dots}
          </div>

          <button class="next">›</button>

        </div>

      </section>
    `;
    }

    attachEvents() {

        const slides = this.shadowRoot.querySelector(".slides");
        const dots = this.shadowRoot.querySelectorAll(".dot");
        const prev = this.shadowRoot.querySelector(".prev");
        const next = this.shadowRoot.querySelector(".next");

        const update = () => {

            slides.style.transform = `translateX(-${this.index * 100}%)`;

            dots.forEach(dot => dot.classList.remove("active"));
            dots[this.index].classList.add("active");

            prev.disabled = this.index === 0;
            next.disabled = this.index === this.images.length - 1;
        };

        next.onclick = () => {
            if (this.index < this.images.length - 1) {
                this.index++;
                update();
            }
        };

        prev.onclick = () => {
            if (this.index > 0) {
                this.index--;
                update();
            }
        };

        dots.forEach(dot => {
            dot.onclick = () => {
                this.index = Number(dot.dataset.index);
                update();
            };
        });

        update();
    }
}

customElements.define("dot-image-slider", DotImageSlider);