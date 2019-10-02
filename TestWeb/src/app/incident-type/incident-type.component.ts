import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';         
import { IncidentTypeModifyComponent }  from '../incident-type-modify/incident-type-modify.component' 

@Component({
  selector: 'app-incident-type',
  templateUrl: './incident-type.component.html',
  styleUrls: ['./incident-type.component.sass']
})
export class IncidentTypeComponent implements OnInit {
  Type: object;
  AddForm: FormGroup;
  NewType:object;
  TypeSelection:number =0;
  TypeOptions:Array<object>; 
  searchText;

  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder,private mod:IncidentTypeModifyComponent) { }

  ngOnInit() {
    
    this.data.GetIncident_Types().subscribe(res=>{
      this.Type = res;
    });

    this.AddForm = this.formBuilder.group({
      Description: [""],
      Level: ["Severity Level..."],
    });

    this.data.GetIncident_Levels().subscribe((res) => {
      this.TypeOptions = JSON.parse(JSON.stringify(res));
    }); 


  }
  addType() {
    var Description = this.AddForm.get('Description').value;
    var Level = this.AddForm.get('Level').value; 

    if (Description==""||Level==""){
      document.getElementById("inputErr").click();
    }
    else {
      this.NewType = {
        "Description": Description, 
        "Incident_Level_ID": Level, 
        
      };
      this.data.PostIncident_Type(this.NewType).subscribe(res => {
        if (res != null)
        {
          this.ngOnInit();
          this.showToast();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
        
      })
      ;}}

      edit(ID){
        this.mod.edit(ID);
      }

      delete(ID){
        this.data.nID = ID;
        document.getElementById('del').click();
      }
      del(){
        this.data.DeleteIncident_Type(this.data.nID).subscribe(res=>{
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
    
  showToast(){
    this.toastrService.show("Record added successfully", "Success!");
  }

  delSuccessToast(){
    this.toastrService.show("Record Removed", "Success!");
  }
  delToast(){
    this.toastrService.show("Record could not be removed", "Success!");
  }
}
