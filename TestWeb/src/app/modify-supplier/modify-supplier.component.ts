import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modify-supplier',
  templateUrl: './modify-supplier.component.html',
  styleUrls: ['./modify-supplier.component.sass']
})
export class ModifySupplierComponent implements OnInit {
  Supplier: any;
  EditForm : FormGroup;
  nSupplier:object;
  rcv: object;
  
  
  constructor(private toastrService: ToastrService,private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
   this.EditForm = this.formBuilder.group({
    Name: [], // Names for your input
    Contact: [], // Names for your input 
    Email: [],
    Address: [],
    ID:[]
      });

      this.edt();
    }
      edit(ID){
        this.data.GetSuppliers(ID).subscribe(res=>{
          if (res==1)
          {
            alert("Not found");
            this.router.navigateByUrl("/supplier");
          }
          else{
            this.data.nID = ID;
            this.router.navigateByUrl("/modify-supplier");

            //this.ngOnInit();
          }})
        
      }
  edt(){
    this.data.GetSuppliers(this.data.nID).subscribe(res=>{
      this.Supplier = res;
      // console.log(res);
      this.EditForm.setValue({
        ID:this.Supplier.Supplier_ID,
        Name:this.Supplier.Name,
        Contact:this.Supplier.Contact,
        Email:this.Supplier.Email,
        Address:this.Supplier.Address})    
    })
    // console.log(this.Supplier)
  }
  update(){
    var Name = this.EditForm.get('Name').value;
    var Contact = this.EditForm.get('Contact').value;
    var Email = this.EditForm.get('Email').value;
    var Address = this.EditForm.get('Address').value;
    var ID = this.EditForm.get('ID').value;
 

    if (Name==""||Contact==""||Email==""||Address=="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nSupplier = {
        "Supplier_ID":ID,
        "Name": Name,
        "Contact": Contact,
        "Address": Address,
        "Email" : Email,

        
      };
      // console.log(this.nSupplier);
      this.data.PutSupplier(ID,this.nSupplier).subscribe(res => {
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
    this.router.navigateByUrl("/supplier");
  }
}


