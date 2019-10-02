import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '..//erp.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-security-mod',
  templateUrl: './security-mod.component.html',
  styleUrls: ['./security-mod.component.sass']
})
export class SecurityModComponent implements OnInit {
  Security: any;
  EditForm : FormGroup;
  ReserveSelection:number =0;
  ReserveOptions:Array<object>; 
  nSecurity:object;
  rcv: object;
  constructor(private toastrService: ToastrService,private router:Router,private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data.GetReserves().subscribe(res=>{
      this.ReserveOptions = JSON.parse(JSON.stringify(res));
    })
    this.EditForm = this.formBuilder.group({
      ID:[],
      Name: [],
      Cell: [],
      Email: [],
      Reserve: []});
      this.edt();
  }
  edit(ID){
    // console.log(ID)
    this.data.GetSecurity(ID).subscribe(res=>{
      if (res==1)
      {
        alert("Not found");
        this.router.navigateByUrl("/security");
      }
      else{
        this.data.nID = ID;
        this.router.navigateByUrl("/securitymod");
        
      }})
    
  }
  edt(){
    // console.log(this.data.nID)
    this.data.GetSecurity(this.data.nID).subscribe(res=>{     
      this.Security = res;
      this.EditForm.setValue({ID:this.Security.Security_ID,
        Name:this.Security.Name,
        Email:this.Security.Email,
        Cell:this.Security.Cell,
        Reserve:this.Security.Reserve_ID})    
    })
  }
  update(){
    var Name = this.EditForm.get('Name').value;
    var Email = this.EditForm.get('Email').value;
    var Cell = this.EditForm.get('Cell').value;
    var Reserve = this.EditForm.get('Reserve').value;
    var ID = this.EditForm.get('ID').value;

    if (Email==""||Cell==""||Reserve=="" || Name =="") {
      document.getElementById("inputErr").click();
    }
    else {
      this.nSecurity = {
        "Security_ID":ID,
        "Name": Name,
        "Email": Email,
        "Cell": Cell,
        "Reserve_ID": Reserve
      };
      // console.log(this.nSecurity);
      this.data.PutSecurities(ID,this.nSecurity).subscribe(res => {
        this.rcv = res
        // console.log(this.rcv);
        if (this.rcv == null)
        {
          this.showToast();
          this.router.navigateByUrl("/security");
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
  }
}
