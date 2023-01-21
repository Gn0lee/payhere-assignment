const colorSet = ['pink', 'red', 'orange', 'green', 'blue', 'purple', 'magenta', 'gold'];

export const makeRandomColor = (colors: string[]): string => {
	let randomColor = '';

	while (true) {
		randomColor = colorSet[Math.floor(Math.random() * colorSet.length)];
		if (!colors.includes(randomColor)) {
			break;
		}
	}

	return randomColor;
};
