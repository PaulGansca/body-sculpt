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

export const getExercisesInCategory = (categoryId, filters) => {
    return fetcher.get(`/exercise/?category=${categoryId}${filters}`).then(res => {
        return res.data;
    });
};

export const getExerciseInfo = (id) => {
    return fetcher.get(`/exerciseinfo/${id}`).then(res => {
        return res.data;
    });
};

export const getAllExercises = () => {
    return fetcher.get(`/exerciseinfo/?limit=1000&language=2`).then(res => {
        return res.data.results;
    });
};