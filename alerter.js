const implementjs = require('implement-js');
const implement = implementjs.default;
const {Interface, type} = implementjs;

const Alerter = Interface('Alerter')({
  raiseAlert: type('function'),
});

function getcontrollerAlerter(header) {
  const controllerAlerter = implement(Alerter)({
    header,
    raiseAlert() {
      console.log(`${this.header}, ${this.breachType}`);
    },
  });
  return controllerAlerter;
}

function getEmailAlerter(recepient) {
  const emailAlerter = implement(Alerter)({
    recepient,
    raiseAlert() {
      console.log(`To: ${this.recepient}`);
      console.log(this.message);
    },
  });
  return emailAlerter;
}

module.exports = {
  getEmailAlerter,
  getcontrollerAlerter,
};
