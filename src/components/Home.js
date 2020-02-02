import React, { useState } from 'react';
import {
    POPULAR_BASE_URL,
    SEARCH_BASE_URL,
    IMAGE_BASE_URL,
    BACKDROP_SIZE,
    POSTER_SIZE,
} from '../config';
import NoImage from './images/no_image.jpg';



// import components
import HeroImageCmp from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import LoadMoreBtn from './elements/LoadMoreBtn';
import MovieThumb from './elements/MovieThumb';
import Spinner from './elements/Spinner';
// import NoImage from './images/no_image.jpg';

// Custom Hook
import { useHomeFetch } from './hooks/useHomeFetch';


const Home = () => {
    const [
        { 
            state: {movies, HeroImage, currentPage, totalPages},
            loading,
            error
        },
        fetchMovies,
    ] = useHomeFetch();
    const [searchTerm, setSearchTerm] = useState('');
    console.log('state', {movies, HeroImage, currentPage, totalPages});

    const SearchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
        setSearchTerm(search);
        fetchMovies(endpoint);
    };

    const loadMoreMovies = () => {
        const searchEndPoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage+1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage+1}`;

        const endpoint = searchTerm ? searchEndPoint : popularEndpoint;
        fetchMovies(endpoint);
    }

    if (error) return <div>Something Went Wrong</div>
    if (!movies[0]) return <Spinner />
    
    return (
        <>
            {!searchTerm && (
                <HeroImageCmp
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${HeroImage.backdrop_path}`}
                    title={HeroImage.original_title}
                    text={HeroImage.overview}
                />
            )}
            <SearchBar callback={SearchMovies} />
            <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
                {movies.map(movie => (
                    <MovieThumb
                        key={movie.id}
                        clickable
                        image={
                        movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            { currentPage < totalPages && !loading && (
                <LoadMoreBtn text="Load More" callback={loadMoreMovies}  />
            )}
        </>
    )
};

export default Home;
