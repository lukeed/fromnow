const test = require('tape');
const fromnowFn = require('../dist/fromnow');

const target = 'Sun Jun 14 2015 15:12:05';
global.Date.now = () => new Date(target).getTime();

const I18N = {
  past: 'fa',
  future: 'da ora',
  now: 'proprio ora',
  and: 'e',
  year: ['anno', 'anni'],
  month: ['mese', 'mesi'],
  day: ['giorno', 'giorni'],
  hour: ['ora', 'ore'],
  minute: ['minuto', 'minuti'],
}

const fn = (date, opts) => {
  return fromnowFn(date, Object.assign(opts || {}, {
    i18n: I18N
  }))
}

test('exports', t => {
  t.is(typeof fn, 'function', 'exports a function');
  t.end();
});

test('fromNow', t => {
  [
    ['12/31/2013', '1 anno, 5 mesi, 20 giorni, 14 ore, 12 minuti'],
    ['2030-05-20', '14 anni, 11 mesi, 23 giorni, 1 ora, 47 minuti'],
    ['2030-05-20 14:02:47', '14 anni, 11 mesi, 23 giorni, 22 ore, 50 minuti'],
    ['Wed, 20 Nov 1912 00:00:00 GMT', '102 anni, 7 mesi, 21 giorni, 22 ore, 12 minuti'],
    ['Sun Jun 14 2015 15:13:00 GMT-0700', 'proprio ora'],
    [target, 'proprio ora'],
  ].forEach(arr => {
    t.is(fn(arr[0]), arr[1], `fn("${arr[0]}") ~> "${arr[1]}"`);
  });
  t.end();
});

test('fromNow :: now', t => {
  var foo = fn(target);
  t.is(foo, 'proprio ora', `fn(NOW) ~> "proprio ora"`);

  var bar = fn(target, { and: true, suffix: true, max: 1 });
  t.is(bar, 'proprio ora', `fn(NOW, { and:true, suffix:true, max:1 }) ~> "proprio ora"`);

  t.end();
});

test('fromNow :: options.max', t => {
  [
    ['12/31/2013', 3, '1 anno, 5 mesi, 20 giorni'],
    ['2030-05-20', 2, '14 anni, 11 mesi'],
    ['2030-05-20 14:02:47', 1, '14 anni'],
    ['Wed, 20 Nov 1912 00:00:00 GMT', 4, '102 anni, 7 mesi, 21 giorni, 22 ore'],
    ['Sun Jun 14 2015 15:13:00 GMT-0700', 3, 'proprio ora'],
    [target, 2, 'proprio ora'],
  ].forEach(arr => {
    t.is(fn(arr[0], { max: arr[1] }), arr[2], `fn("${arr[0]}", { max:${arr[1]} }) ~> "${arr[2]}"`);
  });
  t.end();
});

test('fromNow :: options.suffix', t => {
  t.is(fn('12/31/2013', { max: 3, suffix: true }), '1 anno, 5 mesi, 20 giorni fa', '~> appends "fa" for past');
  t.is(fn('2030-05-20', { max: 2, suffix: true }), '14 anni, 11 mesi da ora', '~> appends "da ora" for future');
  t.end();
});

test('fromNow :: options.and', t => {
  t.is(fn('12/31/2013', { max: 3, suffix: true, and: true }), '1 anno, 5 mesi, e 20 giorni fa', '~> adds "e" for 2+ segments');
  t.is(fn('12/31/2030', { max: 1, suffix: true, and: true }), '15 anni da ora', '~> omits "e" for 1 segment');
  t.is(fn('12/31/2013', { max: 1, suffix: true, and: true }), '1 anno fa', '~> omits "e" for 1 segment');
  t.end();
});

test('fromNow :: options.zero=false', t => {
  // target = 'Sun Jun 14 2015 15:12:05'
  t.is(fn('Sun Jun 14 2015 15:14:05'), '2 minuti', '~> strips all 0-based segments by default');
  t.is(fn('Sun Jun 14 2015 14:09:05', { and: true, suffix: true }), '1 ora e 3 minuti fa', '~> strips 0, applies "fa" & "and" strings');
  t.is(fn('Sun Jun 14 2017 14:09:05', { and: true, suffix: true, max: 2 }), '2 anni e 10 giorni da ora', '~> strips 0, applies "da ora" & "and" strings');
  t.is(fn('Sun Jun 14 2015 14:09:05', { suffix: true, max: 1 }), '1 ora fa', '~> using `max:1` keeps 1st significant segment only');
  t.end();
});

test('fromNow :: options.zero=true', t => {
  // target = 'Sun Jun 14 2015 15:12:05'
  t.is(fn('Sun Jun 14 2015 15:14:05', { zero: true }), '0 anni, 0 mesi, 0 giorni, 0 ore, 2 minuti');
  t.is(fn('Sun Jun 14 2015 14:09:05', { zero: true, and: true, suffix: true }), '0 anni, 0 mesi, 0 giorni, 1 ora, e 3 minuti fa');
  t.is(fn('Sun Jun 14 2017 14:09:05', { zero: true, and: true, suffix: true, max: 2 }), '2 anni e 0 mesi da ora');
  t.is(fn('Sun Jun 14 2015 14:09:05', { zero: true, suffix: true, max: 1 }), '0 anni fa');

  t.end();
});
