import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {IItem} from "../../../../../entities/interfaces/item.interface";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AppService} from "../../../../../entities/services/app.service";
import {IHero} from "../../../../../entities/interfaces/hero.interface";
import {LItem} from "../../../../../entities/labels/item.label";
import {LHero} from "../../../../../entities/labels/hero.label";
import {HeroFormBuilderService} from "../../../../../entities/services/hero-form-builder.service";
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input()
  public currentHero: IHero = <IHero>{};

  @Input()
  public isPopupVisible: boolean = false;

  @Output()
  public isPopupVisibleChange: EventEmitter<false> = new EventEmitter<false>();

  public skills$: Observable<IItem[]> = this._appService.skills$;
  public changeHeroForm: FormGroup = this._heroFormBuilderService.heroForm;

  public LHero: typeof LHero = LHero;
  public LItem: typeof LItem = LItem;

  constructor(
    private readonly _appService: AppService,
    private readonly _heroFormBuilderService: HeroFormBuilderService,
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.changeHeroForm.addControl(LItem.ID, this._formBuilder.control(''));
    this.changeHeroForm.patchValue(this.currentHero)
  };

  /**
   * Метод изменения данных о героя
   *
   * @param {[LItem.ID]} id - id изменяемого героя
   */
  public changeHero(id: number): void {
    const changedHero: IHero = {...this.changeHeroForm.getRawValue(), [LItem.ID]: id};
    if (this.changeHeroForm.valid){
      this._appService.changeHero(changedHero);
      this.close();
    } else {
      alert('При заполнении формы допущена ошибка');
    }
  };

  /**
   * Метод закрытия popup.
   */
  public close(): void {
    this.isPopupVisibleChange.emit(false);
  };

  public get nameControl(): FormControl {
    return this.changeHeroForm.get([LItem.NAME]) as FormControl;
  };

  public get powerControl(): FormControl {
    return this.changeHeroForm.get([LHero.POWER]) as FormControl;
  };

  public get skillsControl(): FormControl {
    return this.changeHeroForm.get([LHero.SKILLS]) as FormControl;
  };

  public get levelControl(): FormControl {
    return this.changeHeroForm.get([LHero.LEVEL]) as FormControl;
  };
}
