const confirmRules = (fieldValue, fieldConfirm, fieldName = "field") => {
    // field1 = value field
    // field2 = confirmationf ield
    var msg = (fieldValue == fieldConfirm) == false ?  `Confirmation ${fieldName} does not match` : "";
    return {msg: msg};
  };
  
  export default confirmRules;