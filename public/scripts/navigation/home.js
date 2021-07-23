function convertToMap(arr) {
	return new Map(arr.map((el) => {
		return Object.values(el);
	}));
}

function parseDurationString(duration) {
	[ from, to ] = duration.split(':').map((str) => {
		return (new Date(str)).toDateString();
	});

	duration = `${from.slice(8, 10)} ${from.slice(4, 7)} ${from.slice(11, 15)}`;
	if (to) {
		duration += ` - ${to.slice(8, 10)} ${to.slice(4, 7)} ${to.slice(11, 15)}`;
	}

	return duration;
}

function assignRowSpan(rows, column) {
	rows.sort((r1, r2) => {	// Sort the rows according to their values in the provided column
		return (r1[column] > r2[column]) - (r1[column] < r2[column]);
	});

	let count = 1;
	for (let i = rows.length - 1; i > 0; i--) {
		if (rows[i][column] !== rows[i-1][column]) {
			rows[i].rowSpan = count;
			count = 1;
		} else {
			rows[i].rowSpan = 0;
			count++;
		}
	}
	rows[0].rowSpan = count;

	return rows;
}

function addToModal(id, heading, modal) {
	let link = document.createElement('a');
	link.href = `#${id}`;
	link.innerText = heading;
	modal.append(link);
}

function constructSection(element, heading, collapsibleColumn) {
	let section = document.createElement('section');

	let sectionHeading = document.createElement('h2');
	sectionHeading.innerText = heading;
	sectionHeading.id = element[0];
	sectionHeading.onclick = () => {
		document.querySelector('.modal-container').style.display = 'flex';
	};
	section.append(sectionHeading);

	let rows = element[1];
	if (rows.length === 0) {
		return section;
	}

	rows = assignRowSpan(rows, collapsibleColumn);
	let table = document.createElement('table');

	let hRow = document.createElement('tr');	// Head
	Object.keys(rows[0]).forEach((key) => {
		if (key === 'id' || key === 'rowSpan') {
			return;
		}
		let _ = document.createElement('th');
		_.innerHTML = key;
		hRow.append(_);
	});
	table.append(hRow);

	let bRow;	// Body
	rows.forEach((row) => {
		bRow = document.createElement('tr');
		Object.entries(row).forEach(([ key, value ]) => {
			let _ = document.createElement('td');
			if (key === 'id' || key === 'rowSpan') {
				return;
			} else if (key === collapsibleColumn) {
				if (row.rowSpan === 0) {
					return;
				}
				_.rowSpan = row.rowSpan;
			} else if (key === 'level') {
				value = '●'.repeat(value) + '○'.repeat((5 - value));

			} else if (key === 'duration' && value) {
				value = parseDurationString(value);
			}
			_.innerHTML = value;
			bRow.append(_);
		});
		table.append(bRow);
	});

	section.append(table);

	return section;
}

function renderHomeTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Home"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '';

	let modalContainer = document.createElement('div');
	modalContainer.className = 'modal-container';
	let modal = document.createElement('div');
	modalContainer.append(modal);
	modalContainer.onclick = () => {
		modalContainer.style.display = 'none';
	};

	const abbMap = convertToMap(data._abb);
	const colMap = convertToMap(data._col);

	Object.entries(data)
		.filter((el) => {
			return (el[0] !== '_abb') && (el[0] !== '_col');	// To remove auxiliary tables
		})
		.map((el) => {
			addToModal(el[0], abbMap.get(el[0]), modal);
			return constructSection(el, abbMap.get(el[0]), colMap.get(el[0]));
		})
		.forEach((el) => {
			main.append(el);
		});

	main.append(modalContainer);
}
