import {sanitizeInput, splitSrcetToArray, filterItems} from './utils.js'

const bannerImageSelector = '.feature-page__banner picture source';

const getBanner =($, copy) => (
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


export default getBanner


