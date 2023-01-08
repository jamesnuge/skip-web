import { useForm } from 'react-hook-form';
import './Login.css';
import { loginApi, LoginRequest, LoginResponse } from './loginApi';

export interface LoginProps {
  onLogin: (id: string) => void
}

export const Login = ({ onLogin }: LoginProps) => {
  const { handleSubmit, register } = useForm();
  const tryLogin = async (value: unknown) => {
    if (isLoginRequest(value)) {
      const credential: LoginResponse = await loginApi.login(value) as LoginResponse;
      onLogin(credential.jwt)
    }
  };
  return (
    <>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit(tryLogin)}>
        <div className='form-group'>
          <label>
            <p>Email</p>
          </label>
          <input className='form-control' type="text" {...register("email", { required: true })} />
        </div>
        <div className='form-group'>
          <label>
            <p>Password</p>
          </label>
          <input type="password" {...register("password", { required: true })} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

function isLoginRequest(value: unknown): value is LoginRequest {
  return typeof value === 'object' &&
    value !== null &&
    "email" in value &&
    "password" in value;
}
