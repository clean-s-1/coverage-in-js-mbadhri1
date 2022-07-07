function inferBreach(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) {
    return 'TOO_LOW';
  }
  if (value > upperLimit) {
    return 'TOO_HIGH';
  }
  return 'NORMAL';
}

function checkAndAlert(alerter, batteryChar, coolingTypes) {
  const breachType = inferBreach(
      batteryChar.temperatureInC,
      coolingTypes[batteryChar.coolingType].lowerLimit,
      coolingTypes[batteryChar.coolingType].upperLimit,
  );
  if (alerter.type == 'TO_CONTROLLER') {
    sendToController(breachType, alerter.header);
  } else if (alerter.type == 'TO_EMAIL') {
    sendToEmail(breachType, alerter.recepient);
  }
}

function sendToController(breachType, header) {
  console.log(`${header}, ${breachType}`);
}

function sendToEmail(breachType, recepient) {
  if (breachType == 'TOO_LOW') {
    console.log(`To: ${recepient}`);
    console.log('Hi, the temperature is too low');
  } else if (breachType == 'TOO_HIGH') {
    console.log(`To: ${recepient}`);
    console.log('Hi, the temperature is too high');
  }
}

module.exports = {
  inferBreach,
  checkAndAlert,
  sendToController,
  sendToEmail,
};
