import {LItem} from "../labels/item.label";

/**
 * Интерфейс данных об объекте
 *
 * @param {string} NAME - название объекта
 * @param {number} [ID] - идентификатор объекта
 */
export interface IItem {
  [LItem.NAME]: string;
  [LItem.ID]?: number;
}
