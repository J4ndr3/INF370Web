import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-type-modify',
  templateUrl: './product-type-modify.component.html',
  styleUrls: ['./product-type-modify.component.sass']
})
export class ProductTypeModifyComponent implements OnInit {
  ProductType: any;
  EditForm : FormGroup;
  ProductTypeSelection:number =0; //if you have a select list
  ProductTypeOptions:Array<object>; //if you have a select list
  nProductType:object;
  rcv: object;
  
  constructor(private router:Router,private data: ERPService, private formBuilder: FormBuilder, private toastrService: ToastrService ) { }

  ngOnInit() {
    
    this.EditForm = this.formBuilder.group({
      ID:[], // your attributes
      Description: [] // your attributes
      });
      this.edt();

  }
  edit(ID){
    this.data.GetProductTypes(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/product-type");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/product-type-modify");
       
        
      }})
    
  }
  edt(){
    this.data.GetProductTypes(this.data.nID).subscribe(res=>{     
      this.ProductType = res;
      this.EditForm.setValue({
        ID:this.ProductType.Prod_ID,
        Description:this.ProductType.Description
        })    
    })
  }
    update(){
      var Description = this.EditForm.get('Description').value; //the name in red the same as on you html
      var ID = this.EditForm.get('ID').value;
  
      if (Description=="") {
        document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
      }
      else {
        this.nProductType = {
          "Prod_ID":ID, //selfde as die databasis 
          "Description": Description, //selfde as die databasis
        };
        // console.log(this.nProductType);
        this.data.PutProductType(ID,this.nProductType).subscribe(res => {
          this.rcv = res
          // console.log(this.rcv);
          if (this.rcv == null)
          {
            this.showToast();
          }
          else
          {
            document.getElementById("inputErr").click();
          }
        });
      }
      


  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/product-type");
  }
}

