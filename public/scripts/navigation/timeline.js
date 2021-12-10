function createTimelineBox({RL, offSet, entity}) {
	let box = document.createElement('div');
	box.className = `box ${RL}`;
	box.style.top = `${offSet}px`;
	box.id = entity.tableID + entity.id + (entity.SF === 'finish' ? 'f' : '');

	Object.entries(entity).forEach(([ key, value ]) => {
		if (key === 'id' || key === 'rowSpan' || key === 'SF') {
			return;
		}

		let _ = document.createElement('p');
		if (key === 'Duration') {
			value = parseDurationString(value);
		} else if (key === 'Level') {
			value = parseLevel(value);
		}
		_.innerHTML = value;
		box.append(_);
	});

	box.addEventListener('click', () => {
		let container = createModal();
		let div = container.firstChild;

		div.append(createButton('btn', 'Locate in Home Tab', {
			ev: 'click',
			callback: () => {
				renderHomeTab();
				window.location.href = `#${entity.tableID}${entity.id}`;
			}
		}));

		document.querySelector('main').append(container);
		container.style.display = 'flex';
	});

	return box;
}

function createTimelineCircle({SF, offSet}) {
	let circle = document.createElement('div');
	circle.className = `circle ${SF}`;
	circle.style.top = `${offSet}px`;

	if (!SF) {
		circle.innerHTML = 
			`<svg viewBox="0 0 24 24">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
			</svg>`;
	} else {
		circle.innerHTML = 
			`<svg enable-background="new 0 0 24 24" viewBox="0 0 24 24">
				<path d="M18.32,4.26C16.84,3.05,15.01,2.25,13,2.05v2.02c1.46,0.18,2.79,0.76,3.9,1.62L18.32,4.26z M19.93,11h2.02 c-0.2-2.01-1-3.84-2.21-5.32L18.31,7.1C19.17,8.21,19.75,9.54,19.93,11z M18.31,16.9l1.43,1.43c1.21-1.48,2.01-3.32,2.21-5.32 h-2.02C19.75,14.46,19.17,15.79,18.31,16.9z M13,19.93v2.02c2.01-0.2,3.84-1,5.32-2.21l-1.43-1.43 C15.79,19.17,14.46,19.75,13,19.93z M11,19.93v2.02 c-5.05-0.5-9-4.76-9-9.95s3.95-9.45,9-9.95v2.02C7.05,4.56,4,7.92,4,12S7.05,19.44,11,19.93z"/>
			</svg>`;
	}

	return circle;
}

function createVBar({offSet, height}) {
	let vBar = document.createElement('span');
	vBar.className = 'v-bar';
	vBar.style.top = `${offSet}px`;
	vBar.style.height = `${height}px`;

	return vBar;
}

function flattenData() {
	let flatData = [];

	Object.entries(data)
		.filter((el) => {
			return (!el[0].startsWith('_'));	// To remove auxiliary tables
		})
		.forEach(([ key, value ]) => {
			value.forEach((row) => {
				row.tableID = key;
				flatData.push(row);
			});
		});

	return flatData;
}

function splitDuration(flatData) {
	let arr = [];

	flatData = flatData
		.filter((row) => {
			return (('Duration' in row) && (row['Duration']));	// Duration column exists and has a value
		})
		.filter((row) => {
			if (row['Duration'].split(':').length === 1) {
				return true;
			} else {	// If a row has a start and an end date, split it into 2 rows
				let r1 = {};
				Object.assign(r1, row);
				r1['Duration'] = row['Duration'].split(':')[0];
				r1[Object.keys(r1)[2]] = '<i>Started:</i> ' + r1[Object.keys(r1)[2]];	// Remove?
				r1.SF = 'start';
				arr.push(r1);

				let r2 = {};
				Object.assign(r2, row);
				r2['Duration'] = row['Duration'].split(':')[1];
				r2[Object.keys(r2)[2]] = '<i>Finished:</i> ' + r2[Object.keys(r2)[2]];	// Remove?
				r2.SF = 'finish';
				arr.push(r2);

				return false;
			}
		});

	flatData.push(...arr);

	flatData = flatData.filter((row) => {
		return ((new Date(row['Duration'])).toDateString() !== 'Invalid Date');
	});

	return flatData;
}

function sortRows(flatData) {
	flatData.sort((r1, r2) => {
		r1 = r1['Duration'].replace(/-/g, '');
		r2 = r2['Duration'].replace(/-/g, '');

		return ((r1 > r2) - (r1 < r2));
	});

	return flatData;
}

function renderTimelineTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Timeline"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '';
	main.scrollTo(0, 0);

	let offSet = +getComputedStyle(document.querySelector(':root')).getPropertyValue('font-size').replace('px', '');

	sortRows(splitDuration(flattenData())).forEach((entity, index, arr) => {
		let RL = (index % 2 === 0 ? 'left' : 'right');

		let height = 100 + (new Date(arr[index+1]?.Duration) - new Date(arr[index].Duration))/86400000;

		main.append(createTimelineBox({RL, offSet, entity}));
		main.append(createTimelineCircle({SF: entity.SF, offSet}));
		main.append(createVBar({offSet: offSet+22, height}));

		offSet += height + 20;	// 20px for the circle
	});

	let v = document.createElement('span');
	v.classList = 'v-bar hidden';
	v.style.top = `${main.scrollHeight}px`;
	main.append(v);
}
