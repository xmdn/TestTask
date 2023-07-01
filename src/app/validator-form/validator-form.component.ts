import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordService } from './password.service';

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
    constructor(private passwordService: PasswordService) {}
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
    passwordValidation(): void {
      this.element = this.passwordService.validatePassword(this.passwordValue);
      this.onChange(this.passwordValue);
      }
      // On every change calling function
      onPasswordChange(event: any): void {
        this.passwordValue = event.target.value;
        this.passwordValidation();
      }
}
