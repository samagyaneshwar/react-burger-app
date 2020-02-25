export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;
    let errorMessage = null;

    if(rules.required) {
        isValid = value.trim() !== '' && isValid;
        errorMessage = 'This field is required';
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        errorMessage = 'Minimum length is ' + rules.minLength;
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        errorMessage = 'Maximum length is ' + rules.maxLength;
    }

    if(rules.isEmail) {
        isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) && isValid;
        errorMessage = 'Invalid Email';
    }

    return {isValid, errorMessage};
};