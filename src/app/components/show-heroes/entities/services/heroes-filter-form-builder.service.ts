import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class HeroesFilterFormBuilderService {

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  /**
   * Метод создания формы для фильтрации
   */
  public get filterForm(): FormGroup {
    return this._formBuilder.group({
      levelDown: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      levelUp: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      skills: [''],
      name: [''],
    });
  };
}
