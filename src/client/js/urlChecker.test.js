import { urlValidate } from './urlChecker'

test('test valid url', () => {
    const userInput = urlValidate('https://www.google.com');
    expect(userInput).toBe(true);
});
test('test invalid url', () => {
    const userInput = urlValidate('fdsfsfs');
    expect(userInput).toBe(false);
});