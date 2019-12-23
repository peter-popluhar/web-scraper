
const sanitizeOptions = {
	files: ``,
	from: [
		/"metaTagsData":/g,
		/"heroBannerData":/g,
		/"subtitleData":/g,
		/"sectionWithImageData":/g,
		/,export/g,
		/{export/g,
		/}]}/g,
	],
	to: [
		'export const metaTagsData: MetaTagsTypes =',
		'export const heroBannerData: HeroBannerDataType =',
		'export const subtitleData: SubtitleProps =',
		'export const sectionWithImageData: Array<SectionWithImageTypes> =',
		';export',
		'export',
		'}] ',
	],
};

export default sanitizeOptions
