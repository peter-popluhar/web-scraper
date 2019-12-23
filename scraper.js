import fs from 'fs'
import axios from 'axios';
import cheerio from'cheerio';
import prependFile from 'prepend-file';
import replace from 'replace-in-file';
import sanitizeOptions from './utils/sanitizeOptions.js';
import prependData from './utils/prependData.js'
import getMetaTags from './utils/getMetaTags.js'
import getBanner from './utils/getBanner.js'
import getSubtitleSection from './utils/getSubtitleSection.js'
import getFeaturesSection from './utils/getFeaturesSection.js'

// const alias = "social-media-analytics"
// const alias = "live-video-analytics" wrong!
// const alias = "personalized-marketing"
// const alias = "sentiment-analysis"
// const alias = "social-media-content-curation"
// const alias = "social-media-content-insights" wrong!
// const alias = "content-scheduling-and-publishing"
const alias = "social-media-collaboration"
// const alias = "social-media-benchmarks" wrong!
// const alias = "paid-social-media-marketing"
// const alias = "social-media-optimization"
// const alias = "social-media-dashboards-and-reporting"
// const alias = "social-media-listening"
// const alias = "linkedin-scheduling-tool"
// const alias = "social-media-analytics-tools"
// const alias = "social-media-scheduling-tools"
// const alias = "social-media-video-analytics"
// const alias = "find-youtube-influencers"
// const alias = "social-media-content-workflow"
// const alias = "social-media-reporting-tools"
// const alias = "facebook-advertising-benchmarks"
// const alias = "social-media-automation"
// const alias = "persona-mapping-tool"
// const alias = "social-media-content-planning-tool"
// const alias = "fake-influencers-detection"
// const alias = "influencer-identification-tool"
// const alias = "instagram-management"
// const alias = "smart-content-publishing-at-scale" url, wrong!
// const alias = "easier-social-media-collaboration"  url, wrong!
// const alias = "the-most-reliable-marketing-platform"  url, wrong!
// const alias = "social-media-approvals"
// const alias = "social-media-performance-marketing"
// const alias = "whats-new/youtube-influencers"   url, wrong!
// const alias = "audiences-and-influencers"  url, wrong!
// const alias = "audience-segmentation"
// const alias = "audience-analytics"

const section = `/feature/${alias}`;

const url = `https://www.socialbakers.com/${section}`;

let copy = {}

sanitizeOptions.files = `./output/${alias}.js`



const writeJson = (copy) => {
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

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

		getMetaTags($, copy)
		getBanner($, copy)
		getSubtitleSection($, copy)
		getFeaturesSection($, copy);
		writeJson(copy)

		replace(sanitizeOptions)
			.then(results => {
				console.log('Replacement results:', results);
			})
			.catch(error => {
				console.error('Error occurred:', error);
			});
    })
    .catch(console.error);

