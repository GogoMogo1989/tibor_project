import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
    checkboxFormControl: new FormControl(false, [
      Validators.requiredTrue,
    ])
  });

  matcher = new MyErrorStateMatcher();

  get confirmPasswordFormControl() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  get passwordFormControl() {
    return this.signupForm.get('password') as FormControl;
  }

  get emailFormControl() {
    return this.signupForm.get('email') as FormControl;
  }

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.signupForm.valid &&
        this.signupForm.controls.checkboxFormControl.value &&
        this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
          const email = this.signupForm.controls.email.value;
          const password = this.signupForm.controls.password.value;
          this.http.post('http://localhost:8000/signup', { email, password }).subscribe(response => {
          console.log('Sikeres felhasználó mentés a szerveren!');
          }, error => {
          console.log('Hiba a felhasználó mentésekor a szerveren!', error);
          })
    } else {
      console.log("nem sikerült")
    }
  }
}