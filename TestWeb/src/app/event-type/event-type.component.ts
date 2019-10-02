import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';      
import { EventTypeModifyComponent}  from '../event-type-modify/event-type-modify.component';
@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.sass']
})
export class EventTypeComponent implements OnInit {
  EventTypes: object;
  AddForm: FormGroup;
  NewEventType:object;
  EventTypeSelection:number =0;
  EventTypeOptions:Array<object>; // as jy meer as een dropdown het doen dit vir almal
  searchText;

  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder, private mod: EventTypeModifyComponent) { }

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Description: [""], // Names for your input
});
    this.data.GetEventType().subscribe(res=>{
      this.EventTypes = res;


    });

  }
    showToast(){
      this.toastrService.show("Record could not be added", "Error!");
    }
    showToast1(){
      this.toastrService.show("Record added successfully", "Error!");
    }
    delToast(){
      this.toastrService.show("Record could not be removed.", "Error!");
    }
    delSuccessToast(){
      this.toastrService.show("Record removed.", "Success!");
    }
  
  edit(ID){
    this.mod.edit(ID);
  }



  
  addEventType() {
    var Description = this.AddForm.get('Description').value; // Names for your input
    

    if ((Description)=="") {
      //Modal popup
    }
    else {
      this.NewEventType = {
        "Description": Description, // Names for your input
        
        
      };
      this.data.PostEventType(this.NewEventType).subscribe(res => {
        this.ngOnInit();
        this.showToast1();
      });}}



      delete(ID){
        this.data.nID = ID;
        document.getElementById('del').click();
      }
    del(){
    this.data.DeleteEventType(this.data.nID).subscribe(res=>{
      if (res!=null)
      {
        this.delSuccessToast();
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
}

