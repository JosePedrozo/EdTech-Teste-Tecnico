class DotMultipleChoice extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.storageKey = `dot_choice_${this.getAttribute("id") || 'default'}`;
  }

  connectedCallback() {
    this.render();
    this.setup();
    this.restoreData();
  }

  render() {
    const title = this.getAttribute("title") ?? "Atividade Objetiva";
    const question = this.getAttribute("question") ?? "It is a long established fact that a reader will be distracted by the readable content of a page.";
    const optionsRaw = this.getAttribute("options") ?? "Opção A|Opção B|Opção C|Opção D";
    const options = optionsRaw.split("|");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .card {
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 24px;
          max-width: 930px;
          margin-inline: auto;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .icon-circle {
          width: 40px;
          height: 40px;
          background: #F0F9E8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-circle svg {
          width: 20px;
          height: 20px;
          fill: #76B900;
        }

        .title-group h2 {
          margin: 0;
          font-size: 1.1rem;
          color: #111827;
        }

        .title-group p {
          margin: 8px 0 0;
          font-size: 0.95rem;
          color: #4B5563;
          line-height: 1.5;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .option-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .option-item:hover:not(.disabled) {
          border-color: #76B900;
        }

        .option-item.selected {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid #D1D5DB;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: white;
        }

        .option-item.selected .checkbox {
          background: #ffffff;
          border-color: #ffffff;
        }

        .option-item.selected .checkbox::after {
          content: '✔';
          color: #000000;
          font-size: 14px;
        }

        .option-item.disabled {
          cursor: not-allowed;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        button {
          padding: 10px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
          border: none;
        }

        .btn-responder {
          background: #F3F4F6;
          color: #9CA3AF;
        }

        .btn-responder.active {
          background: #76B900;
          color: white;
        }

        .btn-alterar {
          background: #000000;
          color: white;
        }

        button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .feedback {
          margin-top: 24px;
          border-radius: 8px;
          padding: 16px;
          position: relative;
          display: none;
          animation: fadeIn 0.3s ease-out;
        }

        .feedback.correct {
          background: #ECF7ED;
          color: #065F46;
        }

        .feedback.incorrect {
          background: #FFF9C4;
          color: #856404;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .feedback h3 {
          margin: 0;
          font-size: 1rem;
        }

        .feedback p {
          margin: 8px 0 0;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .close-feedback {
          position: absolute;
          top: 12px;
          right: 12px;
          cursor: pointer;
          font-size: 1.2rem;
        }

        @media (max-width: 640px) {
          .card { padding: 16px; }
          .actions { flex-direction: column; }
          button { width: 100%; }
        }
      </style>

      <section class="card">
        <div class="header">
          <div class="icon-circle">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div class="title-group">
            <h2>${title}</h2>
            <p>${question}</p>
          </div>
        </div>

        <div class="options-container">
          ${options.map((opt, index) => `
            <div class="option-item" data-index="${index}">
              <div class="checkbox"></div>
              <span class="option-text">${opt}</span>
            </div>
          `).join('')}
        </div>

        <div class="actions">
          <button class="btn-responder" disabled>Responder</button>
          <button class="btn-alterar" disabled>Alterar</button>
        </div>

        <div class="feedback">
          <span class="close-feedback">&times;</span>
          <h3 id="feedback-title"></h3>
          <p id="feedback-message"></p>
        </div>
      </section>
    `;
  }

  setup() {
    const items = this.shadowRoot.querySelectorAll('.option-item');
    const btnResponder = this.shadowRoot.querySelector('.btn-responder');
    const btnAlterar = this.shadowRoot.querySelector('.btn-alterar');
    const feedback = this.shadowRoot.querySelector('.feedback');
    const closeFeedback = this.shadowRoot.querySelector('.close-feedback');

    items.forEach(item => {
      item.onclick = () => {
        if (item.classList.contains('disabled')) return;
        
        items.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        
        btnResponder.disabled = false;
        btnResponder.classList.add('active');
        this.save();
      };
    });

    btnResponder.onclick = () => {
      const selected = this.shadowRoot.querySelector('.option-item.selected');
      if (!selected) return;

      const correctIndex = this.getAttribute("correct") ?? "1";
      const isCorrect = selected.dataset.index === correctIndex;

      this.showFeedback(isCorrect);
      this.toggleState(true);
      this.save(true);
    };

    btnAlterar.onclick = () => {
      this.toggleState(false);
      feedback.style.display = 'none';
      this.save(false);
    };

    closeFeedback.onclick = () => {
      feedback.style.display = 'none';
    };
  }

  toggleState(responded) {
    const items = this.shadowRoot.querySelectorAll('.option-item');
    const btnResponder = this.shadowRoot.querySelector('.btn-responder');
    const btnAlterar = this.shadowRoot.querySelector('.btn-alterar');

    items.forEach(item => {
      responded ? item.classList.add('disabled') : item.classList.remove('disabled');
    });

    btnResponder.disabled = responded;
    if (responded) btnResponder.classList.remove('active');
    btnAlterar.disabled = !responded;
  }

  showFeedback(isCorrect) {
    const feedback = this.shadowRoot.querySelector('.feedback');
    const title = this.shadowRoot.querySelector('#feedback-title');
    const msg = this.shadowRoot.querySelector('#feedback-message');

    feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.style.display = 'block';

    title.textContent = isCorrect ? "É isso aí!" : "Tente novamente!";
    msg.textContent = isCorrect 
      ? (this.getAttribute("feedback-correct") ?? "Você selecionou a alternativa correta.")
      : (this.getAttribute("feedback-incorrect") ?? "Essa não é a alternativa correta. Analise as opções e tente novamente.");
  }

  save(responded = false) {
    const selected = this.shadowRoot.querySelector('.option-item.selected');
    const data = {
      selectedIndex: selected ? selected.dataset.index : null,
      responded: responded
    };
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  restoreData() {
    const saved = JSON.parse(sessionStorage.getItem(this.storageKey));
    if (!saved) return;

    if (saved.selectedIndex !== null) {
      const item = this.shadowRoot.querySelector(`.option-item[data-index="${saved.selectedIndex}"]`);
      if (item) item.classList.add('selected');
      
      const btnResponder = this.shadowRoot.querySelector('.btn-responder');
      btnResponder.disabled = false;
      btnResponder.classList.add('active');
    }

    if (saved.responded) {
      const correctIndex = this.getAttribute("correct") ?? "1";
      this.showFeedback(saved.selectedIndex === correctIndex);
      this.toggleState(true);
    }
  }
}

customElements.define("dot-multiple-choice", DotMultipleChoice);