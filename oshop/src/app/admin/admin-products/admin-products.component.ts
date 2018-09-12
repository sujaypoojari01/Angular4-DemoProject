import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../product.service";
import { Subscription, Observable } from "rxjs";
import { AngularFireDatabase } from "angularfire2/database";
import { AppUser } from "../../model/app-user";
import { Router } from "../../../../node_modules/@angular/router";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$;
  products: Observable<any[]>;
  filteredProducts: any[];
  subscription: Subscription;
  dataRef;
  productList: AppUser[];
  constructor(
    private productService: ProductService,
    private db: AngularFireDatabase,
    private route: Router
  ) {
    this.products$ = productService.getAll().valueChanges();
  }

  ngOnInit() {
    var x = this.productService.getAll();
    x.snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = "" + element.key;
        this.productList.push(y as AppUser);
      });
    });
  }

  onEdit(product: AppUser) {
    this.productService.selectedProduct = product;
    this.productService.saveProductDetails(product);
    this.route.navigate(["/admin/products/", product.$key]);
  }

  onDelete(product: AppUser) {
    this.productService.deleteProduct(product.$key);
  }
  ngOnDestroy() {}
}
