import { Page } from 'playwright';

export const scrollPageToEnd = async (page: Page) => {
  const scrollStep = 250; // Scroll down by 250 pixels

  while (true) {
    await page.evaluate((scrollStep) => {
      window.scrollBy(0, scrollStep);
    }, scrollStep);

    await page.waitForTimeout(50);

    const totalScroll = await page.evaluate(() => {
      return Math.ceil(document.body.scrollHeight - window.innerHeight);
    });

    const currentScroll = await page.evaluate(() => {
      return Math.ceil(window.scrollY);
    });

    if (currentScroll >= totalScroll) {
      break;
    }
  }
};
