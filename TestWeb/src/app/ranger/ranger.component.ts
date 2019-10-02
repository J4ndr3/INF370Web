import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModifyRangerComponent } from 'src/app/modify-ranger/modify-ranger.component'
import { ViewRangerComponent } from '../view-ranger/view-ranger.component';


@Component({
  selector: 'app-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.sass']
})
export class RangerComponent implements OnInit {
  Rangers1: Array<object>;
  Rangers: Array<object>;
  searchtext;
  constructor(private toastrService: ToastrService, private data: ERPService, private formBuilder: FormBuilder, private mod: ModifyRangerComponent, private view1: ViewRangerComponent) { }

  ngOnInit() {
    this.Rangers=[];
    this.data.GetRanger().subscribe(res => {
      // console.log(res);
      this.Rangers1 = JSON.parse(JSON.stringify(res));
      this.Rangers1.forEach(element => {
        if (element["Status"] == true)
        {
          var stat = "Active"; 
        }
        else
        {
          var stat = "Inactive"
        }
        var n = {
          ID:element["ID"],
          Name:element["Name"],
          Surname:element["Surname"],
          User_Role:element["User_Role"],
          Email:element["Email"],
          Cell:element["Cell"],
          RID:element["RID"],
          Status:stat,
          Points:element["Points"]
        }
        this.Rangers.push(n)
      });
    });
  }
  showToast() {
    this.toastrService.show("Record added successfully", "Success!");
  }
  edit(ID){
    this.mod.edit(ID);
  }
  view(ID){
    // console.log("Hallo",ID)
    this.view1.open(ID);
  }
  sendNote(){
    // console.log("hit");
    this.data.sendNotif("Full moon","Tonight is a full moon be on the lookout.");
    
  }
  delToast(){
    this.toastrService.show("Record could not be removed.", "Error!");
  }
  delSuccessToast(){
    this.toastrService.show("Record removed.", "Success!");
  }
  delete(ID){
    this.data.nID = ID;
    document.getElementById('del').click();
  }
  del(){
    this.data.DeleteRaner(this.data.nID).subscribe(res=>{
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
