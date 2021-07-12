function getSectionMap() {
	return new Map(data.abb.map(({ sform, fform }) => {
		return [ sform, fform ];
	}));
}

function newElem({ tagName, className, id, innerText, innerHTML }) {
	let elem = document.createElement(tagName);

	if (className) elem.className = className;
	if (id) elem.id = id;
	if (innerText) elem.innerText = innerText;
	if (innerHTML) elem.innerHTML = innerHTML;

	return elem;
}

function convert(element, section) {
	let sectionDiv = newElem({ tagName: 'section' });

	sectionDiv.append(newElem({
		tagName: 'h2',
		innerText: section
	}));

	let rows = element[1];
	if (rows.length !== 0) {
		let table = newElem({ tagName: 'table' });

		let hRow = newElem({ tagName: 'tr' });	// Head
		Object.keys(rows[0]).forEach((col) => {
			hRow.append(newElem({
				tagName: 'th',
				innerText: col
			}));
		});
		table.append(hRow);

		let bRow;	// Body
		rows.forEach((row) => {
			bRow = newElem({ tagName: 'tr' });
			Object.values(row).forEach((col) => {
				bRow.append(newElem({
					tagName: 'td',
					innerHTML: col
				}));
			});
			table.append(bRow);
		});

		sectionDiv.append(table);
	}

	return sectionDiv;
}

function renderHomeTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Home"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '';

	const sectionMap = getSectionMap();

	Object.entries(data)
		.filter((el) => {
			return el[0] !== 'abb';
		})
		.map((el) => {
			return convert(el, sectionMap.get(el[0]));
		})
		.forEach((el) => {
			main.append(el);
		});
}
