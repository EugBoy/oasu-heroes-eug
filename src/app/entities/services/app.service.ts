import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, lastValueFrom, Observable, tap, throwError} from "rxjs";
import {IHero} from "../interfaces/hero.interface";
import {IItem} from "../interfaces/item.interface";
import {LItem} from "../labels/item.label";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([]);
  public heroes$: Observable<IHero[]> = this._heroes$$.asObservable();

  private _skills$$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([{[LItem.ID]: 1, [LItem.NAME]: 'speed'}]);
  public skills$: Observable<IItem[]> = this._skills$$.asObservable();

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  /**
   * Метод получения данных с сервера.
   */
  public getHeroes(): void {
    this.http.get<IHero[]>('http://127.0.0.1:3000/items').pipe(
      tap((heroes: IHero[]) => {
        this._heroes$$.next(heroes);
      }),
      catchError((err: any) => {
        alert('Нет подключения с сервером');
        return throwError(err);
      })
    ).subscribe();
  };

  /**
   * Метод отправки данных о герое на сервер и получения новых данных героев с сервера.
   *
   *@param {IHero} hero - данные о герое.
   */
  public addHero(hero: IHero): void {
    lastValueFrom(this.http.post<IHero>('http://127.0.0.1:3000/items', hero))
      .then(() => this.getHeroes())
      .catch(() => alert('Нет связи с сервером'));
  };

  /**
   * Метод изменения данных о герое и получения новых данных о героях.
   *
   * @param {IHero} changedHero - данные изменившегося героя
   */
  public changeHero(changedHero: IHero): void {
    lastValueFrom(this.http.put('http://127.0.0.1:3000/items/' + changedHero[LItem.ID], changedHero))
      .then(() => this.getHeroes())
      .catch(() => alert('Нет связи с сервером'));
  };

  /**
   * Метод создания нового навыка
   *
   * @param {[LItem.NAME]} skill - имя нового навыка
   */
  public addSkill(skill: IItem[LItem.NAME]): void {
    const skills: IItem[] = this._skills$$.value;
    const skillsLen: number = skills.length;
    const skillID: number = skills[skillsLen - 1][LItem.ID]! + 1;
    const newSkill: IItem = {
      [LItem.NAME]: skill,
      [LItem.ID]: skillID,
    };
    this._skills$$.next([...skills, newSkill]);
  };
}
