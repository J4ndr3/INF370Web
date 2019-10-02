import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-event-type-modify',
  templateUrl: './event-type-modify.component.html',
  styleUrls: ['./event-type-modify.component.sass']
})
export class EventTypeModifyComponent implements OnInit {
 EventTypes: any;
  EditForm : FormGroup;
  EventTypeModifySelection:number =0; //if you have a select list
  EventTypeModifyOptions:Array<object>; //if you have a select list
  nEventType:object;
  rcv: object;
  
  
  constructor(private router:Router,private data: ERPService, private formBuilder: FormBuilder, private toastrService: ToastrService ) { }

  ngOnInit() {
    
    this.EditForm = this.formBuilder.group({
      ID:[], // your attributes
      Description: [] // your attributes
      });
      this.edt();

  }
  edit(ID){
    this.data.GetEventTypes(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/event-type");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/event-type-modify");
        // this.ngOnInit();
       
      }})
    
  }
  edt(){
    this.data.GetEventTypes(this.data.nID).subscribe(res=>{     
      this.EventTypes = res;
      this.EditForm.setValue({
        ID:this.EventTypes.Type_ID,
        Description:this.EventTypes.Description
        })    
    })
  }
    update(){
      var Description = this.EditForm.get('Description').value; //the name in red the same as on you html
      var ID = this.EditForm.get('ID').value;
  
      if (Description=="") {
        document.getElementById("inputErr").click(); //Hy mag dalk nie nou werk nie sal hom in nav gaan declare
      }
      else {
        this.nEventType = {
          "Type_ID":ID, //selfde as die databasis 
          "Description": Description, //selfde as die databasis
        };
        // console.log(this.nEventType);
        this.data.PutEventType(ID,this.nEventType).subscribe(res => {
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
    this.router.navigateByUrl("/event-type");
  }
}


