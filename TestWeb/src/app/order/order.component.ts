import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ModifyOrderComponent }  from '../modify-order/modify-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  Orders: object;
  AddForm: FormGroup;
  NewOrder:object;
  AssetSelection:number =0;
  AssetOptions:Array<object>;
  TypeSelection:number =0;
 TypeOptions:Array<object>; 
  SupplierSelection:number =0;
  SupplierOptions:Array<object>;  
  nOrder:object;
  searchText;
  EventRewardAddSelection:number =0;
  EventRewardAddOptions:Array<object>; 
  StatusOptions:Array<object>; 


  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder, private mod: ModifyOrderComponent) { }

  ngOnInit(){ 
    this.data.GetOrder().subscribe(res1=>{
      // console.log("halllloooooo"+res1)
      this.Orders = res1;
      
    });

    
    this.AddForm = this.formBuilder.group({
      ID: [],
      Date: [],
      Supplier: ["Supplier..."],
      Status: ["Status..."],
      Type: ["Type..."],
      Asset: ["Asset..."],
      });
    this.data.GetAssets().subscribe(res=>{
      this.AssetOptions = JSON.parse(JSON.stringify(res));
      // console.log(res)
    })
      this.data.GetTypes().subscribe(res=>{
        this.TypeOptions = JSON.parse(JSON.stringify(res));
        // console.log(res)
      })
        this.data.GetSupplier().subscribe(res=>{
          this.SupplierOptions = JSON.parse(JSON.stringify(res));
          // console.log(res)
    })
    this.data.GetOrder().subscribe(res=>{
      this.StatusOptions = JSON.parse(JSON.stringify(res));
      // console.log(res)
})

  
  }
  
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }

  addOrder(){
  // var ID = this.AddForm.get('ID').value;
    var Date = this.AddForm.get('Date').value;
    var Asset = this.AddForm.get('Asset').value;
    var Status = this.AddForm.get('Status').value;
    var Type = this.AddForm.get('Type').value;
    var Supplier = this.AddForm.get('Supplier').value;
    

    if (Date==""||Asset==""||Type==""||Status=="" || Supplier=="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nOrder = {
       
        "Date": Date,
        "Asset_ID": Asset,
        "Status" : Status,
        "Asset_Type_ID": Type,
        "Supplier_ID": Supplier,
    
      };
      // console.log(this.nOrder);
      this.data.PostOrder(this.nOrder).subscribe(res => {
        var OL = {
          "Asset_ID":Asset,
          "Order_ID":res["Order_ID"]
        }
        this.data.PostOrderLine(OL).subscribe(res=>{
          // console.log(res)
        })
        this.ngOnInit();
        this.Event();
      });
    }
  }
  Event(){
    this.toastrService.show("This record was added successfully", "Success!");
  }
  del(){
    this.data.DeleteOrder(this.data.nID).subscribe(res=>{
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
    this.mod.edit(ID);
   }
}