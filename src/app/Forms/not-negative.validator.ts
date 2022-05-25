import {AbstractControl} from '@angular/forms';

export function notNegativeValidator(control: AbstractControl){
  return control.value <= 0? {valueIsNegative: true} : null
}
