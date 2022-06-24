// what this code do? 

// plan


// code
const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto('https://legacy.moralis.io/login', { waitUntil: 'networkidle0' }); // wait until page load

  await page.click('input[type=email]');
  await page.type('input[type=email]', 'muneeb.softblock@gmail.com');

  await page.type('input[type=password]', '9cD?v#nU7g8R?k4');

  //   await page.click('button[type=submit]');

  // await page.type('#email', 'muneeb.softblock@gmail.com');
  // await page.type('#password', '9cD?v#nU7g8R?k4');

  // click and wait for navigation
  //   await page.click('button[type=submit]');

  await Promise.all([page.click('button[type=submit]'), page.waitForNavigation({ waitUntil: 'networkidle0' })]);

  //   await page.click('button[role="button" class="showServerInfo"]'); //role="button" class="showServerInfo"
  //     await page.waitForNavigation();
  //   await Promise.all([page.click('#loginSubmit'), page.waitForNavigation({ waitUntil: 'networkidle0' })]);
}

main();