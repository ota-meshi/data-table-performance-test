'use strict';
function findParentTable(e) {
	if (e.tagName.toLowerCase() === 'table') {
		return e;
	}
	return findParentTable(e.parentElement);
}
window.onload = function() {
	const as = Array.prototype.slice.call(document.querySelectorAll('a'));
	const customlinks = [];
	as.forEach(function(a) {
		if (a.classList.contains('customlink')) {
			customlinks.push(a);
		}
		a.onclick = function(e) {
			e.stopPropagation();
			e.preventDefault();
			window.open(a.href, '_blank');
		};
	});
	function valClass(input) {
		if (input.value - 0 >= 1000000) {
			input.classList.add('million');
		} else {
			input.classList.remove('million');
		}
	}
	const recordsInputs = Array.prototype.slice.call(document.querySelectorAll('.records'));
	recordsInputs.forEach(function(recordsInput) {
		valClass(recordsInput);
		recordsInput.addEventListener('change', function() {
			valClass(recordsInput);
		});
	});
	const inputs = Array.prototype.slice.call(document.querySelectorAll('.records,.times,.clear'));
	inputs.forEach(function(input) {
		customlinks.forEach(function(a) {
			bindCustomLinkHref(a);
		});
		input.addEventListener('change', function() {
			customlinks.forEach(function(a) {
				bindCustomLinkHref(a);
			});
		});
	});

};
function bindCustomLinkHref(a) {
	const table = findParentTable(a);
	let href = a.href.replace(a.search, '').replace(a.hash, '');
	href = href + '?times=' +
		table.querySelector('.times').value + '&recordCount=' +
		table.querySelector('.records').value;
	if (table.querySelector('.clear').checked) {
		href += '&clear=true';
	}
	a.href = href;
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
	const nameKey = ('benchmark-' + name).replace(/[\s\(\)\.:]+/g, '-');

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
		testTargetTh = e('th', testKey, '<th>' +
			'Number of records: '(recordsCount - 0).toLocaleString() +
			'Number of trials: ' + tryCount +
			'Dispose instance after init: ' + (!!dispose) +
			'</th>');
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