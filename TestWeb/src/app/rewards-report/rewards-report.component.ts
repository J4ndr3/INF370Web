import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rewards-report',
  templateUrl: './rewards-report.component.html',
  styleUrls: ['./rewards-report.component.sass']
})
export class RewardsReportComponent implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;
  Products:object;
  Count=0;
  ProductCount:Array<object>;

  Events:object;
  EventCount=0;
  EventsCount:Array<object>;
  loggedIn:any;
  TotalCount=0;
  public Download() {
  
    
    
    
    
    const data1 = document.getElementById('contentToConvert');
    
    html2canvas(data1).then(canvas => {
      
      document.getElementById('chrt1').innerHTML="";
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
     
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF  
      
    });

  }



    
  constructor(private toastrService: ToastrService, private data: ERPService, private router: Router) { }

  ngOnInit() {
    this.data.GetRewardAdd().subscribe(res=>{
      this.ProductCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.ProductCount.forEach(marker => {
          this.Count++;
          // console.log(this.ProductCount)
          this.Products = res;
      
    });
    this.data.GetEventRewardAdd().subscribe(res=>{
      this.EventsCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.EventsCount.forEach(marker => {
          this.EventCount++;
          // console.log(this.EventCount)
          this.Events = res;
          this.TotalCount = this.EventCount + this.Count;
    });
  });
  });
  
this.loggedIn = sessionStorage.getItem("Ranger");
     this.ReportAccess(this.loggedIn);
     
  }
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
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
