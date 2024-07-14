import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import { IAuthor, IComment } from '../interfaces';
import LikesCount from './LikesCount';
import { DateHelper } from '../helpers/DateHelper';
import defaultAvatar from 'src/assets/avatars/defaultAvatarStub.png';

const CommentWrap = styled.div`
    width: 100%;
`

const InfoWrap = styled.div`
    display: flex;
    width: 100%;
`

const Avatar = styled.div<{ $src?: string;}>`
    border-radius: 50%;
    height: 58px;
    width: 58px;
    margin-right: 20px;
    background-size: cover;
    background-position: unset;
    background-repeat: no-repeat;
    background-image: ${ (props) => `url(${ props.$src })` };
`

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const CommentText = styled.div`
    margin-left: 78px;
    font-size: 16px;
    color: #FFFF;
`

const TextName = styled.span`
    font-weight: bold;
    font-size: 16px;
    color: #FFFF;
`

const TextTime = styled.span`
    font-size: 16px;
    color: #8297AB;
`

const RepliesWrap = styled.div<{ $isFirst?: boolean; }>`
    margin-top: 32px;
    margin-left: ${ props => props.$isFirst ? '34px': 0 };
    display: flex;
    flex-direction: column;
    gap: 32px;
`

interface ICommentItem {
    comment: IComment;
    replies: IComment[];
    authors: IAuthor[];
    updateTotalLikesCount?: any;
    setTotalLikes?: any;
}
const CommentItem: React.FC<ICommentItem>  = ({ comment, authors, replies, setTotalLikes }) => {
    const [ count, setCount ] = useState(comment.likes);
    const $DateHelper = new DateHelper(comment.created);

    const getCommentAuthor = useCallback((authorId: number) => {
        const author = authors.filter(item => authorId === item.id)[ 0 ];

        if (!author) {
            return {
                id: 0,
                name: 'Anonymous',
                avatar: defaultAvatar,
            }
        }

        return author;
    }, [ authors ]);

    return (
        <CommentWrap>
            <InfoWrap>
                <Avatar $src={ getCommentAuthor(comment.author).avatar }/>
                <MainInfo>
                    <TextName>{getCommentAuthor(comment.author).name}</TextName>
                    <TextTime>{ $DateHelper.date }</TextTime>
                </MainInfo>
                <LikesCount count={ count } isInteractive={ true } setCount={ setCount } setTotalLikes={ setTotalLikes }/>
            </InfoWrap>
            <CommentText>
                {comment.text}
            </CommentText>
            { replies ? replies.map(item =>(<RepliesWrap key={ item.id } $isFirst={ !comment.parent }><CommentItem comment={ item } replies={ item.children } authors={ authors } setTotalLikes={ setTotalLikes }/></RepliesWrap>)) : null }
        </CommentWrap>
    )
}

export default CommentItem;