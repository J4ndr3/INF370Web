import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ERPService } from '../erp.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-marker-mod',
  templateUrl: './marker-mod.component.html',
  styleUrls: ['./marker-mod.component.sass']
})
export class MarkerModComponent implements OnInit {
  Marker: any;
  EditForm: FormGroup;
  ReserveSelection: number = 0;
  ReserveOptions: Array<object>;
  MarkerTypeOptions:Array<object>;
  nMarker: object;
  rcv: object;
  constructor(private toastrService: ToastrService, private router: Router, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetReserves().subscribe(res => {
      this.ReserveOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetMarker_Types().subscribe(res=>{
      this.MarkerTypeOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      ID: [""],
      Description: [""],
      Reserve: [""],
      Type: [""],
      Status: [""],
      Lattitude: [""],
      Longitude: [""]
    });
    this.edt();
  }
  edit(ID) {
    this.data.GetMarkers(ID).subscribe(res => {
      if (res == 1) {
        alert("Not found");
        this.router.navigateByUrl("/marker");
      }
      else {
        this.data.nID = ID;
        this.router.navigateByUrl("/markermod");
       
        // this.ngOnInit();
       
      }
    })

  }
  edt() {
    this.data.GetMarkers(this.data.nID).subscribe(res => {
      this.Marker = res;
      // console.log(res)
      this.EditForm.setValue({
        ID: this.Marker.Marker_ID,
        Description: this.Marker.Description,
        Reserve: this.Marker.Reserve_ID,
        Lattitude: this.Marker.Lattitude,
        Longitude: this.Marker.Longitude,
        Type: this.Marker.Marker_Type_ID,
        Status: this.Marker.Status
      })
    })
  }
  update() {
    var Description = this.EditForm.get('Description').value;
    var Reserve = this.EditForm.get('Reserve').value;
    var Type = this.EditForm.get('Type').value;
    var Lattitude = this.EditForm.get('Lattitude').value;
    var Longitude = this.EditForm.get('Longitude').value;
    var ID = this.EditForm.get('ID').value;
    if (this.EditForm.get('Status').value == "Active"){
      var Status = 1;
  }
  else if (this.EditForm.get('Status').value == "Inactive")
  {
      var Status = 0;
  }

    if (Description == "" || Lattitude == "" || Longitude == "" || Reserve == "" || Type == "") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nMarker = {
        "Marker_ID":ID,
        "Description": Description,
        "Reserve_ID": Reserve,
        "Marker_Type_ID": Type,
        "Lattitude": Lattitude,
        "Longitude": Longitude,
        "Status": Status,
        "Modified": new Date().toDateString()
      };
      // console.log(this.nMarker);
      this.data.PutMarker(ID, this.nMarker).subscribe(res => {
        this.rcv = res
        // console.log(this.rcv);
        if (this.rcv == null) {
          this.showToast();
        }
        else {
          document.getElementById("inputErr").click();
        }

      });
    }
  }
  showToast() {
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/marker");
  }
  showToastE() {
    this.toastrService.show("Record could not be modified.", "Error!");
  }
}
