import styled from 'styled-components';
import {} from '../../../components/TextField';
import { Button, PasswordInputField, TextFields } from '../../../components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Login } from '../types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCookie } from 'apps/client/hooks';
import { login } from '../api';

export const LoginForm = () => {
  const { setAccessToken, setAdminId } = useCookie();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      const { accessToken, userId } = await login(data);
      setAccessToken(accessToken);
      setAdminId(userId);
      router.push('/admin/home');
    } catch (error) {
      toast.error('メールアドレスまたはパスワードが間違っています。');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <InputContainer>
            <TextFields
              type="email"
              register={register('email', { required: true })}
              errors={errors.email?.type}
            ></TextFields>
          </InputContainer>
          <InputContainer>
            <PasswordInputField
              placeholder="英数字（大文字/小文字）8〜16字"
              register={register('password', {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[a-zA-Z\d]{8,16}$/,
              })}
              errors={errors.password?.type}
            ></PasswordInputField>
          </InputContainer>
        </InputsContainer>
        <ButtonContainer>
          <Button text="ログイン" type="submit"></Button>
        </ButtonContainer>
      </form>
    </>
  );
};

const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0px;
`;

const ButtonContainer = styled.div`
  width: 250px;
  height: 50px;
  margin: 30px auto;
`;

export default LoginForm;
