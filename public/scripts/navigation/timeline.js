function createTimelineBox({RL, offSet, entity}) {
	let box = document.createElement('div');
	box.className = `box ${RL}`;
	box.style.top = `${offSet}px`;

	let first = true;
	Object.entries(entity).forEach(([ key, value ]) => {
		if (key === 'id') {
			return;
		}
		let _ = document.createElement( first ? 'h4' : 'p');
		first = false;
		_.innerHTML = value;
		box.append(_);
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
				<circle cx="12" cy="12" r="8"></circle>
			</svg>`;
	} else {
		circle.innerHTML = 
			`<svg enable-background="new 0 0 24 24" viewBox="0 0 24 24">
				<path d="M18.32,4.26C16.84,3.05,15.01,2.25,13,2.05v2.02c1.46,0.18,2.79,0.76,3.9,1.62L18.32,4.26z M19.93,11h2.02 c-0.2-2.01-1-3.84-2.21-5.32L18.31,7.1C19.17,8.21,19.75,9.54,19.93,11z M18.31,16.9l1.43,1.43c1.21-1.48,2.01-3.32,2.21-5.32 h-2.02C19.75,14.46,19.17,15.79,18.31,16.9z M13,19.93v2.02c2.01-0.2,3.84-1,5.32-2.21l-1.43-1.43 C15.79,19.17,14.46,19.75,13,19.93z M11,19.93v2.02 c-5.05-0.5-9-4.76-9-9.95s3.95-9.45,9-9.95v2.02C7.05,4.56,4,7.92,4,12S7.05,19.44,11,19.93z"/>
				<circle cx="12" cy="12" r="8"></circle>
			</svg>`;
	}

	return circle;
}

function flattenData() {
	let flatData = [];

	Object.entries(data)
		.filter((el) => {
			return (!el[0].startsWith('_'));	// To remove auxiliary tables
		})
		.forEach(([ _, value ]) => {
			flatData.push(...value);
		});

	return flatData;
}

function splitDuration(flatData) {
	arr = [];

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

	let vBar = document.createElement('span');
	vBar.id = 'v-bar';
	main.append(vBar);

	let offSet = 10;
	let RL = 'left';

	sortRows(splitDuration(flattenData())).forEach((entity) => {
		main.append(createTimelineBox({RL, offSet, entity}));
		main.append(createTimelineCircle({SF: entity.SF, offSet}));

		RL = (RL === 'left' ? 'right' : 'left');
		offSet += 100;
	});
}
