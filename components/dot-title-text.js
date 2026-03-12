class DotTitleText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    const title = this.getAttribute("title") ?? "";
    const text = this.getAttribute("text") ?? "";
    const align = this.getAttribute("align") ?? "start";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        section{
          display:flex;
          flex-direction:column;
          gap:8px;
          text-align:${align};
          max-width:1024px;
          margin-inline:auto;
        }

        h2{
          margin:0;
          font-size:clamp(1.8rem,3vw,3rem);
          max-width:890px;
          line-height:48px;
          letter-spacing:-1.2px;
          font-weight:900;
          color:var(--primary-color);
        }

        p{
          margin:0;
          line-height:28px;
          letter-spacing:0;
          font-weight:400;
          font-size:1.125rem;
          color:var(--secundary-color);
          max-width:930px;
        }


        @media (max-width: 768px){

          section{
            padding:40px 20px;
            gap:12px;
          }

          h2{
            font-size:clamp(1.5rem,6vw,2rem);
            line-height:1.3;
            letter-spacing:-0.5px;
          }

          p{
            font-size:1rem;
            line-height:1.6;
            max-width:100%;
          }

        }

      </style>

      <section>

        <h2>
          <slot name="title">${title}</slot>
        </h2>

        <p>
          <slot name="text">${text}</slot>
        </p>

      </section>
    `;
  }
}

customElements.define("dot-title-text", DotTitleText);