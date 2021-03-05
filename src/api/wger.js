import axios from 'axios';

const fetcher = axios.create({
    baseURL: "https://wger.de/api/v2/",
    headers: {
      'Content-Type': 'application/json',
    }
});

export const searchExercises = (term) => {
    return fetcher.get(`/exercise/search/?term=${term}`).then(res => {
        return res.data;
    });
};

export const getExerciseInfo = (id) => {
    return fetcher.get(`/exerciseinfo/${id}`).then(res => {
        return res.data;
    });
};