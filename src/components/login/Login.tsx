import { Row, Col } from 'react-bootstrap';
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
  return <div className="wrapper">
    <Row>
      <Col/>
      <Col><h2>Login</h2></Col>
      <Col/>
    </Row>
    <Row>
      <Col></Col>
      <Col>
      <form onSubmit={handleSubmit(tryLogin)}>
        <div className="form-outline mb-4">
          <input type="email" id="form2Example1" className="form-control" {...register("email", {required: true})} />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form2Example2" className="form-control"  { ...register("password", {required:true})} />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

      </form>
      </Col>
      <Col></Col>
    </Row>
  </div>

};

function isLoginRequest(value: unknown): value is LoginRequest {
  return typeof value === 'object' &&
    value !== null &&
    "email" in value &&
    "password" in value;
}
