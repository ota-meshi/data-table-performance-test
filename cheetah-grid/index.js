/*global cheetahGrid, preformanceTests*/
'use strict';
function init(parent, data) {
	return new cheetahGrid.ListGrid({
		parentElement: parent,
		header: [
			{field: 'personid', caption: 'ID', width: 100},
			{field: 'fname', caption: 'First Name', width: 200},
			{field: 'lname', caption: 'Last Name', width: 200},
			{field: 'email', caption: 'Email', width: 200}
		],
		frozenColCount: 1,
		records: data,
	});
}

function clear(grid) {
	grid.dispose();
}

preformanceTests(init, clear, 100, 1000000);

