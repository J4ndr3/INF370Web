import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';             
import { UserroleModifyComponent } from '../userrole-modify/userrole-modify.component';
import { FormBuilder,FormGroup } from '@angular/forms';          
import { networkInterfaces } from 'os';
import { AccessLevelModComponent }  from '../access-level-mod/access-level-mod.component' 

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.sass']
})

export class UserroleComponent implements OnInit {
Level: object;
AddForm: FormGroup;
AddFormA:FormGroup
NewLevel:object;
LevelSelection:number =0;
Role: object;
AddForm1: FormGroup;
NewRole:object;
RoleSelection:number =0;
AccessOptions:Array<object>;
search1;
search2;


  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder, private mod1: UserroleModifyComponent,private mod: AccessLevelModComponent) { }

  ngOnInit() {
    this.data.GetUserRole().subscribe(res=> {
      this.Role = res;
      if (this.Role[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Role = null ;
      }
      // console.log(this.Level);
  });

  this.AddForm1 = this.formBuilder.group({
    Description: [""], // Names for your input
    Access: ["Access Level..."], // Names for your input 
  });

  this.data.GetAccess_Levels().subscribe((res) => {
    this.AccessOptions = JSON.parse(JSON.stringify(res));
  });
    this.AddFormA =  this.formBuilder.group({
      Web: ["Web Access..."],
      Report: ["Report Access..."],
      Write: ["Write Access..."],
      App: ["App Access..."]
    })
    this.data.GetAccess_Levels().subscribe(res=>{
      this.Level = res;
      if (this.Level[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Level = null ;
      }
      // console.log(this.Level);
    });
  }
  addRole(){
    var Description = this.AddForm1.get('Description').value; // Names for your input
    var Access = this.AddForm1.get('Access').value; // Names for your input

    if (Description==""){
      this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
      
    }
    else {
      this.NewRole = {
        "Description": Description, // Names for your input
        "Access_ID": Access, // Names for your input
      };
      // console.log(this.NewRole);
      this.data.PostUserRole(this.NewRole).subscribe(res => {
        this.ngOnInit()
      });
    }};

  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }

  edit1(ID){
    this.mod1.edit(ID);
  }
  delete1(ID){
    this.data.nID = ID;
    document.getElementById('del1').click();
  }
  del1(){
    this.data.DeleteUserRole(this.data.nID).subscribe(res=>{
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
  }

  delToast(){
    this.toastrService.show("Record could not be removed.", "Error!");
  }

  add(){
    if (this.AddFormA.get('Web').value == "True"){
      var Web  = 1;
  }
  else if (this.AddFormA.get('Web').value == "False")
  {
    var Web  = 0;
  }
  if (this.AddFormA.get('Report').value == "True"){
    var Report = 1;
}
else if (this.AddFormA.get('Report').value == "False")
{
  var Report = 0;
}
if (this.AddFormA.get('Write').value == "True"){
  var Write = 1;
}
else if (this.AddFormA.get('Write').value == "False")
{
  var Write  = 0;
}
if (this.AddFormA.get('App').value == "True"){
  var App = 1;
}
else if (this.AddFormA.get('App').value == "False")
{
  var App = 0;
}
    if (Web == null || Report == null || Write == null || App==null)
    {
      // console.log(Web,Report,Write,App)
      document.getElementById("inputErr").click();
    }
    else{
      this.NewLevel = {
        "Web": Web,
        "Report": Report,
        "Write": Write,
        "App": App
      };
    }
    this.data.PostAccess_Level(this.NewLevel).subscribe(res=>{
      this.ngOnInit()
    })
  }
  edt(ID){
    this.mod.edit(ID);
  }
  
}
