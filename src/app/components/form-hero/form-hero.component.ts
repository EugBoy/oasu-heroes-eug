import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms'
import {AppService} from "../../entities/services/app.service";
import {Observable} from "rxjs";
import {HeroFormBuilderService} from "../../entities/services/hero-form-builder.service";
import {LItem} from "../../entities/labels/item.label";
import {LHero} from "../../entities/labels/hero.label";
import {IHero} from "../../entities/interfaces/hero.interface";
import {IItem} from "../../entities/interfaces/item.interface";

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent {

  public heroForm: FormGroup = this._heroFormBuilderService.heroForm;

  public skills$: Observable<IItem[]> = this._appService.skills$;

  public LItem: typeof LItem = LItem;

  constructor(
    private readonly _appService: AppService,
    private readonly _heroFormBuilderService: HeroFormBuilderService,
  ) {
  }

  /**
   * Метод добавления нового героя*
   */
  public addHero(): void {
    const hero: IHero = this.heroForm.getRawValue();
    if (this.heroForm.valid) {
      this._appService.addHero(hero);
      this.heroForm.reset();
    } else {
      alert('При заполнении формы допущена ошибка!');
    }
  };

  public get nameControl(): FormControl {
    return this.heroForm.get([LItem.NAME]) as FormControl;
  };

  public get powerControl(): FormControl {
    return this.heroForm.get([LHero.POWER]) as FormControl;
  };

  public get skillsControl(): FormControl {
    return this.heroForm.get([LHero.SKILLS]) as FormControl;
  };

  public get levelControl(): FormControl {
    return this.heroForm.get([LHero.LEVEL]) as FormControl;
  };
}
