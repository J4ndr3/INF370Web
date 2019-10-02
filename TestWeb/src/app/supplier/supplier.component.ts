import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          
import { Router } from '@angular/router';
import { ModifySupplierComponent }  from '../modify-supplier/modify-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.sass']
})
export class SupplierComponent implements OnInit {
  

  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder,private mod:ModifySupplierComponent) { }
  Suppliers: object;
  AddForm: FormGroup;
  NewSupplier:object;
  SupplierSelection:number =0;
  nSupplier:object;
  searchText;


  ngOnInit() {
    
      this.AddForm = this.formBuilder.group({
        Name: [], // Names for your input
        Contact: [], // Names for your input 
        Email: [],
        Address: [],
       
        
      });
      // this.edt();
      this.data.GetSupplier().subscribe(res=>{
        this.Suppliers = res;
    });

  }
 


  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }
  showToastSuccess(){
    this.toastrService.show("Record added Successfully", "Success!");
   
}

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
  
  addSupplier() {
    var Name = this.AddForm.get('Name').value; // Names for your input
    var Contact = this.AddForm.get('Contact').value; // Names for your input
    var Email = this.AddForm.get('Email').value;
    var Address = this.AddForm.get('Address').value;
    

    if ((Name||Contact||Email||Address)=="") {
      //Modal popup
    }
    else {
      this.nSupplier = {
        "Name": Name,
        "Contact": Contact,
        "Email": Email,
        "Address": Address
      };
      // console.log(this.nSupplier);
      this.data.PostSupplier(this.nSupplier).subscribe(res => {
        if (res != null)
        {
          this.ngOnInit();
          this.showToastSuccess();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
        
      });
    }
  }

      del(){
        this.data.DeleteSupplier(this.data.nID).subscribe(res=>{
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
      delToast(){
        this.toastrService.show("Record could not be removed.", "Error!");
      }
      delSuccessToast(){
        this.toastrService.show("Record removed.", "Success!");
      }
      delete(ID){
        this.data.nID = ID;
        document.getElementById('del').click();
    }
   
    edit(ID){
      this.data.nID = ID;
      this.mod.edit(ID);
      // console.log(ID);
     }


}
