class DotEssayQuestion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.storageKey = `dot_essay_${this.getAttribute("id") || window.location.pathname}`;
  }

  connectedCallback() {
    this.render();
    this.setup();
    this.restoreData();
  }

  render() {
    const title = this.getAttribute("title") ?? "Atividade discursiva";
    const question = this.getAttribute("question") ?? "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
    const feedback = this.getAttribute("feedback") ?? "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur commodi odio maiores accusamus aspernatur consequatur ipsam dignissimos magnam hic, velit est perferendis explicabo aperian ratione veritatis labore.";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .container {
          background: #fff;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          max-width: 930px;
          margin-inline: auto;
          box-sizing: border-box;
        }

        .header {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .icon {
          width: 40px;
          height: 40px;
          background: #F1F9E9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon svg {
          width: 20px;
          height: 20px;
          fill: #76B900;
        }

        .info h2 {
          margin: 0;
          font-size: 1.1rem;
          color: #111827;
          font-weight: 700;
        }

        .info p {
          margin: 8px 0 0;
          font-size: 1rem;
          color: #4B5563;
          line-height: 1.5;
        }

        textarea {
          width: 100%;
          min-height: 160px;
          padding: 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.95rem;
          resize: vertical;
          box-sizing: border-box;
          margin-bottom: 24px;
          color: #374151;
          transition: border-color 0.2s;
        }

        textarea:focus {
          outline: none;
          border-color: #76B900;
        }

        textarea:disabled {
          background-color: #F9FAFB;
          cursor: not-allowed;
        }

        .controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        button {
          padding: 12px 32px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .btn-respond {
          background: #F3F4F6;
          color: #9CA3AF;
        }

        .btn-respond.ready {
          background: #76B900;
          color: #fff;
        }

        .btn-respond:disabled {
          background: #F3F4F6;
          color: #9CA3AF;
          cursor: not-allowed;
        }

        .btn-edit {
          background: #000;
          color: #fff;
        }

        .btn-edit:disabled {
          background: #E5E7EB;
          color: #9CA3AF;
          cursor: not-allowed;
        }

        .feedback-box {
          margin-top: 24px;
          background: #ECF7ED;
          border-radius: 8px;
          padding: 20px;
          display: none; 
          position: relative;
        }

        .feedback-box.visible {
          display: block;
        }

        .feedback-box h3 {
          margin: 0;
          color: #065F46;
          font-size: 1rem;
          font-weight: 700;
        }

        .feedback-box p {
          margin: 8px 0 0;
          color: #065F46;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .close-feedback {
          position: absolute;
          top: 12px;
          right: 12px;
          color: #065F46;
          cursor: pointer;
          font-size: 1.2rem;
        }

        @media (max-width: 600px) {
          .container { padding: 16px; }
          .header { flex-direction: column; gap: 12px; }
          button { width: 100%; }
        }
      </style>

      <section class="container">
        <div class="header">
          <div class="icon">
            <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </div>
          <div class="info">
            <h2>${title}</h2>
            <p>${question}</p>
          </div>
        </div>

        <textarea placeholder="Digite sua resposta aqui..."></textarea>

        <div class="controls">
          <button class="btn-respond" disabled>Responder</button>
          <button class="btn-edit" disabled>Alterar</button>
        </div>

        <div class="feedback-box">
          <span class="close-feedback">&times;</span>
          <h3>É isso aí!</h3>
          <p>${feedback}</p>
        </div>
      </section>
    `;
  }

  setup() {
    const textarea = this.shadowRoot.querySelector("textarea");
    const btnRespond = this.shadowRoot.querySelector(".btn-respond");
    const btnEdit = this.shadowRoot.querySelector(".btn-edit");
    const feedbackBox = this.shadowRoot.querySelector(".feedback-box");
    const closeFeedback = this.shadowRoot.querySelector(".close-feedback");

    textarea.addEventListener("input", () => {
      const hasContent = textarea.value.trim().length > 0;
      btnRespond.disabled = !hasContent;
      btnRespond.classList.toggle("ready", hasContent);
      this.saveData();
    });

    btnRespond.onclick = () => {
      this.setQuestionState(true);
      this.saveData();
    };

    btnEdit.onclick = () => {
      this.setQuestionState(false);
      this.saveData();
    };

    closeFeedback.onclick = () => {
      feedbackBox.classList.remove("visible");
    };
  }

  setQuestionState(isAnswered) {
    const textarea = this.shadowRoot.querySelector("textarea");
    const btnRespond = this.shadowRoot.querySelector(".btn-respond");
    const btnEdit = this.shadowRoot.querySelector(".btn-edit");
    const feedbackBox = this.shadowRoot.querySelector(".feedback-box");

    if (isAnswered) {
      textarea.disabled = true;
      btnRespond.disabled = true;
      btnRespond.classList.remove("ready");
      btnEdit.disabled = false;
      feedbackBox.classList.add("visible");
    } else {
      textarea.disabled = false;
      btnRespond.disabled = false;
      btnRespond.classList.add("ready");
      btnEdit.disabled = true;
      feedbackBox.classList.remove("visible");
    }
  }

  saveData() {
    const textarea = this.shadowRoot.querySelector("textarea");
    const feedbackBox = this.shadowRoot.querySelector(".feedback-box");
    const btnEdit = this.shadowRoot.querySelector(".btn-edit");

    const data = {
      text: textarea.value,
      isAnswered: !btnEdit.disabled,
      feedbackVisible: feedbackBox.classList.contains("visible")
    };

    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  restoreData() {
    const saved = sessionStorage.getItem(this.storageKey);
    if (!saved) return;

    const data = JSON.parse(saved);
    const textarea = this.shadowRoot.querySelector("textarea");
    const btnRespond = this.shadowRoot.querySelector(".btn-respond");

    textarea.value = data.text || "";
    
    if (textarea.value.trim().length > 0) {
      btnRespond.classList.add("ready");
      btnRespond.disabled = false;
    }

    if (data.isAnswered) {
      this.setQuestionState(true);
    }
    
    if (data.feedbackVisible) {
      this.shadowRoot.querySelector(".feedback-box").classList.add("visible");
    }
  }
}

customElements.define("dot-essay-question", DotEssayQuestion);