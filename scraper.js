import axios from 'axios';
import cheerio from'cheerio';
import sanitizeOptions from './utils/sanitizeOptions.js';
import writeJson from './utils/writeJson.js'
import replaceOutput from './utils/replaceOutput.js'
import getMetaTags from './utils/getMetaTags.js'
import getBanner from './utils/getBanner.js'
import getSubtitleSection from './utils/getSubtitleSection.js'
import getFeaturesSection from './utils/getFeaturesSection.js'
import {alias} from './urls.js'

const section = `/feature/${alias}`;
const url = `https://www.socialbakers.com/${section}`;
let copy = {}



axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

		getMetaTags($, copy)
		getBanner($, copy)
		getSubtitleSection($, copy)
		getFeaturesSection($, copy);
		writeJson(copy)
		replaceOutput()
    })
    .catch(console.error);

