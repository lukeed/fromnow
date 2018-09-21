var MIN = 60 * 1e3;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var YEAR = DAY * 365;
var MONTH = DAY * 30;

var PERIODS = ['year', 'month', 'day', 'hour', 'minute'];

export default function (date, opts) {
	opts = opts || {};

	var del = new Date(date).getTime() - Date.now();
	var abs = Math.abs(del);

	if (abs < MIN) return 'just now';

	var periods = [
		abs / YEAR, // years
		(abs % YEAR) / MONTH, // months
		(abs % MONTH) / DAY, // days
		(abs % DAY) / HOUR, // hours
		(abs % HOUR) / MIN, // mins
	];

	var i=0, val, sfx, keep=[], max=opts.max || YEAR; // large number
	while (i < periods.length && keep.length < max) {
		val = Math.floor(periods[i]);
		sfx = PERIODS[i++]; // increments
		keep.push(val + ' ' + ((val > 1) ? (sfx + 's') : sfx));
	}

	i = keep.length;
	sfx = ', ';

	if (i > 1 && opts.and) {
		if (i == 2) sfx = ' ';
		keep[--i] = 'and ' + keep[i];
	}

	val = keep.join(sfx);

	if (opts.ago && del < 0) {
		val += ' ago';
	}

	return val;
}
