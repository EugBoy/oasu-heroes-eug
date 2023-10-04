import {Pipe, PipeTransform} from '@angular/core';
import {IHero} from "../../../../entities/interfaces/hero.interface";
import {LHero} from "../../../../entities/labels/hero.label";
import {LItem} from "../../../../entities/labels/item.label";
import {ESort} from "../enums/sort.enum";

@Pipe({
  name: 'filterHeroes'
})
export class FilterHeroesPipe implements PipeTransform {

  /**
   * Метод делает фильтрацию и сортировку данных о героях.
   *
   * @param {IHero[] | null} heroes - все герои
   * @param {ESort} sort - статус сортировки (Сортировка или не сортировка)
   * @param {number} levelDown - нижний уровень, от которого идёт сортировка
   * @param {number} levelUp - верхний уровень, до которого идёт сортировка
   * @param {string} name - сортировка по имени
   * @param {string[]} skills - сортировка по наличию способностей в персонаже
   * @return {IHero[]}
   * @example [{Name: 'Ivan', level: 100}, {Name: 'Vladimir', level: 1}] --( sort = ESort.ASCENDING )--> [{Name: 'Vladimir', level: 1},{Name: 'Ivan', level: 100}]
   */
  transform(heroes: IHero[] | null, sort: ESort, levelDown: number, levelUp: number, name: string, skills: string[]): IHero[] {
    if (sort === ESort.ASCENDING) {
      heroes = heroes!.sort((hero1: IHero, hero2: IHero) => {
        return hero1[LHero.LEVEL] - hero2[LHero.LEVEL];
      });
    } else if (sort === ESort.DESCENDING) {
      heroes = heroes!.sort((hero1: IHero, hero2: IHero) => {
        return hero2[LHero.LEVEL] - hero1[LHero.LEVEL];
      });
    } else {
      heroes = heroes!.sort((hero1: IHero, hero2: IHero) => {
        return (hero1[LItem.ID]! - hero2[LItem.ID]!);
      });
    }
    if (levelDown) {
      heroes = heroes.filter((hero: IHero): boolean => {
        return Number(hero[LHero.LEVEL]) >= levelDown;
      });
    }
    if (levelUp) {
      heroes = heroes.filter((hero: IHero): boolean => {
        return Number(hero[LHero.LEVEL]) <= levelUp;
      });
    }
    if (name) {
      heroes = heroes.filter((hero: IHero): boolean => {
        return hero[LItem.NAME].toLowerCase().includes(name.toLowerCase());
      });
    }
    if (skills) {
      heroes = heroes.filter((hero: IHero): boolean => {
        for (let skill of skills) {
          if (!hero[LHero.SKILLS].includes(skill)) {
            return false;
          }
        }
        return true;
      });
    }
    return heroes;
  };
}
