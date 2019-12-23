import {sanitizeInput} from './utils.js'

export const getSubtitleSection =($, copy) => (
	copy.subtitleData = {
		title: sanitizeInput($('.feature-page__description-title').text()),
		content: sanitizeInput($('.feature-page__description-perex').text()),
	}
)

export default getSubtitleSection


