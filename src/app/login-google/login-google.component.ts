import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";

@Component({
    selector: 'login-google',
    templateUrl: './login-google.component.html',
    styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

    constructor(public auth: AuthService) { }

    ngOnInit() {
    }

}
