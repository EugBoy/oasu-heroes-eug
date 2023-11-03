import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EHeroFilter} from "../enums/hero-filter.enum";

@Injectable({
  providedIn: 'root'
})
export class HeroesFilterFormBuilderService {

  constructor (
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  /**
   * Метод создания формы для фильтрации
   */
  public get filterForm(): FormGroup {
    return this._formBuilder.group({
      [EHeroFilter.LEVELDOWN]: ['', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      [EHeroFilter.LEVELUP]: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      [EHeroFilter.SKILLS]: [''],
      [EHeroFilter.NAME]: [''],
    });
  }
}
