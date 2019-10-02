import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {ERPService} from '..//erp.service';  
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rangers-report',
  templateUrl: './rangers-report.component.html',
  styleUrls: ['./rangers-report.component.sass']
})
export class RangersReportComponent implements OnInit {
  myDate= new Date().toLocaleDateString();
  Rangers: object;
  loggedIn:any;
  @ViewChild('content', { static: false }) content: ElementRef;

  public Download() {
  
    
    
    document.getElementById('chrt1').innerHTML = '<br><br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">RANGER REPORT</h1><br><br></div>';
    document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
    var data1 = document.getElementById('contentToConvert');
    var data2 = document.getElementById('contentToConvert1');
    html2canvas(data1, data2).then(canvas => {
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
      pdf.save('RANGER REPORT.pdf'); // Generated PDF  

      document.getElementById('chrt1').innerHTML="";
      document.getElementById('chrt2').innerHTML="";
    });
  
}
  constructor( private data: ERPService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit() {
    this.data.GetRanger().subscribe(res=>{
      this.Rangers = res;


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
