const breachTypes = {
  TOO_LOW: {alert: true, alertMessage: 'Hi, the temperature is too low'},
  TOO_HIGH: {alert: true, alertMessage: 'Hi, the temperature is too high'},
  NORMAL: {},
};
module.exports = breachTypes;
