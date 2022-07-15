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
    alerter.message = breachTypes[breachType].alertMessage;
    alerter.breachType = breachType;
    alerter.raiseAlert();
  }
}


module.exports = {
  inferBreach,
  checkAndAlert,
};
