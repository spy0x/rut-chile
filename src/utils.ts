import { RUTResult } from "./types";

export function addDash(rut: string): string {
  rut = rut.replace('-', '');
  return rut.substring(0, rut.length - 1) + '-' + rut.substring(rut.length - 1);
}

export function removeExtraChars(rut: string): string {
  return rut.replace(/\./g, '').replace(/,/g, '').replace(/-/g, '').replace(/\s/g, '');
}

export function createResult(status: string, message: string, payload: boolean): RUTResult {
  return { status, message, payload };
}