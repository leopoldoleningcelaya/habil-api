import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  isString,
  isEnum,
} from 'class-validator';

export function MatchesRegEx(
  regEx: RegExp,
  validationOptions?: ValidationOptions,
  message?: string
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'matchesRegEx',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [regEx],
      options: validationOptions,
      validator: {
        validate(propertyValue: string, args: ValidationArguments) {
          // this whole validator exists because of this line :)
          args.constraints[0].lastIndex = 0;
          return args.constraints[0].test(propertyValue);
        },
        defaultMessage() {
          return message || 'Must satisfy regular expression';
        },
      },
    });
  };
}

export function IsIntegerString(validationOptions?: ValidationOptions) {
  return MatchesRegEx(/^(0|[1-9]\d*)$/gm, validationOptions, 'property must be an integer');
}

export function IsPositiveIntegerString(validationOptions?: ValidationOptions) {
  return MatchesRegEx(/^[1-9]\d*$/gm, validationOptions, 'property must be a positive integer');
}

export function IsPositiveNumberString(validationOptions?: ValidationOptions) {
  return MatchesRegEx(
    /^[1-9]\d*[.]?\d*$/gm,
    validationOptions,
    'property must be a positive number'
  );
}

export function IsBiggerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBiggerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'number' && typeof relatedValue === 'number' && value > relatedValue
          );
        },
      },
    });
  };
}

export function IsValueInObject(
  property: {
    each?: boolean;
    enumObject?: { [key: string]: string };
    validator?: (string) => boolean;
  },
  validationOptions?: ValidationOptions,
  message?: string
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValueInObject',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(propertyValue: string | string[], args: ValidationArguments) {
          const { enumObject, each } = args.constraints[0];
          let { validator } = args.constraints[0];

          if (!validator) {
            if (!enumObject)
              // this is unreachable due to the legacy workaround above, left to future-proof -TD
              throw new Error('Must provide enumObject or validator to IsValueInObject');
            validator = (value: string): boolean => Object.values(enumObject).includes(value);
          }

          if (each) {
            if (Array.isArray(propertyValue)) {
              return propertyValue.every(validator);
            } else {
              // if each is true, but the property is not an array, assume it is a string array
              return propertyValue.split(',').every(validator);
            }
          } else {
            return validator(propertyValue);
          }
        },
        defaultMessage() {
          return message || 'Must be a valid type';
        },
      },
    });
  };
}

export function IsStringArrayOfEnum(property?: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringArrayOfEnum',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!isString(value) || value.length === 0) return false;
          const array = value.replace(/ /, '').split(',');
          const enumObject = args.constraints[0];
          return array.every((value: string) => isEnum(value, enumObject));
        },
      },
    });
  };
}
