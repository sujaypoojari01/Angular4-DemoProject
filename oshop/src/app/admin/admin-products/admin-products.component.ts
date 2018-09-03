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
    // this.dataRef=this.productService.getAll();
    // this.products$=this.dataRef.snapshotChanges().pipe(map(changes=>{
    //   console.log(changes);

    // }));

    /* this.subscription = this.productService
      .getAll()
      .valueChanges()
      .subscribe(product => (this.filteredProducts = this.products = product));
    console.log(this.products); */

    this.products$ = productService.getAll().valueChanges();
    /* this.products = db.list("/products").valueChanges(); */
    /*  console.log(this.products); */
  }

  /* filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
  } */
  ngOnInit() {
    var x = this.productService.getAll();
    x.snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = "" + element.key;
        console.log(element.key);
        console.log(y);

        this.productList.push(y as AppUser);
      });
    });
    console.log("Product List");
    console.log(this.productList);
  }

  onEdit(product: AppUser) {
    this.productService.selectedProduct = product;
    this.route.navigate(["/admin/products/", product.$key]);
  }
  ngOnDestroy() {}
}
