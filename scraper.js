const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const page = '/feature/social-media-analytics'

const url = `https://www.socialbakers.com/${page}`;

let metaTagsData = {}
let heroBannerData = {}
let subtitleData = {}
let copy = {}

function splitSrcetToArray(str) {
    let arr = str.split(' ');
    return arr
}

// TODO get non retina => chack if item doesnt have '@2x' and its length is more than for ex.: 5
const filterItems = (arr, query) => {
    return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
};

const sanitizeInput = (input) => {
    return input.trim().replace(/\s+/g, ' ')
}

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        const bannerImageSelector = '.feature-page__banner picture source';

        metaTagsData = {
            title: sanitizeInput($("title").text()),
            description: sanitizeInput($('meta[name=description]').attr("content")),
            ogTitle: sanitizeInput($('meta[property="og:title"]').attr("content")),
            ogDescription: sanitizeInput($('meta[property="og:description"]').attr("content")),
            ogImage: sanitizeInput($('meta[property="og:image"]').attr("content")),
            ogUrl: sanitizeInput($('meta[property="og:url"]').attr("content")),
            shareTwitterTitle: sanitizeInput($('meta[name="twitter:title"]').attr("content")),
            shareTwitterText: sanitizeInput($('meta[name="twitter:description"]').attr("content")),
        };

        heroBannerData = {
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
                        normal: '',
                        retina: '',
                    },
                },
                alt: $('.feature-page__banner-image').attr("alt"),
            },
        };

        subtitleData = {
            title: sanitizeInput($('.feature-page__description-title').text()),
            content: sanitizeInput($('.feature-page__description-perex').text()),
        };

        copy = {
            metaTagsData: metaTagsData,
            heroBannerData: heroBannerData,
            subtitleData: subtitleData,
        };



        console.log(
            copy
        )

        let jsonContent = JSON.stringify(copy, undefined, 2);
        fs.writeFile("output.js", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });



    })
    .catch(console.error);

