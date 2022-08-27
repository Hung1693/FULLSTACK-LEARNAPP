import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMess";

const RegisterForm = () => {
  let navigate = useNavigate();
  // Context
  const { registerUser } = useContext(AuthContext);
  //-----------------------------------------------/
  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { username, password, confirmPassword } = registerForm;
  //------------------------------------------------/
  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  console.log("register form ", registerForm);

  let [alertMessage, setAleartMessage] = useState(null);
  const register = async (event) => {
    event.preventDefault();
      if (password !== confirmPassword) {
        setAleartMessage({ type: "danger", message: 'Password does not match' });
        return;
      }
    try {
      
      const registerData = await registerUser(registerForm);
      if(registerData === 'Username exists') {
        setAleartMessage({ type: "danger", message: registerData });
        return;
      }
      if (registerData !== 'Username exists') {
        navigate("/login");
      }
      console.log("register data ", registerData);
    } catch (error) {
      
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alertMessage} />
        <Form.Group>
          <Form.Control
            className="my-2 login-form"
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="my-2 login-form"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="my-2 login-form"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button className="login-btn" variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
