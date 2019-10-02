import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reserve-mod',
  templateUrl: './reserve-mod.component.html',
  styleUrls: ['./reserve-mod.component.sass']
})
export class ReserveModComponent implements OnInit {
  Reserve: any;
  EditForm : FormGroup;
  nReserve:object;
  rcv: object;
  constructor(private toastrService: ToastrService, private router:Router,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      ID:[],
      Name: [],
      Description: [],
      Lattitude: [],
      Longitude: []});
      this.edt();
  }
  edit(ID){
    this.data.GetReserve(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/reserve");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/reservemod");
        
        // this.ngOnInit();
      }})
    
  }
  edt(){
    this.data.GetReserve(this.data.nID).subscribe(res=>{     
      this.Reserve = res;
      this.EditForm.setValue({ID:this.Reserve.Reserve_ID,
        Name:this.Reserve.Name,
        Description:this.Reserve.Description,
        Lattitude:this.Reserve.Lat,
        Longitude:this.Reserve.Lng})    
    })
  }
  update(){
    var Name = this.EditForm.get('Name').value;
    var Description = this.EditForm.get('Description').value;
    var Lattitude = this.EditForm.get('Lattitude').value;
    var Longitude = this.EditForm.get('Longitude').value;
    var ID = this.EditForm.get('ID').value;

    if (Description==""||Lattitude==""||Longitude==""|| Name =="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nReserve = {
        "Reserve_ID":ID,
        "Name": Name,
        "Description": Description,
        "Lat": Lattitude,
        "Lng": Longitude
      };
      // console.log(this.nReserve);
      this.data.PutReserve(ID,this.nReserve).subscribe(res => {
        this.rcv = res
        // console.log(this.rcv);
        if (this.rcv == null)
        {
          this.showToast();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
        
      });
    }
  }
  showToast(){
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl('/reserve')
  }
}
