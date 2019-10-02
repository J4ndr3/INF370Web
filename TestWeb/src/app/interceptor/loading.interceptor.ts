import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoadingScreenService } from "../services/loading-screen/loading-screen.service";
import { finalize, catchError } from "rxjs/operators";


@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

  activeRequests: number = 0;

  /**
   * URLs for which the loading screen should not be enabled
   */
  skippUrls = [
    '/markers-report'
  ];

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;

    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        this.loadingScreenService.startLoading();
      }
      this.activeRequests++;

      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingScreenService.stopLoading();
          }
        }),catchError((error: HttpErrorResponse) => {
          let data = {};
          data = {
              reason: error && error.error.reason ? error.error.reason : '',
              status: error.status
          };
          // console.log(data);
          if (data["status"] == 0){
            this.hideAll();
            document.getElementById('generalMod').click();
            return throwError(error);
          }
          if (data["status"] == 400){
            this.hideAll();
            document.getElementById('inputErr').click();      
            return throwError(error);
          }
          if (data["status"] == 500){
            this.hideAll();
            document.getElementById('delErr').click();      
            return throwError(error);
          }
          
      })
      )
    } else {
      return next.handle(request);
    }
    
  };
  hideAll(): void {
    var back = document.querySelectorAll(".modal-backdrop");
    if(back) {
      $('.modal-backdrop').remove();
    }

		//try to hide all active modals
		var openModals = document.querySelectorAll(".modal.in");
		if(openModals) {
			for(let i = 0; i < openModals.length; i++) {
				//Get the modal-header of the modal
				var modalHeader = openModals[i].getElementsByClassName("modal-header");
				if(modalHeader && modalHeader.length > 0) {
					//Get the close button in the modal header
					var closeButton : any = modalHeader[0].getElementsByTagName("BUTTON");
					if(closeButton && closeButton.length > 0) {
						//simulate click on close button
            closeButton[0].click();
					}
				}
			}
		}
	}
}