import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-incident-level-modify',
  templateUrl: './incident-level-modify.component.html',
  styleUrls: ['./incident-level-modify.component.sass']
})
export class IncidentLevelModifyComponent implements OnInit {

  constructor(private toastrService: ToastrService, private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }
  IncidentLevel: any;
  EditForm: FormGroup;
  nLevel:object;
  rcv:object;
  

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      ID:[],
      Description: [] // your attributes
      });
      this.edt();

    
  }
  edit(ID){
    this.data.GetIncident_Level(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/incident-level");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/incident-level-modify");
        // this.ngOnInit();
        
      }})
    
  }
  edt(){
    this.data.GetIncident_Level(this.data.nID).subscribe(res=>{     
      this.IncidentLevel = res;
      this.EditForm.setValue({ID:this.IncidentLevel.Incident_Level_ID,
        Description:this.IncidentLevel.Description
        })    
    })
  }

  update(){
  
    var Description = this.EditForm.get('Description').value; //the name in red the same as on you html
    var ID = this.EditForm.get('ID').value;

    if (Description=="") {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nLevel = {
        "Incident_Level_ID":ID, //selfde as die databasis 
        "Description": Description, //selfde as die databasis
      };
      // console.log(this.nLevel);
      this.data.PutIncident_Level(ID,this.nLevel).subscribe(res => {
        this.rcv = res
        // console.log(this.rcv);
        if (this.rcv == null)
        {
          this.Toast();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
      });
    }
  }


  Toast(){
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/incident-level");

  }
}
