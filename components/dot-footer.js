class DotFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const year = new Date().getFullYear();

    this.shadowRoot.innerHTML = `
      <style>

        :host {
          display: block;
        }

        footer {
          padding: 1.5rem 1rem;
          border-top: 1px solid #e5e5e5;
          background: var(--background-dark);
        }

        .footer__container {
          max-width: 1024px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
        }

        img {
          height: auto;
          max-width: 140px;
        }

        small {
          font-size: 0.75rem;
          color: var(--footer-color);
        }

        @media (min-width: 768px) {
          .footer__container {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
      </style>

      <footer aria-labelledby="footer-heading">
        <div class="footer__container">
          
          <h2 id="footer-heading" hidden>Footer</h2>

          <img
            src="public/imgs/logo.svg"
            alt="DOT Digital Group"
            width="140"
            height="40"
            loading="lazy"
            decoding="async"
          >

          <small>
            © ${year} DOT Digital Group. Todos os direitos reservados.
          </small>

        </div>
      </footer>
    `;
  }
}

customElements.define("dot-footer", DotFooter);