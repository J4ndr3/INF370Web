import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';  
import { RewardModifyComponent } from '../reward-modify/reward-modify.component';
import { RewardEventModifyComponent } from '../reward-event-modify/reward-event-modify.component';


@Component({
  selector: 'app-reward-add',
  templateUrl: './reward-add.component.html',
  styleUrls: ['./reward-add.component.sass']
})





export class RewardAddComponent implements OnInit {
  RewardAdds: object;
  AddForm: FormGroup;
  NewRewardAdd:object;
  RewardAddSelection:number =0;
  RewardAddOptions:Array<object>; 

  EventRewardAdds: object;
  AddForm1: FormGroup;
  NewEventRewardAdd:object;
  EventRewardAddSelection:number =0;
  EventRewardAddOptions:Array<object>; 
  searchText;
  searchText1;
  
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder, private mod: RewardModifyComponent,private mod1: RewardEventModifyComponent) { }

  ngOnInit() {
    this.data.GetRewardAdd().subscribe(res=>{
      this.RewardAdds = res;
    });
    this.data.GetEventRewardAdd().subscribe(res=>{
      this.EventRewardAdds = res;
    });
    this.AddForm = this.formBuilder.group({
      PName: [], // Names for your input
      PQuantity: [], // Names for your input 
      PPoints: [],
      PDescription: ["Type Product..."]
    });
    this.data.GetProductType().subscribe((res) => {
      this.RewardAddOptions = JSON.parse(JSON.stringify(res));
    }); 
    this.AddForm1 = this.formBuilder.group({
      EName: [], // Names for your input
      EPoints: [], // Names for your input 
      EDate: [],
      ELocation: [],
      EDescription: ["Type Event..."]
    });
    this.data.GetEventType().subscribe((res) => {
      this.EventRewardAddSelection=0;
      this.EventRewardAddOptions = JSON.parse(JSON.stringify(res));
    }); 
    }
    delete(ID){
      this.data.nID = ID;
      document.getElementById('del').click();
    }
      delete1(ID){
        this.data.nID = ID;
        document.getElementById('del1').click();
    }
    del(){
      this.data.DeleteRewardAdd(this.data.nID).subscribe(res=>{
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

    del1(){
      this.data.DeleteEventRewardAdd(this.data.nID).subscribe(res=>{
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
    edit(ID){
      this.mod.edit(ID);
    }
    edit1(ID){
      this.mod1.edit(ID);
    }
  
  showToast(){
    this.toastrService.show("Reward could not be modified", "Error");
  }
  delToast(){
    this.toastrService.show("Record could not be removed.", "Error!");
  }
  delSuccessToast(){
    this.toastrService.show("Record removed.", "Success!");
  }

  Event(){
    this.toastrService.show("This record was added successfully", "Success!");
  }
  
    addRewardAdd() {
      var PName = this.AddForm.get('PName').value; // Names for your input
      var PQuantity = this.AddForm.get('PQuantity').value; // Names for your input
      var PPoints = this.AddForm.get('PPoints').value;
      var PDescription = this.AddForm.get('PDescription').value;
  
      if ((PName||PQuantity||PPoints||PDescription)=="") {
        //Modal popup
        document.getElementById("inputErr").click();
      }
      else {
        this.NewRewardAdd = {
          "Name": PName, // Names for your input
          "Quantity": PQuantity, // Names for your input
          "Points": PPoints,
          "Prod_ID":PDescription,
          
        };
        // console.log(this.NewRewardAdd)
        this.data.PostRewardAdd(this.NewRewardAdd).subscribe(res => {
          this.ngOnInit();
          this.Event();
        });
      }
    }
    addEventAdd() {
      var EName = this.AddForm1.get('EName').value;
      var EPoints = this.AddForm1.get('EPoints').value; // Names for your input
      var EDate = this.AddForm1.get('EDate').value; // Names for your input
      var ELocation = this.AddForm1.get('ELocation').value;
      var EDescription = this.AddForm1.get('EDescription').value;
  // console.log(EDescription);
      if ((EName||EPoints||EDate||ELocation||EDescription)=="") {
        //Modal popup
      }
      else {
        this.NewEventRewardAdd = {
          "Name": EName, // Names for your input
          "Points": EPoints, // Names for your input
          "Date": EDate,
          "Location":ELocation,
          "Type_ID": EDescription,
          
        };
        // console.log(this.NewEventRewardAdd)
        this.data.PostEventRewardAdd(this.NewEventRewardAdd).subscribe(res => {
          this.Event();
          this.AddForm1.reset();
          this.EventRewardAddSelection=undefined;
          this.ngOnInit();
        });
        
      }
    }
      
    }
  
  
  
    