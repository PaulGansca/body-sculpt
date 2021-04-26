import { searchExercises, getExercisesInCategory,
     getAllExercises, getExerciseInfo } from './wger';

describe('WGER API', () => {
  it("search exercises without term should return empty obj", () => {
    expect.assertions(1);
    return expect(searchExercises("")).resolves.toEqual({})
  });

  it("search exercises any term has suggestions", () => {
    expect.assertions(1);
    return expect(searchExercises("b")).resolves.toHaveProperty("suggestions");
  });

  it("get exercises in a muscle category", () => {
    expect.assertions(1);
    return expect(getExercisesInCategory(10)).resolves.toHaveProperty("count");
  });

  it("get detailed exercise info for id", () => {
    expect.assertions(1);
    return expect(getExerciseInfo(191)).resolves.toHaveProperty("id");
  });
  jest.setTimeout(8000);
  it("get detailed exercise info for all exercises", () => {
    expect.assertions(1);
    return expect(getAllExercises()).resolves.toEqual(expect.any(Array));
  });
});