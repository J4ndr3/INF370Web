import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';      
import { GateModComponent }  from '../gate-mod/gate-mod.component'  
import { number } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.sass']
})
export class GateComponent implements OnInit {
  Gates: object;
  AddForm: FormGroup;
  NewGate:object;
  ReserveSelection:number =0;
  ReserveOptions:Array<object>; 
  nGate:object;
  searchtext;
  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder,private mod:GateModComponent ) { }

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Name: [],
      Descriprion: [],
      Lattitude: [],
      Longitude: [],
      Reserve: ["Reserve..."]});
    this.data.GetReserves().subscribe(res=>{
      this.ReserveOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetGates().subscribe(res=>{
      this.Gates = res;
    });

  }
  add(){
    var Name = this.AddForm.get('Name').value;
    var Descriprion = this.AddForm.get('Descriprion').value;
    var Lattitude = this.AddForm.get('Lattitude').value;
    var Longitude = this.AddForm.get('Longitude').value;
    var Reserve = this.AddForm.get('Reserve').value;
    

    if ( Name ==""||Descriprion==""||Reserve=="") {
      document.getElementById("inputErr").click();
      
    }
    else {
      this.nGate = {
        "Name": Name,
        "Descriprion": Descriprion,
        "Lattitude": Lattitude,
        "Longitude": Longitude,
        "Reserve_ID": Reserve
      };
      // console.log(this.nGate);
      this.data.PostGate(this.nGate).subscribe(res => {
        if (res != null)
        {
          document.getElementById("closeBTN").click();
          this.ngOnInit();
          this.showToast();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
        
      });
    }
  }
  edit(ID){
    this.mod.edit(ID);
  }
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
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
  del(){
    this.data.DeleteGate(this.data.nID).subscribe(res=>{
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
