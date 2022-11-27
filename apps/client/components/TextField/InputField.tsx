import * as React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
type Props = {
  type: 'text' | 'email' | 'password' | 'date';
  value?: string;
  placeholder?: string;
  required?: boolean;
  register?: object;
  errors?: string;
};

const StyledTextField = styled(TextField)`
  display: flex;
  width: 100%;
`;

export const TextFields = (props: Props) => {
  return (
    <>
      <StyledTextField
        error={props.errors ? true : false}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type={props.type}
        {...props.register}
        helperText={props.errors === 'required' && '文字を入力してください。'}
      />
    </>
  );
};
