import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
//import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ERPService} from '..//erp.service';  
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import 'jspdf-autotable';
// import * as jsPDF from 'jspdf';
// import * as jpt from 'jspdf-autotable';
declare var jsPDF: any
@Component({
  selector: 'app-assets-report',
  templateUrl: './assets-report.component.html',
  styleUrls: ['./assets-report.component.sass']
})
export class AssetsReportComponent implements OnInit {
  private table;
  myDate= new Date().toLocaleDateString();
  Assets:object;
  Ass:object;
  Active:Array<object>;
  count= 0;
  loggedIn:any; 
  @ViewChild('content', { static: false }) content: ElementRef;

  public Download() {
    let doc = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    //jpt;  
    
      document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">ASSET REPORT</h1></div><br><br>';
       document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
       var data1 = document.getElementById('chrt1');
       var data2 = document.getElementById('chrt2');
      html2canvas(data1).then(canvas => {
        // Few necessary setting options  
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png')
        //let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        
    
        var position = 5;
        const header = function(data) {
          doc.setFontSize(7);
          doc.setTextColor(200, 0, 255);
          doc.setFontStyle('normal');
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
          //doc.text('Report', data.settings.margin.left + 35, 60);
        };
      
        const totalPagesExp = '{total_pages_count_string}';
        const footer = function(data) {
          let str = 'Page ' + data.pageCount;
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp;
            console.log('test');
          }
          doc.setFontSize(7);
          doc.text(str, 98, doc.internal.pageSize.height - 8);
        };
      
        const options = {
          beforePageContent: header,
          afterPageContent: footer,
          margin: {
            top: 30
          }
        };
       
        var res = doc.autoTableHtmlToJson(document.getElementById("Asset"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(7);
        let finalY = doc.lastAutoTable.finalY; 
        doc.text("**END OF REPORT**",98,finalY+10)
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
        doc.save('ASSET REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML="";
        document.getElementById('chrt2').innerHTML="";
      });
    
  }
  constructor(private data: ERPService, private router: Router,private toastrService: ToastrService) { }

  ngOnInit() {
    this.data.GetAssets().subscribe(res=>{
      this.Active = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.Active.forEach(marker => {
        
        if (marker['Status'] == "Active")
        {
          this.count++;
          // console.log("hallloooo"+this.Active)
        }
      this.Assets = res;
      
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
