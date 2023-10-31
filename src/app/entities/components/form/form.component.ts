import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LItem} from "../../labels/item.label";
import {LHero} from "../../labels/hero.label";
import {IHero} from "../../interfaces/hero.interface";
import {Observable} from "rxjs";
import {IItem} from "../../interfaces/item.interface";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HeroFormBuilderService} from "../../services/hero-form-builder.service";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  @Input({ required: true })
  public formChangeStatus: boolean = false;

  @Input({ required: false })
  public currentHero: IHero = <IHero>{};

  @Input({ required: false })
  public isPopupVisibleForm: boolean = false;

  @Output()
  public isPopupVisibleFormChange: EventEmitter<false> = new EventEmitter<false>();

  public skills$: Observable<IItem[]> = this._appService.skills$;
  public heroForm: FormGroup = this._heroFormBuilderService.heroForm;

  public LItem: typeof LItem = LItem;

  constructor (
    private readonly _appService: AppService,
    private readonly _heroFormBuilderService: HeroFormBuilderService,
    private readonly _formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    if (this.currentHero){
      this.heroForm.addControl(LItem.ID, this._formBuilder.control(''));
      this.heroForm.patchValue(this.currentHero);
    }
  };

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
  }

  /**
   * Метод изменения данных о героя
   *
   * @param {number} id - id изменяемого героя
   */
  public changeHero(id: number): void {
    const changedHero: IHero = {...this.heroForm.getRawValue(), [LItem.ID]: id};
    if (this.heroForm.valid){
      this._appService.changeHero(changedHero);
      this.close();
    } else {
      alert('При заполнении формы допущена ошибка');
    }
  }

  /**
   * Метод закрытия popup.
   */
  public close(): void {
    this.isPopupVisibleFormChange.emit(false);
  }

  public get nameControl(): FormControl {
    return this.heroForm.get([LItem.NAME]) as FormControl;
  }

  public get powerControl(): FormControl {
    return this.heroForm.get([LHero.POWER]) as FormControl;
  }

  public get skillsControl(): FormControl {
    return this.heroForm.get([LHero.SKILLS]) as FormControl;
  }

  public get levelControl(): FormControl {
    return this.heroForm.get([LHero.LEVEL]) as FormControl;
  }
}
