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
			if (!val && !opts.zero) continue;
			keep.push(val + ' ' + ((val > 1) ? (k + 's') : k));
		}
	}

	k = keep.length; // reuse
	max = ', '; // reuse

	if (k > 1 && opts.and) {
		if (k == 2) max = ' ';
		keep[--k] = 'and ' + keep[k];
	}

	val = keep.join(max); // reuse

	if (opts.suffix) {
		val += (del < 0 ? ' ago' : ' from now');
	}

	return val;
}
