import { ChevronDownIcon } from '../Icons/Icons';
import './TypeFilter.css';

export default function TypeFilter() {
  return (
    <div className="type-filter">
      <label className="visually-hidden" htmlFor="pokemon-type">
        Тип покемона
      </label>
      <select id="pokemon-type" name="pokemon-type" defaultValue="all">
        <option value="all">Усі типи</option>
        <option value="normal">Звичайний</option>
        <option value="fire">Вогняний</option>
        <option value="water">Водяний</option>
        <option value="grass">Трав’яний</option>
        <option value="electric">Електричний</option>
        <option value="ice">Крижаний</option>
        <option value="fighting">Бойовий</option>
        <option value="poison">Отруйний</option>
        <option value="ground">Земляний</option>
        <option value="flying">Літаючий</option>
        <option value="psychic">Психічний</option>
        <option value="bug">Комашиний</option>
        <option value="rock">Кам’яний</option>
        <option value="ghost">Примарний</option>
        <option value="dragon">Драконячий</option>
        <option value="dark">Темний</option>
        <option value="steel">Сталевий</option>
        <option value="fairy">Казковий</option>
      </select>
      <ChevronDownIcon />
    </div>
  );
}
