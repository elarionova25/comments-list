import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { IComment, IPagination } from '../interfaces';
import axios from 'axios';

export const useFetchComments = (setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string>>, error: string) => {
    const [ comments, setComments ] = useState<IComment[] | []>([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pagination, setPaginationPage ] = useState<IPagination>({ page: 0, size: 0, total_pages: 1 });

    const getCommentsWithReplies = (comments: IComment[]) => {
        const parentArray: IComment[]  = [];

        comments.forEach(item => {
            if (item.parent) {
                const parentComment = comments.find(comment => comment.id === item.parent);

                if (!parentComment) return;

                if (!parentComment.children) {
                    parentComment.children = [ item ];
                } else {
                    parentComment.children = [ ...parentComment.children, item ]
                }

                return;
            }

            return parentArray.push(item);
        })

        return parentArray;
    }

    const fetchData = useCallback(async () => {
        if (currentPage > pagination.total_pages) return;
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/comments', { params: { page: currentPage } });
            const result = getCommentsWithReplies(response.data.data);

            setComments([ ...comments, ...result ]);
            setPaginationPage(response.data.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown Error');
        } finally {
            setLoading(false);
        }
    }, [ currentPage ])

    useEffect(() => {
        fetchData();
    }, [ currentPage ]);

    const handleNextPage = () => {
        if (!error) {
            setCurrentPage(currentPage + 1);
        } else {
            fetchData();
        }
    };

    getCommentsWithReplies(comments);

    return { comments, pagination, error, currentPage, handleNextPage };
}