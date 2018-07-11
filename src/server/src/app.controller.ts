import { Get, Post, Controller, Res, Param } from '@nestjs/common';
import { FirebaseService } from 'firebase.service';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { ScalablePressService } from 'scalable-press.service';

@Controller()
export class AppController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly scalablePressService: ScalablePressService
  ) {}

  @Get('products')
  root(@Res() res) {
    this.firebaseService.fetchAllProducts().then(querySnapshot => {
      let data = [];
      querySnapshot.forEach((documentSnapshot: DocumentSnapshot) => {
        data.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
      })
      res.json(data);
    })
  }

  @Get('products/:id')
  fetchProduct(@Res() res, @Param() params) {
    this.firebaseService.fetchProduct(params.id).then(response => {
      res.json(response.data());
    })
  }

  @Get('products/:id/quote')
  fetchProductQuote(@Res() res, @Param() params) {
    this.scalablePressService.fetchQuoteForProduct(params.id).then(quote => {
      res.json(quote)
    })
  }

}
