
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
		/https:\/\/www.socialbakers.com\/www\/storage\/www/g,
		/"stringLiteralStart/g,
		/stringLiteralEnd"/g,
		/\\"/g,
	],
	to: [
		'export const metaTagsData: MetaTagsTypes =',
		'export const heroBannerData: HeroBannerDataType =',
		'export const subtitleData: SubtitleProps =',
		'export const sectionWithImageData: Array<SectionWithImageTypes> =',
		';export',
		'export',
		'}] ',
		'${wwwCdn}',
		'`',
		'`',
		'"',
	],
};

export default sanitizeOptions
