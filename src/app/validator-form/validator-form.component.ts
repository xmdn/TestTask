import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-validator-form',
    templateUrl: './validator-form.component.html',
    styleUrls: ['./validator-form.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ValidationPasswordFormComponent),
          multi: true
        }
      ]
    })

export class ValidationPasswordFormComponent implements ControlValueAccessor {

    passwordValue: string = '';

    isWeak: boolean = false;
    isMedium: boolean = false;
    isStrong: boolean = false;

    first: string = 'gray';
    second: string = 'gray';
    third: string = 'gray';

    onChange = (_: any) => {};
    onTouched = () => {};

    writeValue(value: string): void {
        this.passwordValue = value;
        this.passwordValidation();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
      }
    
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    passwordValidation() {

        // Variables of validation based on complexity
        const hasLetters = /[a-zA-Z]/.test(this.passwordValue);
        const hasNumbers = /\d/.test(this.passwordValue);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.passwordValue);

        // Logical variables for current state of passwordValue
        const isBlank = this.passwordValue.length === 0;
        const isNotZero = this.passwordValue.length !== 0;
        const isLess8chars = this.passwordValue.length < 8;
    
        // ComplexityLevel 
        const complexityLevel = (hasLetters ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSymbols ? 1 : 0);
    
        if (isBlank) {

          this.first = 'gray';
          this.second = 'gray';
          this.third = 'gray';
          this.onChange('');

          return;
        } else if (isLess8chars && isNotZero){

          this.first = 'red';
          this.second = 'red';
          this.third = 'red';
          this.onChange('');
    
          return;
        } else {

          // Recieving numbers for level strength estimating
          switch (complexityLevel) {

            // Weak level
            case 1:

              this.first = 'red';
              this.second = 'gray';
              this.third = 'gray';
              this.onChange(this.passwordValue);
              return;

            // Medium level
            case 2:

              this.first = 'yellow';
              this.second = 'yellow';
              this.third = 'gray';
              this.onChange(this.passwordValue);
              return;

            // Strong level
            case 3:

              this.first = 'green';
              this.second = 'green';
              this.third = 'green';
              this.onChange(this.passwordValue);
              return;
          }
        }
   
      }
      // On every change calling function
      onPasswordChange(event: any) {
        this.passwordValue = event.target.value;
        this.passwordValidation();
      }
}