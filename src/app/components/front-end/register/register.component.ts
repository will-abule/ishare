import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user;
  activeButton    = false;
  submit = 'Submit'
  loader = false
  
  userForm: FormGroup;
  // newUser = true; // to toggle login or signup form
  // passReset = false; // set to true when password reset is triggered
  formErrors = {
    'name': '',
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'name': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 20 characters long.',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 20 characters long.',
    }
  };


  constructor(
    private fb      : FormBuilder,
    private auth    : AuthService,
    private router  :   Router
  ) { }
  
    ngOnInit(){

      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
      });

      this.buildForm();
    }
  
    signup(): void {
      this.submit = 'processing'
      this.loader = true
      this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password'], this.userForm.value['name'])
    }
  
    buildForm(): void {
      this.userForm = this.fb.group({
        'name': ['', [
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
        ],
        'email': ['', [
          Validators.required,
          Validators.email
        ]
        ],
        'password': ['', [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
        ],
      });
  
      this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // reset validation messages
    }
  
  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field); 
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}