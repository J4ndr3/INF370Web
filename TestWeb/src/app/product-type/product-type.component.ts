import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';       
import { ProductTypeModifyComponent}  from '../product-type-modify/product-type-modify.component';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.sass']
})
export class ProductTypeComponent implements OnInit {
  ProductTypes: object;
  AddForm: FormGroup;
  NewProductType:object;
  ProductTypeSelection:number =0;
  ProductTypeOptions:Array<object>; 
  searchText;
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder, private mod: ProductTypeModifyComponent) { }

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Description: [""], // Names for your input
});
    this.data.GetProductType().subscribe(res=>{
      this.ProductTypes = res;


    });

  }
    showToast(){
      this.toastrService.show("Record could not be added", "Error!");
    }
    showToast1(){
      this.toastrService.show("Record added be successfully", "Error!");
    }
    delToast(){
      this.toastrService.show("Record could not removed.", "Error!");
    }
    delSuccessToast(){
      this.toastrService.show("Record removed.", "Success!");
    }
  
  edit(ID){
    this.mod.edit(ID);
  }



  
  addProductType() {
    var Description = this.AddForm.get('Description').value; // Names for your input
    

    if ((Description)=="") {
      //Modal popup
    }
    else {
      this.NewProductType = {
        "Description": Description, // Names for your input
        
        
      };
      this.data.PostProductType(this.NewProductType).subscribe(res => {
        this.ngOnInit();
        this.showToast1();
      });}}



      delete(ID){
        this.data.nID = ID;
        document.getElementById('del').click();
      }
    del(){
    this.data.DeleteProductType(this.data.nID).subscribe(res=>{
      if (res!=null)
      {
        this.delSuccessToast();
        this.ngOnInit();
      }
      else if (res==2)
      {
        alert("You are not allowed to delete this record");
      }
      else
      {
        this.delToast()
      }
    })

}
}
