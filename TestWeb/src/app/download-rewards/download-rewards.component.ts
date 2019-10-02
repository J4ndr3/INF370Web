import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ERPService } from '../erp.service';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-download-rewards',
  templateUrl: './download-rewards.component.html',
  styleUrls: ['./download-rewards.component.sass']
})
export class DownloadRewardsComponent implements OnInit {
  myDate= new Date().toLocaleDateString();
  
  @ViewChild('content', { static: false }) content: ElementRef;
  Products:object;
  Count=0;
  ProductCount:Array<object>;

  Events:object;
  EventCount=0;
  EventsCount:Array<object>;

  timeLeft: number = 3;
  interval;

  public Download() {
  
    
    
    
    
    const data1 = document.getElementById('contentToConvert');
    
    html2canvas(data1).then(canvas => {
     
     
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
      document.getElementById('chrt1').innerHTML="";
    });

  }



    
  constructor(private toastrService: ToastrService, private data: ERPService, private router:Router) { }

  ngOnInit() {
    this.data.GetRewardAdd().subscribe(res=>{
      this.ProductCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.ProductCount.forEach(marker => {
          this.Count++;
          // console.log(this.ProductCount)
          this.Products = res;
      
    });
  });
  this.data.GetEventRewardAdd().subscribe(res=>{
    this.EventsCount = JSON.parse(JSON.stringify(res));
    // console.log(res);
    this.EventsCount.forEach(marker => {
        this.EventCount++;
        // console.log(this.EventsCount)
        this.Events = res;
  });
});


  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } else if (this.timeLeft == 0) {
      
     
      

      document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">REWARDS REPORT</h1></div><br><br>';
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
        pdf.setFontSize(7);
          pdf.text('Page 1 of 1', 98,pdf.internal.pageSize.height - 8);
        pdf.save('REWARDS REPORT.pdf'); // Generated PDF  
        this.router.navigateByUrl("/rewards-report");
      });
  clearInterval(this.interval);
    }
    
    else{
      this.timeLeft = 3;
    }
  },1000)
}

  
  
  showToast(){
    this.toastrService.show("Record could not be added", "Error!");
  }

  Delete(){
    this.toastrService.show("Record Removed", "Success!");
  }
}

