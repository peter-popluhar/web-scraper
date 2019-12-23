import fs from "fs";
// import {alias} from '../urls.js';
import prependFile from 'prepend-file';
import prependData from './prependData.js';

const writeJson = (alias, copy) => {
	let jsonContent = JSON.stringify(copy, undefined, 0);

	fs.writeFile(`./output/${alias}.js`, jsonContent, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}

		prependFile(`./output/${alias}.js`,prependData , function (err) {
			if (err) {
				console.log(`error in prepending: ${err} `)
			}
			console.log(`Imports were prepended in ${alias}.js!`);
		});
		console.log(`JSON file has been saved in ${alias}.js`);
	});
}

export default writeJson;
