function renderTimelineTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Timeline"]').classList.add('current');

	document.querySelector('main').innerHTML = 'Timeline';
}
