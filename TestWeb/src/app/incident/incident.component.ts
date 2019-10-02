import { Component, OnInit } from '@angular/core';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms'; 
import { Navigation, Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.sass']
})
export class IncidentComponent implements OnInit {
  Incident: object;
  IndivIncident:object;
  empty:boolean=false;


  
  constructor(private toastrService: ToastrService, private data:ERPService, private nav: NavComponent, private router: Router) { }

  ngOnInit() {
    this.data.GetIncidents().subscribe(res=>{
      this.Incident = res;
      if (this.Incident[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Incident = null ;
      }
      else if (res == 0)
      {
        this.empty = true;
      }
      // console.log(this.Incident);
    });

    
  }

  Resolve(ID){
   this.data.GetIncident(ID).subscribe(res=>{
     this.IndivIncident= res;
     this.IndivIncident["Incident_Status_ID"]= 1;
    //  console.log(this.IndivIncident);
     this.data.PutIncident(ID,this.IndivIncident).subscribe(res=>{
      // console.log(this.IndivIncident);
      //this.nav.ngOnInit();
      this.nav.count--;
      this.router.navigateByUrl("/incident");
      this.ngOnInit();
      this.Toast();
      

    });
   });

   
    
  }
 Toast(){
    this.toastrService.show("Incident resolved.", "Success!");
  }
}
