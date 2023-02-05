import { Button as materialButton } from '@mui/material';
import { styled } from '@mui/material/styles';

type Props = {
  text: string;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  color?: 'primary' | 'secondary';
};

const StyledButton = styled(materialButton)`
  border-radius: 10px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  font-size: 16px;
`;

export const Button = (props: Props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      type={props.type}
      color={props.color ? props.color : 'primary'}
      variant="contained"
    >
      {props.text}
    </StyledButton>
  );
};
