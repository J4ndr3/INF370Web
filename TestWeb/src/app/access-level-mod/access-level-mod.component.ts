import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ERPService } from '../erp.service';

@Component({
  selector: 'app-access-level-mod',
  templateUrl: './access-level-mod.component.html',
  styleUrls: ['./access-level-mod.component.sass']
})
export class AccessLevelModComponent implements OnInit {
  Access_Level: any;
  EditForm: FormGroup;
  nAccess: object;
  rcv: object;
  constructor(private toastrService: ToastrService, private router: Router, private data: ERPService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
      ID: [],
      Web: ["Web Access..."],
      Report: ["Report Access..."],
      Write: ["Write Access..."],
      App: ["App Access..."]
    });
    this.edt();
  }
  edit(ID) {
    // alert(ID)
    this.data.GetAccess_Level(ID).subscribe(res => {
      if (res == 1) {
        alert("Not found");
        this.router.navigateByUrl("/userrole");
      }
      else {
        this.router.navigateByUrl("/AccessMod");
        this.data.nID = ID;
        // this.ngOnInit();

      }
    })

  }
  edt() {
    this.data.GetAccess_Level(this.data.nID).subscribe(res => {
      this.Access_Level = res;
      // console.log(res)
      // console.log(this.Access_Level.Web)
      if (this.Access_Level.Web == true) {
        var Web = "True";
      }
      else if (this.Access_Level.Web == false) {
        var Web = "False";
      }
      if (this.Access_Level.Report == true) {
        var Report = "True";
      }
      else if (this.Access_Level.Report ==false ) {
        var Report = "False";
      }
      if (this.Access_Level.Write == true ) {
        var Write = "True";
      }
      else if (this.Access_Level.Write ==false ) {
        var Write = "False";
      }
      if (this.Access_Level.App == true) {
        var App = "True";
      }
      else if (this.Access_Level.App == false) {
        var App = "False";
      }
      this.EditForm.setValue({
        ID: this.Access_Level.Access_ID,
        Web: Web,
        Report: Report,
        Write: Write,
        App: App
      })
    })
  }
  update() {
    if (this.EditForm.get('Web').value == "True") {
      var Web = 1;
    }
    else if (this.EditForm.get('Web').value == "False") {
      var Web = 0;
    }
    if (this.EditForm.get('Report').value == "True") {
      var Report = 1;
    }
    else if (this.EditForm.get('Report').value == "False") {
      var Report = 0;
    }
    if (this.EditForm.get('Write').value == "True") {
      var Write = 1;
    }
    else if (this.EditForm.get('Write').value == "False") {
      var Write = 0;
    }
    if (this.EditForm.get('App').value == "True") {
      var App = 1;
    }
    else if (this.EditForm.get('App').value == "False") {
      var App = 0;
    }
    var ID = this.EditForm.get('ID').value;
    // alert(ID)
    if (Web == null || Report == null || Write == null || App == null) {
      // console.log(Web, Report, Write, App)
      document.getElementById("inputErr").click();
    }
    else {
      this.nAccess = {
        "Access_ID": ID,
        "Web": Web,
        "Report": Report,
        "Write": Write,
        "App": App
      };
    }
    // console.log(this.nAccess);
    this.data.PutAccess_Level(ID, this.nAccess).subscribe(res => {
      this.rcv = res
      // console.log(this.rcv);
      if (this.rcv == null) {
        this.showToast();
      }
      else {
        document.getElementById("inputErr").click();
      }

    });
  }

  showToast() {
    this.toastrService.show("Record modified successfully.", "Success!");
    this.router.navigateByUrl("/userrole");
  }

}
