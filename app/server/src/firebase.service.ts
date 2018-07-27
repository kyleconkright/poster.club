import { Get, Injectable, Res, Param, HttpException, HttpStatus } from '@nestjs/common';

import { firebaseConfig, serviceAccount, project } from './../../../config';
import * as admin from 'firebase-admin';

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

const products = app.firestore().collection('products');
const orders = app.firestore().collection('orders');

@Injectable()
export class FirebaseService {

  fetchAllProducts() {
    return products.get();
  }

  fetchProduct(id) {
      return products.doc(id).get();
  }
  
  updateProduct(id, product) {
      return products.doc(id).update(product);
  }

  createOrder(order) {
    return orders.add(order);
}

}
