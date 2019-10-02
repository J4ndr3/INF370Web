import { Component, OnInit } from '@angular/core';
import {ERPService} from '..//erp.service';  

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.sass']
})
export class AuditComponent implements OnInit {
  Audits:Array<object>;
  searchtext;
  constructor(private data: ERPService) { }

  ngOnInit() {
    this.data.readAudit().subscribe(res=>{
      this.Audits = JSON.parse(JSON.stringify(res));
      console.log(this.Audits)
    })
  }
  downloadRequest(){
    this.data.downloadReport().subscribe(x=>{
      var fileType = "application/ms-excel";
      var fileName = "Audit.xlsx";
      var newBlob = new Blob([x],{type:fileType});
      if (window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(newBlob);
        return
      }
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href =data;
      link.download = fileName;
      link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));

      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove;
      },100)
    })
  }

}
