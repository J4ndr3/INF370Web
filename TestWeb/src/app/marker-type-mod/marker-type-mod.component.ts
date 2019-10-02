import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-marker-type-mod',
  templateUrl: './marker-type-mod.component.html',
  styleUrls: ['./marker-type-mod.component.sass']
})
export class MarkerTypeModComponent implements OnInit {
  Type: any;
  EditForm : FormGroup;
  nType:object;
  rcv: object;
  
  constructor(private toastrService: ToastrService,private router:Router,private data: ERPService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      ID:[], 
      Type: [], 
      Points_Worth: []
      });

      this.edt();
  }
  edit(ID){
    this.data.GetMarker_Type(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/markertype");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/markertypemod");
        // this.ngOnInit();
       
      }})
  }
  edt(){
    this.data.GetMarker_Type(this.data.nID).subscribe(res=>{     
      this.Type = res;
      this.EditForm.setValue({ID:this.Type.Marker_Type_ID,
        Type:this.Type.Type,
        Points_Worth:this.Type.Points_Worth
        })    
    })
  }

  update(){
    var Type = this.EditForm.get('Type').value; //the name in red the same as on you html
    var Points_Worth = this.EditForm.get('Points_Worth').value; //the name in red the same as on you html
    var ID = this.EditForm.get('ID').value;

    if (Type==""||Points_Worth=="") {
      document.getElementById("inputErr").click(); 
    }
    else {
      this.nType = {
        "Marker_Type_ID":ID, //selfde as die databasis 
        "Type": Type, //selfde as die databasis
        "Points_Worth": Points_Worth,
      };
      // console.log(this.nType);
      this.data.PutMarker_Type(ID,this.nType).subscribe(res => {
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
    this.router.navigateByUrl("/markertype");
  }
}
