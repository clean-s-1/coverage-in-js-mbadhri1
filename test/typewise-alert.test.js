const alerts = require('../typewise-alert');
const {expect} = require('chai');
const {stdout} = require('test-console');
const coolingTypes = require('../cooloing-types');

it('infers a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});

it('infers a value lower than the minimum as TOO_HIGH', () => {
  expect(alerts.inferBreach(110, 50, 100)).equals('TOO_HIGH');
});

it('infers a value lower than the minimum as NORMAL', () => {
  expect(alerts.inferBreach(70, 50, 100)).equals('NORMAL');
});

it('should send to controller logs correctly', () => {
  const inspect = stdout.inspect();
  alerts.sendToController('NORMAL', '0xfeed');
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal(['0xfeed, NORMAL\n']);
});

it('should send to email logs correctly for low', () => {
  const inspect = stdout.inspect();
  alerts.sendToEmail('TOO_LOW', 'a.b@c.com');
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should send to email logs correctly for high', () => {
  const inspect = stdout.inspect();
  alerts.sendToEmail('TOO_HIGH', 'a.b@c.com');
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check and alert for email and low temperature and high active cooling', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: -2, coolingType: 'HI_ACTIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should check and alert for email and high temperature and high active cooling', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: 46, coolingType: 'HI_ACTIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check and alert for email and low temperature and medium active cooling', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: -2, coolingType: 'MED_ACTIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should check and alert for email and high temperature and medium active cooling', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: 41, coolingType: 'MED_ACTIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check and alert for email and low temperature and passive cooling', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: -2, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should check and alert for email and high temperature and passive cooling', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: 36, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([
    'To: a.b@c.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check normal temperature and PASSIVE_COOLING', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: 34, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([]);
});

it('should check normal temperature and HI_ACTIVE_COOLING', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: 34, coolingType: 'HI_ACTIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([]);
});

it('should check normal temperature and MED_ACTIVE_COOLING ', () => {
  const inspect = stdout.inspect();
  alerts.checkAndAlert(
      {recepient: 'a.b@c.com', type: 'TO_EMAIL'},
      {temperatureInC: 34, coolingType: 'MED_ACTIVE_COOLING'},
      coolingTypes,
  );
  inspect.restore();
  // expect(inspect.output).to.deep.equal(['foo\n']);
  expect(inspect.output).to.deep.equal([]);
});
