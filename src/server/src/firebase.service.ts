import { Get, Injectable, Res, Param, HttpException, HttpStatus } from '@nestjs/common';

import { firebaseConfig, serviceAccount, project } from './../../../config';
import * as admin from 'firebase-admin';

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

const database = app.firestore().collection('products');

@Injectable()
export class FirebaseService {

  fetchAllProducts() {
    return database.get();
  }
  
}
