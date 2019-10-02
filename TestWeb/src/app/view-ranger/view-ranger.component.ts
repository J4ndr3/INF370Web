import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'app-view-ranger',
  templateUrl: './view-ranger.component.html',
  styleUrls: ['./view-ranger.component.sass']
})
export class ViewRangerComponent implements OnInit {
  Ranger : {
    Name:any,
    Surname:any,
    Cell:any,
    Email:any,
    User_Role_ID:any,
    ID_Number:any,
    Emerg_Name:any,
    Emerg_Contact:any,
    Medical_Aid_ID:any,
    Blood_Type:any,
    genderID:any,
    Organisation_ID:any,
    Status:any,
    Username:any
  };
  GenderOptions: Array<object>;
  MedicalOptions: Array<object>;
  OrganisationOptions: Array<object>;
  UserRoleOptions: Array<object>;
  patrols: Array<object>;
  patrolsList: Array<object>;
  newPatrol: object;
  incidents: Array<object>;
  incidentsList: Array<object>;
  newIncidents: object;
  show:boolean;

  constructor(private data: ERPService, private router: Router) { }

  ngOnInit() {
    this.Ranger = {
      Name:"",
      Surname:"",
      Cell:"",
      Email:"",
      User_Role_ID:"",
      ID_Number:"",
      Emerg_Name:"",
      Emerg_Contact:"",
      Medical_Aid_ID:"",
      Blood_Type:"",
      genderID:"",
      Organisation_ID:"",
      Status:"",
      Username:""
    }
    this.show =false;
    this.patrolsList = [];
    this.incidentsList = [];
    this.data.GetPatrol_log().subscribe(res => {
        this.patrols = JSON.parse(JSON.stringify(res));
        this.patrols.forEach(element => {
          if (element["RangerID"] == this.data.nID) {
            this.newPatrol = {
              "Patrol_Log_ID": element["Patrol_Log_ID"],
              "Date": element["Date"],
              "time": element["time"],
              "MarkerPast": element["MarkerPast"],
              "Feedback": element["Feedback"],
            }

            this.patrolsList.push(this.newPatrol);
          }

        })
      })

    this.data.GetRangers(this.data.nID).subscribe(res => {
      this.Ranger = JSON.parse(JSON.stringify(res));
      this.data.GetGender().subscribe(res => {
        this.GenderOptions = JSON.parse(JSON.stringify(res));
        // console.log(this.GenderOptions)
        this.GenderOptions.forEach(element => {
          if (this.Ranger["genderID"] == element["ID"]) {
            this.Ranger["genderID"] = element["Descriprion"];
            // console.log(element["Descriprion"]);
          }
        });

      })
      this.data.GetMedicalAid().subscribe(res => {
        this.MedicalOptions = JSON.parse(JSON.stringify(res));
        // console.log(this.MedicalOptions)
        this.MedicalOptions.forEach(element => {
          if (this.Ranger["Medical_Aid_ID"] == element["ID"]) {
            this.Ranger["Medical_Aid_ID"] = element["Descriprion"];
          }
        });
      })
      this.data.GetOrganisation().subscribe(res => {
        this.OrganisationOptions = JSON.parse(JSON.stringify(res));
        this.OrganisationOptions.forEach(element => {
          if (this.Ranger["Organisation_ID"] == element["ID"]) {
            this.Ranger["Organisation_ID"] = element["Descriprion"];
          }
        });
      })
      this.data.GetUserRole().subscribe(res => {
        this.UserRoleOptions = JSON.parse(JSON.stringify(res));
        this.UserRoleOptions.forEach(element => {
          if (this.Ranger["User_Role_ID"] == element["ID"]) {
            this.Ranger["User_Role_ID"] = element["Description"];
          }
        });
      })
    })
  }
  open(ID) {
    this.data.nID = ID;
    this.router.navigateByUrl("/view-ranger");
  }
  close() {
    this.router.navigateByUrl("/rangers");
  }

  Incidents(ID){
    this.incidents=[];
    this.incidentsList=[];
    console.log(ID);

    this.data.GetIncedent_Patrole().subscribe(res => {
      console.log(res);
    this.incidents = JSON.parse(JSON.stringify(res));
    this.incidents.forEach(element => {
      if (element["Patrol_Log_ID"] == ID){
        this.newIncidents = {
          "Description": element["Description"],
          "Type": element["Type"],
          "Status": element["Status"],
          "Time": element["Time"],
          "Date": element["Date"]
          
        }
        
        this.incidentsList.push(this.newIncidents);
        
      }
    })
    document.getElementById('info2').click();
  }
    )
    }
  }
