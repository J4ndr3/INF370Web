import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reward-modify',
  templateUrl: './reward-modify.component.html',
  styleUrls: ['./reward-modify.component.sass']
})
export class RewardModifyComponent implements OnInit {
  RewardModify: any;
  EditForm : FormGroup;
  RewardSelection:number =0;
  RewardOptions:Array<object>; 
  nReward:object;
  theID:any;
  rcv: object;
  constructor(private toastrService: ToastrService, private router:Router,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetProductType().subscribe(res=>{
      this.RewardOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      PName: [], // Names for your input
      PQuantity: [], // Names for your input 
      PPoints: [],
      PDescription: [],
      PID:[]
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
      this.RewardModify = res;
      // console.log(res);
      this.EditForm.setValue({PID:this.RewardModify.Product_Reward_ID,
        PName:this.RewardModify.Name,
        PQuantity:this.RewardModify.Quantity,
        PPoints:this.RewardModify.Points,
        PDescription:this.RewardModify.Prod_ID})    
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
      this.nReward = {
        "Product_Reward_ID":PID,
        "Name": PName,
        "Quantity": PQuantity,
        "Points": PPoints,
        "Prod_ID": PDescription
        
      };
      // console.log(this.nReward);
      this.data.PutRewardAdd(PID,this.nReward).subscribe(res => {
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
