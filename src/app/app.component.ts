import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue = '';
  firstColor = 'grey';
  secondColor = 'grey';
  thirdColor = 'grey';
  handleInputChange(): void {
    this.setDefaultColor();
    if (this.inputValue.length > 8) {
      if (this.hard()) {
        this.setColorStrong();  //Strong Password
      } else if (this.medium()) {
        this.setColorMedium();  //Medium Password
      } else {
        this.setColorHard(); //Weak Password
      }
    }
  }


  setDefaultColor(): void {
    this.firstColor= 'gray';
    this.secondColor = 'gray';
    this.thirdColor = 'gray';
  }

  setColorStrong(): void {
    this.firstColor = 'green';
    this.secondColor = 'green';
    this.thirdColor = 'green';
  }

  setColorMedium(): void {
    this.firstColor = 'yellow';
    this.secondColor = 'yellow';
    this.thirdColor = 'gray';
  }

  setColorHard(): void {
    this.firstColor = 'red';
    this.secondColor = 'gray';
    this.thirdColor = 'gray';
  }
  medium(): boolean {
    return this.hasLetters() && this.hasSymbols() ||
    this.hasLetters() && this.hasDigits() ||
    this.hasDigits() && this.hasSymbols()
  }
  hard(): boolean {
    return this.hasSymbols() &&
    this.hasDigits() &&
    this.hasLetters()
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
}
