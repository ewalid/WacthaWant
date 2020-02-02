import React from 'react';

//components
import Navigation from './elements/Navigation.jsx'
import MovieInfoBar from './elements/MovieInfoBar.jsx'
import MovieInfo from './elements/MovieInfo.jsx'
import Grid from './elements/Grid.jsx'
import Actor from './elements/Actor.jsx'
import Spinner from './elements/Spinner.jsx'

const Movie = ({ movieId}) => (
    <>
        <Navigation />
        <MovieInfo />
        <MovieInfoBar />
        <Grid>
            <Actor />
        </Grid>
        <Spinner />

    </>
);

export default Movie;
