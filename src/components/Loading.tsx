import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
    background: rgba(28, 28, 39, 0.03);
    position: relative;
    height: 32px;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;

    &::before {
        content: '';
        position: absolute;
        background: linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0.00) 100%);
        top: 0;
        height: 100%;
        width: 100%;

        @keyframes mask {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(100%);
            }
        }
        animation: mask 1200ms cubic-bezier(0.16, 0.03, 0.02, 0.68) infinite;
    }
`;

const Loading = () => {
    return (
        <Container>
            <Loader />
        </Container>
    );
}

export default Loading;