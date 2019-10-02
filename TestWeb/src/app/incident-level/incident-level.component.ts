import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { IncidentLevelModifyComponent}  from '../incident-level-modify/incident-level-modify.component'

@Component({
  selector: 'app-incident-level',
  templateUrl: './incident-level.component.html',
  styleUrls: ['./incident-level.component.sass']
})
export class IncidentLevelComponent implements OnInit {
  IncidentLevel: object;
  AddForm: FormGroup;
  NewLevel:object;
  LevelSelection:number =0;
  del:object;
  searchText;
  
  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder, private router: Router , private mod: IncidentLevelModifyComponent) { }

  ngOnInit() {

    this.AddForm = this.formBuilder.group({
      Description: [""], // Names for your input
     
    });

      this.data.GetIncident_Levels().subscribe(res=>{
        this.IncidentLevel = res;
        // console.log(res)
      });
    }

  showToast(){
    this.toastrService.show("Record added successfully", "Success!");
  }
  delSuccessToast(){
    this.toastrService.show("Record Removed", "Success!");
  }

  delToast(){
    this.toastrService.show("Record could not be removed", "Error!");
  }
  addLevel() {
    var Description = this.AddForm.get('Description').value; // Names for your input
    
    if (Description=="") {
      //Modal popup
    }
    else {
      this.NewLevel = {
        "Description": Description, // Names for your input
      };
      this.data.PostIncident_Level(this.NewLevel).subscribe(res => {
        this.ngOnInit()
      });
    }}


    edit(ID){
      this.mod.edit(ID);
    }
  
    delete(ID){
      this.data.nID = ID;
      document.getElementById('del').click();
    }
  
  DeleteLevel(){
    this.data.DeleteIncident_Level(this.data.nID).subscribe(res=>{
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
      }
    );
  }
}
