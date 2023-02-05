import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';

interface State {
  password: string;
  showPassword: boolean;
}

type Props = {
  placeholder: string;
  register?: object;
  errors?: string;
};

export const PasswordInputField = (props: Props) => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ m: 0, width: '100%' }} variant="outlined">
      <InputLabel
        htmlFor="outlined-adornment-password"
        error={props.errors ? true : false}
      >
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        placeholder={props.placeholder}
        {...props.register}
        onChange={handleChange('password')}
        error={props.errors ? true : false}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {(props.errors === 'required' && (
        <FormHelperText error id="text-field-error">
          {'文字を入力してください'}
        </FormHelperText>
      )) ||
        (props.errors === 'pattern' && (
          <FormHelperText error id="text-field-error">
            {'英数字（大文字/小文字）8〜16字で入力して下さい'}
          </FormHelperText>
        ))}
    </FormControl>
  );
};
