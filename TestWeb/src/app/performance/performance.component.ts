import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { rgb } from '@amcharts/amcharts4/.internal/core/utils/Colors';
//import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { ERPService } from '../erp.service';
import { collectExternalReferences } from '@angular/compiler';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import * as jsPDF from 'jspdf';
// import * as jpt from 'jspdf-autotable';
declare var jsPDF: any
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.sass']
})
export class PerformanceComponent {
  private chart: am4charts.XYChart;
  myDate= new Date().toLocaleDateString();
  performances:object;
  hours:Array<object>;
  timeLeft1: number = 6;
  interval1;
  r: Array<object>;
  HourList: Array<object>;
  HourArray: any;
  total:any;
  Performances:object
  toggle:any;
  IDPerformance:object;
  hide:any;
  chData : Array<object> ;
  loggedIn:any;

  constructor(private zone: NgZone, private data: ERPService, private router: Router,private toastrService: ToastrService) { }
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('chartElement', { static: false }) chartElement: ElementRef<HTMLElement>;
  public Download() {
    let img;

    this.chart.exporting.getImage("png").then((data) => {
      img = data;
      
      document.getElementById('chrt').innerHTML = '<br><br><br> <p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f> <h1 style="margin:auto">RANGER PERFORMANCE REPORT</h1><br><br> <img src="' + img + '" height="40%" width="100%"></div><br><br> <br>';
      document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
      var data1 = document.getElementById('chrt');
      var data2 = document.getElementById('contentToConvert1');
      html2canvas(data1).then(canvas => {
        // Few necessary setting options  
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let doc = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;
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
            top: 110
          },styles: {fillColor: [62, 105, 112]}
        };
       
        var res = doc.autoTableHtmlToJson(document.getElementById("Perf"));
        doc.autoTable(res.columns, res.data, options);
        doc.setFontSize(7);
        let finalY = doc.lastAutoTable.finalY; 
        doc.text("**END OF REPORT**",98,finalY+10)
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
        // doc.save('ASSET REPORT.pdf'); // Generated PDF
        // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        // pdf.setFontSize(7);
        //   pdf.text('Page 1 of 1', 98,pdf.internal.pageSize.height - 8);
        doc.save('RANGER PERFORMANCE REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt').innerHTML="";
        document.getElementById('chrt2').innerHTML="";
      });
    });



  }
  ngOnInit() {
    this.loggedIn = sessionStorage.getItem("Ranger");
     this.ReportAccess(this.loggedIn);
  }
// GetHours(ID){
//   this.data.GetPerformances(ID).subscribe(res=>{
//     console.log(res);
//     this.performances = res;
//     this.hours = JSON.parse(JSON.stringify(res));
//   });
// }



  
  
  ngAfterViewInit() {
    this.data.GetPerformance().subscribe(res=>{
    
      this.r= [];
      let Patrols = [];
      Patrols = res['Patrol_Log_ID'];
     
      this.HourList = JSON.parse(JSON.stringify(res));
      this.HourList.forEach(element => {
        this.r.push(element);
        
        this.r.forEach(element => {
          let data = [];
          let visits = 10;
          
          var date = new Date();
          var toets = date.toLocaleDateString()
          // console.log(toets);
          var year = date.getFullYear();
          var month = date.getMonth();
          // console.log(year+"hallo moto")
          
          for (let i = 1; i <= 31; i++) {
            // visits = Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
            // data.push({ date: new Date(year, month, i), name: "name" + i, value: visits });
           
            var dateconvert = year+"/"+month+'/'+i;
            // console.log("Ooblic" + element["Checkin1"])
            // console.log("Ooblic1" +dateconvert)
            

            // if (element["Checkin1"] != dateconvert) {

            //   // for (let i = 1; i <= Patrols.length; i++) {

            //   var time1 = element['time'];
            //   var total= ++element['time'];
            //   console.log("HAAARARTTARRATRRAT"+total);
            // }
           
            

          // }
        }

          
        })
        


      this.performances = res;
      this.hours = JSON.parse(JSON.stringify(res));
     
      });
    });
  
    this.zone.runOutsideAngular(() => {
     
    
      this.data.GetHours().subscribe(res=>{
        // console.log(res)
        this.chData = JSON.parse(JSON.stringify(res));
        let chart = am4core.create(this.chartElement.nativeElement, am4charts.XYChart);
        am4core.useTheme(this.am4themes_myTheme);
        chart.paddingRight = 40;
  
        let data = [];
        let visits = 10;
        // this.hours.forEach(element => {
        //   data.push({ date: new Date(2019, 0, i), name: "name" + i, value: visits });
        // });
        
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        this.chData.forEach(element => {
          data.push({ date: new Date(element["Date"]), value: element["Hours"] })
        });
        // for (let i = 1; i <= 31; i++) {
        //   visits = Math.round(Math.random() * 10);
        //   data.push({ date: new Date(year, month, i), value: visits });
        // }
  
        chart.data = data;
        // console.log("Halloooo"+date,year,month,day)
      

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      valueAxis.title.text = "HOURS PATROLLED";
      valueAxis.title.text.bold;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";



      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();
      series.strokeWidth = 3;
      series.stroke = am4core.color("rgb(205, 21, 67)");
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      this.chart = chart;
      })
      

    });
  
  }
  


  
  am4themes_myTheme(target) {
    if (target instanceof am4core.InterfaceColorSet) {
      target.setFor("secondaryButton", am4core.color("#00181a").lighten(0.5));
      target.setFor("secondaryButtonHover", am4core.color("#00181a").lighten(-0.5));
      target.setFor("secondaryButtonDown", am4core.color("#00181a").lighten(-0.5));
      target.setFor("secondaryButtonActive", am4core.color("#00181a").lighten(-0.2));
      target.setFor("secondaryButtonText", am4core.color("cd1543"));
      target.setFor("secondaryButtonStroke", am4core.color("#cd1543").lighten(3));

    }
    if (target instanceof am4core.Scrollbar) {
      target.stroke = am4core.color("#00181a");
    }
  }
  



  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    
     
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