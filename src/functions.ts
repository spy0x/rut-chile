export default class RUT {
  static validate(rut: string) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) return false;
    let tmp = rut.split('-');
    let digit = tmp[1];
    let rutWithoutDigit = tmp[0];
    return RUT.getDigit(rutWithoutDigit) === digit.toLowerCase();
  }

  static getDigit(rutWithoutDigit: string) {
    let M = 0; 
    let S = 1;
    for (let i = rutWithoutDigit.length - 1; i >= 0; i--) {
      S = (S + parseInt(rutWithoutDigit.charAt(i)) * (9 - (M++ % 6))) % 11;
    }
    return S ? String(S - 1) : 'k';
  }
}