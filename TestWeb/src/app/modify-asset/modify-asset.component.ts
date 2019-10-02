import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modify-asset',
  templateUrl: './modify-asset.component.html',
  styleUrls: ['./modify-asset.component.sass']
})
export class ModifyAssetComponent implements OnInit {
  Asset: any;
  EditForm : FormGroup;
  SupplierSelection:number =0; //if you have a select list
  SupplierOptions :Array<object>; //if you have a select list
  TypeSelection:number =0; //if you have a select list
 TypeOptions :Array<object>; //if you have a select list
  StatusSelection:number =0; //if you have a select list
  StatusOptions :Array<object>; //if you have a select list
  nAsset:object;
  rcv: object;
  
  
  constructor(private toastrService: ToastrService, private router:Router,private data: ERPService, private formBuilder: FormBuilder  ) { }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      ID:[],// your attributes
      Description: [] ,
      Type:[],
      Status:[]
      });
    this.data.GetSupplier().subscribe(res=>{
      this.SupplierOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetTypes().subscribe(res=>{
      this.TypeOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetStatus().subscribe(res=>{
      this.StatusOptions = JSON.parse(JSON.stringify(res));
    })
    
      this.edt();
  }
  edit(ID){
    this.data.GetAsset(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/asset");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/modify-asset");
        //this.ngOnInit();
        
      }})
    
  }
  edt(){
    this.data.GetAsset(this.data.nID).subscribe(res=>{     
      this.Asset = res;
      // console.log(this.Asset)
      this.EditForm.setValue({ID:this.Asset.Asset_ID,
        Description:this.Asset.Description,
        Type:this.Asset.Asset_Type_ID,
        Status:this.Asset.Asset_Status_ID
        })    
    })
  }
  update(){
    var Status = this.EditForm.get('Status').value; //the name in red the same as on you html
    var Descriprion = this.EditForm.get('Description').value; //the name in red the same as on you html
    //var Supplier = this.EditForm.get('Supplier').value;
    var Type = this.EditForm.get('Type').value;
    var ID = this.EditForm.get('ID').value;

    if (Status==""||Descriprion==""||Type=="" ) {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nAsset = {
      "Asset_ID":ID,
        "Description": Descriprion, //selfde as die databasis
        "Asset_Type_ID": Type,
        "Asset_Status_ID" : Status,
       // "Supplier" : Supplier,
        
      };
      // console.log(this.nAsset);
      this.data.PutAsset(ID,this.nAsset).subscribe(res => {
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
    this.router.navigateByUrl("/asset");
  }




  Toast(){
    this.toastrService.show("Asset modified.", "Success!");
  }
}
