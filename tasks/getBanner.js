import {sanitizeInput, splitSrcetToArray, filterItems} from './utils.js'

const bannerSelector = '.feature-page__banner';
let imageSrcSet;

const getPictureSrc = (type, source, $) => {

	if($(`${bannerSelector} picture`).length > 0) {

		if (source) {
			imageSrcSet = $(`${bannerSelector} picture source:nth-of-type(${source})`)[0].attribs.srcset;
		}

		if (type === 'normal') {
			return (
				splitSrcetToArray(
					sanitizeInput(
						imageSrcSet
					)
				)[0]
			)
		} else if (type === 'retina') {
			return (
				filterItems(
					splitSrcetToArray(
						sanitizeInput(
							imageSrcSet
						)
					), '@2x'
				)[0]

			)
		} else if (type === 'png') {
			return $(`${bannerSelector}-image`).attr("src")
		}
	} else {
		return 'srcset no exists'
	}

};

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
					normal: getPictureSrc('normal', 1, $),
					retina: getPictureSrc('retina', 1, $),
				},
			},
			md: {
				webP: {
					normal: getPictureSrc('normal', 2, $),
					retina: getPictureSrc('retina', 2, $),
				},
			},
			lg: {
				webP: {
					normal: getPictureSrc('normal', 3, $),
					retina: getPictureSrc('retina', 3, $),
				},
			},
			xl: {
				webP: {
					normal: getPictureSrc('normal', 4, $),
					retina: getPictureSrc('retina', 4, $),
				},
				png: {
					normal: getPictureSrc('png', null, $),
					retina: getPictureSrc('png', null, $),
				},
			},
			alt: $(`${bannerSelector}-image`).attr("alt"),
		},
	}
)


export default getBanner


