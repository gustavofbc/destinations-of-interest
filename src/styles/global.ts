import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --blue: #3e40ff;
        --blue-dark: #0101FF;
        --black: #1F2729;
        --white: #F4FEFD;
        --background: #F2F3F5;
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;
        background: var(--background);
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }
    
    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`