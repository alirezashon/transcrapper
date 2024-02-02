import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer-core';
import { Observable, Subject, elementAt } from 'rxjs';

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
      await this.page.goto(
        'https://www.google.com/search?q=google+translate&rlz=1C1GCEA_enIR1037IR1038&oq',
      );
      // await this.page.goto('https://abadis.ir/translator/');
      await this.page.waitForSelector('div[class="QS5gu sy4vM"]');
      await this.page.click('div[class="QS5gu sy4vM"]');
    }
  }
  async translate(text: string): Promise<void> {
    const textarea = 'textarea[id="tw-source-text-ta"]';
    await this.page.focus(textarea);

    await this.page.keyboard.down('Control');
    await this.page.keyboard.press('A');
    await this.page.keyboard.up('Control');
    await this.page.type(textarea, `${text}`);

    await Promise.resolve(setTimeout(() => {}, 1111));
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(222);
    const result = 'span[class="Y2IQFc" lang="en"]'
    const consequentElement = await this.page.waitForSelector(result);
    const consequentText: any = await consequentElement?.evaluate(
      (el) => el.textContent,
    );
    this.translationResultSubject.next(consequentText);
  }
}
// import { Injectable } from '@nestjs/common';
// import puppeteer, { Browser, Page } from 'puppeteer-core';
// import { Observable, Subject, elementAt } from 'rxjs';

// @Injectable()
// export class ScrappingService {
//   private browser: Browser | null = null;
//   private translationResultSubject = new Subject<String | null>();
//   private page: Page;

//   getTranslationResultObservable(): Observable<String | null> {
//     return this.translationResultSubject.asObservable();
//   }

//   async transcrapper(): Promise<void> {
//     if (!this.browser) {
//       this.browser = await puppeteer.launch({
//         headless: false,
//         executablePath:
//           'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//       });
//       this.page = await this.browser.newPage();
//       await this.page.goto(
//         'https://www.google.com/search?q=google+translate&rlz=1C1GCEA_enIR1037IR1038&oq',
//       );
//       // await this.page.goto('https://abadis.ir/translator/');
//       await this.page.waitForTimeout(2222);
//     }

//   }
//   async translate(text: string): Promise<void> {
//     await this.page.focus('#tbSr');
//     await this.page.keyboard.down('Control');
//     await this.page.keyboard.press('A');
//     await this.page.keyboard.up('Control');
//     await this.page.type('#tbSr', `${text}`);

//     await Promise.resolve(setTimeout(() => {}, 1111));
//     await this.page.keyboard.press('Enter');
//     await this.page.waitForTimeout(222);
//     const consequentElement = await this.page.waitForSelector('.boxMain');
//     const consequentText: any = await consequentElement?.evaluate(
//       (el) => el.textContent,
//     );
//     this.translationResultSubject.next(consequentText);
//   }
// }
