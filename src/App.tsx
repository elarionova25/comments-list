import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import BackgroungImage from './assets/background.jpg'
import CommentsHeader from './components/CommentsHeader';
import CommentItem from './components/CommentItem';
import Loading from './components/Loading';
import ErrorItem from './components/ErrorItem';
import LoadMoreBtn from './components/LoadMoreBtn';
import { useFetchAuthors } from './hooks/useFetchAuthors';
import { useFetchComments } from './hooks/useFetchComments';
import { IComment } from './interfaces';

const MainContainer = styled.div`
        height: 100vh;
        background-image: url('${ BackgroungImage }');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment:fixed;
        padding: 52px 24px 64px 24px;
        overflow: scroll;
`

const CommentsBlock = styled.div`
    max-width: 562px;
    margin: 0 auto;
`

const CommentsContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    min-height: 106px;
    margin: 32px 0;
`

function App() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const { authors } = useFetchAuthors(setIsLoading, setError);
    const [ totalLikesCount, setTotalLikes ] = useState(0);
    const { comments, pagination, currentPage, handleNextPage } = useFetchComments(setIsLoading, setError, error);

    const commentsList = comments.map((item) => {
        return (<CommentItem key={ item.id } comment={ item } authors={ authors } replies={ item.children } setTotalLikes={ setTotalLikes }/>)
    })

    const handleLoadMore = () => {
        handleNextPage();
    }

    useEffect(() => {
        if (!comments || !comments.length) setTotalLikes(0);

        const sum = (comments as IComment[]).reduce((accumulator: number, currentValue: IComment) => accumulator + currentValue.likes, 0);
        setTotalLikes(sum);
    }, [ comments ]);

    return (
        <main className="container">
            <Suspense fallback={ <div/> }>
                <MainContainer>
                    <CommentsBlock>
                        <CommentsHeader totalComments={ pagination.size * pagination.total_pages } totalLikesCount={ totalLikesCount }/>
                        <CommentsContent>
                            { commentsList }
                            { isLoading ? <Loading /> : null}
                            { error ? (<ErrorItem/>) : null}
                        </CommentsContent>
                        { currentPage < pagination.total_pages && !isLoading ? <LoadMoreBtn onClick={ handleLoadMore } isLoading={ isLoading }/> : null}
                    </CommentsBlock>
                </MainContainer>
            </Suspense>
        </main>
    );
}

export default App;
