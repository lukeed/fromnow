const test = require('tape');
const fn = require('../fromNow');

const DATE = global.Date;
const target = 'Sun Jun 14 2015 15:12:05';

global.Date = class Mock extends DATE {
  constructor(val) {
    super(val || target);
  }
  now() {
    return new DATE(target).getTime();
  }
}

test('exports', t => {
  t.is(typeof fn, 'function', 'exports a function');
  t.end();
});

test('fromNow', t => {
  [
    ['12/31/2013', '1 year, 5 months, 20 days, 14 hours, 12 minutes'],
    ['2030-05-20', '14 years, 11 months, 23 days, 1 hour, 47 minutes'],
    ['2030-05-20 14:02:47', '14 years, 11 months, 23 days, 22 hours, 50 minutes'],
    ['Wed, 20 Nov 1912 00:00:00 GMT', '102 years, 7 months, 21 days, 22 hours, 12 minutes'],
    ['Sun Jun 14 2015 15:13:00 GMT-0700', 'just now'],
    [target, 'just now'],
  ].forEach(arr => {
    t.is(fn(arr[0]), arr[1], `fn("${arr[0]}") ~> "${arr[1]}"`);
  });
  t.end();
});

test('fromNow :: options.max', t => {
  [
    ['12/31/2013', 3, '1 year, 5 months, 20 days'],
    ['2030-05-20', 2, '14 years, 11 months'],
    ['2030-05-20 14:02:47', 1, '14 years'],
    ['Wed, 20 Nov 1912 00:00:00 GMT', 4, '102 years, 7 months, 21 days, 22 hours'],
    ['Sun Jun 14 2015 15:13:00 GMT-0700', 3, 'just now'],
    [target, 2, 'just now'],
  ].forEach(arr => {
    t.is(fn(arr[0], { max:arr[1] }), arr[2], `fn("${arr[0]}", { max:${arr[1]} }) ~> "${arr[2]}"`);
  });
  t.end();
});

test('fromNow :: options.ago', t => {
  t.is( fn('12/31/2013', { max:3, ago:true }), '1 year, 5 months, 20 days ago', '~> appends "ago" for past');
  t.is( fn('2030-05-20', { max:2, ago:true }), '14 years, 11 months', '~> omits "ago" for future');
  t.end();
});

test('fromNow :: options.and', t => {
  t.is( fn('12/31/2013', { max:3, ago:true, and:true }), '1 year, 5 months, and 20 days ago', '~> adds "and" for 2+ segments');
  t.is( fn('12/31/2013', { max:1, ago:true, and:true }), '1 year ago', '~> omits "and" for 1 segment');
  t.is( fn('12/31/2030', { max:1, ago:true, and:true }), '15 years', '~> omits "and" for 1 segment');
  t.end();
});
