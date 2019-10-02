import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import {NavComponent } from './nav/nav.component'
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import CryptoJS from 'crypto-js'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
sNav=false;
  constructor(private http: HttpClient,private router:Router, private nav : NavComponent ) { }
  LogIn(user,pass){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/Login/?Email='+user+'&Password='+pass)
  }
  LogedIn(user,pass)
  {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/LogedIn/?Email='+user+'&Password='+pass)
  }
  testlogin(){
    var user = sessionStorage.getItem("user");
    var pass = sessionStorage.getItem("pass");
    // console.log(user)
    pass = CryptoJS.SHA256(pass);
    var bool = false;
    if (user == null || pass == null)
    {
      this.sNav = false;
      this.nav.showme = false;
      this.router.navigateByUrl('/login');
      bool= false;
    }
    else{
      this.LogedIn(user,pass).subscribe(data => {
        if (data[0].Logedin == false || data.toString() == "Access not allowed")
        {
          this.sNav = false;
          this.nav.showme = false;
          this.router.navigateByUrl('/login');
          bool= false;
        }
      else{
        this.sNav = true;
        this.nav.refresh();
        //alert("HALLLLOOOO")
        bool= true;
      }})
    }
    
    return bool;
  }
  resetOTP(email){
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/ResetOTP/?Email='+email)
  }
  ResetPass(email, OTP,Password){
    // alert(OTP)
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/Login/Password/?Email='+email+'&OTP='+OTP+'&Password='+Password)
  }
}
