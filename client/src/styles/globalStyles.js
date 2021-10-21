import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #4fc08d;
    --second-color: #f6f6f6;
    --black-color: #000;
    --white-color: #fff;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --border-color: #e3e3e3;
    --border-color-focus: #42b983;
    --border-button-focus: #095432;
    --image-color: #35495e;
    --font-color: #304455;
    --font-size: 16px;
    --font-size--small: 14px;
    --alert-success: #b2c032;
    --alert-error: #ff9b9b;
  }

  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    color: var(--font-color);
    font-family: 'Roboto', sans-serif;
    font-size: var(--font-size);
  }

  * {
    box-sizing: border-box;
  }

  body > div {
    display: flex;
    flex-direction: column;
  }

  a {
    color: var(--font-color);
  }

  a:hover {
    text-decoration: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ol {
    margin: 10px 0 0;
    padding: 0 20px;
  }

  ol li {
    margin: 0 0 3px;
  }

  h1,
  h2 {
    margin: 0 0 15px;
    word-break: break-word;
  }

  h1 {
    font-size: calc(22px + (28 - 22) * ((100vw - 320px) / (1600 - 320)));
  }

  h2 {
    font-size: calc(18px + (20 - 18) * ((100vw - 320px) / (1600 - 320)));
  }

  select,
  textarea,
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }

  textarea + span,
  input + span {
    color: tomato;
    font-size: var(--font-size--small);
  }

  select:focus,
  textarea:focus,
  input:focus {
    border-color: var(--border-color-focus);
    box-shadow: 0 3px 5px 2px var(--border-color);
    outline: none;
  }

  textarea {
    min-height: 80px;
  }
`;

export default GlobalStyle;
