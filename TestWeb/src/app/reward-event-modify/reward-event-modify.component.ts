import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-reward-event-modify',
  templateUrl: './reward-event-modify.component.html',
  styleUrls: ['./reward-event-modify.component.sass']
})
export class RewardEventModifyComponent implements OnInit {
  RewardEventModify: any;
  EditForm1 : FormGroup;
  RewardEventSelection:number =0;
  EventRewardOptions:Array<object>; 
  nEventReward:object;
  theID:any;
  rcv: object;
  constructor(private toastrService: ToastrService, private router:Router,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetEventType().subscribe(res=>{
      this.EventRewardOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm1 = this.formBuilder.group({
      EName: [], // Names for your input
      EPoints: [], // Names for your input 
      EDate: [],
      ELocation: [],
      EDescription: [],
      EID:[]
      });
      this.edt();
    }
      edit(ID){
        this.data.GetEventRewardAdds(ID).subscribe(res=>{
          if (res==1)
          {
            alert("Not found");
            this.router.navigateByUrl("/reward-add");
          }
          else{
            this.data.nID = ID;
            this.router.navigateByUrl("/reward-event-modify");
            
          }})
        
      }
  edt(){
    this.data.GetEventRewardAdds(this.data.nID).subscribe(res=>{
      this.RewardEventModify = res;
      // console.log(res);
      this.EditForm1.setValue({EID:this.RewardEventModify.Event_Reward_ID,
        EName:this.RewardEventModify.Name,
        EDate:this.RewardEventModify.Date,
        EPoints:this.RewardEventModify.Points,
        EDescription:this.RewardEventModify.Type_ID,
        ELocation:this.RewardEventModify.Location})    
    })
  }
  update(){
    var EName = this.EditForm1.get('EName').value;
    var EPoints = this.EditForm1.get('EPoints').value;
    var EDate = this.EditForm1.get('EDate').value;
    var ELocation = this.EditForm1.get('ELocation').value;
    var EID = this.EditForm1.get('EID').value;
    var EDescription = this.EditForm1.get('EDescription').value;

    if ((EName||EPoints||EDate||ELocation||EDescription) == ""||(EName||EPoints||EDate||ELocation||EDescription)==null || EName =="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nEventReward = {
        "Event_Reward_ID":EID,
        "Name": EName,
        "Location": ELocation,
        "Points": EPoints,
        "Type_ID": EDescription,
        "Date":EDate
        
      };
      // console.log(this.nEventReward);
      this.data.PutEventRewardAdd(EID,this.nEventReward).subscribe(res => {
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
}

