import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../category.service";

import { AngularFireObject, AngularFireList } from "angularfire2/database";
import { ProductService } from "../../product.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    let id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.productService
        .get(id)
        .valueChanges()
        .subscribe(p => (this.product = p));

    console.log("key is " + this.product);
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(snaps => {
      this.categories$ = snaps;
    });
  }

  save(product) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }
}
