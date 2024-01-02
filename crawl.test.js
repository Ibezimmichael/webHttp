const { log } = require('console');
const {normalizeUrl, getURLsFromHTMl} = require('./crawl.js');
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol', () => {
    const input = "https://michael.dev/path";
    const actual = normalizeUrl(input);
    const expected = "michael.dev/path";
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash', () => {
    const input = "https://michael.dev/path/";
    const actual = normalizeUrl(input);
    const expected = "michael.dev/path";
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals', () => {
    const input = "https://MICHAEL.dev/path/";
    const actual = normalizeUrl(input);
    const expected = "michael.dev/path";
    expect(actual).toEqual(expected)
})

test('normalizeUrl protocol', () => {
    const input = "http://MICHAEL.dev/path/";
    const actual = normalizeUrl(input);
    const expected = "michael.dev/path";
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTML = 
    `<html>
        <body>
            <a href="https://google.com/">
                Google
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://google.com"
    const actual = getURLsFromHTMl(inputHTML, inputBaseURL);
    const expected = ["https://google.com/"];
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTML = 
    `<html>
        <body>
            <a href="/path/">
                Boot
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://michael.dev"
    const actual = getURLsFromHTMl(inputHTML, inputBaseURL);
    
    const expected = ["https://michael.dev/path/"];

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple urls', () => {
    const inputHTML = 
    `<html>
        <body>
            <a href="https://michael.dev/path1/">
                michael path 1
            </a>
            <a href="/path2/">
                michael path 2
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://michael.dev"
    const actual = getURLsFromHTMl(inputHTML, inputBaseURL);
    const expected = ["https://michael.dev/path1/", "https://michael.dev/path2/"];
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML invalid', () => {
    const inputHTML = 
    `<html>
        <body>
            <a href="invalid">
                Invalid
            </a>
        </body>
    </html>
    `;

    const inputBaseURL = "https://michael.dev"
    const actual = getURLsFromHTMl(inputHTML, inputBaseURL);
    
    const expected = [];

    expect(actual).toEqual(expected)
})



