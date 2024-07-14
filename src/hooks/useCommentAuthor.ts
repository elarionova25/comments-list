import { IAuthor } from '../interfaces';
import { useCallback } from 'react';
import defaultAvatar from "../assets/avatars/defaultAvatarStub.png";

export const useCommentAuthor = (authorId: number, authors: IAuthor[]) => {
    const getCommentAuthor = useCallback((id: number) => {
        const author = authors.filter(item => id === item.id)[ 0 ];

        if (!author) {
            return {
                id: 0,
                name: 'Anonymous',
                avatar: defaultAvatar,
            }
        }

        return author;
    }, [ authors ]);

    return getCommentAuthor(authorId);
}