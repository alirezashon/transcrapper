import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ScrappingService {
  private browser: Browser | null = null;
  private translationResultSubject = new Subject<String | null>();
  private page: Page;

  getTranslationResultObservable(): Observable<String | null> {
    return this.translationResultSubject.asObservable();
  }

  async transcrapper(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: false,
        executablePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      });
      this.page = await this.browser.newPage();
      await this.page.goto('https://abadis.ir/translator/');
      await this.page.waitForTimeout(2222);
    }
  }
  async translate(text: string): Promise<void> {
    await this.page.type('#tbSr', `${text}`);
    await this.page.waitForTimeout(2222);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2222);
    const consequentElement = await this.page.waitForSelector('.boxMain');
    const consequentText: any = await consequentElement?.evaluate(
      (el) => el.textContent,
    );
    this.translationResultSubject.next(consequentText);
  }
  // return typeof consequentText === 'string' ? consequentText : '';
}
