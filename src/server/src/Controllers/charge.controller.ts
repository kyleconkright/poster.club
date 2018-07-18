import { Post, Controller, Body, Res, Req } from '@nestjs/common';
const stripe = require('stripe')('sk_test_TwTTlid3GeOG6YPydOjARw4I');

@Controller()
export class ChargeController {
    constructor() { }

    @Post('charge')
    async charge(@Body() body, @Res() res, @Req() req) {
        console.log(req.body.body);
        try {
            let { status } = await stripe.charges.create({
                amount: 2000,
                currency: 'usd',
                description: 'An example charge',
                source: req.body.body,
            });
            console.log(status);
            res.json({ status });
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    }

}
