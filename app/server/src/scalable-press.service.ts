import { Get, Post, Injectable, Res, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from 'firebase.service';
import axios from 'axios';
import { project } from './../../../config';

@Injectable()
export class ScalablePressService {

    constructor(
        private readonly firebaseService: FirebaseService,
    ) { }

        async fetchQuoteForProduct(id, address) {

            var product = await this.firebaseService.fetchProduct(id);
            
            try {
                var design = await axios.post('https://api.scalablepress.com/v2/design', {
                    type: 'poster',
                    sides: {
                        front: {
                            artwork: product.data().img_url,
                            dimensions: {
                                width: 24,
                            }
                        }
                    }
                }, { auth })
            } catch (error) {
                console.error();
            }

            try {
                var order = await axios.post('https://api.scalablepress.com/v2/quote', {
                    type: 'poster',
                    sides: {front: 1},
                    products: [
                        {
                            id: 'matte-poster',
                            quantity: 1,
                            color: 'white',
                            size: 'one'
                        }
                    ],
                    address,
                    designId: design.data.designId,
                }, {
                    auth,
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })
            } catch(error) {
                console.log(error.response.data.issues)
            }

            await this.firebaseService.updateProduct(id, {
                price: order.data.total,
                designId: design.data.designId,
            })
            console.log(order.data);
            return order.data;
        }
}

const auth = {
    username: 'Freshwall',
    password: project.scalablePressKey,
}

const poster = {
    type: 'poster',
    sides: {
        front: {
            dimensions: {
                width: 24,
            }
        }
    }
}
