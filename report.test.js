const {sortPages,printReport} = require('./report.js');
const { test, expect } = require('@jest/globals');

// Test 1.1 =>
test('sort 2 Pages ',()=>{
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path',1]
    ];
    expect(actual).toEqual(expected); 
});

// Test 1.2 =>
test('sort 5 Pages ',()=>{
    const input = {
        'https://wagslane.dev/path1': 1,
        'https://wagslane.dev/path2': 4,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path3': 12,
        'https://wagslane.dev/path4': 2,
    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev/path3',12],
        ['https://wagslane.dev/path2',4],
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path4',2],
        ['https://wagslane.dev/path1',1]
    ];
    expect(actual).toEqual(expected); 
});