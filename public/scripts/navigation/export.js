function renderExportTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Export"]').classList.add('current');

	document.querySelector('main').innerHTML = 'Export';
}
