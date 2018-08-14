import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';

import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$ ;
  constructor(private categoryService: CategoryService,
      private router : Router, 
      private  productService: ProductService){
    
   }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((snaps) => {
      this.categories$ = snaps;
  });
  }

  save(product){
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
    
  }

}
