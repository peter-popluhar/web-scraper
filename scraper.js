const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const prependFile = require('prepend-file');
const replace = require('replace-in-file');


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

const sanitizeOptions = {
	files: `./output/${alias}.js`,
	from: [
		/"metaTagsData":/g,
		/"heroBannerData":/g,
		/"subtitleData":/g,
		/"sectionWithImageData":/g,
		/,export/g,
		/{export/g,
	],
	to: [
		'export const metaTagsData: MetaTagsTypes =',
		'export const heroBannerData: HeroBannerDataType =',
		'export const subtitleData: SubtitleProps =',
		'export const sectionWithImageData: Array<SectionWithImageTypes> =',
		';export',
		'export',
		'} ',
	],
};

const section = `/feature/${alias}`

const url = `https://www.socialbakers.com/${section}`;

let copy = {}

const prependedData = `// @flow
import type {MetaTagsTypes} from '../../../globals/meta-tags/meta-tags-types'
import type {HeroBannerDataType} from '../features-types.js'
import type {SubtitleProps} from '../../../globals/subtitle/subtitle'
import type {SectionWithImageTypes} from '../../../globals/section-with-image/section-with-image'
import {muffinCdnPath} from '../../../../../config'
`;

const splitSrcetToArray = (str) => {
    let arr = str.split(' ');
    return arr
}

// TODO get non retina => check if item doesnt have '@2x' and its length is more than for ex.: 5
const filterItems = (arr, query) => {
    return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
};

const sanitizeInput = (input) => {
    return input.trim().replace(/\s+/g, ' ')
}

const meta = ($) => (
	copy.metaTagsData = {
		title: sanitizeInput($("title").text()),
		description: sanitizeInput($('meta[name=description]').attr("content")),
		ogTitle: sanitizeInput($('meta[property="og:title"]').attr("content")),
		ogDescription: sanitizeInput($('meta[property="og:description"]').attr("content")),
		ogImage: sanitizeInput($('meta[property="og:image"]').attr("content")),
		ogUrl: sanitizeInput($('meta[property="og:url"]').attr("content")),
		shareTwitterTitle: sanitizeInput($('meta[name="twitter:title"]').attr("content")),
		shareTwitterText: sanitizeInput($('meta[name="twitter:description"]').attr("content")),
	}
)

const banner =($) => {
	const bannerImageSelector = '.feature-page__banner picture source';
	return (
		copy.heroBannerData = {
			platformTag: {
				name: '',
				text: sanitizeInput($('.breadcrumb a').text()),
				src: '',
			},
			title: sanitizeInput($('.feature-page__banner-title').text()),
			subtitle: sanitizeInput($('.feature-page__banner-perex').text()),
			buttons: {
				leadForm: sanitizeInput($('.feature-page__banner .banner-cta__item:first-child').text()),
				trialForm: sanitizeInput($('.feature-page__banner .banner-cta__item:last-child').text()),
			},
			img: {
				xs: {
					webP: {
						normal: splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(1)`)[0].attribs.srcset))[0],
						retina: filterItems(
							splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(1)`)[0].attribs.srcset)), '@2x'
						)[0],
					},
				},
				md: {
					webP: {
						normal: splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(2)`)[0].attribs.srcset))[0],
						retina: filterItems(
							splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(2)`)[0].attribs.srcset)), '@2x'
						)[0],
					},
				},
				lg: {
					webP: {
						normal: splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(3)`)[0].attribs.srcset))[0],
						retina: filterItems(
							splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(3)`)[0].attribs.srcset)), '@2x'
						)[0],
					},
				},
				xl: {
					webP: {
						normal: splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(4)`)[0].attribs.srcset))[0],
						retina: filterItems(
							splitSrcetToArray(sanitizeInput($(`${bannerImageSelector}:nth-of-type(4)`)[0].attribs.srcset)), '@2x'
						)[0],
					},
					png: {
						normal: $('.feature-page__banner-image').attr("src"),
						retina: $('.feature-page__banner-image').attr("src"),
					},
				},
				alt: $('.feature-page__banner-image').attr("alt"),
			},
		}
	)
}

const subtitle =($) => (
	copy.subtitleData = {
		title: sanitizeInput($('.feature-page__description-title').text()),
		content: sanitizeInput($('.feature-page__description-perex').text()),
	}
)

const features = ($) => {
	let data = {}
	let features = []
	const $sections = $('.feature-page__features .row')
	$sections.each( (i, obj) => {
		data = {
			data: {
				headline: sanitizeInput($(obj).find('h3').text()),
				text: sanitizeInput($(obj).find('p').html()),
				img: {
					normal: $(obj).find('img').attr("data-src"),
					retina: $(obj).find('img').attr("data-src").replace('.png', '@2x.png'),
				},
			},
			reversed: i % 2 === 0
		}
		features.push(data)

	})
	return copy.sectionWithImageData = features

}

const writeJson = (copy) => {
	let jsonContent = JSON.stringify(copy, undefined, 0);

	fs.writeFile(`./output/${alias}.js`, jsonContent, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}

		prependFile(`./output/${alias}.js`,prependedData , function (err) {
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

		meta($);
		banner($);
		subtitle($);
		features($);
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

