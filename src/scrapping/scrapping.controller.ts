import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';

@Controller('api')
export class ScrappingController {
  constructor(private readonly scrapper: ScrappingService) {}

  @Post('/translate')
  async transcriptway(
    @Body() authType: string,
    @Req() req,
    @Res() res,
  ): Promise<any> {
    try {
      const { authType, text } = req.body;
         if (authType === '*P&2%E!') {
          if (text && typeof (text === String)) {
              const consequentText = await this.scrapper.transcrapper();
              console.log (consequentText)
            res
              .status(200)
              .json({ success: true, response: consequentText });
          } else {
            res.status(407).json({ success: false, message: 1 });
          }
        } else {
          res.status(401).json({ success: false, message: 2 });
        }
    } catch (err) {
      console.log('Server Error => ', err);
      res.status(500).json({
        success: false,
        message: 4,
      });
    }
  }
}
