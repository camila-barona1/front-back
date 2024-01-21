import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();
  
  successMessage:string ="";
  errMessage: string ="";

  constructor(private productService:ProductService, private sharedServiceService:SharedServiceService) { 

  }


  ngOnInit(): void {
  }

  addProductForm=new FormGroup({
    
    productid:new FormControl('',[Validators.required]),
    productname:new FormControl('',[Validators.required]),
    units: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get productid(){
    return this.addProductForm.get('productid');
  }

  get productname(){
    return this.addProductForm.get('productname');
  }

  get units(){
    return this.addProductForm.get('units');
  }

  get category(){
    return this.addProductForm.get('category');
  }

  get description(){
    return this.addProductForm.get('description');
  }

  addProduct(){

    this.product.productId=this.productid?.value;
    this.product.productName=this.productname?.value;
    this.product.units=this.units?.value;
    this.product.productCategory=this.category?.value;
    this.product.productDescription=this.description?.value;

    console.log(this.product);


    if(this.product.productId=="")
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: se requiere el ID del equipo";
    }
    else if(this.product.productName=="")
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: se requiere el nombre";
    }
    else if(this.product.productCategory=="")
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: se requiere la categoría";
    }
    else if(this.product.units==0  || this.product.units==null)
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: las unidades NO pueden ser 0";
    }
    else if(this.product.productDescription=="")
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: se requiere la descripción del equipo";
    }
    else{

      this.productService.addProduct(this.product).subscribe(data => {
       
        if(data)
        {
            this.errMessage="";
            this.successMessage="Equipo agregado exitosamente al catálogo";
        }
        else{
          this.successMessage="";
          this.errMessage="No se pudo agregar el equipo al catálogo: verifique las especificaciones";
        }
  
      })

    }

   
  }


}
