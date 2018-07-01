import { Get, Post, Injectable, Res, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from 'firebase.service';
import axios from 'axios';
import { project } from './../../../config';

@Injectable()
export class ScalablePressService {

    constructor(
        private readonly firebaseService: FirebaseService
    ) { }

    async fetchQuoteForProduct(id) {
        const img = await this.firebaseService.fetchProduct(id)
        try {
            var design = await axios.post('https://api.scalablepress.com/v2/design', {
                type: 'poster',
                sides: {
                    front: {
                        artwork: img.data().thumbnail,
                        dimensions: {
                            width: 24
                        }
                    }
                }
            }, { auth: { username: 'Freshwall', password: project.scalablePressKey } })
        } catch (error) {
            console.error(error.response.data.issues);
        }
        return design;
    }

}
