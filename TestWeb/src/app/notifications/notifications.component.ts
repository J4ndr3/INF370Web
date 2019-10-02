import { Component, OnInit } from '@angular/core';
import {ERPService} from '..//erp.service';          

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {
  Notification:object;
constructor(private data:ERPService) { }
  ngOnInit() {
    this.data.GetNotifications().subscribe(res=>{
      this.Notification = res;
    })
  }

}
