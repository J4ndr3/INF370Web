import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-gate-mod',
  templateUrl: './gate-mod.component.html',
  styleUrls: ['./gate-mod.component.sass']
})
export class GateModComponent implements OnInit  {
Gate: any;
EditForm : FormGroup;
ReserveSelection:number =0;
ReserveOptions:Array<object>; 
nGate:object;
rcv: object;
  constructor(private toastrService: ToastrService, private router:Router,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetReserves().subscribe(res=>{
      this.ReserveOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      ID:[],
      Name: [],
      Descriprion: [],
      Lattitude: [],
      Longitude: [],
      Reserve: []});
      this.edt();
  }
  edit(ID){
    this.data.GetGate(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/gate");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/gatemod");
        // this.ngOnInit();
        
      }})
    
  }
  edt(){
    this.data.GetGate(this.data.nID).subscribe(res=>{     
      this.Gate = res;
      this.EditForm.setValue({ID:this.Gate.Gate_ID,
        Name:this.Gate.Name,
        Descriprion:this.Gate.Descriprion,
        Lattitude:this.Gate.Lattitude,
        Longitude:this.Gate.Longitude,
        Reserve:this.Gate.Reserve_ID})    
    })
  }
  update(){
    var Name = this.EditForm.get('Name').value;
    var Descriprion = this.EditForm.get('Descriprion').value;
    var Lattitude = this.EditForm.get('Lattitude').value;
    var Longitude = this.EditForm.get('Longitude').value;
    var Reserve = this.EditForm.get('Reserve').value;
    var ID = this.EditForm.get('ID').value;

    if (Descriprion==""||Lattitude==""||Longitude==""||Reserve=="" || Name =="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nGate = {
        "Gate_ID":ID,
        "Name": Name,
        "Descriprion": Descriprion,
        "Lattitude": Lattitude,
        "Longitude": Longitude,
        "Reserve_ID": Reserve
      };
      // console.log(this.nGate);
      this.data.PutGates(ID,this.nGate).subscribe(res => {
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
    this.router.navigateByUrl("/gate");
  }
}
