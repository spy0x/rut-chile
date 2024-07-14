import { describe } from "mocha";
import RUT from "../functions";
import chai from 'chai';

describe('Full test with a single RUT sample testing all the methods', () => {
  let rut = '10766555';
  it('Get the RUT Check Digit for 10766555 Should return 107665552', () => {
    rut = rut + RUT.getDigit(rut);
    chai.expect(rut).to.equal('107665552');
  });
  it ('Format the RUT 107665552 Should return 10.766.555-2', () => {
    rut = RUT.format(rut);
    chai.expect(rut).to.equal('10.766.555-2');
  });
  /*
    TODO: Add tests for char validation
  */
  it ('Validate the RUT 10.766.555-2 Should return true', () => {
    let result = RUT.validate(rut);
    chai.expect(result).to.equal(true);
  });
  it ('Deformat the RUT 10.766.555-2 Should return 10766555-2', () => {
    rut = RUT.deformat(rut);
    chai.expect(rut).to.equal('10766555-2');
  });
});