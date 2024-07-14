import React, { Dispatch, SetStateAction, useState } from 'react';
import HeartIcon from './icons/HeartIcon';
import styled from 'styled-components';

const LikesCountWrap = styled.div`
        color: #FFFFFF;
        font-weight: bold;
        display: flex;
        gap: 8px;
        margin-right: 0;
        margin-left: auto;
        user-select: none;
    `;

interface ILikesCount {
    count: number;
    isInteractive: boolean;
    setCount?: Dispatch<SetStateAction<number>>;
    setTotalLikes?: Dispatch<SetStateAction<number>>;
}

const LikesCount: React.FC<ILikesCount> = ({ count, isInteractive, setCount, setTotalLikes }) => {
    const [ isLiked, setIsLiked ] = useState(false)

    const handleClick = () => {
        if (!isInteractive || !setCount || !setTotalLikes) return;
        setIsLiked(!isLiked);

        if (!isLiked) {
            setCount((val) => val + 1);
            setTotalLikes(val => val + 1)
        } else {
            setCount((val) => val - 1);
            setTotalLikes(val => val - 1)
        }
        return 1;
    }

    return (
        <LikesCountWrap>
            <div onClick={ handleClick } style={ isInteractive ? { cursor: 'pointer' } : { cursor: 'default' } }>
                <HeartIcon isInteractive={ isInteractive } isLiked={ isLiked }/>
            </div>
            <span>
                {count}
            </span>
        </LikesCountWrap>
)
}

export default LikesCount;