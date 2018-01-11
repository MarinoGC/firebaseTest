import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {

    signupForm: FormGroup;
    detailForm: FormGroup;

    constructor(public fb: FormBuilder,
                public auth: AuthService) { }

    get email() {return this.signupForm.get('email')};
    get password() {return this.signupForm.get('password')};
    get catchPhrase() {return this.detailForm.get('catchPhrase')};

    // Step 1
    signup() {
        return this.auth.emailSignUp(this.email.value, this.password.value)
    }
    // Step 2
    setCatchPhrase(user) {
        return this.auth.updateUser(user, { catchPhrase:  this.catchPhrase.value })
    }


    ngOnInit() {
        // First step
        this.signupForm = this.fb.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]],
            'password': ['', [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
                Validators.required
            ]],
            'region': ['', [
            ]]
        });
        //Second step
        this.detailForm = this.fb.group({
            'catchPhrase': ['', [
                Validators.required
            ]]
        })
    }
}
