const {sortPages} = require('./report.js');
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol', () => {
    const input = {
        'https://clap.ng/news': 1,
        'https://clap.ng': 3
    }
    const actual = sortPages(input);
    const expected = [
        ['https://clap.ng', 3],
        ['https://clap.ng/news', 1]
    ];
    expect(actual).toEqual(expected)
})