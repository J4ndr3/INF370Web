import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {ERPService} from '..//erp.service';          
import { FormBuilder,FormGroup } from '@angular/forms';      
import { SecurityModComponent }  from '../security-mod/security-mod.component'  

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent implements OnInit {
  Securities: object;
  AddForm: FormGroup;
  NewSecurity:object;
  ReserveSelection:number =0;
  ReserveOptions:Array<object>; 
  nSecurity:object;
  Search
  constructor(private toastrService: ToastrService,private data: ERPService, private formBuilder: FormBuilder,private mod:SecurityModComponent) { }

  ngOnInit() {
    this.AddForm = this.formBuilder.group({
      Name: [],
      Email: [],
      Cell: [],
      Reserve: ["Reserve..."]});
    this.data.GetReserves().subscribe(res=>{
      this.ReserveOptions = JSON.parse(JSON.stringify(res));
    })
    this.data.GetSecurities().subscribe(res=>{
      this.Securities = res;
    });

  }
  add(){
    var Name = this.AddForm.get('Name').value;
    var Cell = this.AddForm.get('Cell').value;
    var Email = this.AddForm.get('Email').value;
    var Reserve = this.AddForm.get('Reserve').value;
    

    if ( Name ==""||Cell==""||Email==""||Reserve=="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nSecurity = {
        "Name": Name,
        "Cell": Cell,
        "Email": Email,
        "Reserve_ID": Reserve
      };
      // console.log(this.NewSecurity);
      this.data.PostSecurity(this.nSecurity).subscribe(res => {
        if (res != null)
        {
          this.ngOnInit();
          this.showToast();
        }
        else
        {
          document.getElementById("inputErr").click();
        }
        
      });
    }
  }
  edit(ID){
    this.mod.edit(ID);
  }
  showToast(){
    this.toastrService.show("Record added successfully.", "Success!");
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
    this.data.DeleteSecurity(this.data.nID).subscribe(res=>{
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
