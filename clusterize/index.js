/*global Clusterize, preformanceTests*/
'use strict';
function init(parent, data) {
	parent.innerHTML = '' +
		'<table>' +
			'<thead>' +
				'<tr>' +
					'<th style="width:100px;">ID</th>' +
					'<th style="width:200px;">First Name</th>' +
					'<th style="width:200px;">Last Name</th>' +
					'<th style="width:200px;">Email</th>' +
				'</tr>' +
			'</thead>' +
		'</table>' +
		'<div class="clusterize-scroll" style="max-height: calc(100% - 30px);height: calc(100% - 30px);">' +
			'<table>' +
				'<tbody class="clusterize-content">' +
					'<tr class="clusterize-no-data">' +
						'<td>Loading data…</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>' +
		'</div>';
	const scrollElem = parent.children[1];
	const contentElem = scrollElem.children[0].children[0];

	const clusterize = new Clusterize({
		rows: data.map(function(r) {
			return '<tr>' +
				'<td style="width:100px;">' + r.personid + '</td>' +
				'<td style="width:200px;">' + r.fname + '</td>' +
				'<td style="width:200px;">' + r.lname + '</td>' +
				'<td style="width:200px;">' + r.email + '</td>' +
			'</tr>';
		}),
		scrollElem: scrollElem,
		contentElem: contentElem,
	});
	return clusterize;
}

function clear(grid) {
	grid.destroy();
}

preformanceTests(init, clear, {});

