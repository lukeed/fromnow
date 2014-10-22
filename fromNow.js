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
function fromNow(date, maxChunks, useAgo, useAnd) {
  // set default values if left undefined
  maxChunks = typeof maxChunks !== 'undefined' ? maxChunks : 10;
  useAgo = typeof useAgo !== 'undefined' ? useAgo : false;
  useAnd = typeof useAnd !== 'undefined' ? useAnd : false;

  var milli = (new Date(date) - new Date()),
      ms = Math.abs(milli);

  var isPast = (useAgo && milli < 0) ? ' ago' : '';

  var msMinute = 60 * 1000,
      msHour = msMinute * 60,
      msDay = msHour * 24,
      msMonth = msDay * 30,
      msYear = msDay * 365;

  var years = Math.floor(ms / msYear),
      months = Math.floor((ms % msYear) / msMonth),
      days = Math.floor((ms % msMonth) / msDay),
      hours = Math.floor((ms % msDay) / msHour),
      minutes = Math.floor((ms % msHour) / msMinute);

  var yearsLabel = (years > 1) ? ' years' : ' year',
      monthsLabel = (months > 1) ? ' months' : ' month',
      daysLabel = (days > 1) ? ' days' : ' day',
      hoursLabel = (hours > 1) ? ' hours' : ' hour',
      minutesLabel = (minutes > 1) ? ' minutes' : ' minute';

  var bundle = [
      years ? years + yearsLabel : null,
      months ? months + monthsLabel : null,
      days ? days + daysLabel : null,
      hours ? hours + hoursLabel : null,
      minutes ? minutes + minutesLabel : null
  ];

  var compiled = [], limit = 0;
  bundle.forEach(function(segment, index) {
    // Limit the returned array to return 'maxChunks' of not-null segments
    if (segment != null && (limit < maxChunks)) {
      limit++;
      compiled.push(segment);
    }
  });

  var length = compiled.length;
  compiled = compiled.join(', ') + isPast;

  if (useAnd && length > 1) {
    var split = compiled.split(', ');
    if (length == 2) {
      return split.join(' and ');
    } else {
      split[length - 1] = 'and ' + split[length - 1];
      return split.join(', ');
    }
  } else {
    return compiled;
  }
}