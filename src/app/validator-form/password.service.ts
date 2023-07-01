import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor() { }

  validatePassword(passwordValue: string): string[] {
    // Variables of validation based on complexity
    const hasLetters = /[a-zA-Z]/.test(passwordValue);
    const hasNumbers = /\d/.test(passwordValue);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordValue);

    // Logical variables for current state of passwordValue
    const isNotZero: boolean = passwordValue.length !== 0;
    const isLess8chars: boolean = passwordValue.length < 8;

    // ComplexityLevel
    const complexityLevel = (hasLetters ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSymbols ? 1 : 0);

    if (isLess8chars && isNotZero){
      return ['red', 'red', 'red'];

    } else {

      // Receiving numbers for level strength estimating
      switch (complexityLevel) {

        // Weak level
        case 1:
          return ['red', 'gray', 'gray'];

        // Medium level
        case 2:
          return ['yellow', 'yellow', 'gray'];

        // Strong level
        case 3:
          return ['green', 'green', 'green'];

        default:
          return ['gray', 'gray', 'gray'];

      }
    }
  }
}

