function pluralize(val, str) {
	return val + ' ' + ((val > 1) ? (str + 's') : str);
}

var MIN = 60 * 1e3;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var YEAR = DAY * 365;
var MONTH = DAY * 30;

export default function (date, opts) {
	opts = opts || {};
	date = new Date(date).getTime();

	var delta = date - Date.now();
	if (delta < MIN) return 'just now';

	var timeframes = {
		year: Math.floor(ms / YEAR),
		month: Math.floor((ms % YEAR) / MONTH),
		day: Math.floor((ms % MONTH) / DAY),
		hour: Math.floor((ms % DAY) / HOUR),
		minute: Math.floor((ms % HOUR) / MIN)
	};

	var chunks=[], period, val;
	for (period in timeframes) {
		val = timeframes[period];
		chunks.push(pluralize(val, period));
	}

	// Limit the returned array to return 'max' of non-null segments
	var i=0, limit=0, compiled=[], len=chunks.length, max=opts.max || 10;
	for (; i < len; i++) {
		if (chunks[i] && limit < max) {
			limit++;
			compiled.push(chunks[i]);
		}
	}

	var sfx = (opts.ago && delta < 0) ? ' ago' : '';

	if (opts.and && limit > 1) {
		if (limit === 2) return compiled.join(' and ') + sfx;
		compiled[limit - 1] = 'and ' + compiled[limit - 1];
	}

	return compiled.join(', ') + sfx;
}
