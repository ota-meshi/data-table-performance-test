/*global Slick, preformanceTests*/
'use strict';

function init(parent, data) {
	const columns = [
		{field: 'personid', name: 'ID', width: 100},
		{field: 'fname', name: 'First Name', width: 200},
		{field: 'lname', name: 'Last Name', width: 200},
		{field: 'email', name: 'Email', width: 200}
	];

	const options = {
		enableCellNavigation: true,
		enableColumnReorder: false
	};

	return new Slick.Grid(parent, data, columns, options);
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear, 100, 1000000);