import { weightPrediction } from './google-cloud-functions';

describe('GOOGLE Cloud Functions', () => {
    it("get weight prediction for past performances", () => {
      expect.assertions(1)
      return expect(weightPrediction([50, 52.5, 52.5, 55])).resolves.toEqual(expect.any(Number))
    });

    it("return 0 if no past performances given", () => {
        expect.assertions(1)
        return expect(weightPrediction()).resolves.toEqual(0)
    });
});