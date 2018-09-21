# FromNow [![Build Status](https://travis-ci.org/lukeed/fromNow.svg?branch=master)](https://travis-ci.org/lukeed/fromNow)

> A tiny (363B) utility for calculating human-readable time differences between now and past/future dates.

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

```js
// default
"1 month, 0 hours, 57 minutes"

// max = 2
"1 month, 57 minutes"
```

#### options.ago

Type: `Boolean`<br>
Default: `false`

If handling a date from the past, append `"ago"` to the output.

```js
"3 months, 16 minutes"
//=> "3 months, 16 minutes ago"
```

#### options.and
Type: `Boolean`<br>
Default: `false`

If true, will join the last two segments with `" and "`.

```js
"1 year, 4 hours, 16 minutes"
//=> "1 year, 4 hours, and 16 minutes"

"2 days, 12 hours"
//=> "2 days and 12 hours"
```

## Examples

#### Limit the Output
```js
fromNow('12/31/2010', {
  max: 3
}); //=> "4 years, 10 months, 8 days"

fromNow('2030-05-20', {
  max: 2
}); //=> "14 years, 6 months"
```

#### Indicate Past Tense
```js
fromNow('12/31/2010', {
  max: 3,
  ago: true
}); //=> "4 years, 10 months, 8 days ago"
```

#### Include 'and' in the Output
```js
fromNow('12/31/2010', {
  max: 3,
  ago: true,
  and: true
}); //=> "4 years, 10 months, and 8 days ago"

fromNow('Wed, 20 Nov 1912 00:00:00 GMT', {
  max: 2,
  ago: true,
  and: true
}); //=> "103 years and 23 days ago"

// Does not need 'ago' or 'and'
fromNow('2030-05-20', {
  max: 1,
  ago: true,
  and: true
}); //=> "14 years"
```


## License

MIT © [Luke Edwards](https://lukeed.com)
