import { addDash, removeDots } from './utils';

export default class RUT {
  static validate(rut: string): boolean {
    rut = removeDots(rut);
    rut = rut.includes('-') ? rut : addDash(rut);
    let tmp = rut.split('-');
    let digit = tmp[1];
    let rutWithoutDigit = tmp[0];
    return RUT.getDigit(rutWithoutDigit) === digit.toLowerCase();
  }

  static getDigit(rutWithoutDigit: string, toUpperCase = false): string {
    let M = 0;
    let S = 1;
    for (let i = rutWithoutDigit.length - 1; i >= 0; i--) {
      S = (S + parseInt(rutWithoutDigit.charAt(i)) * (9 - (M++ % 6))) % 11;
    }
    return S ? String(S - 1) : toUpperCase ? 'K' : 'k';
  }

  static format(rut: string): string {
    rut = removeDots(rut);
    return rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9kK]{1})$/, '$1.$2.$3-$4');
  }

  static deformat(rut: string, noDash = false): string {
    rut = rut.includes('-') ? rut : addDash(rut);
    return noDash ? rut.replace(/\./g, '').replace('-', '') : rut.replace(/\./g, '');
  }

  static hasTooFewChars(rut: string): boolean {
    rut = removeDots(rut);
    rut = rut.includes('-') ? rut : addDash(rut);
    return rut.length < 8;
  }

  static hasTooManyChars(rut: string): boolean {
    rut = removeDots(rut);
    rut = rut.includes('-') ? rut : addDash(rut);
    return rut.length > 10;
  }

  static hasInvalidChars(rut: string): boolean {
    rut = removeDots(rut);
    rut = rut.includes('-') ? rut : addDash(rut);
    const tmp = rut.split('-');
    // if there are chars in the first part of the RUT return true
    if (tmp[0].match(/[a-z]/i)) return true;
    // if there are chars in the second part of the RUT, except for k or K, return true
    if (tmp[1].match(/[a-jl-z]/i)) return true;
    return false;
  }
}
