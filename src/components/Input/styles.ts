import styled from 'styled-components';

export const Container = styled.label`
    display: flex;
    flex-direction: column;

    width: 100%;
    margin-top: .5rem;
    color: var(--black);

    input {
        width: 100%;

        height: 2.4rem;
        padding: .5rem;
        border: 1px solid #E0E0E0;
        border-radius: .25rem;

        transition: .2s;

        :focus {
            content: '';
            border-color: var(--blue);
        }
    }
`;