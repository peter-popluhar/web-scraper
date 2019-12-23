import {sanitizeInput} from './utils.js'

const getMetaTags = ($, copy) => (
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

export default getMetaTags


