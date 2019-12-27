const urlGood = [
	"audience-analytics",
	"audience-segmentation",
	"content-scheduling-and-publishing",
	"facebook-advertising-benchmarks",
	"fake-influencers-detection",
	"find-youtube-influencers",
	"influencer-identification-tool",
	"instagram-management",
	"linkedin-scheduling-tool",
	"paid-social-media-marketing",
	"persona-mapping-tool",
	"personalized-marketing",
	"sentiment-analysis",
	"social-media-analytics",
	"social-media-analytics-tools",
	"social-media-approvals",
	"social-media-automation",
	"social-media-collaboration",
	"social-media-content-curation",
	"social-media-content-insights",
	"social-media-content-planning-tool",
	"social-media-content-workflow",
	"social-media-dashboards-and-reporting",
	"social-media-listening",
	"social-media-optimization",
	"social-media-reporting-tools",
	"social-media-scheduling-tools",
	"social-media-video-analytics",
]

// in index.js change subdomain = `/feature/${alias}` to subdomain = `${alias}` because of url not consistent
const urlBad = [
	"smart-content-publishing-at-scale",
	"easier-social-media-collaboration",
	"the-most-reliable-marketing-platform",
	"audiences-and-influencers",
]

// mess in banner images/formats
const missingWebPInBanner = [
	"live-video-analytics",
	"social-media-content-insights",
	"social-media-content-insights",
	"social-media-benchmarks",
]

// unique design
const unableToParse = [
	"whats-new/youtube-influencers",
]



export const urlAll = [
	...urlGood,
	// ...urlBad,
	// ...missingWebPInBanner,
	// ...unableToParse
]
