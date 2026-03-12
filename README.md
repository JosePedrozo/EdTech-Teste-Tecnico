# Teste Técnico – Desenvolvedor Frontend (EdTech) - José Alfredo Pedrozo (2026)

Este projeto consiste na implementação de uma página de conteúdo educacional interativo, desenvolvida com **JavaScript Vanilla** e **Web Components**. O foco principal foi criar uma arquitetura modular, reutilizável e com persistência de dados local.

## Como rodar o projeto

Este projeto utiliza módulos nativos do JavaScript (ESM), por isso precisa de um servidor local para funcionar corretamente devido às políticas de segurança (CORS).

### Pré-requisitos
*   [Node.js](https://nodejs.org/) instalado.

### Passo a passo
1.  Clone o repositório ou baixe os arquivos.
2.  Abra o terminal na pasta raiz do projeto.
3.  Execute o servidor local com o comando:
    ```bash
    npx serve .
    ```
4.  O projeto estará disponível em: `http://localhost:3000` (ou na porta indicada no seu terminal).

---

## Decisões Técnicas

*   **Web Components (Custom Elements):** Optei por utilizar a API nativa de Web Components para encapsular a lógica e o estilo de cada elemento (Header, Cards, Atividades, FAQ). Isso garante um código modular e fácil de manter, simulando o comportamento de frameworks modernos sem ferir o requisito de usar JS Vanilla.
*   **Shadow DOM:** Utilizado para garantir o encapsulamento do CSS, evitando que estilos globais interfiram nos componentes e vice-versa.
*   **Barrel Export Pattern:** Centralizei o registro de todos os componentes no arquivo `main.js`, simplificando o carregamento no HTML e melhorando a organização do projeto.
*   **Persistência com SessionStorage:** Implementada lógica para salvar e recuperar o estado das atividades (objetiva e discursiva). O sistema restaura textos, opções selecionadas, feedbacks visíveis e o estado de habilitação dos botões após o refresh da página.
*   **HTML Semântico & Acessibilidade:** Uso de tags como `<main>`, `<section>`, `<details>` e `<summary>` para o FAQ, garantindo acessibilidade nativa e melhor SEO.

---

## Estrutura do Projeto

```text
├── components/          # Web Components (Lógica e Estilo encapsulado)
│   ├── dot-header.js
│   ├── dot-faq.js
│   └── ...
├── public/
│   ├── styles/          # Estilos globais (reset e cores)
│   └── imgs/            # Ativos de imagem e icones
├── index.html           # Página principal
├── main.js              # Ponto de entrada que registra todos os componentes
└── README.md            # Documentação
```
Resultado:
<img width="2560" height="10518" alt="printscreen_telainteira" src="https://github.com/user-attachments/assets/cbeace2c-2803-4538-9b29-6dc15d9b7a7b" />

