function getSectionMap() {
	return new Map(data.abb.map(({ sform, fform }) => {
		return [ sform, fform ];
	}));
}

function convert(element, section) {
	let sectionDiv = document.createElement('section');

	let sectionHeading = document.createElement('h2');
	sectionHeading.innerText = section;

	sectionDiv.append(sectionHeading);

	let rows = element[1];
	if (rows.length !== 0) {
		let table = document.createElement('table');

		let hRow = document.createElement('tr');	// Head
		Object.keys(rows[0]).forEach((col) => {
			let _ = document.createElement('th');
			_.innerText = col;
			hRow.append(_);
		});
		table.append(hRow);

		let bRow;	// Body
		rows.forEach((row) => {
			bRow = document.createElement('tr');
			Object.values(row).forEach((col) => {
				let _ = document.createElement('td');
				_.innerHTML = col;
				bRow.append(_);
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
