import chai from 'chai';
import RUT from '../index';
import { describe } from 'mocha';

describe('Checking RUT char validation', () => {
  it('Check bad too short RUT 46555-5 Should return true', () => {
    const rut = '46555-5';
    const result = RUT.hasTooFewChars(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check bad too long RUT 107.665.555-5 Should return true', () => {
    const rut = '107.665.555-5';
    const result = RUT.hasTooManyChars(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check good RUT 107665552 Should return false', () => {
    const rut = '107665552';
    const result = RUT.hasTooFewChars(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check RUT with invalid chars 1076655k-2 Should return true', () => {
    const rut = '1076655k-2';
    const result = RUT.hasInvalidChars(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check RUT with invalid chars 10766552-p Should return true', () => {
    const rut = '10766552-p';
    const result = RUT.hasInvalidChars(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check RUT with valid chars 16.591.919-k Should return false', () => {
    const rut = '16.591.919-k';
    const result = RUT.hasInvalidChars(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check RUT with invalid chars 16.*91.919-k Should return true', () => {
    const rut = '16.*91.919-k';
    const result = RUT.hasInvalidChars(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check RUT with invalid chars 16.591.919-! Should return true', () => {
    const rut = '16.591.919-!';
    const result = RUT.hasInvalidChars(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check RUT with invalid multiple dashes 1076655-5-2 Should return true', () => {
    const rut = '1076655-5-2';
    const result = RUT.hasInvalidDash(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check RUT with invalid dash position 1076655-52 Should return true', () => {
    const rut = '1076655-52';
    const result = RUT.hasInvalidDash(rut);
    chai.expect(result).to.equal(true);
  });
  it('Check RUT with valid dash position 10766555-2 Should return false', () => {
    const rut = '10766555-2';
    const result = RUT.hasInvalidDash(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check RUT without dashes 107665552 Should return false', () => {
    const rut = '107665552';
    const result = RUT.hasInvalidDash(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check RUT with spaces 10766555 2 Should return true', () => {
    const rut = '10766555 2';
    const result = RUT.hasSpaces(rut);
    chai.expect(result).to.equal(true);
  });
});
