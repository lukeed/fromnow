# FromNow [![Build Status](https://travis-ci.org/lukeed/fromNow.svg?branch=master)](https://travis-ci.org/lukeed/fromNow)

> A tiny (392B) utility for human-readable time differences between now and past or future dates.

## Install

```sh
$ npm install fromnow --save
```

## Usage

A valid date string is the only **required** parameter.

```js
const fromNow = require('fromnow');

fromNow('12/31/2010');
//=> "4 years, 10 months, 8 days, 10 hours, 15 minutes"

fromNow('2030-05-20');
//=> "14 years, 6 months, 21 days, 5 hours, 43 minutes"

fromNow('2030-05-20 14:02:47');
//=> "14 years, 6 months, 22 days, 2 hours, 44 minutes"

fromNow('Wed, 20 Nov 1912 00:00:00 GMT');
//=> "103 years, 23 days, 18 hours, 20 minutes"
```

## API

### fromNow(date, options={})

Returns: `String`

A valid date string is the only **required** parameter.


#### date
Type: `String`

You may pass it **any** valid date string.

#### options.max
Type: `Integer`<br>
Default: `null`

If set, will limits the return to display a *maximum* number of non-null segments.

> **Important:** When `opts.zero = true` then empty segments will count towards your `max` limit!

```js
// zero=true
"2 years, 0 months, 12 hours, 57 minutes"

// zero=true; max=2
"2 years, 0 months"

// zero=false
"2 years, 12 hours, 57 minutes"

// zero=false; max=2
"2 years, 12 hours"
```

#### options.suffix

Type: `Boolean`<br>
Default: `false`

Appends `"ago"` or `"from now`" to the output.

```js
// NOW = "Sun Jun 14 2015 15:12:05"

fromNow("Sun Jun 14 2015 14:09:05", { and:true, suffix:true });
//=> "1 hour and 3 minutes ago"

fromNow("Sun Jun 14 2017 14:09:05", { and:true, suffix:true, max:2 });
//=> "2 years and 10 days from now"
```

#### options.and
Type: `Boolean`<br>
Default: `false`

Join the last two segments with `" and "`.

```js
"1 year, 4 hours, 16 minutes"
//=> "1 year, 4 hours, and 16 minutes"

"2 days, 12 hours"
//=> "2 days and 12 hours"
```

#### options.zero
Type: `Boolean`<br>
Default: `false`

Return segments with `0` value.

```js
// NOW = "Sun Jun 14 2015 15:12:05"

fromNow("Sun Jun 14 2015 15:14:05");
//=> "2 minutes"

fromNow("Sun Jun 14 2015 15:14:05", { zero:true });
//=> "0 years, 0 months, 0 days, 0 hours, 2 minutes"
```

#### options.i18n
Type: `Object`<br>
Default: `undefined`

Set the localisation.

```js
var i18nData = {
  past: 'fa',
  future: 'da ora',
  now: 'proprio ora',
  and: 'e',
  year: ['anno', 'anni'],
  month: ['mese', 'mesi'],
  day: ['giorno', 'giorni'],
  hour: ['ora', 'ore'],
  minute: ['minuto', 'minuti'],
};
fromNow("Sun Jun 14 2015 15:14:05", { zero:true , i18n: i18nData});
//=> "0 anni, 0 mesi, 0 giorni, 0 ore, 2 minuti"

```

## Examples

#### Limit the Output

```js
fromNow('12/31/2010', { max:3 });
//=> "4 years, 10 months, 8 days"

fromNow('2030-05-20', { max:2 });
//=> "14 years, 6 months"
```

#### Indicate Past or Future Tense

```js
fromNow('12/31/2010', { max:3, suffix:true });
//=> "4 years, 10 months, 8 days ago"

fromNow('12/31/2030', { max:1, suffix:true });
//=> "12 years from now"
```

#### Include 'and' in the Output

```js
fromNow('12/31/2010', { max:3, suffix:true, and:true });
//=> "4 years, 10 months, and 8 days ago"

fromNow('Wed, 20 Nov 1912 00:00:00 GMT', { max:2, suffix:true, and:true });
//=> "103 years and 23 days ago"

// Will only apply on 2+ segments
fromNow('2030-05-20', { max:1, and:true });
//=> "14 years"
```


## License

MIT © [Luke Edwards](https://lukeed.com)
