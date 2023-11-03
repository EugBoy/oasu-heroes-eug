/**
 * Поля фильтрации карточек героев
 *
 * @param LEVELDOWN - нижний уровень фильтрации;
 * @param LEVELUP - верхний уровень фильтрации;
 * @param SKILLS - сортировка по навыкам;
 * @param NAME - сортировка по имени;
 */
export enum EHeroFilter {
  LEVELDOWN = "levelDown",
  LEVELUP = 'levelUp',
  SKILLS = 'skills',
  NAME = 'name'
}
