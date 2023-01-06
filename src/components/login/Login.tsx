import { useForm } from 'react-hook-form';
import './Login.css';
import { loginApi, LoginRequest, LoginResponse } from './loginApi';

export interface LoginProps {
    onLogin: (id: string) => void
}

export const Login = ({ onLogin }: LoginProps) => {
  const {handleSubmit, register} = useForm();
  const tryLogin = async (value: unknown) => {
    if (isLoginRequest(value)) {
      const credential: LoginResponse = await loginApi.login(value) as LoginResponse;
      onLogin(credential.jwt)
    }
  };
  return (
    <div className="login-wrapper">
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit(tryLogin)}>
        <label>
          <p>Email</p>
          <input type="text" {...register("email", {required: true})}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" {...register("password", {required: true})}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

function isLoginRequest(value: unknown): value is LoginRequest {
    return typeof value === 'object' &&
        value !== null &&
        "email" in value &&
        "password" in value;
}
