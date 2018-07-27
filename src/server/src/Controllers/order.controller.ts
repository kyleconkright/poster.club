import { Post, Controller, Body, Res, Req } from '@nestjs/common';
import { FirebaseService } from 'firebase.service';

@Controller()
export class OrderController {
    constructor(
        private firebaseService: FirebaseService
    ) { }

    @Post('order')
    async charge(@Body() body, @Res() res, @Req() req) {
        this.firebaseService.createOrder(req.body);
        console.log(req.body);
    }
}
