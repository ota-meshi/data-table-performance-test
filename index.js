'use strict';
window.onload = function() {
	const as = Array.prototype.slice.call(document.querySelectorAll('a'));
	as.forEach(function(a) {
		if (!a.classList.contains('customlink')) {
			a.onclick = function(e) {
				link(a.href);
				e.stopPropagation();
				e.preventDefault();
			};
		} else {
			a.onclick = function(e) {
				customLink(a.href);
				e.stopPropagation();
				e.preventDefault();
			};
		}
	});

};
function link(href) { // eslint-disable-line no-unused-vars
	window.open(href, '_blank');
	return false;
}
function customLink(href) { // eslint-disable-line no-unused-vars
	href = href + '?times=' +
		document.getElementById('times').value + '&records=' +
		document.getElementById('records').value;
	if (document.getElementById('clear').checked) {
		href += '&clear=true';
	}
	window.open(href, '_blank');
	return false;
}
window.addBenchmark = function(name, tryCount, recordsCount, dispose, resultHtml) {
	const q = function(e, sel) {
		const args = Array.prototype.slice.call(arguments, 1);
		args.forEach(function(sel) {
			e = e.querySelector(sel);
		});
		return e;
	};
	const e = function(tag, id, html) {
		const elem = document.createElement(tag);
		if (id) {
			elem.id = id;
		}
		if (html) {
			elem.innerHTML = html;
		}
		return elem;
	};
	const testKey = 'h' + tryCount + '-' + recordsCount + '-' + (dispose ? 'dispose' : '');
	const nameKey = ('benchmark-' + name).replace(/\s/g, '-');

	const benchmarksTable = q(document, '#benchmarks');
	benchmarksTable.classList.remove('hidden');
	const headerTr = q(benchmarksTable, 'thead', 'tr');
	const tbody = q(benchmarksTable, 'tbody');
	let gridTr = q(tbody, '#' + nameKey);
	if (!gridTr) {
		gridTr = e('tr', nameKey);
		gridTr.appendChild(e('td', null, name));
		tbody.appendChild(gridTr);
	}

	
	let testTargetTh = q(headerTr, '#' + testKey);
	if (!testTargetTh) {
		testTargetTh = e('th', testKey, '<th>' + tryCount + ' times init' +
					(dispose ? '<br>dispose after initialization' : '') +
					'<br>' + (recordsCount - 0).toLocaleString() + ' records</th>');
		headerTr.appendChild(testTargetTh);
	}
	const index = Array.prototype.indexOf.call(headerTr.children, testTargetTh);
	Array.prototype.forEach.call(tbody.children, function(tr) {
		while (tr.children.length < (index + 1)) {
			tr.appendChild(e('td'));
		}
	});
	const resultTd = gridTr.children[index];
	if (resultTd.textContent) {
		resultTd.appendChild(e('br'));
	}
	resultTd.appendChild(e('span', null, resultHtml));

};