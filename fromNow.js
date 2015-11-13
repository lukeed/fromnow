/**
 * fromNow.js v1.0.0
 * http://www.lukeed.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, LUKEED
 * http://www.lukeed.com
 */
// var defaults = {
//   maxChunks: 10,
//   useSuffix: false,
//   useAnd: false
// }

var msMinute = 60 * 1000,
  msHour = msMinute * 60,
  msDay = msHour * 24,
  msMonth = msDay * 30,
  msYear = msDay * 365;

function pluralize(val, str) {
  var label = (val > 1) ? (str + 's') : str
  return val ? (val + ' ' + label) : null
}

function fromNow(date, maxChunks, useAgo, useAnd) {
  console.time( 'start' );
  // set default values if left undefined
  maxChunks = maxChunks || 10;
  useAgo = useAgo || false;
  useAnd = useAnd || false;

  var milli = (new Date(date) - new Date()),
      ms = Math.abs(milli);

  var isPast = (useAgo && milli < 0) ? ' ago' : '';

  var timeframes = {
    year: Math.floor(ms / msYear),
    month: Math.floor((ms % msYear) / msMonth),
    day: Math.floor((ms % msMonth) / msDay),
    hour: Math.floor((ms % msDay) / msHour),
    minute: Math.floor((ms % msHour) / msMinute)
  };

  var chunks = [], period;
  for (period in timeframes) {
    var val = timeframes[period];
    chunks.push(pluralize(val, period));
  }

  // Limit the returned array to return 'maxChunks' of non-null segments
  var compiled = [], i, len = chunks.length;
  for (i = 0; i < len; i++) {
    if (chunks[i] && i < maxChunks) compiled.push(chunks[i]);
  }

  len = compiled.length;
  console.timeEnd( 'start' );
  if (useAnd && len > 1) {
    if (len == 2) return compiled.join(' and ') + isPast;
    compiled[len - 1] = 'and ' + compiled[len - 1];
  }

  return compiled.join(', ') + isPast;
}
