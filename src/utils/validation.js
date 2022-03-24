import _ from 'lodash';

export const Validator = {
  NotEmpty: 'NotEmpty'
};

export const validate = (columns = {}) => {
  const errors = {};
  Object.keys(columns).forEach((k) => {
    const value = columns[k].value;
    const label = columns[k].label;
    const validators = columns[k].validators;
    if (!validators) return;
    let errorMessage = '';
    validators.forEach((v) => {
      switch (v) {
        case Validator.NotEmpty:
          if (_.isEmpty(value)) {
            errorMessage = errorMessage.concat(`${label} cannot be Empty. `);
          }
          break;
        default:
      }
    });
    if (!_.isEmpty(errorMessage)) errors[k] = errorMessage;
  });
  return errors;
};
