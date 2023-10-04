import {LHero} from "../labels/hero.label";
import {IItem} from "./item.interface";

/**
 * Интерфейс данных о герое
 *
 * @param {number} POWER - сила героя
 * @param {string[]} SKILLS - навыки героя
 * @param {number} LEVEL - уровень героя
 * @extends IItem
 */
export interface IHero extends IItem {
  [LHero.POWER]: number;
  [LHero.SKILLS]: string[];
  [LHero.LEVEL]: number;
}
