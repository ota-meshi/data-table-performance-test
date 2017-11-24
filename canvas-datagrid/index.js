/*global canvasDatagrid, preformanceTests*/
'use strict';
function init(parent, data) {
	const grid = canvasDatagrid();
	parent.appendChild(grid);
	grid.data = data;
	return grid;
}

function clear(grid) {
	grid.dispose();
}

preformanceTests(init, clear, {
	transformData: function(data) {
		return data.map(function(r) {
			return {col1: r.personid, col2: r.fname, col3: r.lname, col4: r.email};
		});
	},
});

