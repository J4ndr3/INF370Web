import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-ranger',
  templateUrl: './modify-ranger.component.html',
  styleUrls: ['./modify-ranger.component.sass']
})
export class ModifyRangerComponent implements OnInit {
EditForm:FormGroup;
Ranger:Array<object>;;
GenderSelection: number = 0; //if you have a select list
nranger:any;
  UserRoleOptions: Array<object>; //if you have a select list
  UserRoleSelection: number = 0; //if you have a select list
  GenderOptions: Array<object>; //if you have a select list
  OrganisationSelection: number = 0; //if you have a select list
  OrganisationOptions: Array<object>; //if you have a select list
  MedicalSelection: number = 0; //if you have a select list
  MedicalOptions: Array<object>; //if you have a select list
  constructor(private toastrService: ToastrService,private formbuilder:FormBuilder, private router:Router,private data:ERPService) { }

  ngOnInit() {
    // this.data.GetRangers(this.data.nID).subscribe(res=>{
      this.data.GetGender().subscribe(res=>{
        this.GenderOptions = JSON.parse(JSON.stringify(res));
        this.data.GetMedicalAid().subscribe(res=>{
          this.MedicalOptions = JSON.parse(JSON.stringify(res));
          // console.log(this.MedicalOptions);
      })
      this.data.GetOrganisation().subscribe(res=>{
        this.OrganisationOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetUserRole().subscribe(res=>{
      this.UserRoleOptions = JSON.parse(JSON.stringify(res));
      // console.log(this.UserRoleOptions);
  })
    })
    //   this.Ranger = JSON.parse(JSON.stringify(res));
    //   if (res["Status"] == true){
    //     var Status = "Active";
    // }
    // else if (res["Status"] == false)
    // {
    //     var Status = "Inactive";
    // }
    // var mID = res["ID_Number"];
    // console.log(res["ID_Number"])
      this.EditForm = this.formbuilder.group({
        ID:[""],
        fname: [""], // Names for your input
          lname: [""], // Names for your input 
          rangerId: [""],
          email: [""],
          phone:[""],
          emergencycontactName:[""],
          EmergencycontactNumber:[""],
          MedicalAid:[""],
          Organizationtitle:[""],
          username:[""],
          selectgender:[""],
          selectbloodtype:[""],
          UserRole:[""],
          Status:[""],
          password:[""],
          Points:[""]
        })
    // })
    this.edt();
  }
  edt(){
    this.data.GetRangers(this.data.nID).subscribe(res=>{  
      console.log(res);   
        this.Ranger = JSON.parse(JSON.stringify(res));
      if (res["Status"] == true){
        var Status = "Active";
    }
    else if (res["Status"] == false)
    {
        var Status = "Inactive";
    }
      this.EditForm.setValue({ID:this.data.nID,
        rangerId:this.Ranger["ID_Number"],
        fname:this.Ranger["Name"],
        lname:this.Ranger["Surname"],
        email:this.Ranger["Email"],
        phone:this.Ranger["Cell"],
        emergencycontactName:this.Ranger["Emerg_Name"],
        EmergencycontactNumber:this.Ranger["Emerg_Contact"],
        MedicalAid:this.Ranger["Medical_Aid_ID"],
        Organizationtitle:this.Ranger["Organisation_ID"],
        selectgender:this.Ranger["genderID"],
        username:this.Ranger["Username"],
        selectbloodtype:this.Ranger["Blood_Type"],
        UserRole:this.Ranger["User_Role_ID"],
        Status:Status,
        password:this.Ranger["Password"],
        Points:this.Ranger["Points"]
      })    
    })
  }
  Toast(){
    this.toastrService.show("Record modified successfully.", "Success!");
  }
  edit(ID){
    this.data.nID = ID;
    this.router.navigateByUrl("/modify-ranger");
  }
  update()
  {
    var fname = this.EditForm.get('fname').value; // Names for your input
    var lname = this.EditForm.get('lname').value; // Names for your input
    var rangerId = this.EditForm.get('rangerId').value;
    var email = this.EditForm.get('email').value; // Names for your input
    var phone = this.EditForm.get('phone').value;
    var emergencycontactName = this.EditForm.get('emergencycontactName').value; // Names for your input
    var EmergencycontactNumber = this.EditForm.get('EmergencycontactNumber').value;
    var MedicalAid = this.EditForm.get('MedicalAid').value;
    var username = this.EditForm.get('username').value;
    var password = this.EditForm.get('password').value;
    var selectgender = this.EditForm.get('selectgender').value;
    var selectbloodtype = this.EditForm.get('selectbloodtype').value;
    var Organizationtitle = this.EditForm.get('Organizationtitle').value;
    var UserRole = this.EditForm.get('UserRole').value;
    var ID = this.EditForm.get('ID').value;
    var Points = this.EditForm.get('Points').value;
    console.log(Points);
    if (this.EditForm.get('Status').value == "Active"){
        var Status = 1;
    }
    else if (this.EditForm.get('Status').value == "Inactive")
    {
        var Status = 0;
    }
    
    if ((fname||lname||rangerId||email||emergencycontactName||EmergencycontactNumber||MedicalAid||username||password||selectgender||selectbloodtype)=="") {
        //Modal popup
      }
      else {
        this.nranger = {
          "Ranger_ID":ID,
          "ID_Number": rangerId,
          "Name": fname, // Names for your input
          "Surname": lname, // Names for your input
          "Email": email,
          "Cell":phone,
          "genderID": selectgender,
          "Emerg_Name": emergencycontactName,
          "Emerg_Contact": EmergencycontactNumber,
          "Status":Status,
          "User_Role_ID":UserRole,
          "Medical_Aid_ID": MedicalAid,
          "Points":Points,
          "Blood_Type": selectbloodtype, 
          "Username": username,
          "Password": password,
          "Organisation_ID":Organizationtitle,
          "Smartphone":1,
          "Access_ID":6
        };
        // console.log(this.nranger)
        this.data.PutRanger(ID,this.nranger).subscribe(res => {
            // console.log(res)
            this.router.navigate(['rangers']);
        });
      }
    
  }
}
