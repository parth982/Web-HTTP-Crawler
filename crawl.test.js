const { normalizeURL ,getURLsFromHTML} = require('./crawl.js');
const { test, expect } = require('@jest/globals');

// Test 1.1 =>
test('normalizeURL strip https protocol',()=>{
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected); 
});

// Test 1.2 =>
test('normalizeURL strip trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected); 
});

// Test 1.3 =>
test('normalizeURL capitals',()=>{
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected); 
});

// Test 1.4 =>
test('normalizeURL strip http protocol',()=>{
    const input = 'http://BLOG.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected); 
});

// Test 2.1 =>
test('getURlsFromHTML absolute URL',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev Blog Here
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
});

// Test 2.2 =>
test('getURlsFromHTML relative URL',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog Here
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

// Test 2.3 =>
test('getURlsFromHTML Both relative & Absolute URLs ',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog Path 1 Here
            </a>
            <a href="/path2/">
                Boot.dev Blog Path 2 Here
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});

// Test 2.4 =>
test('getURlsFromHTML Invalid URLs ',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});