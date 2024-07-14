import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components'
import { IAuthor, IComment } from '../interfaces';
import LikesCount from './LikesCount';
import { DateHelper } from '../helpers/DateHelper';
import Avatar from './icons/Avatar';
import { useCommentAuthor } from '../hooks/useCommentAuthor';

const CommentWrap = styled.div`
    width: 100%;
`

const InfoWrap = styled.div`
    display: flex;
    width: 100%;
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
    word-wrap: break-word
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
    setTotalLikes?: Dispatch<SetStateAction<number>>;
}

const CommentItem: React.FC<ICommentItem>  = ({ comment, authors, replies, setTotalLikes }) => {
    const [ count, setCount ] = useState(comment.likes);
    const author = useCommentAuthor(comment.author, authors);
    const $DateHelper = new DateHelper(comment.created);

    const replyItems = replies?.map(item => {
        return (
            <RepliesWrap key={ item.id } $isFirst={ !comment.parent }>
                <CommentItem comment={ item } replies={ item.children } authors={ authors } setTotalLikes={ setTotalLikes }/>
            </RepliesWrap>
        )
    })

    return (
        <CommentWrap>
            <InfoWrap>
                <Avatar avatarSrc={ author.avatar }></Avatar>
                <MainInfo>
                    <TextName>{author.name}</TextName>
                    <TextTime>{ $DateHelper.date }</TextTime>
                </MainInfo>
                <LikesCount count={ count } isInteractive={ true } setCount={ setCount } setTotalLikes={ setTotalLikes }/>
            </InfoWrap>
            <CommentText>
                {comment.text}
            </CommentText>
            { replies ? replyItems : null }
        </CommentWrap>
    )
}

export default CommentItem;