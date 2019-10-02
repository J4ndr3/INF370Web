import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { RouterLink, Router } from '@angular/router';
import { ERPService } from '../erp.service';
import { HttpClient } from '@angular/common/http';
import { url } from 'inspector';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dataLoader, List } from '@amcharts/amcharts4/core';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})

export class NavComponent implements OnInit {
  showme;
  rangerName = "";
  display = 'none';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  err: any;
  message: any;
  addExtraClass: boolean = false;
  data: ERPService;
  incidentnumber;
  incidents;
  banner: Array<object>;
  count;
  NewNotification: object;
  timer: any;
  Performances: object
  toggle: any;
  IDPerformance: object;
  TimerModify: any;
  EditForm: FormGroup;
  TimerSelection: number = 0;
  TimerOptions: Array<object>;
  nTimer: object;
  theID: any;
  rcv: object;
  loggedIn: any;

  constructor(private http: HttpClient, public snackBar: MatSnackBar, private router: Router, private toastrService: ToastrService, private formBuilder: FormBuilder) { }
  AddForm: FormGroup;
  AddForm2: FormGroup;

  ngOnInit() {
    this.showme = false;
    this.loggedIn = sessionStorage.getItem("Ranger");
    this.NotificationTimer(this.loggedIn);

    this.EditForm = this.formBuilder.group({
      Timer: [], // Names for your input
      ID: [],
    });

    const source = timer(0, 300000);
    const subscribe = source.subscribe(val => {
      this.count = 0
      this.GetIncidents().subscribe(res => {
        this.banner = JSON.parse(JSON.stringify(res));
        this.banner.forEach(element => {
          this.count++;

        });
      });
      if (sessionStorage.getItem('Ranger') != null) {
        this.showme = true;
        this.GetRangers(sessionStorage.getItem('Ranger')).subscribe(res => {
          this.rangerName = res["Name"]
        })
      }
      else {
        this.showme = false;
        this.rangerName = "Login"
      }


    })


    this.AddForm = this.formBuilder.group({
      Title: [],
      Message: []
    });
    this.AddForm2 = this.formBuilder.group({
      Title: [],
      Message: []
    });
    this.GetTimers().subscribe(res => {
      this.TimerOptions = JSON.parse(JSON.stringify(res));
      console.log(this.loggedIn, this.TimerOptions)
      this.TimerOptions.forEach(element => {
        if (element["RangerID"] == this.loggedIn) {
          this.autoHide = element["Timer"]*1000;
          console.log(this.TimerOptions["ID"])
          this.EditForm.setValue({
                  ID:element["ID"],
                  Timer:element["Timer"]})    
        }
      })
    })
    // this.data.GetIncidents().subscribe(res => {
    //   this.incidents = res;
    //   // console.log(this.incidents)
    //   this.incidentnumber = this.incidents.count();
    //   // console.log(this.incidentnumber);
    // })

   
   

    //  this.edt();

  }

  openSnackBar() {
    var Title = this.AddForm.get('Title').value;
    var Message = this.AddForm.get('Message').value;
    if (Message == null || Title == null) {
      document.getElementById("inputErr").click();
    }
    else {
      let close = 1;
      let config = new MatSnackBarConfig();
      config.verticalPosition = this.verticalPosition;
      config.horizontalPosition = this.horizontalPosition;
      config.duration = this.setAutoHide ? this.autoHide : 0;
      let snackbarref = this.snackBar.open('Message Sent Successfully!', this.action ? 'Edit Message' : undefined, config);
      snackbarref.onAction().subscribe(() => {
        this.AddForm2.get('Title').setValue(Title);
        this.AddForm2.get('Message').setValue(Message);
        document.getElementById("mymodClick").click();
        close = 0;
      });

      snackbarref.afterDismissed().subscribe(() => {
        if (close == 1) {
          // console.log(Title);
          this.NewNotification = {
            "Date": new Date(),
            "Meassage": Message,
            "Title": Title,
            "Ranger_ID": sessionStorage.getItem("Ranger"),
          };
          // console.log(this.NewNotification);

          this.PostNotification(this.NewNotification).subscribe(res => {
            // console.log(res);
          });

          this.sendNotif(Title, Message);
          this.AddForm.get('Title').reset();
          this.AddForm.get('Message').reset();
        }

      })
    }

  }
  openSnackBar1() {
    var Title = this.AddForm2.get('Title').value;
    var Message = this.AddForm2.get('Message').value;
    this.NewNotification = {
      "Date": new Date(),
      "Meassage": Message,
      "Title": Title,
      "Ranger_ID": sessionStorage.getItem("Ranger"),
    };
    // console.log(this.NewNotification);
    if (Message == null || Title == null) {
      document.getElementById("inputErr").click();
    }
    else {
      this.PostNotification(this.NewNotification).subscribe(res => {
        // console.log(res);
      });

      this.sendNotif(Title, Message);
      this.AddForm.get('Title').reset();
      this.AddForm.get('Message').reset();
      this.AddForm2.get('Title').reset();
      this.AddForm2.get('Message').reset();
      let config = new MatSnackBarConfig();
      config.verticalPosition = this.verticalPosition;
      config.horizontalPosition = this.horizontalPosition;
      config.duration = this.setAutoHide ? this.autoHide : 0;
      let snackbarref = this.snackBar.open('Message Sent Successfully!', this.action ? 'View Message' : undefined, config);
      snackbarref.onAction().subscribe(() => { this.router.navigateByUrl('/notify') });

    }

  }

