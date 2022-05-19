import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss', '../user-profile/user-profile.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomControlComponent,
      multi: true,
    }
  ]
})
export class CustomControlComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() title: string = '';

  val: any = '';
  disabled: boolean = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  set value(value: string) {
      this.val = value;
      this.onChange(value);
      this.onTouched();
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
