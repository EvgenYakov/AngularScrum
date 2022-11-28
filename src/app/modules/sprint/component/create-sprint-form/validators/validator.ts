import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const dateStart = control.get('dateStart');
  const dateEnd = control.get('dateEnd');

  if (!dateEnd) { return null }
  if (!dateStart) { return null }

  return dateStart && dateEnd && dateStart.value < dateEnd.value ?
    null : { datesIsValid: false };
}

