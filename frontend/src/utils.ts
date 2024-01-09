import { MAX_PERCENT_STARS_WIDTH, STARS_COUNT } from './const';
import {Cities} from './types';
import {Conveniences} from './types';

export function isCity(value: unknown): asserts value is Cities {
  if (value === null || value === undefined || typeof value !== 'string' || !(value in Cities)) {
    throw new Error(`${value} is incorrect city`);
  }
}

export function isConvenience(value: unknown): asserts value is Conveniences {
  if (value === null || value === undefined || typeof value !== 'string' || !(value in Conveniences)) {
    throw new Error(`${value} is incorrect convenience`);
  }
}

export function isConveniences(value: unknown[]): asserts value is Conveniences[] {
  value.forEach((unknownValue) => isConvenience(unknownValue));
}

export const formatDate = (date: string) => new Intl.DateTimeFormat(
  'en-US',
  {'month':'long','year':'numeric'}
).format( new Date(date) );

export const getStarsWidth = (rating: number) =>
  `${(MAX_PERCENT_STARS_WIDTH * Math.round(rating)) / STARS_COUNT}%`;

export const getRandomElement = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)];
export const pluralize = (str: string, count: number) => count === 1 ? str : `${str}s`;
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getCurrentTime = () => new Date().toISOString();

export class Token {
  private static _name = 'six-cities-auth-token';

  static get() {
    const token = localStorage.getItem(this._name);

    return token ?? '';
  }

  static save(token: string) {
    localStorage.setItem(this._name, token);
  }

  static drop() {
    localStorage.removeItem(this._name);
  }
}
