export const validateCall = (call) => {
  let isValid = true;
  if (!call || !call.callId) {
    isValid = false;
  }

  return isValid;
};
