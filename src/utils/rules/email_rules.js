const emailRules = (email) => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    var msg = emailRegex.test(email) == false ?  "Invalid email format" : "";
    return {msg: msg};
  };
  
  export default emailRules;