export default class RUT {
  static validate(rut: string): boolean {
    // * remove dots
    rut = rut.replace(/\./g, '');
    // * if no dash, add it
    if (!rut.includes('-')) {
      rut = rut.substring(0, rut.length - 1) + '-' + rut.substring(rut.length - 1);
    }
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
    // * Remove dots and dashes
    rut = rut.replace(/\.|-/g, '');
    return rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9kK]{1})$/, '$1.$2.$3-$4');
  }

  static deformat(rut: string, noDash = false): string {
    // * if no dash, add it
    if (!rut.includes('-')) {
      rut = rut.substring(0, rut.length - 1) + '-' + rut.substring(rut.length - 1);
    }
    return noDash ? rut.replace(/\./g, '').replace('-', '') : rut.replace(/\./g, '');
  }
}
