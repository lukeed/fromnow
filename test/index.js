const test = require('tape');
const fn = require('../dist/fromnow');

const target = 'Sun Jun 14 2015 15:12:05';
global.Date.now = () => new Date(target).getTime();

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

test('fromNow :: now', t => {
  var foo = fn(target);
  t.is(foo, 'just now', `fn(NOW) ~> "just now"`);

  var bar = fn(target, { and:true, suffix:true, max:1 });
  t.is(bar, 'just now', `fn(NOW, { and:true, suffix:true, max:1 }) ~> "just now"`);

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

test('fromNow :: options.suffix', t => {
  t.is( fn('12/31/2013', { max:3, suffix:true }), '1 year, 5 months, 20 days ago', '~> appends "ago" for past');
  t.is( fn('2030-05-20', { max:2, suffix:true }), '14 years, 11 months from now', '~> appends "from now" for future');
  t.end();
});

test('fromNow :: options.and', t => {
  t.is( fn('12/31/2013', { max:3, suffix:true, and:true }), '1 year, 5 months, and 20 days ago', '~> adds "and" for 2+ segments');
  t.is( fn('12/31/2030', { max:1, suffix:true, and:true }), '15 years from now', '~> omits "and" for 1 segment');
  t.is( fn('12/31/2013', { max:1, suffix:true, and:true }), '1 year ago', '~> omits "and" for 1 segment');
  t.end();
});

test('fromNow :: options.zero=false', t => {
  // target = 'Sun Jun 14 2015 15:12:05'
  t.is(fn('Sun Jun 14 2015 15:14:05'), '2 minutes', '~> strips all 0-based segments by default');
  t.is(fn('Sun Jun 14 2015 14:09:05', { and:true, suffix:true }), '1 hour and 3 minutes ago', '~> strips 0, applies "ago" & "and" strings');
  t.is(fn('Sun Jun 14 2017 14:09:05', { and:true, suffix:true, max:2 }), '2 years and 10 days from now', '~> strips 0, applies "from now" & "and" strings');
  t.is(fn('Sun Jun 14 2015 14:09:05', { suffix:true, max:1 }), '1 hour ago', '~> using `max:1` keeps 1st significant segment only');
  t.end();
});

test('fromNow :: options.zero=true', t => {
  // target = 'Sun Jun 14 2015 15:12:05'
  t.is(fn('Sun Jun 14 2015 15:14:05', { zero:true }), '0 years, 0 months, 0 days, 0 hours, 2 minutes');
  t.is(fn('Sun Jun 14 2015 14:09:05', { zero:true, and:true, suffix:true }), '0 years, 0 months, 0 days, 1 hour, and 3 minutes ago');
  t.is(fn('Sun Jun 14 2017 14:09:05', { zero:true, and:true, suffix:true, max:2 }), '2 years and 0 months from now');
  t.is(fn('Sun Jun 14 2015 14:09:05', { zero:true, suffix:true, max:1 }), '0 years ago');

  t.end();
});
