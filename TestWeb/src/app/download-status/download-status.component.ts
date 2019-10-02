import { Component, OnInit } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-download-status',
  templateUrl: './download-status.component.html',
  styleUrls: ['./download-status.component.sass']
})
export class DownloadStatusComponent implements OnInit {
  myDate= new Date().toLocaleDateString();

  timeLeft: number = 3;
  interval;

  Assets:object;
  Count=0;
  AssetCount:Array<object>;

  Rangers:object;
  Count1=0;
  RangerCount:Array<object>;

  Vehicles:object;
  Count2=0;
  VehicleCount:Array<object>;
  constructor(private data: ERPService, private router:Router) { }

  ngOnInit() {
    this.data.GetAssets().subscribe(res=>{
      this.AssetCount = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.AssetCount.forEach(marker => {
          this.Count++;
          // console.log(this.AssetCount)
          this.Assets = res;
      
    });
  });
  this.data.GetRanger().subscribe(res=>{
    this.RangerCount = JSON.parse(JSON.stringify(res));
    // console.log(res);
    this.RangerCount.forEach(marker => {
        this.Count1++;
        // console.log(this.RangerCount)
        this.Rangers = res;
    
  });
});
this.data.GetRangerVehicle().subscribe(res=>{
  this.VehicleCount = JSON.parse(JSON.stringify(res));
  // console.log(res);
  this.VehicleCount.forEach(marker => {
      this.Count2++;
      // console.log(this.VehicleCount)
      this.Vehicles = res;
  
});
});
this.interval = setInterval(() => {
  if(this.timeLeft > 0) {
    this.timeLeft--;
  } else if (this.timeLeft == 0) {
    
    document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">STATUS REPORT</h1></div><br><br>';
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
      pdf.save('STATUS REPORT.pdf'); // Generated PDF  
      this.router.navigateByUrl("/status-report");
    });
clearInterval(this.interval);
  }
  else{
    this.timeLeft = 3;
  }
},1000)
  }


}

