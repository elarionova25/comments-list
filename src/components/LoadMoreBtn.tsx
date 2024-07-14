import React from 'react';
import styled from 'styled-components'
import Loading from './Loading';

const MoreBtn = styled.button`
    background-color: #313439;
    color: #FFFFFF;
    font-size: 16px;
    width: 234px;
    height: 36px;
    border-radius: 4px;
    border-width: 0;
    cursor: pointer;
    transition: all 0.5s ease-out;
    display: block;
    margin: 0 auto;
    padding: 0;

    &:hover {
        background-color: #484d50;
    }

    &:active {
        background-color: #858a8d;
    }
`

interface ILoadMoreBtn {
    onClick: () => void;
    isLoading: boolean;
}

const LoadMoreBtn: React.FC<ILoadMoreBtn> = ({ onClick, isLoading }) => {
    return (
        <div onClick={ onClick }>
            <MoreBtn>
                {isLoading ? <Loading/> : 'Загрузить еще'}
            </MoreBtn>
        </div>
    )
}

export default LoadMoreBtn;