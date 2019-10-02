import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';
import { MarkerTypeModComponent }  from '../marker-type-mod/marker-type-mod.component';          

@Component({
  selector: 'app-marker-type',
  templateUrl: './marker-type.component.html',
  styleUrls: ['./marker-type.component.sass']
})
export class MarkerTypeComponent implements OnInit {

  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder,private mod:MarkerTypeModComponent) { }
  Type: object;
  AddForm: FormGroup;
  NewType:object;
  searchText;
  
  
  ngOnInit() {
    
    this.AddForm = this.formBuilder.group({
      Type: [""], 
      Points_Worth: [""]
    });

    this.data.GetMarker_Types().subscribe(res=>{
      this.Type = res;
      if (this.Type[0]=="Not readable")
      {
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Type = null ;
      }
      else if(res==null){
        this.data.showModal("Error","An unexpected error has occured while retrieving data. Please try again at a later time")
        this.Type = null ;
      }
      // console.log(this.Type);
    });
  }

  addType() {
    var Type = this.AddForm.get('Type').value; // Names for your input
    var Points_Worth = this.AddForm.get('Points_Worth').value; 

    if (Type=="" ||Points_Worth=="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.NewType = {
        "Type": Type, 
        "Points_Worth": Points_Worth
      };
      this.data.PostMarker_Type(this.NewType).subscribe(res => {

         if (res != null)
        {
          if (res =="1"){
            document.getElementById("dup").click();
          }
          else if(res=="2"){
            document.getElementById("generalMod").click();
          }
          else{
            this.ngOnInit();
            this.showToast();
          }
        }
      });
    }}

    edit(ID){
      this.mod.edit(ID);
    }
    delete(ID){
      this.data.nID = ID;
      document.getElementById('del').click();
    }
    del(){
      this.data.DeleteMarker_Type(this.data.nID).subscribe(res=>{
        if (res!=null)
        {
          this.DEL();
          this.ngOnInit();
        }
        else if (res==2)
        {
          alert("You are not allowed to delete this record");
        }
        else
        {
          this.delToast()
        }
      })
    }
  
  
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
  }
  delToast(){
    this.toastrService.show("Record could not be removed.", "Error!");
  }
  DEL(){
    this.toastrService.show("Record removed successfully.", "Success!");
  }
}
