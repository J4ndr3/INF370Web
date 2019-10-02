import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js'
@Component({
  selector: 'app-reset-passwor',
  templateUrl: './reset-passwor.component.html',
  styleUrls: ['./reset-passwor.component.sass']
})
export class ResetPassworComponent implements OnInit {
  AddForm: FormGroup;
  OTPForm: FormGroup;
  PasswordForm: FormGroup;
  EmailF=true;
  OTPF=false;
  PassF=false;
  OTP:any;
  constructor(private toastrService: ToastrService, private formbuilder: FormBuilder, private login: LoginService,private router:Router) { }

  ngOnInit() {
    this.AddForm = this.formbuilder.group({
      Email: []
    })
    this.OTPForm = this.formbuilder.group({
      OTP: []
    })
    this.PasswordForm = this.formbuilder.group({
      Password: [],
      Confirm: []
    })


  }
  resetOTP() {
    var email = this.AddForm.get('Email').value;
    this.login.resetOTP(email).subscribe(res => {
      if (res[0]["Correct"]){
        this.OTPF=true;
        this.EmailF=false;
        this.OTP = res[0]["OTP"]
        // console.log(this.OTP)
      }
      
    })

  }
  Pass(){
    var OTP = this.OTPForm.get('OTP').value;
    if (this.OTP == OTP){
      this.OTPF=false;
      this.PassF=true;
    }
    else{
      this.showToastE();
    }
  }
  resetp() {
    var email = this.AddForm.get('Email').value;
    var OTP = this.OTPForm.get('OTP').value;
    var Password = this.PasswordForm.get('Password').value;
    var confirm = this.PasswordForm.get('Confirm').value;
    if (Password == confirm){
      Password = CryptoJS.SHA256(Password);
      this.login.ResetPass(email,OTP,Password).subscribe(res=>{
        if (res[0]["Correct"]){
          this.showToast();
          this.router.navigateByUrl("/login")
        }
        // console.log(res)
      })
    }
    // console.log(email,OTP,Password);
    
  }
  showToast() {
    this.toastrService.show("Password has been updated.", "Success!");
  }
  showToastE() {
    this.toastrService.show("The OTP does not match.", "Error!");
  }
}
