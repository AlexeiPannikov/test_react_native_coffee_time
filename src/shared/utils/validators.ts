export interface IValidatorResult {
  success: boolean;
  message: string;
}

export const validateEmail = (email: string | number): IValidatorResult => {
  const res = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  if (res === null) {
    return {
      success: false,
      message: 'Email is not valid',
    };
  }
  return {
    success: true,
    message: '',
  };
};

export const required =
  (message: string = 'Value is required') =>
  (value: string | number): IValidatorResult => {
    return {
      success: !!value ?? false,
      message: value === '' || value == null ? message : '',
    };
  };

export const minLength =
  (min: number) =>
  (value: string | number): IValidatorResult => {
    const success = value?.toString().length >= min;
    return {
      success,
      message: success ? '' : 'Min length is ' + min + ' symbols',
    };
  };
