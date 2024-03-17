function constructCheckBox(sform, fform) {
	let _ = document.createElement('div');
	_.className = 'check-container2';

	let checkbox = document.createElement('input');
	checkbox.id = `${sform}-check`;
	checkbox.type = 'checkbox';
	checkbox.checked = true;

	let label = document.createElement('label');
	label.htmlFor = `${sform}-check`;
	label.innerText = fform;

	_.append(label);
	_.append(checkbox);
	return _;
}

function renderExportTab() {
	closeModals();	// Close any open modals

	const previous = document.querySelector('.current');
	previous.classList.remove('current');
	document.querySelector('[title="Export"]').classList.add('current');

	const main = document.querySelector('main');

	let container = createModal(false);
	container.style.display = 'flex';

	let div = document.createElement('div');	// Contains duplicate tables
	div.style.display = 'none';

	const abbMap = convertToMap(data._abb);
	const colMap = convertToMap(data._col);

	Object.entries(data)
		.filter((el) => {
			return (!el[0].startsWith('_'));
		})
		.forEach((el) => {
			let id = el[0];
			el[0] += '-hidden';	// Prevent conflicting element IDs with actual tables
			div.append(constructSection(el, abbMap.get(id), colMap.get(id)));
		});

	let checkboxes = document.createElement('div');
	checkboxes.className = 'checkboxes';

	abbMap.forEach((fform, sform) => {
		checkboxes.append(constructCheckBox(sform, fform));
	});

	let btnContainer = document.createElement('div');
	btnContainer.className = 'btn-container';

	btnContainer.append(createButton('btn1', 'Cancel', {
		ev: 'click',
		callback: () => {
			container.click();
		}
	}));

	btnContainer.append(createButton('btn2', 'Export', {
		ev: 'click',
		callback: () => {
			let tables = Array.from(document.querySelector('.checkboxes').children)
				.filter((el) => {
					return el.lastChild.checked;
				})
				.map((el) => {
					return el.lastChild.id.slice(0, 3);
				})
				.map((sform) => {
					let heading = '<h2>' + abbMap.get(sform) + '</h2>';
					let table = '<table>' + document.querySelector(`.modal-container #${sform}-hidden + table`).innerHTML + '</table>';
					return heading + table;
				})
				.reduce((a, b) => {
					return a + b;
				});

			api.send('exportTables', JSON.stringify({
				content: `<style>
				h2 {
					text-align: center;
				}
				table {
					width: 100%;
					max-width: 100%;
					border: 1px solid;
					border-collapse: collapse;
				}
				th, td {
					border: 1px solid;
					padding: 0.5rem;
				}
				th:first-child, th:last-child {
					width: clamp(8rem, 20vw, 20rem);
				}
				ul, ol {
					list-style-position: inside;
				}
				</style>` + tables
			}));

			container.click();
		}
	}));

	container.addEventListener('click', (ev) => {
		if (ev.target === container) {
			document.querySelector('[title="Export"]').classList.remove('current');
			previous.classList.add('current');
		}
	});

	container.firstChild.append(div);
	container.firstChild.append(checkboxes);
	container.firstChild.append(btnContainer);

	main.append(container);
}
