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
	const nameKey = ('benchmark-' + name).replace(/\s/, '-');

	const table = q(document, '#benchmarks');
	table.classList.remove('hidden');
	const htr = q(table, 'thead', 'tr');
	const tbody = q(table, 'tbody');
	let tr = q(tbody, '#' + nameKey);
	if (!tr) {
		tr = e('tr', nameKey);
		tr.appendChild(e('td', null, name));
		tbody.appendChild(tr);
	}

	
	let htarget = q(htr, '#' + testKey);
	if (!htarget) {
		htarget = e('th', testKey, '<th>' + tryCount + ' times init' +
					(dispose ? '<br>dispose after initialization' : '') +
					'<br>' + (recordsCount - 0).toLocaleString() + ' records</th>');
		htr.appendChild(htarget);
	}
	const index = Array.prototype.indexOf.call(htr.children, htarget);
	while (tr.children.length < (index + 1)) {
		tr.appendChild(e('td'));
	}
	const td = tr.children[index];
	if (td.textContent) {
		td.appendChild(e('br'));
	}
	td.appendChild(e('span', null, resultHtml));

};