const alerts = require('../typewise-alert');
const {expect} = require('chai');

it('infers a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});

it('infers a value lower than the minimum as TOO_HIGH', () => {
  expect(alerts.inferBreach(110, 50, 100)).equals('TOO_HIGH');
});

it('infers a value lower than the minimum as NORMAL', () => {
  expect(alerts.inferBreach(70, 50, 100)).equals('NORMAL');
});

