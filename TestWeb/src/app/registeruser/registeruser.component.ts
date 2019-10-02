import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ERPService } from '../erp.service';
import CryptoJS from 'crypto-js'
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.sass']
})
export class RegisteruserComponent implements OnInit {
  @ViewChild("regform", { static: false }) containerEltRef: ElementRef;
  constructor(private router: Router, private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder) { }
  currentTab = 0;
  RegisterformPages: object;
  AddForm: FormGroup;
  NewRegisterformPage: object;
  GenderSelection: number = 0; //if you have a select list
  UserRoleOptions: Array<object>; //if you have a select list
  UserRoleSelection: number = 0; //if you have a select list
  GenderOptions: Array<object>; //if you have a select list
  OrganisationSelection: number = 0; //if you have a select list
  OrganisationOptions: Array<object>; //if you have a select list
  MedicalSelection: number = 0; //if you have a select list
  MedicalOptions: Array<object>; //if you have a select list
  ngOnInit() {
    this.data.GetGender().subscribe(res => {
      this.GenderOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetMedicalAid().subscribe(res => {
      this.MedicalOptions = JSON.parse(JSON.stringify(res));
      //   console.log(this.MedicalOptions);
    })
    this.data.GetOrganisation().subscribe(res => {
      this.OrganisationOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetUserRole().subscribe(res => {
      this.UserRoleOptions = JSON.parse(JSON.stringify(res));
      //   console.log(this.UserRoleOptions);
    })
    this.AddForm = this.formBuilder.group({
      fname: [], // Names for your input
      lname: [], // Names for your input 
      rangerId: [],
      email: [],
      phone: [],
      emergencycontactName: [],
      EmergencycontactNumber: [],
      MedicalAid: ["Medical Aid..."],
      Organizationtitle: ["Organisation..."],
      username: [],
      password: [],
      confirmpassword: [],
      selectgender: ["Gender..."],
      selectbloodtype: ["Blood Type..."],
      UserRole: ["User role..."],
      Status: ["Status..."],

    });
  }
  goUsers() {
    var fname = this.AddForm.get('fname').value; // Names for your input
    var lname = this.AddForm.get('lname').value; // Names for your input
    var rangerId = this.AddForm.get('rangerId').value;
    var email = this.AddForm.get('email').value; // Names for your input
    var phone = this.AddForm.get('phone').value;
    var emergencycontactName = this.AddForm.get('emergencycontactName').value; // Names for your input
    var EmergencycontactNumber = this.AddForm.get('EmergencycontactNumber').value;
    var MedicalAid = this.AddForm.get('MedicalAid').value;
    var username = this.AddForm.get('username').value;
    var password = this.AddForm.get('password').value;
    var confirmpassword = this.AddForm.get('confirmpassword').value;
    var selectgender = this.AddForm.get('selectgender').value;
    var selectbloodtype = this.AddForm.get('selectbloodtype').value;
    var Organizationtitle = this.AddForm.get('Organizationtitle').value;
    var UserRole = this.AddForm.get('UserRole').value;
    if (this.AddForm.get('Status').value == "Active") {
      var Status = 1;
    }
    else if (this.AddForm.get('Status').value == "Inactive") {
      var Status = 0;
    }

    if ((fname || lname || rangerId || email || emergencycontactName || EmergencycontactNumber || MedicalAid || username || password || confirmpassword || selectgender || selectbloodtype) == "") {
      //Modal popup
    }
    else {

      password = CryptoJS.SHA256(password).toString();
      console.log(password.toString())
      this.NewRegisterformPage = {
        "ID_Number": rangerId,
        "Name": fname, // Names for your input
        "Surname": lname, // Names for your input
        "Email": email,
        "Cell": phone,
        "genderID": selectgender,
        "Emerg_Name": emergencycontactName,
        "Emerg_Contact": EmergencycontactNumber,
        "Status": Status,
        "User_Role_ID": UserRole,
        "Medical_Aid_ID": MedicalAid,
        "Points": 0,
        "Blood_Type": selectbloodtype,
        "Username": username,
        "Password": password,
        "Organisation_ID": Organizationtitle,
        "Smartphone": 1,
        "Access_ID": 6
      };
      // console.log(this.NewRegisterformPage)
      this.data.PostRanger(this.NewRegisterformPage).subscribe(res => {
        if (res = 7) {
          document.getElementById('dup').click();
        }
        else {
          this.router.navigate(['rangers']);
        }

      });
    }

  }
  showToast() {
    this.toastrService.show("Record added successfully", "Success!");
  }
  ngAfterViewInit() {
    // let elt = this.containerEltRef.nativeElement.querySelector('.tab');
    // this.renderer.addClass(elt, 'newClass'); //Adds new class to element
    // Current tab is set to be the first tab (0)
    this.showTab(this.currentTab); // Display the current tab


  }
  showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    // console.log(x.length);
    (x[n] as HTMLElement).style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";

    } else {
      document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    this.fixStepIndicator(n)
  }

  nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !this.validateForm()) return false;
    // Hide the current tab:
    (x[this.currentTab] as HTMLElement).style.display = "none";
    // Increase or decrease the current tab by 1:
    this.currentTab = this.currentTab + n;
    // if you have reached the end of the form...
    if (this.currentTab >= x.length) {
      // ... the form gets submitted:
      this.goUsers();
      this.toastrService.show("Record added successfully.", "Success!");
      return false;
    }
    // Otherwise, display the correct tab:
    this.showTab(this.currentTab);
  }

  validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[this.currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.getElementsByClassName("step")[this.currentTab].className += " finish";
    }
    else {
      document.getElementById("inputErr").click();
    }
    return valid; // return the valid status
  }
  fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
  }
}