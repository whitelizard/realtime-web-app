import Formsy from 'formsy-react';

// Takes an immutable object (items) and checks if value in field is included in it
Formsy.addValidationRule('isNotIn', (values, value, items) =>
  !items.includes(value),
);
