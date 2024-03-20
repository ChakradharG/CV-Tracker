function displayApplyTab() {
	const main = document.querySelector('main');
	main.innerHTML = '<div class="full-page-message">Success</div>';
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
				displayApplyTab();
			} else {
				throw new Error('Error in computing embeddings');
			}
		})
		.catch((error) => {
			main.innerHTML = '<div class="full-page-message"><p>Something went wrong. Make sure you have Ollama running and the <a href="https://github.com/ChakradharG/CV-Tracker?tab=readme-ov-file#getting-started">required models</a> downloaded.</p></div>';
		});		
}
