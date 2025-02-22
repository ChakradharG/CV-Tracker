async function constructTable(sform, div) {
	div.innerHTML = '';

	let columnNames;
	if (data[sform].length === 0) {
		// If no rows exist in the table
		let _ = await api.invoke('getColumns', sform);
		columnNames = _.map((col) => {
			return col.name;
		});
	} else {
		columnNames = Object.keys(data[sform][0]);
	}

	let index = 0;
	columnNames.forEach((columnName) => {
		if (columnName === 'id' || columnName === 'rowSpan' || columnName === 'embedding' || columnName === 'is_incld' || columnName === 'recomp') {
			return;
		}

		let label = document.createElement('label');
		label.innerText = columnName;
		label.htmlFor = 'inp' + index;
		label.dataset.index = index;
		div.append(label);

		let textArea = document.createElement('textarea');
		textArea.id = 'inp' + index;
		textArea.dataset.index = index;
		textArea.dataset.columnName = columnName;
		if (!(columnName === 'Duration' && (sform === 'mis' || sform === 'ski'))) {
			textArea.placeholder = 'This field cannot be empty';
			if (columnName === 'Duration') {
				textArea.placeholder += ' (Format YYYY-MM-DD)';
			}
			textArea.dataset.cannotBeEmpty = true;
		}
		div.append(textArea);

		index++;
	});

	let _ = document.createElement('div');
	_.className = 'check-container';

	let checkbox = document.createElement('input');
	checkbox.id = 'isIncluded';
	checkbox.type = 'checkbox';
	checkbox.checked = true;

	let label = document.createElement('label');
	label.htmlFor = 'isIncluded';
	label.innerText = 'Include in matches';

	_.append(label);
	_.append(checkbox);
	div.append(_);
}

function renderAddTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Add"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '';

	let container = createModal(true);

	let select = document.createElement('div');
	select.className = 'select';
	select.innerHTML = 'Select a Table';
	select.addEventListener('click', () => {
		container.style.display = 'flex';
	});
	main.append(select);

	let div = document.createElement('div');
	div.className = 'input-fields';
	main.append(div);

	main.append(createButton('btn', 'Save', {
		ev: 'click',
		callback: () => {
			let entity = {};
			entity.tableID = select.dataset.id;

			entity.columnNames = [];
			document.querySelectorAll('label').forEach((el) => {
				entity.columnNames[el.dataset.index] = `'${el.innerText}'`;
			});
			entity.columnNames.push('is_incld');

			entity.values = [];
			for (let el of document.querySelectorAll('textarea')) {
				if (el.value === '') {
					if (el.dataset.cannotBeEmpty) {
						return;
					} else {
						entity.columnNames.splice(el.dataset.index, 1);
					}
				} else if (el.dataset.columnName === 'Duration' && !/\d{4}(-\d{2}(-\d{2})?)?/.test(el.value)) {
					return;
				} else {
					entity.values[el.dataset.index] = `'${el.value}'`;
				}
			}
			entity.values.push(+document.querySelector('#isIncluded').checked);

			update('postData', entity, true);
			constructTable(select.dataset.id, div);
		}
	}));
	document.querySelector('.btn').style.display = 'none';

	Object.entries(data._abb)
		.forEach((el) => {
			let link = addToJumpMenu(el[1].sform, el[1].fform);

			link.addEventListener('click', () => {
				select.innerHTML = `${el[1].fform}`;
				select.dataset.id = el[1].sform;
				constructTable(el[1].sform, div);
				document.querySelector('.btn').style.display = 'block';
			});

			container.firstChild.append(link);
		});

	main.append(container);
}
