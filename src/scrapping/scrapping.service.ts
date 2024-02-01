import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';
 import { Observable, Subject } from 'rxjs';

@Injectable()
export class ScrappingService {
 
  private browser: Browser | null = null;
  private translationResultSubject = new Subject<String | null>();

  getTranslationResultObservable(): Observable<String | null> {
    return this.translationResultSubject.asObservable();
  }

  async transcrapper(text: string): Promise<string | null> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: false,
        executablePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      });
    }

    const page: Page = await this.browser.newPage();

    await page.goto('https://abadis.ir/translator/');
    console.log(page);
    await page.waitForTimeout(2222);
    console.log(page);

    await page.type('#tbSr', `${text}`);
    await page.waitForTimeout(2222);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2222);
    const consequentElement = await page.waitForSelector('.boxMain');
    const consequentText: any = await consequentElement?.evaluate(
      (el) => el.textContent,
    );
    this.translationResultSubject.next(consequentText);

    return typeof consequentText === 'string' ? consequentText : '';
  }
}
