import { Get, Post, Controller, Res, Param, Req, Body } from '@nestjs/common';
import { FirebaseService } from 'firebase.service';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { ScalablePressService } from 'scalable-press.service';

@Controller()
export class AppController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly scalablePressService: ScalablePressService,
  ) {}

  @Get('products')
  root(@Res() res) {
    this.firebaseService.fetchAllProducts().then(querySnapshot => {
      const data = [];
      querySnapshot.forEach((documentSnapshot: DocumentSnapshot) => {
        data.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
      });
      res.json(data);
    });
  }

  @Get('products/:id')
  fetchProduct(@Res() res, @Param() params) {
    this.firebaseService.fetchProduct(params.id).then(response => {
      res.json(response.data());
    });
  }

  @Post('products/:id/quote')
  fetchProductQuote(@Body() body, @Res() res, @Req() req, @Param() params) {
    this.scalablePressService.fetchQuoteForProduct(params.id, req.body).then(quote => {
      res.json(quote);
    });
  }
}
