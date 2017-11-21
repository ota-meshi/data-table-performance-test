/*global fin, preformanceTests*/
'use strict';

function init(parent, data) {
	return new fin.Hypergrid(parent, {
		schema: [
			{name: 'personid', header: 'ID', width: 100},
			{name: 'fname', header: 'First Name', width: 200},
			{name: 'lname', header: 'Last Name', width: 200},
			{name: 'email', header: 'Email', width: 200}
		],
		data: data,
	});
}

function clear(grid) {
	grid.terminate();
}

preformanceTests(init, clear, 100, 1000000);