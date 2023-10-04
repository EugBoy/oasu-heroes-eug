import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SkillFormBuilderService {
  constructor(
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  /**
   * Метод возвращает форму нового навыка.
   */
  public get skillControl(): FormControl {
    return this._formBuilder.control('', [Validators.minLength(2)]);
  };
}
