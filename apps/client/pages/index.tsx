import styled from 'styled-components';
import { LinkButton } from '../components/Button';
import LoginForm from '../features/auth/components/LoginForm';

export function Index() {
  return (
    <>
      <Container>
        <LoginForm></LoginForm>
        <ButtonRoutersWrapper>
          <ButtonRouterContainer>
            <LinkButton
              text="パスワードを変更する"
              path="/password-reset/request"
            ></LinkButton>
          </ButtonRouterContainer>
          <ButtonRouterContainer>
            <LinkButton
              text="管理者を登録"
              path="/organization-registration"
            ></LinkButton>
          </ButtonRouterContainer>
        </ButtonRoutersWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 500px;
  margin: 100px auto 0px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ButtonRoutersWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonRouterContainer = styled.div`
  width: 250px;
  height: 50px;
  margin: 30px auto;
`;

export default Index;
