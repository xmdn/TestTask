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

    element: string[] = ['gray', 'gray', 'gray'];

    onChange = (_: any):void => {};
    onTouched = ():void => {};

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
        const isBlank: boolean = this.passwordValue.length === 0;
        const isNotZero: boolean = this.passwordValue.length !== 0;
        const isLess8chars: boolean = this.passwordValue.length < 8;

        // ComplexityLevel
        const complexityLevel = (hasLetters ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSymbols ? 1 : 0);

        if (isBlank) {

          this.element = ['gray', 'gray', 'gray'];
          this.onChange('');

          return;
        } else if (isLess8chars && isNotZero){

          this.element = ['red', 'red', 'red'];
          this.onChange('');

          return;
        } else {

          // Receiving numbers for level strength estimating
          switch (complexityLevel) {

            // Weak level
            case 1:

              this.element = ['red', 'gray', 'gray'];
              this.onChange(this.passwordValue);
              return;

            // Medium level
            case 2:

              this.element = ['yellow', 'yellow', 'gray'];
              this.onChange(this.passwordValue);
              return;

            // Strong level
            case 3:

              this.element = ['green', 'green', 'green'];
              this.onChange(this.passwordValue);
              return;
          }
        }

      }
      // On every change calling function
      onPasswordChange(event: any): void {
        this.passwordValue = event.target.value;
        this.passwordValidation();
      }
}
