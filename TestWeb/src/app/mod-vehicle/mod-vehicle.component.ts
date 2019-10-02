import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-mod-vehicle',
  templateUrl: './mod-vehicle.component.html',
  styleUrls: ['./mod-vehicle.component.sass']
})
export class ModVehicleComponent implements OnInit {
  Vehicle: any;
  EditForm : FormGroup;
  YourSelection:number =0; //if you have a select list
  ModelSelection:number =0;
  TypeSelection:number =0;
  ModelOptions:Array<object>;
  Models:Array<object>;
  TypeOptions:Array<object>; //if you have a select list
  nVehicle:object;
  rcv: object;

  
  constructor(private toastrService: ToastrService,private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.data.GetModels().subscribe((res) => {
      this.ModelOptions = JSON.parse(JSON.stringify(res));
    }); 
    this.data.GetVehicle_types().subscribe((res) => {
      this.TypeOptions = JSON.parse(JSON.stringify(res));
    }); 

    this.EditForm = this.formBuilder.group({
      ID:[], 
      Model:[], 
      Registration:[],
      Colour:[],
      Type:[],
      Status:[],
      });
      this.edt();
  }

  edit(ID){
    this.data.GetVehicle(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/vehicle");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/mod-vehicle");
        // this.ngOnInit();
        
        // console.log(ID);
      }})
  }

  edt(){
    this.data.GetVehicle(this.data.nID).subscribe(res=>{     
      this.Vehicle = res;
      this.EditForm.setValue({
        ID:this.Vehicle.Vehicle_ID,
        Model: this.Vehicle.Model_ID, 
        Registration: this.Vehicle.Registration,
        Colour:this.Vehicle.Colour,
        Type:this.Vehicle.Vehicle_Type_ID,
        Status:this.Vehicle.Status,
        })    
    })
  }

  update(){
        var Model= this.EditForm.get('Model').value;
        var Registration=this.EditForm.get('Registration').value;
       var Colour=this.EditForm.get('Colour').value;
      var Type=this.EditForm.get('Type').value;
      var Status=this.EditForm.get('Status').value;
    var ID = this.EditForm.get('ID').value;

    if (Model==""||Registration==""||Colour==""||Type=="" || Status =="") {
      document.getElementById("inputErr").click(); 
    }
    else {
      this.nVehicle = {
        "Vehicle_ID":ID, 
        "Model_ID": Model, 
        "Registration": Registration, 
        "Colour": Colour, 
        "Status": Status,
        "Vehicle_Type_ID":Type,
      };
      // console.log(this.nVehicle);
      this.data.PutVehicle(ID,this.nVehicle).subscribe(res => {
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
    this.router.navigateByUrl("/vehicle");
  }
}
