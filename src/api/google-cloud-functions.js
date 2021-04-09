import axios from 'axios';

const fetcher = axios.create({
    baseURL: "https://europe-west3-body-sculpt-5ab47.cloudfunctions.net",
      headers: {
        'Content-Type': 'application/json',
      },
});

export const weightPrediction = (pastPerformances = [0]) => {
    return fetcher.post("/weight-prediction", {pastPerformances}).then(res => {
        return res.data;
    })
}