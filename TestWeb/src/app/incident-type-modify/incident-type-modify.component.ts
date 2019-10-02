import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-incident-type-modify',
  templateUrl: './incident-type-modify.component.html',
  styleUrls: ['./incident-type-modify.component.sass']
})
export class IncidentTypeModifyComponent implements OnInit {
  Type: any;
  EditForm : FormGroup;
  TypeSelection:number =0; //if you have a select list
  TypeOptions:Array<object>; //if you have a select list
  nType:object;
  rcv: object;
  
  constructor(private toastrService: ToastrService,private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    
    this.EditForm = this.formBuilder.group({
      ID:[], // your attributes
      Description:[],
      Level:[], 
      });
      this.edt();
      this.data.GetIncident_Levels().subscribe(res=>{
        this.TypeOptions = JSON.parse(JSON.stringify(res));
      })
  }
  edit(ID){
    this.data.GetIncident_Type(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/incident-type");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/incident-type-modify");
        // this.ngOnInit();
        
      }})
    
  }
  edt(){
    this.data.GetIncident_Type(this.data.nID).subscribe(res=>{     
      this.Type = res;
      this.EditForm.setValue({ID:this.Type.Incident_Type_ID,
        Description:this.Type.Description, Level:this.Type.Incident_Level_ID
        })    
    })
  }

  update(){
    
    var Description = this.EditForm.get('Description').value; 
    var Level = this.EditForm.get('Level').value;
    var ID = this.EditForm.get('ID').value;

    if (Description==""||Level=="") {
      document.getElementById("inputErr").click(); 
    }
    else {
      this.nType = {
        "Incident_Type_ID":ID, //selfde as die databasis 
        "Description": Description, //selfde as die databasis
        "Incident_Level_ID":Level, //selfde as die databasis 
      };
      // console.log(this.nType);
      this.data.PutIncident_Type(ID,this.nType).subscribe(res => {
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
    this.toastrService.show("Incident type modified.", "Success!");
    this.router.navigateByUrl("/incident-type");
  }
}
