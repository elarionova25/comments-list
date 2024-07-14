import React from 'react';
import styled from 'styled-components';

const ErrorBlock = styled.div`
    color: #ffffff;
    text-align: center;
`

const ErrorItem = () => {
    return (
        <ErrorBlock>Произошла ошибка :( Попробуйте позже</ErrorBlock>
    )
}

export default ErrorItem;