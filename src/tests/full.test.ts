import { describe } from 'mocha';
import RUT from '../index';
import chai from 'chai';

describe('Full test with a single RUT sample testing all the methods', () => {
  let rut = '10766555';
  it('Get the RUT Check Digit for 10766555 Should return 107665552', () => {
    rut = rut + RUT.getDigit(rut);
    chai.expect(rut).to.equal('107665552');
  });
  it('Format the RUT 107665552 Should return 10.766.555-2', () => {
    rut = RUT.format(rut);
    chai.expect(rut).to.equal('10.766.555-2');
  });
  it('Check if has valid dash 10.766.555-2 Should return false', () => {
    const result = RUT.hasInvalidDash(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check if has invalid chars 10.766.555-2 Should return false', () => {
    const result = RUT.hasInvalidChars(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check if has too many chars 10.766.555-2 Should return false', () => {
    const result = RUT.hasTooManyChars(rut);
    chai.expect(result).to.equal(false);
  });
  it('Check if has too few chars 10.766.555-2 Should return false', () => {
    const result = RUT.hasTooFewChars(rut);
    chai.expect(result).to.equal(false);
  });
  it('Validate the RUT 10.766.555-2 Should return true', () => {
    const result = RUT.validate(rut);
    chai.expect(result).to.equal(true);
  });
  it('Validate the RUT 10.766.555-2 Should return true', () => {
    const result = RUT.validateWithResponse(rut);
    chai.expect(result.payload).to.equal(true);
  });
  it('Deformat the RUT 10.766.555-2 Should return 10766555-2', () => {
    rut = RUT.deformat(rut);
    chai.expect(rut).to.equal('10766555-2');
  });
});
