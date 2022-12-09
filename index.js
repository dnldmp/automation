const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const url = require("url");
const queryString = require("query-string");
const { default: axios } = require("axios");
const puppeteer = require("puppeteer-core");
const { executablePath } = require("puppeteer");

const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "application/json" }));

app.post("/api", async (req, res) => {
  const { link } = req.body;

  if (!link) return res.send("no link");

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    ignoreHTTPSErrors: true,

    // add this
    executablePath: executablePath(),
  });
  const page = await browser.newPage();

  await page.goto(link);
  await page.waitForSelector(".spinner");
  await browser.close();

  res.send("sucesss");

  // const urlparsed = url.parse(link);
  // const { payment_intent, publishable_key, payment_intent_client_secret } =
  //   queryString.parse(urlparsed.query);

  // axios
  //   .get(
  //     `https://api.stripe.com/v1/payment_intents/${payment_intent}?key=${publishable_key}&is_stripe_sdk=true&client_secret=${payment_intent_client_secret}`
  //   )
  //   .then((response) => {
  //     res.send(response.data);
  //   });
});

app.listen(process.env.PORT || 3000);
