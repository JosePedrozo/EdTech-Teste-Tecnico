    class DotEmphasis extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {

        const text = this.getAttribute("text") ?? "";

        this.shadowRoot.innerHTML = `
      <style>

        :host{
            display:block;
        }

        section{
            max-width: 820px;
            margin-inline: auto;
        }

        .emphasis{
            background: #1A1A1A;
            border-radius: 8px;
            padding: 32px;

            border: 1px solid #F3F4F6;
           box-shadow: 0px 4px 6px -4px #0000001A;
        }

        .content{
          flex:1;
          display:flex;
          flex-direction:column;
          gap:32px;
        }

        .text{
          margin: 0;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.6;
          color: var(--white-color);
        }


        @media (max-width:768px){

          section{
            padding:0 20px 48px;
          }

        }

      </style>

      <section>
        <div class="emphasis">
          <div class="content">
            <p class="text">${text}</p>
          </div>

        </div>
      </section>
    `;
    }
}

customElements.define("dot-emphasis", DotEmphasis);