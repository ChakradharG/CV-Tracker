function convertToMap(arr) {
	return new Map(arr.map((el) => {
		return Object.values(el);
	}));
}

function parseDurationString(duration) {
	const [ start, end ] = duration.split(':').map((str) => {
		return (new Date(str.split('-'))).toDateString();
	});

	duration = (start === 'Invalid Date') ? start : `${start.slice(8, 10)} ${start.slice(4, 7)} ${start.slice(11, 15)}`;
	if (end) {
		duration += ' - ';
		duration += (end === 'Invalid Date') ? end : `${end.slice(8, 10)} ${end.slice(4, 7)} ${end.slice(11, 15)}`;
	}

	return duration;
}

function parseLevel(level) {
	if (level >= 0 && level <= 5) {
		return '●'.repeat(level) + '○'.repeat((5 - level));
	} else {
		return 'Invalid value. Please input a value between 0 and 5';
	}
}

function assignRowSpan(rows, column) {
	let firstColumn = Object.keys(rows[0])[1];
	rows.sort((r1, r2) => {
		if (column) {
			// Sort by collapsible column if it exists
			if (r1[column] > r2[column]) {
				return 1;
			} else if (r1[column] < r2[column]) {
				return -1;
			}
		}

		if ('Duration' in r1) {
			// If collapsible column doesn't exist or if 2 rows have the same value, sort by 'Duration' column
			if (((r1['Duration']?.split(':')[1] ?? r1['Duration']?.split(':')[0])?.replace(/-/g, '') ?? null) > ((r2['Duration']?.split(':')[1] ?? r2['Duration']?.split(':')[0])?.replace(/-/g, '') ?? null)) {
				return -1;
			} else if (((r1['Duration']?.split(':')[1] ?? r1['Duration']?.split(':')[0])?.replace(/-/g, '') ?? null) < ((r2['Duration']?.split(':')[1] ?? r2['Duration']?.split(':')[0])?.replace(/-/g, '') ?? null)) {
				return 1;
			} else {
				return 0;
			}
		} else {
			// If neither exist then sort by the first column
			return (r1[firstColumn] > r2[firstColumn]) - (r1[firstColumn] < r2[firstColumn]);
		}
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

function addToJumpMenu(id, heading) {
	let link = document.createElement('a');
	link.href = `#${id}`;
	link.innerText = heading;
	link.addEventListener('click', () => {
		document.querySelector('.modal-container').style.display = 'none';
	});

	return link;
}

function createModal() {
	let modalContainer = document.createElement('div');
	modalContainer.className = 'modal-container';
	modalContainer.innerHTML = '<div></div>';

	return modalContainer;
}

function createButton(className, innerText, listener){
	let btn = document.createElement('button');
	btn.className = className;
	btn.innerText = innerText;
	btn.addEventListener(listener.ev, listener.callback);

	return btn;
}

function update(method, entity, otherTab) {
	api.send(method, JSON.stringify(entity));	// Reflect changes in the backend
	api.invoke('getData')
		.then((_data) => { data = _data })	// Reflect changes in the data object
		.then(() => {	// Reflect changes on screen
			if (otherTab) {
				return;
			}

			let id = entity.tableID;
			let section = document.querySelector(`#${id}`).parentElement;
			section.after(constructSection([ id, data[id] ], convertToMap(data._abb).get(id), convertToMap(data._col).get(id)));
			section.remove();
		});
}

function edit1(entity) {
	// For table & column names
	let container = createModal();
	let div = container.firstChild;

	let input = document.createElement('input');
	input.type = 'text';
	input.value = entity.oldValue;
	input.placeholder = 'This field cannot be empty';
	div.append(input);

	if (entity.type === 'column') {
		let _ = document.createElement('div');
		_.className = 'check-container';

		let checkbox = document.createElement('input');
		checkbox.id = 'collapsibleColumn';
		checkbox.type = 'checkbox';
		checkbox.checked = (entity.collapsibleColumn === entity.oldValue);

		let label = document.createElement('label');
		label.htmlFor = 'collapsibleColumn';
		label.innerText = 'Collapse';

		_.append(label);
		_.append(checkbox);
		div.append(_);
	}

	let btnContainer = document.createElement('div');
	btnContainer.className = 'btn-container';

	btnContainer.append(createButton('btn1', 'Cancel', {
		ev: 'click',
		callback: () => {
			container.remove();
		}
	}));

	btnContainer.append(createButton('btn2', 'Save', {
		ev: 'click',
		callback: () => {
			if (input.value === '') {
				return;
			}

			entity.newValue = input.value;
			
			let flag;
			if (entity.type === 'column') {
				let _ = div.querySelector('input[type="checkbox"]');
				if (entity.oldValue === entity.collapsibleColumn) {
					if (!_.checked || (entity.oldValue !== entity.newValue)) {
						entity.updateCol = true;
						entity.collapsibleColumn = _.checked ? entity.newValue : null;
						flag = true;
					}
				} else {
					if (_.checked) {
						entity.updateCol = true;
						entity.collapsibleColumn = entity.newValue;
						flag = true;
					}
				}
			}

			container.remove();

			if ((entity.oldValue !== entity.newValue) || flag) {
				update('putData', entity);
			}
		}
	}));

	div.append(btnContainer);

	document.querySelector('main').append(container);
	container.style.display = 'flex';
}

function edit2(entity) {
	// For rows
	let container = createModal();
	let div = container.firstChild;

	let cannotBeEmpty = !(entity.column === 'Duration' && (entity.tableID === 'mis' || entity.tableID === 'ski'));

	let input = document.createElement('textarea');
	input.value = entity.oldValue;
	if (cannotBeEmpty) {
		input.placeholder = 'This field cannot be empty';
	}
	div.append(input);

	if (entity.column !== entity.collapsibleColumn) {
		let btnContainer2 = document.createElement('div');
		btnContainer2.className = 'btn-container2';

		btnContainer2.append(createButton('btn3', 'Delete Row', {
			ev: 'click',
			callback: () => {
				container.remove();
				update('deleteData', entity);
			}
		}));

		btnContainer2.append(createButton('btn4', 'Timeline', {
			ev: 'click',
			callback: () => {
				renderTimelineTab();
				window.location.href = `#${entity.tableID}${entity.id}`;
			}
		}));

		div.append(btnContainer2);
	}

	let btnContainer = document.createElement('div');
	btnContainer.className = 'btn-container';

	btnContainer.append(createButton('btn1', 'Cancel', {
		ev: 'click',
		callback: () => {
			container.remove();
		}
	}));

	btnContainer.append(createButton('btn2', 'Save', {
		ev: 'click',
		callback: () => {
			if (input.value === '') {
				if (cannotBeEmpty) {
					return;
				}
			} else if (entity.column === 'Duration' && !/\d{4}(-\d{2}(-\d{2})?)?/.test(input.value)) {
				return;
			}

			entity.newValue = input.value || null;
			container.remove();

			if ((entity.oldValue !== entity.newValue)) {
				update('putData', entity);
			}
		}
	}));

	div.append(btnContainer);

	document.querySelector('main').append(container);
	container.style.display = 'flex';
}

function constructSection(element, heading, collapsibleColumn) {
	let section = document.createElement('section');

	let sectionHeading = document.createElement('h2');
	sectionHeading.innerText = heading;
	sectionHeading.id = element[0];
	sectionHeading.addEventListener('click', () => {
		document.querySelector('.modal-container').style.display = 'flex';
	});
	sectionHeading.title = 'Right click to edit';
	sectionHeading.addEventListener('contextmenu', () => {
		edit1({
			type: 'table',
			tableID: element[0],
			oldValue: heading
		});
	});
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
		_.innerText = key;
		_.title = 'Right click to edit';
		_.addEventListener('contextmenu', () => {
			edit1({
				type: 'column',
				tableID: element[0],
				oldValue: key,
				collapsibleColumn: collapsibleColumn
			});
		});
		hRow.append(_);
	});
	table.append(hRow);

	let bRow;	// Body
	rows.forEach((row) => {
		bRow = document.createElement('tr');
		bRow.id = element[0] + row['id'];
		Object.entries(row).forEach(([ key, value ]) => {
			let _ = document.createElement('td');
			if (key === 'id' || key === 'rowSpan') {
				return;
			} else if (key === collapsibleColumn) {
				if (row.rowSpan === 0) {
					return;
				}
				_.rowSpan = row.rowSpan;
			}
			_.title = 'Right click to edit';
			_.addEventListener('contextmenu', () => {
				edit2({
					type: 'row',
					tableID: element[0],
					oldValue: row[key],
					column: key,
					id: row['id'],
					collapsibleColumn: collapsibleColumn
				});
			});
			if (key === 'Level') {	// Special column
				value = parseLevel(value);

			} else if (key === 'Duration' && value) {	// Special column
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
	main.scrollTo(0, 0);

	let container = createModal();

	const abbMap = convertToMap(data._abb);
	const colMap = convertToMap(data._col);

	Object.entries(data)
		.filter((el) => {
			return (!el[0].startsWith('_'));	// To remove auxiliary tables
		})
		.map((el) => {
			container.firstChild.append(addToJumpMenu(el[0], abbMap.get(el[0])));
			return constructSection(el, abbMap.get(el[0]), colMap.get(el[0]));
		})
		.forEach((el) => {
			main.append(el);
		});

	main.append(container);
}
