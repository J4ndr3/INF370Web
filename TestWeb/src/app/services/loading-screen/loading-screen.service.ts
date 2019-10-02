import { Injectable } from '@angular/core';
import { Subject } from "rxjs/";

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private _loading: boolean = false;
  loadingStatus: Subject<boolean> = new Subject<boolean>();

  get loading():boolean {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    // console.log("Hit")
    this.loading = true;
  }

  stopLoading() {
    // console.log("Stop")
    this.loading = false;
  }
}
