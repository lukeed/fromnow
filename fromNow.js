/**
 * FromNow
 * > Get readable time differences from now vs past or future dates.
 *
 * @author  Luke Edwards
 * @url     www.lukeed.com
 * @version 2.0
 */

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(root, root.document); // Common JS
  } else if ( typeof define === 'function' && define.amd ) {
    define(function() { return factory(root, root.document); }); // AMD
  } else {
    root.fromNow = factory(root, root.document); // window global
  }
}(typeof window !== 'undefined' ? window : this, function (window, document) {
  'use strict';

  function pluralize(val, str) {
    var label = (val > 1) ? (str + 's') : str
    return val ? (val + ' ' + label) : null
  }

  var msMinute = 60 * 1000,
    msHour = msMinute * 60,
    msDay = msHour * 24,
    msMonth = msDay * 30,
    msYear = msDay * 365;

  var defaults = {
    maxChunks: 10,
    useAgo: false,
    useAnd: false
  }

  return function (date, opts) {
    // set default values if left undefined
    opts = opts || {};
    var maxChunks = opts.maxChunks || 10;
    var useAgo = opts.useAgo || false;
    var useAnd = opts.useAnd || false;

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
    var compiled = [], i, limit = 0, len = chunks.length;
    for (i = 0; i < len; i++) {
      if (chunks[i] && limit < maxChunks) {
        limit++;
        compiled.push(chunks[i]);
      }
    }

    len = compiled.length;

    if (useAnd && len > 1) {
      if (len == 2) return compiled.join(' and ') + isPast;
      compiled[len - 1] = 'and ' + compiled[len - 1];
    }

    return compiled.join(', ') + isPast;
  }
}));
