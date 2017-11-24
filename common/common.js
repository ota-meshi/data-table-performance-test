/*global google, hljs*/
/*eslint no-unused-vars:0*/

'use strict';

function getUrlVars() {
	const vars = {};
	const url = window.location.search;
	if (!url) {
		return vars;
	}

	const hash = url.slice(1).split('&');
	for (let i = 0; i < hash.length; i++) {
		const array = hash[i].split('=');
		vars[array[0]] = array[1];
	}

	return vars;
}

const params = getUrlVars();
const tryTimes = (params.times || 100) - 0;
const recordCount = (params.recordCount || 1000000) - 0;


const needClear = !!params.clear;

const generatePerson = function() {
	const fnames = ['Sophia', 'Emma', 'Olivia', 'Isabella', 'Ava', 'Mia', 'Emily', 'Abigail', 'Madison', 'Elizabeth', 'Charlotte', 'Avery', 'Sofia', 'Chloe', 'Ella', 'Harper', 'Amelia', 'Aubrey', 'Addison', 'Evelyn', 'Natalie', 'Grace', 'Hannah', 'Zoey', 'Victoria', 'Lillian', 'Lily', 'Brooklyn', 'Samantha', 'Layla', 'Zoe', 'Audrey', 'Leah', 'Allison', 'Anna', 'Aaliyah', 'Savannah', 'Gabriella', 'Camila', 'Aria', 'Noah', 'Liam', 'Jacob', 'Mason', 'William', 'Ethan', 'Michael', 'Alexander', 'Jayden', 'Daniel', 'Elijah', 'Aiden', 'James', 'Benjamin', 'Matthew', 'Jackson', 'Logan', 'David', 'Anthony', 'Joseph', 'Joshua', 'Andrew', 'Lucas', 'Gabriel', 'Samuel', 'Christopher', 'John', 'Dylan', 'Isaac', 'Ryan', 'Nathan', 'Carter', 'Caleb', 'Luke', 'Christian', 'Hunter', 'Henry', 'Owen', 'Landon', 'Jack'];
	const lnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy', 'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Gomez', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher'];
	const msOfYear = 365 * 24 * 60 * 60 * 1000;
	return function(index) {
		const fname = fnames[Math.floor(Math.random() * fnames.length)];
		const lname = lnames[Math.floor(Math.random() * lnames.length)];
		let birthday = new Date(Date.now() - 20 * msOfYear - Math.floor(Math.random() * 15 * msOfYear));
		birthday = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate(), 0, 0, 0, 0);
		return {
			personid: index + 1,
			fname: fname,
			lname: lname,
			email: (fname.replace('-', '_') + '_' + lname.replace('-', '_') + '@example.com').toLowerCase(),
			birthday: birthday
		};
	};
}();

function generatePersons(num) {
	const initId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	const records = [];
	for (let i = 0; i < num; i++) {
		records.push(generatePerson(initId + i - 1));
	}
	return records;
}

function createParent(tagname) {
	const div = document.createElement(tagname);
	div.classList.add('parent');
	document.body.appendChild(div);
	return div;
}
const resultElement = document.createElement('div');
resultElement.classList.add('result');
document.body.insertBefore(resultElement, document.body.childNodes[0]);

function refResult(results) {
	const sum = results.reduce(function(prev, current) {
		return prev + current;
	});
	const max = results.reduce(function(prev, current) {
		return Math.max(prev, current);
	});
	const min = results.reduce(function(prev, current) {
		return Math.min(prev, current);
	});
	const avg = sum / results.length;
	resultElement.innerHTML = '<span>average: <b>' + avg + 'ms</b> / max: ' + max + 'ms min: ' + min + 'ms</span><br>' +
		'times: <b>' + results.length + '</b><br>record count: <b>' + (recordCount - 0).toLocaleString() + '</b>';
}
function refResultEnd(results, initFn) {
	appendCode(initFn + '');
	if (results.length > 1) {
		appendChart(results);
	}
	if (window.opener && window.opener.addBenchmark) {
		let html;
		if (results.length > 1) {
			const sum = results.reduce(function(prev, current) {
				return prev + current;
			});
			const max = results.reduce(function(prev, current) {
				return Math.max(prev, current);
			});
			const min = results.reduce(function(prev, current) {
				return Math.min(prev, current);
			});
			const avg = sum / results.length;
			html = '<span>average: <b>' + avg + 'ms</b> / max: ' + max + 'ms min: ' + min + 'ms</span>';
		} else {
			html = '<span><b>' + results[0] + 'ms</b></span>';
		}
		const name = document.querySelector('h1').textContent;
		window.opener.addBenchmark(name, tryTimes, recordCount, needClear, html);
	}
}

