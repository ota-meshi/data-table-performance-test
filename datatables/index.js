/*global preformanceTests*/
'use strict';

function init(parent, data) {
	return $(parent).DataTable({
		data: data,
		columns: [
			{title: 'ID'},
			{title: 'First Name'},
			{title: 'Last Name'},
			{title: 'Email'},
		]
	});
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear, {
	transformData: function(data) {
		return data.map(function(r) {
			return [r.personid, r.fname, r.lname, r.email];
		});
	},
	parentTag: 'table',
});