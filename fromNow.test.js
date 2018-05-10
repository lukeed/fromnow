var MockDate = require('mockdate');
var fromNow = require('./fromNow');

beforeAll(function () {
	// Lock Time
	MockDate.set(1434319925275);
});

test('fromNow: should print a date from now', function () {
	expect(fromNow('12/31/2013')).toBe('1 year, 5 months, 21 days, 9 hours, 12 minutes');
	expect(fromNow('2030-05-20')).toBe('14 years, 11 months, 23 days, 1 hour, 47 minutes');
	expect(fromNow('2030-05-20 14:02:47')).toBe('14 years, 11 months, 23 days, 5 hours, 50 minutes');
	expect(fromNow('Wed, 20 Nov 1912 00:00:00 GMT')).toBe('102 years, 7 months, 21 days, 22 hours, 12 minutes');
});

test('fromNow: max should reduce output', function () {
	expect(fromNow('12/31/2013', {max: 3})).toBe('1 year, 5 months, 21 days');
	expect(fromNow('2030-05-20', {max: 2})).toBe('14 years, 11 months');
	expect(fromNow('2030-05-20 14:02:47', {max: 1})).toBe('14 years');
	expect(fromNow('Wed, 20 Nov 1912 00:00:00 GMT', {max: 4})).toBe('102 years, 7 months, 21 days, 22 hours');
});

test('fromNow: should add ago', function () {
	expect(fromNow('12/31/2013', {max: 3, ago: true})).toBe('1 year, 5 months, 21 days ago');
});

test('fromNow: should add and', function () {
	expect(fromNow('12/31/2013', {max: 3, ago: true, and: true})).toBe('1 year, 5 months, and 21 days ago');
	expect(fromNow('12/31/2013', {max: 1, ago: true, and: true})).toBe('1 year ago');
	expect(fromNow('12/31/2030', {max: 1, ago: true, and: true})).toBe('15 years');
});

afterAll(function () {
	// Unlock Time
	MockDate.reset();
});
