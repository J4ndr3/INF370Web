import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {} from 'googlemaps';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';  
import { Router } from '@angular/router';
import htmlToImage from 'html-to-image';
@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.sass'],
  styles: [`
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
    
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(205, 21, 67);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(205, 21, 67, 0.5);
  }
  
`]
})
export class IncidentReportComponent {
  r:Array<object>;
 CoordList:Array<object>;
 myLatLngList:any;
  hoveredDate: NgbDate;
  Markers:Array<object>;
  Incedents:Array<object>;
  fromDate: NgbDate;
  toDate: NgbDate;
  myDate= new Date().toLocaleDateString();
  IncedentCount = 0;
  searchText;
  timeLeft1: number = 3;
  interval1;
  loggedIn:any;
  
  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;
//   public Download1() {
//     document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">INCEDENT REPORT</h1></div><br><br>';
//     document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
//     document.getElementById('chrt3').innerHTML = '<br><br>';
//       var data1 = document.getElementById('contentToConvert');
//       var data2 = document.getElementById('contentToConvert1');
//       html2canvas(data1, data2).then(canvas => {
//         // Few necessary setting options  
//         var imgWidth = 208;
//         var pageHeight = 295;
//         var imgHeight = canvas.height * imgWidth / canvas.width;
//         var heightLeft = imgHeight;

//         const contentDataURL = canvas.toDataURL('image/png')
//         let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
//         var position = 5;
//         pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
//         pdf.save('INCIDENT REPORT.pdf'); // Generated PDF  

//         document.getElementById('chrt1').innerHTML="";
//         document.getElementById('chrt2').innerHTML="";
//       });

// }
public Download() {
  this.timeLeft1 = 3;
  


  var htmlToImage = require('html-to-image');
  var node = document.getElementById('my-node');
  htmlToImage.toPng(node)
    .then(function (dataUrl) {

      var img = new Image();
      img.src = dataUrl;
      // img.style.width = "800px";
      
      document.getElementById('image123').appendChild(img);

    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });


  this.interval1 = setInterval(() => {
    if (this.timeLeft1 > 0) {
      this.timeLeft1--;
    } else if (this.timeLeft1 == 0) {

      document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">' + this.myDate + '</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><br><h1>INCIDENT REPORT</h1><br><br></div><br>';
      document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
      document.getElementById('chrt3').innerHTML = '<br><br>';

      var data1 = document.getElementById('contentToConvert');
      var data2 = document.getElementById('contentToConvert1');
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
        pdf.setFontSize(7);
          pdf.text('Page 1 of 1', 98,pdf.internal.pageSize.height - 8);
        pdf.save('INCIDENT REPORT.pdf'); // Generated PDF  

        document.getElementById('chrt1').innerHTML = "";
        document.getElementById('chrt2').innerHTML = "";
        document.getElementById('image123').innerHTML = "";

        // var doc = new jsPDF();
        // var totalPagesExp = "{total_pages_count_string}";
        // var footer = function (data) {
        //     var str = "Page " + data.pageCount;
        //     // Total page number plugin only available in jspdf v1.0+
        //     if (typeof doc.putTotalPages === 'function') {
        //         str = str + " of " + totalPagesExp;
        //     }
        //     doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
        // };
      });
      clearInterval(this.interval1);

    }

    else {
      this.timeLeft1 = 3;
      
    }
  }, 1000)
}

  constructor(calendar: NgbCalendar, private data: ERPService, private router: Router,private toastrService: ToastrService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    
  }
  
  onDateSelection(date: NgbDate) {
  
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    
    this.data.GetIncedent_Patrole().subscribe(res=>{
      this.Markers=[];
      this.Incedents = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.IncedentCount = 0;
      this.Incedents.forEach(marker => {
       
        var f =new Date( this.fromDate.year+"/"+this.fromDate.month+"/"+this.fromDate.day);
        var t =new Date( this.toDate.year+"/"+this.toDate.month+"/"+this.toDate.day);
        var md = new Date(marker["Date"]);
        if (md>=f && md<=t)
        {
          // console.log(f, md)
          this.IncedentCount++;
          this.Markers.push(marker);
        }
        
      
    });
    });
  }
  clear(){
    this.IncedentCount = 0;
    this.fromDate=null;
    this.toDate=null;
    this.ngOnInit();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }


  
  ngOnInit() {

    this.data.GetIncedent_Patrole().subscribe(res=>{
      this.Incedents = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.Incedents.forEach(marker => {
        this.IncedentCount++;
      this.Markers = JSON.parse(JSON.stringify(res));
      
    });
    });

    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
 
 this.data.GetIncedent_Patrole().subscribe(res => {
  this.r = [];
  this.CoordList = JSON.parse(JSON.stringify(res));
  this.CoordList.forEach(element =>{
     this.r.push(element);
   });

  // console.log(this.r);

  this.r.forEach(element =>{
   
      this.myLatLngList = {
     
        myLatLng : [{ lat: parseFloat(element["Lat"]), lng: parseFloat(element["Long"])}] 
        };
   
     for(const data of this.myLatLngList.myLatLng){
       var marker = new google.maps.Marker({
           position: data,
           map: this.map,
           title: 'Hallo This is a marker'
       });
       
    }
  })

})
//     const mapProperties = {
//       center: new google.maps.LatLng(-25.8825, 28.2639),
//       zoom: 14,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//  };
//  this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
//  this.createMarker();
//   }

//   createMarker() {

//     // list of hardcoded positions markers 
//      var myLatLngList = {
//          myLatLng : [{ lat: -25.8825 , lng: 28.2639 }, { lat: -25.8830, lng: 28.2640 }, { lat: -25.8850, lng: 28.2670 }]    
//          };

//         //iterate latLng and add markers 
//        for(const data of myLatLngList.myLatLng){
//          var marker = new google.maps.Marker({
//              position: data,
//              map: this.map,
//              title: 'Hallo This is a marker'
//          });
//       }
//  };
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

  
    



