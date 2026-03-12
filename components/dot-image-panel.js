class DotImagePanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {

        const image = this.getAttribute("image") ?? "";
        const textTop = this.getAttribute("text_top") ?? "";
        const textBottom = this.getAttribute("text_bottom") ?? "";

        this.shadowRoot.innerHTML = `
      <style>

        :host{
            display:block;
        }

        section{
            max-width: 940px;
            margin-inline: auto;
        }

        .panel{
            display: flex;
            align-items: center;
            gap: 40px;

            background: var(--white-color);
            border-radius: 8px;
            padding: 32px;

            border: 1px solid #F3F4F6;
            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
        }

        .image{
          flex:1;
        }

        .image img{
          width:100%;
          height:auto;
          border-radius: 8px;
          display:block;
        }

        .content{
          flex:1;
          display:flex;
          flex-direction:column;
          gap:32px;
        }

        .text-top, .text-bottom{
          margin:0;
          font-size:1rem;
          font-weight: 400;
          line-height:1.6;
          color:var(--secundary-color);
          max-width: 400px;
        }


        @media (max-width:768px){

          section{
            padding:0 20px 48px;
          }

          .panel{
            flex-direction:column;
            padding:28px;
            gap:24px;
          }

        }

      </style>

      <section>

        <div class="panel">

          <div class="image">
            ${image ? `<img src="${image}" alt="" width=100% loading="lazy" decoding="async">` : ""}
          </div>

          <div class="content">
            <p class="text-top">${textTop}</p>
            <p class="text-bottom">${textBottom}</p>
          </div>

        </div>

      </section>
    `;
    }
}

customElements.define("dot-image-panel", DotImagePanel);