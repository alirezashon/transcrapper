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
    }
    await this.page.waitForSelector('div[class="QS5gu sy4vM"]');
    
    await Promise.resolve(setTimeout(() => {}, 1111));
    await this.page.click('div[class="QS5gu sy4vM"]');

    // await this.page.waitForSelector('div[class="hhB0V"]')
    // await this.page.click('div[class="hhB0V"]');
    // await Promise.resolve(setTimeout(() => {}, 222));

    // // await this.page.click('div[class="DQEUec z1asCe K1bG5d"]');
    // await this.page.waitForSelector('div[class="DQEUec z1asCe K1bG5d"]');
    // await this.page.click('div[class="DQEUec z1asCe K1bG5d"]');
  }
  async translate(text: string): Promise<void> {
    const textarea = 'textarea[id="tw-source-text-ta"]';
    await this.page.focus(textarea);

    await this.page.keyboard.down('Control');
    await this.page.keyboard.press('A');
    await this.page.keyboard.up('Control');
    await this.page.type(textarea, `${text}`);

    // await this.page.$eval('span[class="target-language"]', (span) => {
    //   span.textContent = 'German';
    // });

    await Promise.resolve(setTimeout(() => {}, 1111));
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(222);

    const result = 'span[class="Y2IQFc"][lang="en"]';
    const timeout = 3000000;
    try {
      const consequentElement = await this.page.waitForSelector(result, {
        timeout,
        visible: true,
      });

      if (consequentElement) {
        const consequentText: any = await consequentElement.evaluate(
          (el) => el.textContent,
        );

        this.translationResultSubject.next(consequentText);
      } else {
        console.error('Element not found within the specified timeout.');
      }
    } catch (error) {
      console.error('Error while waiting for selector:', error);
    }
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
