var MIN = 60 * 1e3;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var YEAR = DAY * 365;
var MONTH = DAY * 30;

export default function (date, opts) {
	opts = opts || {};

	var del = new Date(date).getTime() - Date.now();
	var abs = Math.abs(del);

	if (abs < MIN) return 'just now';

	var periods = {
		year: abs / YEAR,
		month: (abs % YEAR) / MONTH,
		day: (abs % MONTH) / DAY,
		hour: (abs % DAY) / HOUR,
		minute: (abs % HOUR) / MIN,
	};

	var k, val, keep=[], max=opts.max || YEAR; // large number

	for (k in periods) {
		if (keep.length < max) {
			val = Math.floor(periods[k]);
			keep.push(val + ' ' + ((val > 1) ? (k + 's') : k));
		}
	}

	abs = keep.length; // reuse
	k = ', '; // reuse

	if (abs > 1 && opts.and) {
		if (abs == 2) k = ' ';
		keep[--abs] = 'and ' + keep[abs];
	}

	val = keep.join(k); // reuse

	if (opts.ago && del < 0) {
		val += ' ago';
	}

	return val;
}
