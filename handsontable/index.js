/*global  Handsontable,preformanceTests*/
'use strict';

function init(parent, data) {
	const hotSettings = {
		data: data,
		columns: [
			{data: 'personid', type: 'text', width: 100},
			{data: 'fname', type: 'text', width: 200},
			{data: 'lname', type: 'text', width: 200},
			{data: 'email', type: 'text', width: 200}
		],
		height: 500,
		maxRows: data.length,
		colHeaders: [
			'ID',
			'First Name',
			'Last Name',
			'Email',
		],
		manualRowResize: true,
		manualColumnResize: true,
	};
	return new Handsontable(parent, hotSettings);
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear);