import { Get, Controller, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from 'firebase.service';
import { DocumentSnapshot } from '@google-cloud/firestore';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Get()
  root(@Res() res) {
    
    this.firebaseService.fetchAllProducts().then(querySnapshot => {
      let data = [];
      querySnapshot.forEach((documentSnapshot: DocumentSnapshot) => {
        data.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
      })
      res.json(data);
    })
  }
}
