import { Get, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res) {
    res.json({hi: 'hello from the api'});
  }
}
