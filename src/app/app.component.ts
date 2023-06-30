import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue= '';
  firstColor= 'gray';
  secondColor = 'gray';
  thirdColor = 'gray';
  handleInputChange(): void {
    this.firstColor= 'gray';
    this.secondColor = 'gray';
    this.thirdColor = 'gray';

    if (this.inputValue.length > 8) {
      if (this.hasSymbols() &&
        this.hasDigits() &&
        this.hasLetters()) {
        this.firstColor = 'green';
        this.secondColor = 'green';
        this.thirdColor = 'green'; //Strong Password
      } else if (this.hasLetters() && this.hasSymbols() ||
        this.hasLetters() && this.hasDigits() ||
        this.hasDigits() && this.hasSymbols()) {
        this.firstColor = 'yellow';
        this.secondColor = 'yellow';
        this.thirdColor = 'gray'; //Medium Password
      } else {
        this.firstColor = 'red';
        this.secondColor = 'gray';
        this.thirdColor = 'gray'; //Weak Password
      }
    }
  }

  hasSymbols(): boolean  {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.inputValue)
  }
  hasDigits(): boolean {
    return /[0-9]/.test(this.inputValue)
  }
  hasLetters(): boolean {
    return /[a-zA-Z]/.test(this.inputValue)
  }


  // updateColor(): void {
  //   if (this.inputValue.length === 2) {
  //     this.textColor = 'blue';
  //   } else if (this.inputValue.length > 6) {
  //     this.textColor = 'yellow';
  //   } else if (this.inputValue.length > 8) {
  //     this.textColor = 'green';
  //   }
  // }

  // myForm: FormGroup;
  // passwordStrength= '';
  //
  // constructor(private formBuilder: FormBuilder) {
  //   this.myForm = this.formBuilder.group({
  //     password: ['', [Validators.required, Validators.minLength(8)]]
  //   });
  // }
  //
  //   const passwordControl = this.myForm.get('password');
  //   if (passwordControl && passwordControl.value !== null) {
  //     const password = passwordControl.value;
  //     if (password.length === 0) {
  //       this.passwordStrength = '';
  //     } else if (password.length < 8) {
  //       this.textColor: = red;
  //       this.style.color = 'black';
  //     } else if (/[a-zA-Z]/.password && /[0-9]/.password && /[!@#$%^&*(),.?":{}|<>]/.password) {
  //       this.style.color = 'black';
  //     } else {
  //       this.style.color = 'black';
  //     }
  //   }
  //
  // onSubmit() {
  //   if (this.myForm.valid) {
  //     // Form is valid, perform form submission
  //     console.log(this.myForm.value);
  //   } else {
  //     // Form is invalid, display error messages or take appropriate action
  //     console.log('Form is invalid.');
  //   }
  // }
}
