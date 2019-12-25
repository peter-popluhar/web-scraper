import {sanitizeInput} from './utils.js'

const getFeaturesSection = ($, copy) => {
	let data = {}
	let features = []
	const $sections = $('.feature-page__features .row')
	const srcSet = (el) => {
		if ($(el).find('img').attr("data-src")) {
			return $(el).find('img').attr("data-src")
		}
		return $(el).find('img').attr("src")
	}
	$sections.each( (i, obj) => {
		data = {
			data: {
				headline: sanitizeInput($(obj).find('h3').text()),
				text: 'stringLiteralStart' + sanitizeInput($(obj).find('p').html()) + 'stringLiteralEnd',
				img: {
					normal: 'stringLiteralStart' + srcSet(obj) + 'stringLiteralEnd',
					retina: 'stringLiteralStart' + srcSet(obj).replace('.png', '@2x.png') + 'stringLiteralEnd',
				},
			},
			reversed: i % 2 !== 0
		}
		features.push(data)

	})
	return copy.sectionWithImageData = features

}


export default getFeaturesSection


