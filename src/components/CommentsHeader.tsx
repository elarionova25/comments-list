import React from 'react';
import LikesCount from './LikesCount';
import styled from 'styled-components'

const HeaderBlock = styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
        border-bottom: .2px solid #767676;
    `;

const CommentsCount = styled.div`
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
        filter: drop-shadow(0 3px 3px black);
    `;

interface ICommentsHeader {
    totalLikesCount: number
    totalComments: number;
}
const CommentsHeader: React.FC<ICommentsHeader> = ({ totalComments, totalLikesCount }) => {
    return (
        <>
            <HeaderBlock>
                <CommentsCount >
                    {totalComments} комментариев
                </CommentsCount>
                <LikesCount count={ totalLikesCount } isInteractive={ false }/>
            </HeaderBlock>
        </>
    )
}

export default CommentsHeader;