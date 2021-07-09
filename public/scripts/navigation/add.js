function renderAddTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Add"]').classList.add('current');

	document.querySelector('main').innerHTML = 'Add';
}
