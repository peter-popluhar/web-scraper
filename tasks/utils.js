export const sanitizeInput = (input) => {
	return input.trim().replace(/\s+/g, ' ')
}

export const splitSrcetToArray = (str) => {
	let arr = str.split(' ');
	return arr
}

// TODO get non retina => check if item doesnt have '@2x' and its length is more than for ex.: 5
export const filterItems = (arr, query) => {
	return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
};
