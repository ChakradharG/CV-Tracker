function filterRows(queryText) {
	document.querySelector('main').querySelectorAll('section').forEach((el) => {
		el.remove();
	});
	const abbMap = convertToMap(data._abb);
	const colMap = convertToMap(data._col);

	let container = document.querySelector('#modal-container-tables');
	container.firstChild.innerHTML = '';
	let containerFind = document.querySelector('#modal-container-find');

	Object.entries(data)
		.filter((el) => {
			return (!el[0].startsWith('_'));
		})
		.forEach((el) => {
			el[1] = el[1].filter((row) => {
				let showRow = false;
				for (let key in row) {
					if (key === 'id' || key === 'rowSpan') {
						continue;
					}
					if (row[key]?.toLowerCase?.().includes(queryText)) {	// row[key] could be string/null/number
						showRow = true;
						break;
					}
				}
				return showRow;
			});
			if (el[1].length > 0) {	// section has atleast 1 row
				container.firstChild.append(addToJumpMenu(el[0], abbMap.get(el[0])));
				container.before(constructSection(el, abbMap.get(el[0]), colMap.get(el[0])));
			}
		});
}

function renderFindTab() {
	const main = document.querySelector('main');

	if (document.querySelector('.current').title === 'Find') {
		let containerFind = document.querySelector('#modal-container-find');
		containerFind.style.display = 'flex';
		containerFind.querySelector('input').select();
		return;
	}

	document.querySelector('.current')?.classList.remove('current');
	document.querySelector('[title="Find"]').classList.add('current');

	main.innerHTML = '';
	main.scrollTo(0, 0);

	let container = createModal(true);
	container.id = 'modal-container-tables';

	let containerFind = createModal(true);
	containerFind.style.display = 'flex';
	containerFind.id = 'modal-container-find';

	let input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Find';

	let btnContainer = document.createElement('div');
	btnContainer.className = 'btn-container';

	btnContainer.append(createButton('btn1', 'Cancel', {
		ev: 'click',
		callback: () => {
			containerFind.click();
		}
	}));

	btnContainer.append(createButton('btn2', 'Find', {
		ev: 'click',
		callback: () => {
			filterRows(input.value.toLowerCase());
			containerFind.style.display = 'none';
		}
	}));

	input.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter') {
			btnContainer.children[1].click();	// Find button
		}
	});

	containerFind.firstChild.append(input);
	containerFind.firstChild.append(btnContainer);

	main.append(container);
	main.append(containerFind);
	
	filterRows('');
	input.focus();
}
