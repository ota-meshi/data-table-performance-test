/*global agGrid,preformanceTests*/
'use strict';

function init(parent, data) {
	const columnDefs =	[
		{field: 'personid', headerName: 'ID', width: 100},
		{field: 'fname', headerName: 'First Name', width: 200},
		{field: 'lname', headerName: 'Last Name', width: 200},
		{field: 'email', headerName: 'Email', width: 200}
	];
	const gridOptions = {
		columnDefs: columnDefs,
		rowData: data
	};
	return new agGrid.Grid(parent, gridOptions);
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear, {
	transformParent: function(el) {
		el.classList.add('ag-theme-fresh');
		el.classList.add('ag-basic');
	}
});