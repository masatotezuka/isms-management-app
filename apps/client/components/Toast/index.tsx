import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={4000}
      hideProgressBar={true}
      style={{ width: '450px', fontSize: '14px' }}
    ></ToastContainer>
  );
};