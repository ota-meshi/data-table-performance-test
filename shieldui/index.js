/*global shield, preformanceTests*/
'use strict';

function init(parent, data) {

	const gridSource = new shield.DataSource({
		remote: {
			operations: ['skip', 'take'],
			read(params, success, error) {
				const skip = gridSource.skip || 0,
					take = gridSource.take || 20;
				const records = data.slice(skip, skip + take);
				success({
					data: records,
					total: data.length
				});
			}
		},
		schema: {
			data: 'data',
			total: 'total'
		}
	});
	$(parent).shieldGrid({
		dataSource: gridSource,
		height: 400,
		scrolling: {
			virtual: true
		},
		columns: (function() {
			return [
				{field: 'personid', caption: 'ID', width: 100},
				{field: 'fname', caption: 'First Name', width: 200},
				{field: 'lname', caption: 'Last Name', width: 200},
				{field: 'email', caption: 'Email', width: 200}
			];
		})()
	});
	return $(parent).swidget();
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear);