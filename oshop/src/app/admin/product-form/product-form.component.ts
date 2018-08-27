import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../category.service";

import { AngularFireObject, AngularFireList } from "angularfire2/database";
import { ProductService } from "../../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppUser } from "../../model/app-user";
import { element } from "../../../../node_modules/@angular/core/src/render3/instructions";
import { NgForm } from "../../../../node_modules/@angular/forms";

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
    /* var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    }); */

    let id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.productService
        .get(id)
        .valueChanges()
        .subscribe(p => (this.product = p));

    console.log("key is " + this.product);

    /*  this.categoryService.getCategories().subscribe(snaps => {
    this.categories$ = snaps;
    }); */
  }

  ngOnInit() {
    this.productService.getAll();
    this.resetForm();
    this.categoryService.getCategories().subscribe(snaps => {
      this.categories$ = snaps;
    });
    /*  */
  }

  /* save(product) {
    console.log(product);
    this.productService.insertProduct(product);
    this.router.navigate(["/admin/products"]);
  } */

  onSubmit(productForm: NgForm) {
    this.productService.insertProduct(productForm.value);
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
