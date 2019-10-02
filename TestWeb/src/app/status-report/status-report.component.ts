import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.sass']
})
export class StatusReportComponent implements OnInit {
  Assets:object;
  Count=0;
  AssetCount:Array<object>;

  Rangers:object;
  Count1=0;
  RangerCount:Array<object>;

  Vehicles:object;
  Count2=0;
  VehicleCount:Array<object>;
  loggedIn:any;
  Num:number;
  Num1:number;
  Num2:any;
  TotalStatus=0;
  constructor(private data: ERPService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit() {
    this.data.GetAssets().subscribe(res=>{
      this.AssetCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.AssetCount.forEach(marker => {
          this.Count++;
          // console.log(this.AssetCount)
          this.Assets = res;
      
    });
    this.data.GetRanger().subscribe(res=>{
      this.RangerCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.RangerCount.forEach(marker => {
          this.Count1++;
          // console.log(this.RangerCount)
          this.Rangers = res;
      
    });
    this.data.GetRangerVehicle().subscribe(res=>{
      this.VehicleCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.VehicleCount.forEach(marker => {
        this.Count2++;
          // console.log(this.VehicleCount)
          this.Vehicles = res;
      
    });
    this.TotalStatus = this.Count + this.Count1+ this.Count2; 
    });
  });
  });
  

this.loggedIn = sessionStorage.getItem("Ranger");
     this.ReportAccess(this.loggedIn);
    
  }
  ReportAccess(ID){
    this.data.GetRangers(ID).subscribe(res=>{
      // console.log(res);
      if (res['User_Role_ID'] == 1 ||res['User_Role_ID'] == 2 ||res['User_Role_ID'] == 4){
      
      
  }
    
    else {
      
      this.showToast1();
      
    }
    
  })
  }
  showToast1() {
    this.toastrService.show("Sorry you do not have access to reports");
    this.router.navigateByUrl("/home");
  }


}
