import '@testing-library/jest-dom';

describe('simple tests', () => {
  it('sums two numbers and returns the result', () => {
    const num1 = 10;
    const num2 = 5;

    const result = num1 + num2;

    expect(result).toBe(15);
  });
});
