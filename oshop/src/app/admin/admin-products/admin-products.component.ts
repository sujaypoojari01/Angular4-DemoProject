import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  dataRef;
  constructor(private productService : ProductService) { 
    // this.dataRef=this.productService.getAll();
    // this.products$=this.dataRef.snapshotChanges().pipe(map(changes=>{
    //   console.log(changes);
      
    // }));

    this.products$ = productService.getAll().valueChanges();
    console.log(this.products$);
    
  }

  ngOnInit() {
  }



}
