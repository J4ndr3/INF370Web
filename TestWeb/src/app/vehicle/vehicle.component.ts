import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';          
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { ModVehicleComponent }  from '../mod-vehicle/mod-vehicle.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.sass']
})
export class VehicleComponent implements OnInit {

  constructor(private router:Router,private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder, private mod:ModVehicleComponent) { }
  Vehicle: object;
  AddForm: FormGroup;
  NewVehicle:object;
  ModelSelection:number =0;
  TypeSelection:number =0;
  ModelOptions:Array<object>=[{Make_ID: any,
    Model: any,
    Model_ID: any,
    Year:any}];
  Models:Array<object>;
  MakeOptions:Array<object>;
  TypeOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal
  searchText;
  Selection;

  select3(){
    this.data.GetModels().subscribe((res) => {
      this.ModelOptions=[];
      this.Models = JSON.parse(JSON.stringify(res));
      this.Models.forEach(element => {
        if (element["Make_ID"] == this.AddForm.get('Make').value)
        {
          this.ModelOptions.push(element);
          this.AddForm.controls['Model'].setValue(element["Model_ID"])
        }
      });
      
    }); 
    
  }
  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Make: ["Make..."], 
      Model: ["Model..."], 
      Registration: ["Registration..."],
      Colour:["Colour..."],
      Type:["Type..."],
      Status:["Status..."]
    });

    this.data.GetMakes().subscribe((res) => {
      this.MakeOptions = JSON.parse(JSON.stringify(res));
    }); 
    this.data.GetModels().subscribe((res) => {
      this.ModelOptions = JSON.parse(JSON.stringify(res));
    }); 
    this.data.GetVehicle_types().subscribe((res) => {
      this.TypeOptions = JSON.parse(JSON.stringify(res));
    }); 

    this.data.GetVehicles().subscribe(res=>{
      this.Vehicle = res;
      if (this.Vehicle[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Vehicle = null ;
      }
      // console.log(this.Vehicle);
    });
  }
  addVehicle() {
    var Make = this.AddForm.get('Make').value; // Names for your input
    var Model = this.AddForm.get('Model').value; // Names for your input
    var Registration = this.AddForm.get('Registration').value;
    var Type = this.AddForm.get('Type').value;
    var Status = this.AddForm.get('Status').value;
    var Colour = this.AddForm.get('Colour').value;
    // console.log(Make, Model,Registration,Type,Status,Colour)

    if (Registration=="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.NewVehicle = {
        //"MakeID": Make, // Names for your input
        "Model_ID": Model, // Names for your input
        "Registration": Registration,
        "Vehicle_Type_ID": Type,
        "Status": 1,
        "Colour": Colour,
      };
      this.data.PostVehicle(this.NewVehicle).subscribe(res => {
        // console.log(this.NewVehicle);
        this.ngOnInit()
      });
    }}

    edit(ID){
      this.mod.edit(ID);
    }
  
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
  delete(ID){
    this.data.nID = ID;
    document.getElementById('del').click();
  }
  del(){
    this.data.DeleteVehicle(this.data.nID).subscribe(res=>{
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
  delSuccessToast(){
    this.toastrService.show("Record removed successfully.", "Success!");
    this.router.navigateByUrl("/vehicle");
  }

  delToast(){
    this.toastrService.show("Record could not be removed.", "Error!");
    this.router.navigateByUrl("/vehicle");
  }

}
