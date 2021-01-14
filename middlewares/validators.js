// return bool is inverted to lessen code used when validating in components

const validators = {
  isRequired: (id) => {
    let element = document.getElementById(id);
    if (element == null)
      return true;

    return element.value.length > 0 ? false : true;
  },
  isValidEmail: (id) => {
    let element = document.getElementById(id);
    if (element == null)
      return true;

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(element.value) == false ? true : false;
  },
  isStrongPassword: (id) => {
    let element = document.getElementById(id);
    if (element == null)
      return true;
    
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return passwordRegex.test(element.value) == false ? true : false;
  },
  isSamePassword: (id, confId) => {
    let passwordEle = document.getElementById(id);
    let confPasswordEle = document.getElementById(confId);
    
    if (passwordEle == null || confPasswordEle == null)
      return true;

    return passwordEle.value === confPasswordEle.value == false ? true : false;
  }
}

export default validators;