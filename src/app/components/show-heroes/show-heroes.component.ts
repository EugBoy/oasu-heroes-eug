import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AppService} from "../../entities/services/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LHero} from "../../entities/labels/hero.label";
import {LItem} from "../../entities/labels/item.label";
import {IHero} from "../../entities/interfaces/hero.interface";
import {IItem} from "../../entities/interfaces/item.interface";
import {HeroesFilterFormBuilderService} from "./entities/services/heroes-filter-form-builder.service";
import {ESort} from "./entities/enums/sort.enum";
import {EHeroFilter} from "./entities/enums/hero-filter.enum";

@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss']
})
export class ShowHeroesComponent implements OnInit {

  public heroesFilterForm: FormGroup = this._heroesFilterFormService.filterForm;

  public skills$: Observable<IItem[]> = this._appService.skills$;
  public heroes$: Observable<IHero[]> = this._appService.heroes$;

  public currentHero: IHero = <IHero>{};
  public isPopupVisible: boolean = false;
  public sortStatus: ESort = ESort.NONE;

  public LHero: typeof LHero = LHero;
  public LItem: typeof LItem = LItem;
  public LSort: typeof ESort = ESort;

  constructor (
    private readonly _appService: AppService,
    private readonly _heroesFilterFormService: HeroesFilterFormBuilderService
  ) {
  }

  public ngOnInit(): void {
    this._appService.getHeroes();
  }

  /**
   * Метод открытия popup.
   *
   * @param {IHero} hero  - герой, данные которого нужно отредактировать
   */
  public openEditHeroPopup(hero: IHero): void {
    this.currentHero = hero;
    this.isPopupVisible = true;
  }

  /**
   * Метод закрытия popup.
   */
  public closeHeroPopup(): void {
    this.isPopupVisible = false;
  }

  /**
   * Метод меняет вид сортировки (нет сортировки, по возрастанию, по убыванию)
   */
  public sortHeroes(): void {
    this.sortStatus = (this.sortStatus + 1) % 3;
  }

  public get levelDownControl(): FormControl {
    return this.heroesFilterForm.get([EHeroFilter.LEVELDOWN]) as FormControl;
  }

  public get levelUpControl(): FormControl {
    return this.heroesFilterForm.get([EHeroFilter.LEVELUP]) as FormControl;
  }

  public get skillsControl(): FormControl {
    return this.heroesFilterForm.get([EHeroFilter.SKILLS]) as FormControl;
  }

  public get nameControl(): FormControl {
    return this.heroesFilterForm.get([EHeroFilter.NAME]) as FormControl;
  }
}
