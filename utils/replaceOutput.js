import replace from 'replace-in-file';
import sanitizeOptions from './sanitizeOptions.js';

const replaceOutput = () => {
	replace(sanitizeOptions)
		.then(results => {
			console.log('Replacement results:', results);
		})
		.catch(error => {
			console.error('Error occurred:', error);
		});
}

export default replaceOutput;
