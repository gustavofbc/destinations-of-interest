import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;
`

export const FormContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @media (max-width: 560px) {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }
`

export const FormContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 540px;
    height: 500px;
    max-width: 100%;
    max-height: 100%;

    border: 2px solid var(--black);
    border-radius: .25rem;
    margin: 1rem;
    padding: 2rem;

    h3 {
        color: var(--black);
        font-weight: 500;
    }

    .select {
        width: 100%;
        margin: 1rem;
    }

    @media (max-width: 560px) {
        width: 100%;
        max-width: 400px;
    }
`

export const SubmitButton = styled.button`
    width: 6rem;
    height: 3rem;
    
    margin: 1rem;
    color: var(--white);
    background: var(--blue);
    font-weight: 600;
    font-size: 1rem;


    border: none;
    border-radius: .25rem;
    box-shadow: 10px 5px 4px rgba(0, 0, 0, 0.25);

    transition: .3s;

    &:hover {
        background: var(--blue-dark);
    }
`