import {useState, useEffect, useCallback} from 'react';
import { API_URL, API_KEY} from '../../config';

export const UseMoviefetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

};
