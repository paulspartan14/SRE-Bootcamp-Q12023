import chai from 'chai';
import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'

const expect = chai.expect;

describe('loginFunction()', function () {
  it('Test login (success)', async function () {
    const token = await loginFunction("admin", "secret")
    expect(typeof token).to.be.equal('string');
  });

  it('Test login (failed)', async function () {
    const token = await loginFunction("admin", "secret123")
    expect(token).to.be.equal(null);
  });
});

describe('protectFunction() ', function () {
  it('Test protected (success)', async function () {
    const token = await loginFunction("admin", "secret")
    const result = protectFunction('Bearer ' + token)
    expect(result).to.be.equal("welcome! this is a protected route");
  });

  it('Test protected (failed)', async function () {
    const token = await loginFunction("admin", "secrets")
    const result = protectFunction('Bearer ' + token)
    expect(result).to.be.equal(null);
  });
});
