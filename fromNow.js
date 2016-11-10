/**
 * FromNow - Get readable time differences from now vs past or future dates.
 * @author  Luke Edwards (www.lukeed.com)
 * @version 2.1.1
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.fromNow = factory();
	}
}(this, function () {
	'use strict';

	function pluralize(val, str) {
		return val + ' ' + ((val > 1) ? (str + 's') : str);
	}

	var msMinute = 60 * 1000,
		msHour = msMinute * 60,
		msDay = msHour * 24,
		msMonth = msDay * 30,
		msYear = msDay * 365;

	return function (date, opts) {
		opts = opts || {};

		var milli = (new Date(date) - new Date()),
			ms = Math.abs(milli);

		if (ms < msMinute) return 'just now';

		var timeframes = {
			year: Math.floor(ms / msYear),
			month: Math.floor((ms % msYear) / msMonth),
			day: Math.floor((ms % msMonth) / msDay),
			hour: Math.floor((ms % msDay) / msHour),
			minute: Math.floor((ms % msHour) / msMinute)
		};

		var chunks = [], period, val;
		for (period in timeframes) {
			val = timeframes[period];
			chunks.push(pluralize(val, period));
		}

		// Limit the returned array to return 'max' of non-null segments
		var compiled = [], i, len = chunks.length,
			limit = 0, max = opts.max || 10;
		for (i = 0; i < len; i++) {
			if (chunks[i] && limit < max) {
				limit++;
				compiled.push(chunks[i]);
			}
		}

		var sfx = (opts.ago && milli < 0) ? ' ago' : '';

		if (opts.and && limit > 1) {
			if (limit === 2) return compiled.join(' and ') + sfx;
			compiled[limit - 1] = 'and ' + compiled[limit - 1];
		}

		return compiled.join(', ') + sfx;
	};
}));
