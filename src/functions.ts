import { RUTResult } from './types';
import { addDash, createResult, removeExtraChars } from './utils';

export default class RUT {
  /**
   * Validates a Chilean RUT (Rol Único Tributario) number.
   * @param rut - The RUT number to validate.
   * @returns true if the RUT is valid, false otherwise.
   */
  static validate(rut: string): boolean {
    if (RUT.hasSpaces(rut)) return false;
    if (RUT.hasInvalidDash(rut)) return false;
    rut = removeExtraChars(rut);

    if (RUT.hasInvalidChars(rut)) return false;
    if (RUT.hasTooFewChars(rut)) return false;
    if (RUT.hasTooManyChars(rut)) return false;

    if (RUT.checkDigit(rut)) return true;
    return false;
  }

  static validateWithResponse(rut: string): RUTResult {
    if (RUT.hasSpaces(rut)) createResult('error', 'Has spaces', false);
    if (RUT.hasInvalidDash(rut)) return createResult('error', 'Invalid dash', false);
    rut = removeExtraChars(rut);

    if (RUT.hasInvalidChars(rut)) return createResult('error', 'Invalid chars', false);
    if (RUT.hasTooFewChars(rut)) return createResult('error', 'Too few chars', false);
    if (RUT.hasTooManyChars(rut)) return createResult('error', 'Too many chars', false);

    if (RUT.checkDigit(rut)) return createResult('success', 'Valid RUT', true);
    return createResult('error', 'Invalid check digit', false);
  }

  static getDigit(rutWithoutDigit: string, toUpperCase = false): string {
    let M = 0;
    let S = 1;
    for (let i = rutWithoutDigit.length - 1; i >= 0; i--) {
      S = (S + parseInt(rutWithoutDigit.charAt(i)) * (9 - (M++ % 6))) % 11;
    }
    return S ? String(S - 1) : toUpperCase ? 'K' : 'k';
  }

  static checkDigit(rut: string): boolean {
    rut = removeExtraChars(rut);
    const rutWithoutDigit = rut.substring(0, rut.length - 1);
    const digit = rut.charAt(rut.length - 1);
    return RUT.getDigit(rutWithoutDigit) === digit.toLowerCase();
  }

  static format(rut: string, withComma = false, toUpperCase = false): string {
    rut = removeExtraChars(rut);
    rut = toUpperCase ? rut.toUpperCase() : rut.toLowerCase();
    return withComma ? rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9kK]{1})$/, '$1,$2,$3-$4') : rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9kK]{1})$/, '$1.$2.$3-$4');
  }

  static deformat(rut: string, noDash = false, toUpperCase = false): string {
    rut = removeExtraChars(rut);
    rut = toUpperCase ? rut.toUpperCase() : rut.toLowerCase();
    return noDash ? rut : addDash(rut);
  }

  static hasTooFewChars(rut: string): boolean {
    rut = removeExtraChars(rut);
    return rut.length < 7;
  }

  static hasTooManyChars(rut: string): boolean {
    rut = removeExtraChars(rut);
    return rut.length > 9;
  }

  static hasInvalidChars(rut: string): boolean {
    rut = removeExtraChars(rut);
    // if there are chars in the first part of the RUT return true
    const tmp = rut.substring(0, rut.length - 1);
    if (tmp.match(/[a-z]/i)) return true;
    // check if the last char of rut is a letter, unless it is 'k' or 'K'
    if (rut.charAt(rut.length - 1).match(/[a-jl-z]/i)) return true;
    return false;
  }

  static hasInvalidDash(rut: string): boolean {
    // if there are more than one dash return true
    const tmp = rut.match(/-/g);
    if (tmp && tmp.length > 1) return true;
    // if theres a dash, return true if it's not in the right place
    if (tmp && rut.charAt(rut.length - 2) !== '-') return true;
    return false;
  }

  static hasSpaces(rut: string): boolean {
    return rut.match(/\s/g) ? true : false;
  }
}
