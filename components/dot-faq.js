class DotFaq extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title") ?? "Perguntas frequentes";
    const description = this.getAttribute("description") ?? "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
    
    const itemsRaw = this.getAttribute("items") ?? "";
    const items = itemsRaw.split("||").map(item => item.split("|"));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Inter', system-ui, sans-serif;
        }

        section {
          max-width: 930px;
          margin-inline: auto;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .intro {
          text-align: center;
          margin-bottom: 40px;
        }

        .intro h2 {
          font-size: 2rem;
          color: var(--background-dark);
          margin: 0 0 12px;
        }

        .intro p {
          color: var(--grey-color);
          font-size: 1rem;
        }

        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        details {
          background: var(--light-grey-color);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        details[open] {
          background: var(--highlight-color);
          border-color: var(--highlight-color);
        }

        summary {
          list-style: none;
          padding: 24px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          color: var(--background-dark);
          transition: color 0.3s;
        }

        summary::-webkit-details-marker {
          display: none;
        }

        details[open] summary {
          color: var(--white-color);
        }

        summary::after {
          content: '';
          width: 12px;
          height: 12px;
          border-right: 2px solid  var(--highlight-color);
          border-bottom: 2px solid  var(--highlight-color);
          transform: rotate(45deg);
          transition: transform 0.3s, border-color 0.3s;
          margin-right: 8px;
        }

        details[open] summary::after {
          transform: rotate(-135deg);
          border-color: var(--white-color);
        }

        .content {
          padding: 0 24px 24px;
          color: var(--grey-color);
          line-height: 1.6;
          font-size: 0.95rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 16px;
        }

        details[open] .content {
          color: var(--white-color);
        }

        @media (max-width: 640px) {
          .intro h2 { font-size: 1.5rem; }
          summary { padding: 18px; font-size: 0.9rem; }
        }
      </style>

      <section>
        <div class="intro">
          <h2>${title}</h2>
          <p>${description}</p>
        </div>

        <div class="faq-container">
          ${items.map(([q, a]) => `
            <details>
              <summary>${q}</summary>
              <div class="content">
                <p>${a}</p>
              </div>
            </details>
          `).join('')}
        </div>
      </section>
    `;
  }
}

customElements.define("dot-faq", DotFaq);