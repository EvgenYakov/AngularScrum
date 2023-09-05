export function accountValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const repeatPassword = control.get('secondPassword');

  if (!repeatPassword) { return null }

  return password && repeatPassword && repeatPassword.value === password.value ?
    null : { passwordsMatch: false };
}

import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
