/*global  preformanceTests*/
'use strict';

let seq = 1;

function init(parent, data) {
	return $(parent).w2grid({
		name: (seq++) + 'w2grid',
		header: 'List of Names',
		recid: 'personid',
		columns: [
			{field: 'personid', caption: 'ID', width: 100},
			{field: 'fname', caption: 'First Name', width: 200},
			{field: 'lname', caption: 'Last Name', width: 200},
			{field: 'email', caption: 'Email', width: 200}
		],
		records: data,
	});

}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear);