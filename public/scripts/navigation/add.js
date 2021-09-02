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
		if (columnName === 'id' || columnName === 'rowSpan') {
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
		if (!(columnName === 'Duration' && (sform === 'mis' || sform === 'ski'))) {
			textArea.placeholder = 'This field cannot be empty';
			textArea.dataset.cannotBeEmpty = true;
		}
		div.append(textArea);

		index++;
	});
}

function renderAddTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Add"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '';

	let container = createModal();

	let select = document.createElement('span');
	select.className = 'select';
	select.innerHTML = 'Select a Table &nbsp;⯆';
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
			if (!select.dataset.id) {
				return;
			}

			let entity = {};
			entity.tableID = select.dataset.id;

			entity.columnNames = [];
			document.querySelectorAll('label').forEach((el) => {
				entity.columnNames[el.dataset.index] = `'${el.innerText}'`;
			});

			entity.values = [];
			for (let el of document.querySelectorAll('textarea')) {
				if (el.value === '') {
					if (el.dataset.cannotBeEmpty) {
						return;
					} else {
						entity.columnNames.splice(el.dataset.index, 1);
					}
				} else {
					entity.values[el.dataset.index] = `'${el.value}'`;
				}
			}

			update('postData', entity, true);
			constructTable(select.dataset.id, div);
		}
	}));

	Object.entries(data._abb)
		.map((el) => {
			let link = addToJumpMenu(el[1].sform, el[1].fform);

			link.addEventListener('click', () => {
				select.innerHTML = `${el[1].fform} &nbsp;⯆`;
				select.dataset.id = el[1].sform;
				constructTable(el[1].sform, div);
			});

			container.firstChild.append(link);
		});

	main.append(container);
}
