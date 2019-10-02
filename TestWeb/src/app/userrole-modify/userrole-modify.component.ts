import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-userrole-modify',
  templateUrl: './userrole-modify.component.html',
  styleUrls: ['./userrole-modify.component.sass']
})
export class UserroleModifyComponent implements OnInit {
  Role: any;
  EditForm : FormGroup;
  LevelSelection:number =0; //if you have a select list
  AccessOptions:Array<object>; //if you have a select list
  nRole:object;
  rcv: object;
  
  constructor(private toastrService: ToastrService,private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.data.GetAccess_Levels().subscribe(res=>{
      this.AccessOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      ID:[], // your attributes NB!!! MOENIE DIE ID UITLOS IN DIE FORMBUILDER NIE. 
      Description: [], // your attributes
      Access: ["Access Level..."] // your attributes
      });
      this.edt();
  }

  edit(ID){
    this.data.GetUserRole1(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/userrole");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/userrolemod");
        // this.ngOnInit();
       
      }})
    
  }
  edt(){
    this.data.GetUserRole1(this.data.nID).subscribe(res=>{     
      this.Role = res;
      this.EditForm.setValue({
        ID:this.Role.User_Role_ID,
        Description:this.Role.Description,
        Access:this.Role.Access_ID,
        })    
    })
  }

  update(){
    var Description = this.EditForm.get('Description').value; //the name in red the same as on you html
    var Access = this.EditForm.get('Access').value;
    var ID = this.EditForm.get('ID').value;

    if (Description==""||Access==""||ID=="") {
      document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
    }
    else {
      this.nRole = {
        "User_Role_ID":ID, //selfde as die databasis 
        "Description": Description,
        "Access_ID": Access, //selfde as die databasis
      };
      // console.log(this.nRole);
      this.data.PutUserRole(ID,this.nRole).subscribe(res => {
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
    this.router.navigateByUrl("/userrole");
  }

}
