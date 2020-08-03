const cheerio = require("cheerio");

module.exports.getCheerioData = (htmlPage) => cheerio.load(htmlPage);
