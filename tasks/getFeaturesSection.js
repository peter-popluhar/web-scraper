import {sanitizeInput} from './utils.js'

const getFeaturesSection = ($, copy) => {
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
			reversed: i % 2 !== 0
		}
		features.push(data)

	})
	return copy.sectionWithImageData = features

}


export default getFeaturesSection


