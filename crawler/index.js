/**
 * Created by tushar on 13/09/17.
 */

"use strict";

/**
 * Crawls a website using a start {url}, and returns the lexicographically smallest string.
 * @param url
 * @return {Promise.<string>}
 */

const { makeRequest } = require("./api");

const { getCheerioData } = require("./cheerio");

const filterArray = (initialArray, newArray) =>
  newArray.filter((value) => !initialArray.includes(value));

module.exports = (url = "http://localhost:8080") =>
  new Promise((resolve, reject) => {
    const bodyData = [];
    const subLinks = [];
    let subLinkIndex = 0;

    do {
      let subLinkUrl = `${url}${subLinks[subLinkIndex] || ""}`;

      if (!subLinks[subLinkIndex] && subLinks.length > 0) {
        reject("Something is wrong ");
        break;
      }

      let result;
      try {
        result = await makeRequest(subLinkUrl);
      } catch (error) {
        let errorText = error.message
          ? error.message
          : "Something went wrong";

        reject(errorText);
        break;
      }

      let $ = getCheerioData(result);

      let tempLinkArr = [];

      $(".link").each((_, element) => tempLinkArr.push(element.attribs.href));

      $(".codes h1").each((_, element) => bodyData.push($(element).html()));

      let newSubLinks = filterArray(subLinks, tempLinkArr);
      subLinks.push(...newSubLinks);

      ++subLinkIndex;
    } while (subLinks[subLinkIndex]);

    let finalResult = bodyData.sort((a, b) => a.localeCompare(b))[0];
    console.log("finalResult",finalResult)
    resolve(finalResult);
  });
