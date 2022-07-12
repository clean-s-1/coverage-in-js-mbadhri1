function inferBreach(value, lowerLimit, upperLimit) {
  if (value < lowerLimit) {
    return 'TOO_LOW';
  }
  if (value > upperLimit) {
    return 'TOO_HIGH';
  }
  return 'NORMAL';
}

function checkAndAlert(alerter, batteryChar, coolingTypes, breachTypes) {
  const breachType = inferBreach(
      batteryChar.temperatureInC,
      coolingTypes[batteryChar.coolingType].lowerLimit,
      coolingTypes[batteryChar.coolingType].upperLimit,
  );
  if (breachTypes[breachType].alert) {
    alertForBreach(alerter, breachTypes, breachType);
  }
}

function alertForBreach(alerter, breachTypes, breachType) {
  if (alerter.type == 'TO_CONTROLLER') {
    sendToController(breachType, alerter.header);
  } else if (alerter.type == 'TO_EMAIL') {
    sendToEmail(alerter.recepient, breachTypes[breachType].alertMessage);
  }
}

function sendToController(breachType, header) {
  console.log(`${header}, ${breachType}`);
}

function sendToEmail(recepient, message) {
  console.log(`To: ${recepient}`);
  console.log(message);
}

module.exports = {
  inferBreach,
  checkAndAlert,
  sendToController,
  sendToEmail,
};
