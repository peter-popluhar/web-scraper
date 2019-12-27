import {urlAll} from './urls.js'
import axios from 'axios';
import cheerio from 'cheerio';
import getMetaTags from './tasks/getMetaTags.js';
import getBanner from './tasks/getBanner.js';
import getSubtitleSection from './tasks/getSubtitleSection.js';
import getFeaturesSection from './tasks/getFeaturesSection.js';
import writeJson from './tasks/writeJson.js';
import replace from 'replace-in-file';
import sanitizeOptions from './tasks/sanitizeOptions.js'

let subdomain;
let url;
let copy = {};

urlAll.forEach( (alias) => {
	subdomain = `/feature/${alias}`;
	url = `https://www.socialbakers.com/${subdomain}`;

	axios(url)
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);

			getMetaTags($, copy);
			getBanner($, copy);
			getSubtitleSection($, copy);
			getFeaturesSection($, copy);
			writeJson(alias, copy);
		}).then(() => {
		sanitizeOptions.files = `./output/${alias}.js`;
		replace(sanitizeOptions)
			.then(results => {
				console.log('Replacement results:', results);
			})
			.catch(error => {
				console.error('Error occurred:', error);
			});
		})
		.catch(console.error);

})

