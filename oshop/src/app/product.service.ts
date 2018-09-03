import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { map } from "rxjs/operators";
import { AppUser } from "./model/app-user";
import { pipe } from "@angular/core/src/render3/pipe";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  dataRef;
  productList: AngularFireList<any>;
  selectedProduct: AppUser = new AppUser();
  constructor(private db: AngularFireDatabase) {}

  /* create(product) {
    return this.db.list("/products").push(product);
  } */
  getAll() {
    this.productList = this.db.list("/products");
    return this.productList;
    // return this.dataRef;
  }
  insertProduct(product: AppUser) {
    this.productList.push({
      category: product.category,
      imageUrl: product.imageUrl,
      title: product.title,
      price: product.price
    });
  }

  get(productId) {
    console.log(
      "prodID = " +
        productId +
        " and Data: " +
        this.db
          .list("/products/" + productId)
          .valueChanges()
          .pipe(take(1))
    );

    return this.db.list("/products/" + productId);
  }

  updateProduct(product: AppUser) {
    this.productList.update(product.$key, {
      category: product.category,
      imageUrl: product.imageUrl,
      title: product.title,
      price: product.price
    });
  }

  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
