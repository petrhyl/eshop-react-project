export const FRSTNAME = 'FIRST_NAME';
export const LSTNAME = 'LAST_NAME';
export const MAIL = 'EMAIL';
export const PHONE = 'PHONE';
export const STREET = 'STREET';
export const HOUSE = 'HOUSE';
export const TOWN = 'TOWN';
export const POSTAL = 'POSTAL';
export const COUNTRY = 'COUNTRY';

const NAME_REGEX =
    /^(([A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý]{1}[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ]*[ \-']*[A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý]*[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ]+)+|([A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý]{1}[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ]+))$/;
const HOUSE_REGEX = /^[\w \-\.\/]+$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const POSTAL_REGEX = /^([0-9]{5}|[0-9]{3} [0-9]{2})$/;
const PHONE_REGEX = /^\+?[0-9 ?]{6,14}$/;

export const defaultInputState = {
    firstname: {
        isValid: true,
        value: ''
    },
    lastname: {
        isValid: true,
        value: ''
    },
    phone: {
        isValid: true,
        value: ''
    },
    email: {
        isValid: true,
        value: ''
    },
    street: {
        isValid: true,
        value: ''
    },
    house: {
        isValid: true,
        value: ''
    },
    town: {
        isValid: true,
        value: ''
    },
    postal: {
        isValid: true,
        postaValue: ''
    },
    country: {
        isValid: true,
        value: ''
    }
}


const validateInput = (state, action) => {
    let isValid;
    switch (action.type) {
        case FRSTNAME:
            isValid = NAME_REGEX.test(action.inputVal);
            return {
                ...state,
                firstname: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case LSTNAME:
            isValid = NAME_REGEX.test(action.inputVal);
            return {
                ...state,
                lastname: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case PHONE:
            isValid = PHONE_REGEX.test(action.inputVal);
            return {
                ...state,
                phone: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case MAIL:
            isValid = EMAIL_REGEX.test(action.inputVal);
            return {
                ...state,
                email: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case STREET:
            isValid = NAME_REGEX.test(action.inputVal);
            return {
                ...state,
                street: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case HOUSE:
            isValid = HOUSE_REGEX.test(action.inputVal);
            return {
                ...state,
                house: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case TOWN:
            isValid = NAME_REGEX.test(action.inputVal);
            return {
                ...state,
                town: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case POSTAL:
            isValid = POSTAL_REGEX.test(action.inputVal);
            return {
                ...state,
                postal: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        case COUNTRY:
            isValid = NAME_REGEX.test(action.inputVal);
            return {
                ...state,
                country: {
                    isValid: isValid,
                    value: action.inputVal
                }
            }
        default:
            return defaultInputState;
            break;
    }
}

export default validateInput;