function preformanceTests(initFn, clearFn, option) {
	option = option || {};
	option.transformData = option.transformData || function(data) { return data; };
	option.transformParent = option.transformParent || function() {};
	option.parentTag = option.parentTag || 'div';
	const data = option.transformData(generatePersons(recordCount));
	
	const results = [];

	function test(parent) {
		const startTime = new Date();
		const grid = initFn(parent, data);
		const endTime = new Date();
		results.push(endTime - startTime);
		refResult(results);
		return grid;
	}
	let count = 0;
	function time() {
		const parent = createParent(option.parentTag);
		option.transformParent(parent);
		setTimeout(function() {
			const grid = test(parent);
			count++;
			if (count < tryTimes) {
				setTimeout(function() {
					if (needClear) {
						clearFn(grid);
						parent.parentElement.removeChild(parent);
					}
					time();
				}, 10);
			} else {
				refResultEnd(results, initFn);
			}
		}, 100);

	}
	time();
}

function appendCode(code) {
	const wrap = document.createElement('div');
	resultElement.appendChild(wrap);
	const btn = document.createElement('button');
	btn.textContent = 'view code';
	wrap.appendChild(btn);

	const pre = document.createElement('pre');
	pre.style.display = 'none';
	const codeEl = document.createElement('code');
	codeEl.textContent = code;
	codeEl.classList.add('js');
	pre.appendChild(codeEl);
	wrap.appendChild(pre);

	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css';
	document.head.appendChild(link);
	const script = document.createElement('script');
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js';
	script.onload = function() {
		hljs.initHighlighting();
	};
	document.head.appendChild(script);

	btn.onclick = function() {
		if (pre.style.display) {
			pre.style.display = '';
		} else {
			pre.style.display = 'none';
		}
	};
}

function appendChart(results) {
	google.charts.load('current', {'packages': ['corechart']});
	google.charts.setOnLoadCallback(function() {
		const summary = [['ms', 'count']];
		const max = Math.floor(results.reduce(function(prev, current) {
			return Math.max(prev, current);
		}));
		const min = Math.floor(results.reduce(function(prev, current) {
			return Math.min(prev, current);
		}));
		const point = 2;
		let start = min;
		let end = start + point;
		while (start <= max) {
			let count = 0;
			results.forEach(function(val) {
				if (start <= val && val < end) {
					count++;
				}
			});
			summary.push([start + '-' + end + 'ms', count]);
			start = end;
			end = start + point;
		}
		function getGetOrdinal(n) {
			const s = ['th', 'st', 'nd', 'rd'];
			const v = n % 100;
			return n + (s[(v - 20) % 10] || s[v] || s[0]);
		}
		const timesResults = [['time', 'ms']];
		results.forEach(function(val, i) {
			timesResults.push([getGetOrdinal(i + 1), val]);
		});

		const options = {
			title: 'Performance',
			curveType: 'function',
			legend: {position: 'bottom'}
		};

		const cce = document.createElement('div');
		cce.style.width = '100%';
		cce.style.height = '500px';
		resultElement.appendChild(cce);
		const lce = document.createElement('div');
		lce.style.width = '100%';
		lce.style.height = '500px';
		resultElement.appendChild(lce);

		const cchart = new google.visualization.ColumnChart(cce);

		cchart.draw(google.visualization.arrayToDataTable(summary), options);

		const lchart = new google.visualization.LineChart(lce);

		lchart.draw(google.visualization.arrayToDataTable(timesResults), options);
		
	});
}