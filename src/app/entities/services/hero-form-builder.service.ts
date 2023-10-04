import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LItem} from "../labels/item.label";
import {LHero} from "../labels/hero.label";

@Injectable({
  providedIn: 'root'
})
export class HeroFormBuilderService {

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  /**
   * Метод создания формы данных героя для его создания и изменения.
   */
  public get heroForm(): FormGroup {
    return this._formBuilder.group({
      [LItem.NAME]: ['', [Validators.required, Validators.minLength(2)]],
      [LHero.POWER]: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      [LHero.SKILLS]: ['', [Validators.required]],
      [LHero.LEVEL]: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  };
}
