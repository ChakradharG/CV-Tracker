function getAbbreviationMap() {
	return new Map(data.abb.map(({ sform, fform }) => {
		return [ sform, fform ];
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

function constructSection(element, heading) {
	let section = document.createElement('section');

	let sectionHeading = document.createElement('h2');
	sectionHeading.innerText = heading;
	section.append(sectionHeading);

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
			Object.entries(row).forEach((col) => {
				if (col[0].toLowerCase() === 'duration') {
					col[1] = parseDurationString(col[1]);
				}
				let _ = document.createElement('td');
				_.innerHTML = col[1];
				bRow.append(_);
			});
			table.append(bRow);
		});

		section.append(table);
	}

	return section;
}

function renderHomeTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Home"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '';

	const abbreviationMap = getAbbreviationMap();

	Object.entries(data)
		.filter((el) => {
			return el[0] !== 'abb';	// Remove abbreviations table
		})
		.map((el) => {
			return constructSection(el, abbreviationMap.get(el[0]));
		})
		.forEach((el) => {
			main.append(el);
		});
}
