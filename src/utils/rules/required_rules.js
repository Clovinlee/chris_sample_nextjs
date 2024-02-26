const requiredRules = (value) => {
    // Regular expression for validating email addresses
    const result = !(value == null || value === '')
    const msg = result == false ? "This field is required" : ''
    return {msg: msg}
  };
  
  export default requiredRules;