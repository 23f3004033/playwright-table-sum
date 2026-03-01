const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 81; seed <= 90; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for tables to load
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => Number(cell.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;

    console.log(`Seed ${seed} sum: ${pageSum}`);
  }

  console.log("FINAL TOTAL:", totalSum);

  await browser.close();
})();