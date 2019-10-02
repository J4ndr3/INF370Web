import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private toastrService: ToastrService, private ac: AppComponent, private formBuilder: FormBuilder, private data: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      User: ['', Validators.required],
      Pass: ['', Validators.required]
    });
    sessionStorage.clear();
  }

  onSubmit() {
    var User = this.loginForm.get('User').value;
    var Pass = this.loginForm.get('Pass').value;
    if (User == '' || Pass == '') {
      alert("Pleas fill in all the values")
    }
    else {
      sessionStorage.setItem("pass", Pass);
      sessionStorage.setItem("user", User);
      Pass = CryptoJS.SHA256(Pass);
      console.log(Pass);
      this.data.LogIn(User, Pass).subscribe(data => {
        // console.log(data)
        sessionStorage.setItem("Ranger",data[0].Ranger);
        if (data[0].Correct == true) {
          // console.log(data[0])
          this.showToast()
          this.router.navigateByUrl('/');
        }
        else {
          sessionStorage.clear();
          this.showToastF();
        }
      });
    }


  }
  showToast() {
    this.toastrService.show("Logged in.", "Success!");
  }
  showToastF() {
    this.toastrService.show("Failed to Login, check your Username and Password.", "Error!");
  }
}
