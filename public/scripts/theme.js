function toggleTheme() {
	const rootStyle = getComputedStyle(root);

	// Get existing variable values
	const [ bg, bgS, fg, fgS ] = [
		rootStyle.getPropertyValue('--bg'),
		rootStyle.getPropertyValue('--bg-s'),
		rootStyle.getPropertyValue('--fg'),
		rootStyle.getPropertyValue('--fg-s'),
	];

	// Swap variable values
	root.style.setProperty('--bg', fg);
	root.style.setProperty('--bg-s', fgS);
	root.style.setProperty('--fg', bg);
	root.style.setProperty('--fg-s', bgS);

	document.body.classList.remove(theme);
	theme = theme === 'dark' ? 'light' : 'dark';
	document.body.classList.add(theme);

	localStorage.setItem('theme', theme);
}

const root = document.querySelector(':root');
let theme = localStorage.getItem('theme');

if ((!theme && window.matchMedia('(prefers-color-scheme: light)').matches) || theme === 'light') {
	/* By default, css sets dark theme.
	So if the theme in localStorage is set to light (or is undefined and the system preference is light),
	then toggle the theme */
	theme = 'dark'; // So that toggleTheme can work properly (dark because default in css is dark)
	toggleTheme();
} else {
	theme = 'dark';
	localStorage.setItem('theme', theme);
}

document.body.classList.add(theme);
