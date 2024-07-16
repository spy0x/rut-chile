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

  /**
   * Validates a given RUT (Rol Único Tributario) and returns a result object.
   * @param rut - The RUT to be validated.
   * @returns The result of the validation, including the status and message.
   */
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

  /**
   * Calculates the verification digit for a given RUT (Rol Único Tributario) without the digit.
   * @param rutWithoutDigit - The RUT without the verification digit.
   * @param toUpperCase - Optional. Specifies whether the returned digit should be in uppercase. Default is false.
   * @returns The verification digit for the given RUT.
   */
  static getDigit(rutWithoutDigit: string, toUpperCase = false): string {
    let M = 0;
    let S = 1;
    for (let i = rutWithoutDigit.length - 1; i >= 0; i--) {
      S = (S + parseInt(rutWithoutDigit.charAt(i)) * (9 - (M++ % 6))) % 11;
    }
    return S ? String(S - 1) : toUpperCase ? 'K' : 'k';
  }

  /**
   * Checks if the given RUT (Rol Único Tributario) has a valid check digit.
   * 
   * @param rut - The RUT to check.
   * @returns A boolean indicating whether the check digit is valid or not.
   */
  static checkDigit(rut: string): boolean {
    rut = removeExtraChars(rut);
    const rutWithoutDigit = rut.substring(0, rut.length - 1);
    const digit = rut.charAt(rut.length - 1);
    return RUT.getDigit(rutWithoutDigit) === digit.toLowerCase();
  }

  /**
   * Formats a Chilean RUT (Rol Único Tributario) number.
   * 
   * @param rut - The RUT number to format.
   * @param withComma - Whether to include a comma separator for thousands.
   * @param toUpperCase - Whether to convert the RUT to uppercase.
   * @returns The formatted RUT number.
   */
  static format(rut: string, withComma = false, toUpperCase = false): string {
    rut = removeExtraChars(rut);
    rut = toUpperCase ? rut.toUpperCase() : rut.toLowerCase();
    return withComma ? rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9kK]{1})$/, '$1,$2,$3-$4') : rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9kK]{1})$/, '$1.$2.$3-$4');
  }

  /**
   * Removes formatting characters from a Chilean RUT (Rol Único Tributario) string.
   * @param rut - The RUT string to deformat.
   * @param noDash - Optional. If true, the resulting RUT will not contain dashes. Default is false.
   * @param toUpperCase - Optional. If true, the resulting RUT will be converted to uppercase. If false, it will be converted to lowercase. Default is false.
   * @returns The deformatted RUT string.
   */
  static deformat(rut: string, noDash = false, toUpperCase = false): string {
    rut = removeExtraChars(rut);
    rut = toUpperCase ? rut.toUpperCase() : rut.toLowerCase();
    return noDash ? rut : addDash(rut);
  }

  /**
   * Checks if the given RUT has too few characters.
   * 
   * @param rut - The RUT to check.
   * @returns True if the RUT has too few characters, false otherwise.
   */
  static hasTooFewChars(rut: string): boolean {
    rut = removeExtraChars(rut);
    return rut.length < 7;
  }

  /**
   * Checks if the given RUT has too many characters.
   * 
   * @param rut - The RUT to check.
   * @returns True if the RUT has more than 9 characters, false otherwise.
   */
  static hasTooManyChars(rut: string): boolean {
    rut = removeExtraChars(rut);
    return rut.length > 9;
  }

  /**
   * Checks if a given RUT (Rol Único Tributario) has invalid characters.
   * @param rut - The RUT to be checked.
   * @returns A boolean indicating whether the RUT has invalid characters or not.
   */
  static hasInvalidChars(rut: string): boolean {
    rut = removeExtraChars(rut);
    // if not a number in the first part of the RUT return true
    const rutWithoutDigit = rut.substring(0, rut.length - 1);
    if (rutWithoutDigit.match(/\D/g)) return true;
    // check if the last char is not a number (unless it is k or K)
    const digit = rut.charAt(rut.length - 1);
    if (digit.match(/\D/g) && !digit.match(/[kK]/)) return true;
    return false;
  }

  /**
   * Checks if a given RUT (Rol Único Tributario) has an invalid dash.
   * @param rut - The RUT to check.
   * @returns A boolean indicating whether the RUT has an invalid dash.
   */
  static hasInvalidDash(rut: string): boolean {
    // if there are more than one dash return true
    const tmp = rut.match(/-/g);
    if (tmp && tmp.length > 1) return true;
    // if theres a dash, return true if it's not in the right place
    if (tmp && rut.charAt(rut.length - 2) !== '-') return true;
    return false;
  }

  /**
   * Checks if a given RUT (Rol Único Tributario) has spaces.
   * @param rut - The RUT to check.
   * @returns A boolean indicating whether the RUT has spaces or not.
   */
  static hasSpaces(rut: string): boolean {
    return rut.match(/\s/g) ? true : false;
  }
}
