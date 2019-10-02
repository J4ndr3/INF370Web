import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {} from 'googlemaps';
import htmlToImage from 'html-to-image';

@Component({
  selector: 'app-download-incedent',  
  templateUrl: './download-incedent.component.html',
  styleUrls: ['./download-incedent.component.sass']
})
export class DownloadIncedentComponent implements OnInit {
  myDate= new Date().toLocaleDateString();
  Markers:object;
  Incedents:Array<object>;
  timeLeft: number = 5;
  interval;
  timeLeft1: number = 2;
  interval1;
  IncedentCount = 0;
  myLatLngList: any;
  Latitude: Array<number>;
  Longitude: Array<number>;
  CoordList: Array<object>;
  r: Array<object>;
MAP1:any;

  @ViewChild('content', { static: false }) content: ElementRef;
  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;

  constructor(private data: ERPService, private router:Router) { }

  ngOnInit() {
    this.interval1 = setInterval(() => {
      if(this.timeLeft1 > 0) {
        this.timeLeft1--;
      } else if (this.timeLeft1 == 0) {
let img1;

      var htmlToImage = require('html-to-image');
      var node = document.getElementById('my-node');
      htmlToImage.toPng(node)
      .then(function (dataUrl) {
        
        var img = new Image();
        img.src = dataUrl;
        
        img1=img;
        document.getElementById('image123').append(img);
       
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
      clearInterval(this.interval1);
    }
else{
  this.timeLeft1 = 2;
}
},1000)

    document.getElementById('chrt1').innerHTML = '<br><br><p class=f1 style="font-size:30px">'+this.myDate+'</p> <img src="./assets/Capturesonderbackground.png" alt="Italian Trulli" style="width:5%" class=f><h1 style="margin:auto">INCEDENT REPORT</h1></div><br><br>';
    document.getElementById('chrt2').innerHTML = '<h6>**END OF REPORT**</h6>';
    document.getElementById('chrt3').innerHTML = '<br><br>';
    this.data.GetIncedent_Patrole().subscribe(res=>{
      this.Incedents = JSON.parse(JSON.stringify(res));
      // console.log(res);
      this.Incedents.forEach(marker => {
        this.IncedentCount++;
      this.Markers = res;
      
    });
    });
    
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft == 0) {
        
        
        
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
          pdf.save('INCEDENT REPORT.pdf'); // Generated PDF  
          this.router.navigateByUrl("/incident-report");
        });
    clearInterval(this.interval);
      }
      else{
        this.timeLeft = 5;
      }
    },1000)

   
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
      }
    
}
    
    
    
  

