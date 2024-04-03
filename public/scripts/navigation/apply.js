function thresholdRows() {
	let matchesContainer = document.querySelector('.matches-container');
	if (Object.keys(partialData).length === 0) {
		matchesContainer.innerHTML = '<div class="full-page-message"><p>Something went wrong. Make sure you have Ollama running and the <a href="https://github.com/ChakradharG/CV-Tracker?tab=readme-ov-file#getting-started">required models</a> downloaded.</p></div>';
		return;
	}

	matchesContainer.querySelectorAll('section').forEach((el) => {
		el.remove();
	});
	const abbMap = convertToMap(partialData._abb);
	const colMap = convertToMap(partialData._col);

	let container = document.querySelector('#modal-container-tables');
	container.firstChild.innerHTML = '';

	let threshold = document.querySelector('input[type="range"]').value;
	document.querySelector('#similarityThresholdLabel').innerText = `Similarity threshold: ${threshold}`;

	Object.entries(partialData)
		.filter((el) => {
			return (!el[0].startsWith('_'));
		})
		.forEach((el) => {
			el[1] = el[1].filter((row) => {
				return row['similarity'] >= threshold;
			});
			if (el[1].length > 0) {	// section has atleast 1 row
				container.firstChild.append(addToJumpMenu(el[0], abbMap.get(el[0])));
				matchesContainer.append(constructSection(el, abbMap.get(el[0]), colMap.get(el[0])));
			}
		});
}

function displayForm() {
	const main = document.querySelector('main');
	main.innerHTML = '';
	main.scrollTo(0, 0);

	let div = document.createElement('div');
	div.className = 'input-fields';

	let label = document.createElement('label');
	label.innerText = 'Job Description';
	label.htmlFor = 'jobDescription';

	let input = document.createElement('textarea');
	input.placeholder = 'Enter the job description here';
	input.id = 'jobDescription';

	let sliderContainer = document.createElement('div');
	sliderContainer.className = 'slider-container';

	let sliderLabel = document.createElement('label');
	sliderLabel.id = 'similarityThresholdLabel';
	sliderLabel.innerText = 'Similarity threshold: 0.87';
	sliderLabel.htmlFor = 'similarityThreshold';

	let slider = document.createElement('input');
	slider.id = 'similarityThreshold';
	slider.type = 'range';
	slider.min = 0;
	slider.max = 1;
	slider.step = 0.01;
	slider.value = 0.87;
	slider.addEventListener('input', () => {
		thresholdRows();
	});
	
	sliderContainer.append(sliderLabel);
	sliderContainer.append(slider);
	sliderContainer.style.display = 'none';
	
	div.append(label);
	div.append(input);
	main.append(div);

	let sliderBtnContainer = document.createElement('div');
	sliderBtnContainer.className = 'slider-btn-container';
	sliderBtnContainer.append(sliderContainer);

	sliderBtnContainer.append(createButton('btn', 'Get matches', {
		ev: 'click',
		callback: () => {
			if (input.value === '') {
				return;
			}

			sliderContainer.style.display = 'flex';

			api.invoke('getSimilarities', JSON.stringify({ content: input.value }))
				.then((_partialData) => {
					window.partialData = _partialData;
					thresholdRows();
				});
		}
	}));

	main.append(sliderBtnContainer);

	let matchesContainer = document.createElement('div');
	matchesContainer.className = 'matches-container';

	let container = createModal(true);
	container.id = 'modal-container-tables';

	main.append(matchesContainer);
	main.append(container);
}

function renderApplyTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Apply"]').classList.add('current');

	const main = document.querySelector('main');
	main.innerHTML = '<div class="full-page-message">Loading</div>';

	api.invoke('computeEmbeddings')
		.then(async (result) => {
			if (result === 0) {
				data = await api.invoke('getData');
				displayForm();
			} else {
				throw new Error('Error in computing embeddings');
			}
		})
		.catch((error) => {
			main.innerHTML = '<div class="full-page-message"><p>Something went wrong. Make sure you have Ollama running and the <a href="https://github.com/ChakradharG/CV-Tracker?tab=readme-ov-file#getting-started">required models</a> downloaded.</p></div>';
		});		
}
