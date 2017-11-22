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
		// stretchH: 'all',
		// width: 806,
		// autoWrapRow: true,
		height: 500,
		maxRows: data.length,
		// rowHeaders: true,
		colHeaders: [
			'ID',
			'First Name',
			'Last Name',
			'Email',
		],
		manualRowResize: true,
		manualColumnResize: true,
		// manualRowMove: true,
		// manualColumnMove: true,
		// contextMenu: true,
		// filters: true,
		// dropdownMenu: true
	};
	return new Handsontable(parent, hotSettings);
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear);