import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import {ERPService} from '..//erp.service';  
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  TimerModify: any;
  EditForm : FormGroup;
  TimerSelection:number =0;
  TimerOptions:Array<object>; 
  nTimer:object;
  theID:any;
  rcv: object;
  loggedIn:any;

  constructor( private data: ERPService, private router: Router,private toastrService: ToastrService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loggedIn = sessionStorage.getItem("Ranger");
    this.NotificationTimer(this.loggedIn);

    this.data.GetProductType().subscribe(res=>{
      this.TimerOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      Timer: [], // Names for your input
      ID:[]
      });
      this.edt();
  }

  edit(ID){
    this.data.GetRewardAdds(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/reward-add");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/reward-modify");
        
      
      }})
    
  }

  edt(){
    this.data.GetRewardAdds(this.data.nID).subscribe(res=>{
      this.TimerModify = res;
      // console.log(res);
      this.EditForm.setValue({PID:this.TimerModify.Product_Reward_ID,
        PName:this.TimerModify.Name,
        PQuantity:this.TimerModify.Quantity,
        PPoints:this.TimerModify.Points,
        PDescription:this.TimerModify.Prod_ID})    
    })
  }
  update(){
    var PName = this.EditForm.get('PName').value;
    var PQuantity = this.EditForm.get('PQuantity').value;
    var PPoints = this.EditForm.get('PPoints').value;
    var PID = this.EditForm.get('PID').value;
    var PDescription = this.EditForm.get('PDescription').value;

    if ((PName||PQuantity||PPoints||PDescription) == ""||(PName||PQuantity||PPoints||PDescription)==null || PName =="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nTimer = {
        "Product_Reward_ID":PID,
        "Name": PName,
        "Quantity": PQuantity,
        "Points": PPoints,
        "Prod_ID": PDescription
        
      };
      // console.log(this.nReward);
      this.data.PutRewardAdd(PID,this.nTimer).subscribe(res => {
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
    this.router.navigateByUrl("/reward-add");
  }

  NotificationTimer(ID){

  }

}
