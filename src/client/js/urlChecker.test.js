import { urlValidate } from './urlChecker'

test('test valid url', () => {
    const x = urlValidate('https://www.google.com');
    expect(x).toBe(true);
});
test('test valid url', () => {
    const x = urlValidate('fdsfsfs');
    expect(x).toBe(false);
});