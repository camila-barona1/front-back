import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';
import { SuccessfulDialogComponent } from '../successful-dialog/successful-dialog.component';
import { UnSuccessfulDialogComponent } from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product:Product  = new Product();
   
  successMessage:string ="";
  errMessage: string ="";

  constructor(private productService: ProductService, private dialog:MatDialog, private sharedServices:SharedServiceService) { 
  }

  ngOnInit(): void {

    this.product=this.sharedServices.getProduct();
  }

  
  updateProductForm=new FormGroup({
    productname:new FormControl('',[Validators.required]),
    units: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get productname(){
    return this.updateProductForm.get('productname');
  }

  get units(){
    return this.updateProductForm.get('units');
  }

  get category(){
    return this.updateProductForm.get('category');
  }

  get description(){
    return this.updateProductForm.get('description');
  }

  updateProduct(){

    this.product.productName=this.productname?.value;
    this.product.units=this.units?.value;
    this.product.productCategory=this.category?.value;
    this.product.productDescription=this.description?.value;

    

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
    else if(this.product.units==0 || this.product.units==null)
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: las unidades NO pueden ser 0";
    }
    else if(this.product.productDescription=="")
    {
      this.errMessage="No se pudo agregar el equipo al catálogo: se requiere la descripción del equipo";
    }
    else{
      this.productService.updateProduct(this.product, this.product.productId).subscribe(data => {

        if(data)
        {
          this.openSuccessfulDialog();
        }
        else{
          this.openunSuccessfulDialog();
        }
        
      });

    }

  }
   
  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successfull");
    this.sharedServices.setdialogcontent("Equipo actualizado exitosamente!!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openunSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessfull");
    this.sharedServices.setdialogcontent("El equipo no se pudo actualizar!!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

}
