# FromNow
> An extremely lightweight javascript utility for calculating readable time differences from now vs past or future dates.

2 kb uncompressed. <1 kb minified (before gzip)

```javascript
fromNow(date [, options]);
```

fromNow.js only has 1 **required** parameter, a date string. You may pass it **any valid datestring**.

## Installation

Install with [Bower](http://bower.io) `bower install fromnow`

Install with [NPM](http://nodejs.org/) `npm install fromnow`

Install with Git `git clone https://github.com/lukeed/fromnow.git`

## Options

**maxChunks**<br>
Type: Integer. Optional. Default: all<br>
Limits the returned string to contain # of not-null segments. Gathers largest to smallest.<br>
Eg: `1 month, 0 hours, 57 minutes` limited to 2 chunks returns `1 month, 57 minutes`

**useAgo**<br>
Type: Boolean. Optional. Default: false<br>
If given date occured before current datetime, append `'ago'` to returned string.<br>
Eg: `3 months, 16 minutes` vs `3 months, 16 minutes ago`

**useAnd**<br>
Type: Boolean. Optional. Default: false<br>
If true, will add `' and '` between penultimate and ultimate chunks.<br>
Eg: `1 year, 4 hours, 16 minutes` vs `1 year, 4 hours, and 16 minutes`<br>
Eg: `2 days, 12 hours` vs `2 days and 12 hours`<br>

## Usage
### Default
fromNow.js assumes that you only want the time difference (string), so it will yield all values. 

```javascript
fromNow('12/31/2010'); // "4 years, 10 months, 8 days, 10 hours, 15 minutes"
fromNow('2030-05-20'); // "14 years, 6 months, 21 days, 5 hours, 43 minutes"
fromNow('2030-05-20 14:02:47'); // "14 years, 6 months, 22 days, 2 hours, 44 minutes"
fromNow('Wed, 20 Nov 1912 00:00:00 GMT'); // "103 years, 23 days, 18 hours, 20 minutes"
```

### Limit the Output
```javascript
fromNow('12/31/2010', {
  maxChunks: 3
}); // "4 years, 10 months, 8 days"

fromNow('2030-05-20', {
  maxChunks: 2
}); // "14 years, 6 months"
```

### Indicate Past Tense
```javascript
fromNow('12/31/2010', {
	maxChunks: 3,
	useAgo: true
}); // "4 years, 10 months, 8 days ago"
```

### Include 'and' in the Output
```javascript
fromNow('12/31/2010', {
	maxChunks: 3,
	useAgo: true,
	useAnd: true
}); // "4 years, 10 months, and 8 days ago"

fromNow('Wed, 20 Nov 1912 00:00:00 GMT', {
  maxChunks: 2,
  useAgo: true,
  useAnd: true
}); // "103 years and 23 days ago"

// Does not need 'ago' or 'and'
fromNow('2030-05-20', {
  maxChunks: 1,
  useAgo: true,
  useAnd: true
}); // "14 years"
```


## MIT license
fromNow.js is released under the [MIT license](http://lukeed.mit-license.org).
