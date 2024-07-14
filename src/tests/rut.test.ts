import chai from 'chai';
import RUT from '../functions';

describe('Get the RUT Check Digit', () => {
  it('Testing 10766555 Should return 2', () => {
    const rut = '10766555';
    const result = RUT.getDigit(rut);
    chai.expect(result).to.equal('2');
  });
  it('Testing 16591919 Should return k', () => {
    const rut = '16591919';
    const result = RUT.getDigit(rut);
    chai.expect(result).to.equal('k');
  });
  it('Testing 16.591.919 Should return k', () => {
    const rut = '16.591.919';
    const result = RUT.getDigit(rut);
    chai.expect(result).to.equal('k');
  });
  it('Testing 16.591.919-k Should return the same k', () => {
    const rut = '16.591.919-k';
    const result = RUT.getDigit(rut);
    chai.expect(result).to.equal('k');
  });
  it('Testing 16591919 with toUpperCase Should return K', () => {
    const rut = '16591919';
    const result = RUT.getDigit(rut, true);
    chai.expect(result).to.equal('K');
  });
});

describe('Format RUT', () => {
  it('Testing 107665552 Should return 10.766.555-2', () => {
    const rut = '107665552';
    const result = RUT.format(rut);
    chai.expect(result).to.equal('10.766.555-2');
  });
  it('Testing 16591919k Should return 16.591.919-k', () => {
    const rut = '16591919k';
    const result = RUT.format(rut);
    chai.expect(result).to.equal('16.591.919-k');
  });
  it('Testing 12.436.540-6 Should return the same.', () => {
    const rut = '12.436.540-6';
    const result = RUT.format(rut);
    chai.expect(result).to.equal('12.436.540-6');
  });
  it('Testing 16591919-k Should return 16.591.919-k', () => {
    const rut = '16591919-k';
    const result = RUT.format(rut);
    chai.expect(result).to.equal('16.591.919-k');
  });
});

describe('Deformat RUT', () => {
  it('Testing 10.766.555-2 Should return 10766555-2', () => {
    const rut = '10.766.555-2';
    const result = RUT.deformat(rut);
    chai.expect(result).to.equal('10766555-2');
  });
  it('Testing 16.591.919-k Should return 16591919-k', () => {
    const rut = '16.591.919-k';
    const result = RUT.deformat(rut);
    chai.expect(result).to.equal('16591919-k');
  });
  it('Testing 12436540-6 Should return the same', () => {
    const rut = '12436540-6';
    const result = RUT.deformat(rut);
    chai.expect(result).to.equal('12436540-6');
  });
  it('Testing with no dash 10.766.555-2 Should return 107665552', () => {
    const rut = '10.766.555-2';
    const result = RUT.deformat(rut, true);
    chai.expect(result).to.equal('107665552');
  });
  it('Testing with no dash 16.591.919-k Should return 16591919k', () => {
    const rut = '16.591.919-k';
    const result = RUT.deformat(rut, true);
    chai.expect(result).to.equal('16591919k');
  });
  it('Testing with no dash 16591919k Should return the same', () => {
    const rut = '16591919k';
    const result = RUT.deformat(rut, true);
    chai.expect(result).to.equal('16591919k');
  });
  it('Testing with dash 16591919k Should return 16591919-k', () => {
    const rut = '16591919k';
    const result = RUT.deformat(rut);
    chai.expect(result).to.equal('16591919-k');
  });
});

describe('Validate RUT', () => {
  it('Testing 10766555-2 Should return true', () => {
    const rut = '10766555-2';
    const result = RUT.validate(rut);
    chai.expect(result).to.equal(true);
  });
  it('Testing 10766555-3 (bad check digit) Should return false', () => {
    const rut = '10766555-3';
    const result = RUT.validate(rut);
    chai.expect(result).to.equal(false);
  });
  it('Testing 10.766.555-2 Should return true', () => {
    const rut = '10.766.555-2';
    const result = RUT.validate(rut);
    chai.expect(result).to.equal(true);
  });
  it('Testing 107665552 (10766555-2) Should return true', () => {
    const rut = '107665552';
    const result = RUT.validate(rut);
    chai.expect(result).to.equal(true);
  });
});
