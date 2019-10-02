import { Component, OnInit,Directive,Input,ViewChild } from '@angular/core';
import { ERPService } from '../erp.service';
import {} from 'googlemaps';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patrol-log',
  templateUrl: './patrol-log.component.html',
  styleUrls: ['./patrol-log.component.sass']
})
export class PatrolLogComponent implements OnInit {
  Patrol: object;
  searchText;
  previousTracks: Array<object>;
  currentMapTrack = null;
  watchID;
  isTracking = false;
  tracking: Array<object>;
  CoordList: Array<object>;
  wholeRoute:Array<object>;
  myroute = [];
  positionSubscription: Subscription;
  newLoc : object;



  @ViewChild('map',{static: false}) mapElement: any;
  map: google.maps.Map;
  myMap:google.maps.event;

  constructor(private data:ERPService) {
   }


  ngOnInit() {
    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.previousTracks = [];
    this.data.GetPatrol_log().subscribe(res=>{
      this.Patrol = res;
    
      //console.log(res);
    })
  }
  DrawRoute(ID){
    this.data.GetRoute().subscribe(res=>{
     //console.log(ID)
      this.tracking=[],
      this.CoordList = JSON.parse(JSON.stringify(res));
      this.CoordList.forEach(element => {
        //console.log(element["Patrol_Log_ID"])
        if(element["Patrol_Log_ID"]==ID){
          //console.log(element["Lattitude"]);
          this.newLoc = {
            "lat": element["Lattitude"],
          "lng": element["Longitude"]
          }
         // console.log(this.newLoc)
        this.tracking.push(this.newLoc);
      }
    })
      this.redrawPath(this.tracking)
 
 })
}


  // showHistoryRoute(route1) {
  //   //var r;
  //   var self = this;
  //   self.myroute = [];

  //   route1.forEach(element => {
  //     self.myroute.push({ Longitude: element.lng, Lattitude: element.lat, Patrol_Log_ID: 1 })
  //   });
  //   this.data.PostRoute(self.myroute).subscribe();
  //   this.redrawPath(route1);
  // }

  // loadHistoricRoutes() {
  //   this.storage.get('routes').then(data => {
  //     if (data) {
  //       this.previousTracks = data;
  //     }
  //   });
  // }
  redrawPath(path){
    //console.log("hit");
    //console.log(path);
    var self = this;
    if (this.currentMapTrack) {
      self.currentMapTrack.setMap(null);
    }
    // map should be your map class
    if (path.length > 1) {
      self.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: 'blue',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      var bounds = new google.maps.LatLngBounds();
      for (var i in path) // your marker list here
      {
       // console.log(path[i])
        bounds.extend(path[i])
      }
      // your marker position, must be a LatLng instance

      self.map.fitBounds(bounds);
      self.currentMapTrack.setMap(self.map);


    }}

}
