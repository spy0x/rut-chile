export function addDash(rut: string): string {
  return rut.substring(0, rut.length - 1) + '-' + rut.substring(rut.length - 1);
}
export function removeDots(rut: string): string {
  rut = rut.replace(/\.|-/g, '')
  return rut;
}