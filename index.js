const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 3000;

const articles = [];

const dietPlan = axios
  .get("https://www.theguardian.com/us")
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("pepper")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      articles.push({
        title,
        url,
      });
    });
  })
  .catch((err) => console.log(err));

app.get("/diet", (req, res) => {
  res.json(articles);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
