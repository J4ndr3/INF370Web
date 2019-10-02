import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ERPService } from '../erp.service';
import { MarkerModComponent } from '../marker-mod/marker-mod.component';
import { now } from '@amcharts/amcharts4/.internal/core/utils/Time';
import {} from 'googlemaps';
@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.sass']
})
export class MarkerComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: any;
  map: google.maps.Map;
  myMap: google.maps.event;
  Markers: object;
  AddForm: FormGroup;
  NewMarker: object;
  MarkerMap:Array<object>;
  ReserveSelection: number = 0;
  ReserveOptions: Array<object>;
  MarkerTypeOptions: Array<object>;
  nMarker: object;
  searchtext;
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder, private mod: MarkerModComponent) { }

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Discription: [],
      Reserve: ["Reserve..."],
      Type: ["Marker Type..."],
      Status: ["Status..."],
      Lattitude: [],
      Longitude: []
    });
    var self = this;
    const mapProperties = {
      center: new google.maps.LatLng(-25.8825, 28.2639),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    google.maps.event.addListener(this.map, 'click', function (event) {
      var myLatLngList = {
        myLatLng: [{ lat: event.latLng.lat(), lng: event.latLng.lng() }]
      };
      // alert(event.latLng); 
      self.AddForm = self.formBuilder.group({
        Discription: [],
        Reserve: [],
        Type: [],
        Status: [],
        Lattitude: [event.latLng.lat()],
        Longitude: [event.latLng.lng()]
      });
      for (const data of myLatLngList.myLatLng) {
        var marker = new google.maps.Marker({
          position: data,
          map: self.map,
          title: 'Hallo This is a marker'
        });
      }});
     
      this.data.GetReserves().subscribe(res => {
        this.ReserveOptions = JSON.parse(JSON.stringify(res));
      })
      this.data.GetMarker_Types().subscribe(res => {
        this.MarkerTypeOptions = JSON.parse(JSON.stringify(res));
      })
      this.data.GetMarker().subscribe(res => {
        this.Markers = res;
        this.MarkerMap = JSON.parse(JSON.stringify(res));
        this.MarkerMap.forEach(element => {
          // console.log(element)
          var myLatLngList = {
            myLatLng: [{ lat: element["Lat"], lng: element["Long"] }]
          };
          for (const data of myLatLngList.myLatLng) {
          var marker = new google.maps.Marker({
            position: data,
            map: self.map,
            title: 'Marker: '+element["Description"]+', Priority: '+element["Type"]
          });}
        });
      });

    }
  add(){
        var Discription = this.AddForm.get('Discription').value;
        var Reserve = this.AddForm.get('Reserve').value;
        var Type = this.AddForm.get('Type').value;
        var Lattitude = this.AddForm.get('Lattitude').value;
        var Longitude = this.AddForm.get('Longitude').value;
        if(this.AddForm.get('Status').value == "Active"){
      var Status = 1;
    }
  else if (this.AddForm.get('Status').value == "Inactive") {
      var Status = 0;
    }

    if (Lattitude == "" || Longitude == "" || Lattitude == "" || Longitude == "" || Reserve == "") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nMarker = {
        "Description": Discription,
        "Reserve_ID": Reserve,
        "Marker_Type_ID": Type,
        "Lattitude": Lattitude,
        "Longitude": Longitude,
        "Status": Status,
        "Modified": new Date().toDateString()
      };
      // console.log(this.nMarker);
      this.data.PostMarker(this.nMarker).subscribe(res => {
        if (res != null) {
          this.ngOnInit();
          this.showToast();
        }
        else {
          document.getElementById("inputErr").click();
        }

      });
    }
  }
  edit(ID) {
    this.mod.edit(ID);
  }
  showToast() {
    this.toastrService.show("Record added successfully.", "Success!");
  }
  delToast() {
    this.toastrService.show("Record could not be removed.", "Error!");
  }
  delSuccessToast() {
    this.toastrService.show("Record removed.", "Success!");
  }
  delete(ID) {
    this.data.nID = ID;
    document.getElementById('del').click();
  }
  del() {
    this.data.DeleteMarker(this.data.nID).subscribe(res => {
      if (res != null) {
        this.delSuccessToast();
        this.ngOnInit();
      }
      else if (res == 2) {
        alert("You are not allowed to delete this record");
      }
      else {
        this.delToast()
      }
    })
  }
}
