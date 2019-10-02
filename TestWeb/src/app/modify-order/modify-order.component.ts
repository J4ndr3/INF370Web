import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { type } from 'os';



@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.sass']
})
export class ModifyOrderComponent implements OnInit {
  Order :any;
  EditForm : FormGroup;
  AssetSelection:number =0;
  AssetOptions:Array<object>;
  TypeSelection:number =0;
 TypeOptions:Array<object>; 
  SupplierSelection:number =0;
  SupplierOptions:Array<object>;  
  nOrder:object;
  rcv: object;
  EventRewardAddSelection:number =0;
  EventRewardAddOptions:Array<object>; 
  StatusOptions:Array<object>; 
 
  constructor(private router:Router,private data: ERPService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
        ID: [],
        Date: [],
        Supplier: [],
        Status: [],

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
    
    
     this.edt();
  }
  edit(ID){
    this.data.GetOrders(ID).subscribe(res=>{ //iets fout met ID
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/order");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/modify-order");
        //this.ngOnInit();
       
      }})
    
  }
  edt(){
     this.data.GetOrders(this.data.nID).subscribe(res=>{     
      this.Order= res;
      var date = new Date(this.Order.Date);
          var year = date.getFullYear();
          
          if (date.getMonth()<10){
          var  month = ("0"+date.getMonth()).toString();
          }
          else{
            var month = date.getMonth().toString();
          }
          if (date.getDay()<10){
            var  day = ("0"+date.getDay()).toString();
            }
            else{
              var day = date.getDay().toString();
            }
         
      // console.log(res)
      var Date1 =year+"-"+month+"-"+day;
      this.EditForm.setValue({ID:this.Order.Order_ID,
        Date:Date1,
        Status:this.Order.Status,
        Supplier:this.Order.Supplier_ID})    
    })
  }
  update(){
    var Date = this.EditForm.get('Date').value; //the name in red the same as on you html
    var Supplier = this.EditForm.get('Supplier').value;
    var ID = this.EditForm.get('ID').value;
    var Status = this.EditForm.get('Status').value;

    if (Date==""||Status==""||Supplier==""||ID =="") {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nOrder = {

        "Order_ID":ID, //selfde as die databasis 
        "Date": Date, //selfde as die databasis
        "Status" : Status,
        "Supplier_ID" : Supplier
      };
      // console.log(this.nOrder);
      this.data.PutOrder(ID,this.nOrder).subscribe(res => {
        this.rcv = res
        // console.log(this.rcv);
        if (this.rcv == null)
        {
          this.showToast();
          this.router.navigateByUrl("/order");
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

  }



  // Toast(){
  //   this.toastrService.show("Order modified.", "Success!");
  // }
}

