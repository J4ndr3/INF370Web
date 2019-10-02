import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoginService } from './login.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    showNav = false;
    title = 'TestWeb';
    constructor(private router: Router, private data: LoginService) {

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                if (event.url != "/login") {
                    if (event.url != "/reset") {
                        // console.log(event)
                        this.data.testlogin();
                        this.showNav = true;
                    }
                }


            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator
                router.navigateByUrl('/home');
                alert("The page URL you provided was not found and you will be redirected to the home page.")
                document.getElementById('generalMod').click();
                // Present error to user
                console.log(event.error);
            }
        });

    }
}
