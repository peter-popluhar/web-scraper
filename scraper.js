const axios = require('axios');
const cheerio = require('cheerio');

const page = '/feature/social-media-collaboration'

const url = `https://www.socialbakers.com/${page}`;

axios(url)
    .then(response => {
        const copy = [];
        const html = response.data;
        const $ = cheerio.load(html);
        const bannerHeader = $('.feature-page__banner-title').text().trim()
        const bannerPerex = $('.feature-page__banner-perex').text().trim()
        //const test = $('.feature-page__features-perex').eq(3).html().trim().replace(/\s+/g, ' ');
        const test = $('.feature-page__features-perex').each((i, el) => {
            copy.push({
                perex: $(el).html().trim().replace(/\s+/g, ' ')
            })

        });


        //console.log(bannerHeader);


            //copy.bannerHeader = bannerHeader;
            //copy.bannerPerex = bannerPerex;
            //copy.test = test;


        console.log(copy);
    })
    .catch(console.error);
