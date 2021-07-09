function renderHomeTab() {
	document.querySelector('.current').classList.remove('current');
	document.querySelector('[title="Home"]').classList.add('current');

	document.querySelector('main').innerHTML = 'Home';
}

document.addEventListener('DOMContentLoaded', renderHomeTab);
