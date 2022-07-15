const alerts = require('../typewise-alert');
const {expect} = require('chai');
const {stdout} = require('test-console');
const coolingTypes = require('../cooling-types');
const breachTypes = require('../breach-types');
const {getEmailAlerter, getcontrollerAlerter} = require('../alerter');

it('infers a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});

it('infers a value lower than the minimum as TOO_HIGH', () => {
  expect(alerts.inferBreach(110, 50, 100)).equals('TOO_HIGH');
});

it('infers a value lower than the minimum as NORMAL', () => {
  expect(alerts.inferBreach(70, 50, 100)).equals('NORMAL');
});

it('should check and alert for email and low temperature and high active cooling', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@cf.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: -2, coolingType: 'HI_ACTIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([
    'To: a.b@cf.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should check and alert for email and high temperature and high active cooling', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@ch.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: 46, coolingType: 'HI_ACTIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([
    'To: a.b@ch.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check and alert for email and low temperature and medium active cooling', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@cv.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: -2, coolingType: 'MED_ACTIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([
    'To: a.b@cv.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should check and alert for email and high temperature and medium active cooling', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@cb.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: 41, coolingType: 'MED_ACTIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([
    'To: a.b@cb.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check and alert for email and low temperature and passive cooling', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@cq.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: -2, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([
    'To: a.b@cq.com\n',
    'Hi, the temperature is too low\n',
  ]);
});

it('should check and alert for email and high temperature and passive cooling', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@cx.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: 36, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([
    'To: a.b@cx.com\n',
    'Hi, the temperature is too high\n',
  ]);
});

it('should check and alert for controller and high temperature and passive cooling', () => {
  const inspect = stdout.inspect();
  const controllerAlerter = getcontrollerAlerter('0xfeed');
  alerts.checkAndAlert(
      controllerAlerter,
      {temperatureInC: 37, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal(['0xfeed, TOO_HIGH\n']);
});

it('should check and alert for controller and low temperature and passive cooling', () => {
  const inspect = stdout.inspect();
  const controllerAlerter = getcontrollerAlerter('0xfeed');
  alerts.checkAndAlert(
      controllerAlerter,
      {temperatureInC: -3, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal(['0xfeed, TOO_LOW\n']);
});

it('should check normal temperature and PASSIVE_COOLING', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('a.b@xc.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: 34, coolingType: 'PASSIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([]);
});

it('should check normal temperature and HI_ACTIVE_COOLING', () => {
  const inspect = stdout.inspect();
  const alerter = getEmailAlerter('aa.b@zc.com');
  alerts.checkAndAlert(
      alerter,
      {temperatureInC: 34, coolingType: 'HI_ACTIVE_COOLING'},
      coolingTypes,
      breachTypes,
  );
  inspect.restore();
  expect(inspect.output).to.deep.equal([]);
});


