import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { IAuthor } from '../interfaces';

export const useFetchAuthors = (setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string>>) => {
    const [ authors, setAuthors ] = useState<IAuthor[] | []>([]);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            const responseAuthors = await axios.get('/api/authors');
            setAuthors(responseAuthors.data);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Unknown error'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { authors };
}