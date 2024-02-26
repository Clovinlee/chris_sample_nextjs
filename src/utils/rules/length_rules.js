const lengthRules = (value, minLength = 6) => {
    // Regular expression for validating email addresses
    const valLength = value.length
    var msg = valLength < minLength ?  `This field require at least ${minLength} character` : "";
    return {msg: msg};
  };
  
  export default lengthRules;