  sendNotif(title, message) {
    var notificationData = {
      to: '/topics/ERP',
      "mutable_content": true,
      "content_available": true,
      "notification": {
        "body": message,
        "contents": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
        "mediaUrl": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
        "priority": "high",
        "title": title,
      },
      "data": {
        "body": message,
        "contents": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
        "mediaUrl": "https://iadsb.tmgrup.com.tr/d777cf/645/400/0/28/1000/648?u=https://idsb.tmgrup.com.tr/2019/08/16/1565902869009.jpg",
        "priority": "high",
        "title": title,
        "image-url": "http://www.nature-reserve.co.za/images/tswalu-kalahari-reserve-baby-rhino-590x390.jpg"
      }
    }
    // console.log(notificationData)
    $.ajax({
      type: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAqtm61OY:APA91bFuJ-nIBwEtNOviWzhO7lJCyeaIS84Ay2XP9CjY-hHe4O6GR7XVHAL7TVzjd5pLwRZ6wQgwFbKYMKrdIFMthWtpLFMRCjOUyONqXvoTkgxqAqfZ-0dyuet0p2s-DhvujLydLfZT'
      },
      data: JSON.stringify(notificationData),
      success: function (response) {
        // console.log(response);
      },
    });
  }
  GetRangers(id) {
    return this.http.get('https://2019group4inf370.azurewebsites.net/api/rangers/' + id)
  }

  GetIncidents() {
    return this.http.get('http://localhost:51389/api/Incident_Patrol')
  };

  PostNotification(obj) {
    return this.http.post('http://localhost:51389/api/Notifications', obj)
  }
  refresh() {
    this.showme = true;
    this.count = 0;
    this.GetIncidents().subscribe(res => {
      this.banner = JSON.parse(JSON.stringify(res));
      this.banner.forEach(element => {
        this.count++;

      });
    });
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
    this.showme = false;
  }

  // edit(ID){
  //   this.data.GetTimer(ID).subscribe(res=>{
  //     if (res==1)
  //     {
  //       alert("Not found");
  //       this.router.navigateByUrl("/home");
  //     }
  //     else{
  //       this.data.nID = ID;
  //       this.router.navigateByUrl("/reward-modify");


  //     }})

  // }

  // edt(){
  //   this.data.GetTimer(this.data.nID).subscribe(res=>{
  //     this.TimerModify = res;
  //     // console.log(res);
  //     this.EditForm.setValue({
  //       ID:this.TimerModify.SettingID,
  //       Timer:this.TimerModify.Timer})    
  //   })

  // }
  update() {
    var Timer = this.EditForm.get('Timer').value;
    var ID = this.EditForm.get('ID').value;
console.log(Timer, ID)
    if ((Timer || ID) == "" || (Timer || ID) == null || Timer == "") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nTimer = {
        "SettingID": ID,
        "Timer": Timer,
        "Ranger_ID": this.loggedIn
      };
      // console.log(this.nReward);
      this.PutTimer(ID, this.nTimer).subscribe(res => {
        this.rcv = res
         console.log(this.rcv);
        if (this.rcv == null) {
          this.showToast();
          this.autoHide = Timer*1000;
        }
        else {
          document.getElementById("inputErr").click();
        }

      });
    }
  }
  showToast() {
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/");
  }

  NotificationTimer(ID) {

  }
  GetTimers(){
    return this.http.get('http://localhost:51389/api/Settings')
  }
  PutTimer(ID, obj) {
    return this.http.put('http://localhost:51389/api/Settings/' + ID, obj)
  }
}

