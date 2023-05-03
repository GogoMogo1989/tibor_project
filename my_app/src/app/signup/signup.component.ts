import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/signupservices';

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
    ]),
    isAdmin: new FormControl(false)
  });

  matcher = new MyErrorStateMatcher();

  get confirmPasswordFormControl(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }
  
  get passwordFormControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }
  
  get emailFormControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  adminEmails: string[] = [];
  randomAdminString: string = '';

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.adminEmails = users
        .filter((user: any) => user.isAdmin === true)
        .map((user: any) => user.email);
        this.randomAdminString = this.adminEmails[Math.floor(Math.random() * this.adminEmails.length)];
        console.log(this.adminEmails)
        console.log(this.randomAdminString)
    });
  }

  onSubmit() {
    if (this.signupForm.valid &&
        this.signupForm.controls.checkboxFormControl.value &&
        this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
          const email = this.signupForm.controls.email.value;
          const password = this.signupForm.controls.password.value;
          const isAdmin = this.signupForm.controls.isAdmin.value; 
          if (email !== null) {
            this.userService.createUser(email ? email: undefined, password? password: undefined, isAdmin? isAdmin: undefined).subscribe(_response => {
              console.log('Sikeres felhasználó mentés a szerveren!');
              this.router.navigate(['/login']);
              alert('Sikeres regisztráció!');
              this.ngOnInit()
            }, error => {
              console.log('Hiba a felhasználó mentésekor a szerveren!', error);
            });
          }
    } else {
      console.log('nem sikerült');
      alert('Jelszónak egyeznie kell, és kérlek fogadd el a felhasználási feltételeket!')
    }
  }
  
}