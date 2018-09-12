import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../category.service";

import { ProductService } from "../../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppUser } from "../../model/app-user";
import { element } from "../../../../node_modules/@angular/core/src/render3/instructions";
import { NgForm } from "../../../../node_modules/@angular/forms";
import { take, elementAt, map } from "rxjs/operators";
import { ProductData } from "../../ProductData";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: ProductData = {
    category: null,
    imageUrl: null,
    price: 0,
    title: null
  };
  /* arr = {
    0: String,
    1: String,
    2: 0,
    3: String
  }; */
  data = [];
  product1;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  tempProduct;

  ngOnInit() {
    this.productService.getAll();
    this.resetForm();
    this.categoryService.getCategories().subscribe(snaps => {
      this.categories$ = snaps;
    });

    this.tempProduct = this.productService.getSavedProduct();

    /*  */
  }

  onSubmit(productForm: NgForm) {
    if (!productForm.value.$key)
      this.productService.insertProduct(productForm.value);
    else this.productService.updateProduct(productForm.value);
    this.resetForm(productForm);
    this.router.navigate(["/admin/products"]);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) productForm.reset();
    this.productService.selectedProduct = {
      $key: null,
      category: "",
      imageUrl: "",
      title: "",
      price: 0
    };
  }
}
