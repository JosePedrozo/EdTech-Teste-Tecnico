class Dotheader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `

        <style>
            :host {
                display: block;
            }

            .header {
                background: var(--background-dark);
                color: var(--white-color);
                position: relative;
                overflow: hidden;
                padding: 160px 80px;
            }

            .header-bg {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                z-index: 0;
                pointer-events: none;
            }

            .header__container {
                position: relative;
                max-width: 1280px;
                margin-inline: auto;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                gap: 80px;
                place-items: end;
                z-index: 1;
            }

            .header__title {
                font-size: clamp(2.5rem, 5vw, 4.5rem);
                line-height: 1.1;
                font-weight: 700;
                margin: 0;
                padding: 10px 0 0 28px;
                border-left: 4px solid;
                border-image: linear-gradient(to bottom, #76B900 0%, rgba(118, 185, 0, 0) 60%) 1;
            }

            .header__information{
                margin-left: 28px;
            }
            
             .header__description {
                margin-top: 24px;
                color: var(--grey-color);
                max-width: 480px;
                line-height: 1.6;
                padding: 20px 0 20px 24px;
                border-left: 1px solid #FFFFFF0a;
            }

            .header__highlight{
                color: var(--highlight-color)
            }

            .header__cta {
                margin-top: 32px;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 14px 32px;
                border-radius: 4px;
                border: none;
                font-family: "inter", Arial;
                font-weight: 700;
                background: var(--highlight-color);
                color: black;
                cursor: pointer;
                transition: transform .2s ease, box-shadow .2s ease;
                box-shadow: 0 0px 10px rgba(132, 255, 0, .35);
            }

            .header__cta:hover {
                transform: translateY(-2px);
                box-shadow: 0 0 30px rgba(132,255,0,.35);
            }

            .header__cta:focus-visible {
                outline: 2px solid var(--highlight-color);
                outline-offset: 3px;
            }

            .header__dashboard-img{
                border-radius: 12px;
                backdrop-filter: blur(4px);
            }

            @media (min-width: 1440px){
                .header__dashboard-img {
                    width: 500px;
                    height: auto;
                }
            }

            @media (max-width: 950px) {
                .header {
                    padding: 64px 24px;
                }

                .header__container {
                    grid-template-columns: 1fr;
                    gap: 40px;
                    place-items: start;
                    text-align: left;
                }

                .header__title {
                    font-size: clamp(2rem, 8vw, 2.8rem);
                    padding-left: 20px;
                }

                .header__information{
                    margin-left: 20px;
                }

                .header__description {
                    max-width: 100%;
                    padding: 16px 0 16px 16px;
                }

                .header__cta {
                    width: fit-content;
                    padding: 12px 24px;
                }

                .header__dashboard {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .header__dashboard-img {
                    width: 100%;
                    max-width: 420px;
                    height: auto;
                }
            }
        </style>

        <header class="header">
        <img src="public/imgs/header-bg.svg" class="header-bg" alt="" aria-hidden="true">
            <div class="header__container">
                <section class="header__content">
                    <h1 class="header__title">
                        Lorem ipsum dolor, sit <span class="header__highlight">amet</span>
                    </h1>
                    <div class="header__information">
                        <p class="header__description">
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout.
                        </p>
                        <button class="header__cta" type="button">
                            <span>Lorem Ipsum</span>
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </section>
                <div class="header__dashboard">
                    <img
                        class="header__dashboard-img"
                        src="public/imgs/header-dashboard.svg"
                        alt="Dashboard da plataforma EDtech"
                        width="430"
                        loading="lazy"
                        decoding="async"
                    >
                </div>
            </div>
        </header>
    `;
    }
}

customElements.define("dot-header", Dotheader);