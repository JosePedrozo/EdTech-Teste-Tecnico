class DotCardSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.openIndex = null;
  }

  connectedCallback() {

    const textsAttr = this.getAttribute("texts") ?? "";

    this.texts = textsAttr
      .split("|")
      .map(t => t.trim())
      .filter(Boolean);

    this.render();
    this.attachEvents();
  }

  render() {

    const cards = this.texts.map((text, i) => `
      <div class="card" data-index="${i}">
        
        <div class="icon">?</div>

        <p class="text">${text}</p>

        <button class="toggle">Abrir</button>

      </div>
    `).join("");

    this.shadowRoot.innerHTML = `
      <style>

        :host{
            display:block;
        }

        section{
            max-width:940px;
            margin-inline:auto;
        }

        .cards{
            display:grid;
            grid-template-columns:repeat(3,1fr);
            gap:32px;
        }

        .card{
            background:#F9FAFB;
            border-radius:12px;
            padding:32px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:20px;
            text-align:center;
            height:320px;
            transition:.3s ease;
        }

        .card.active{
            transform: scale(1.1);
            background: #0C0A08;
            color:white;
        }

        .icon{
            font-size: 2rem;
            font-weight:bold;
            color: #1E293B;
            transition:all .25s ease;
        }

        .card.active .icon{
            display: none;
        }

        .text{
            font-size:1rem;
            line-height:1.6;
            opacity:0;
            max-height:0;
            overflow:hidden;
            transition:all .3s ease;
        }

        .card.active .text{
            opacity:1;
            max-height:200px;
        }

        button{
            border:1px solid #D1D5DB;
            background:white;
            padding:10px 20px;
            border-radius:6px;
            cursor:pointer;
            font-size:0.9rem;
        }

        .card.active button{
            background: #0C0A08;
            color: white;
            border:1px solid #4B5563;
        }

        @media (max-width:768px){

          .cards{
            grid-template-columns:1fr;
          }

          section{
            padding:0 20px 48px;
          }

        }

      </style>

      <section>
        <div class="cards">
          ${cards}
        </div>
      </section>
    `;
  }

  attachEvents() {

    const cards = this.shadowRoot.querySelectorAll(".card");

    cards.forEach(card => {

      const button = card.querySelector("button");
      const index = Number(card.dataset.index);

      button.onclick = () => {

        if (this.openIndex === index) {
          this.openIndex = null;
        } else {
          this.openIndex = index;
        }

        cards.forEach(c => c.classList.remove("active"));

        if (this.openIndex !== null) {
          cards[this.openIndex].classList.add("active");
        }

        this.updateButtons();
      };
    });

    this.updateButtons();
  }

  updateButtons(){

    const cards = this.shadowRoot.querySelectorAll(".card");

    cards.forEach((card,i)=>{

      const btn = card.querySelector("button");

      if(this.openIndex === i){
        btn.textContent = "Fechar";
      }else{
        btn.textContent = "Abrir";
      }

    });

  }
}

customElements.define("dot-card-selector", DotCardSelector);