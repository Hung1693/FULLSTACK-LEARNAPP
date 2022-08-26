import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  // Context to use AuthContext.Provider value={authContextData}
  //take loginUser = AuthContext from AuthContext.js
  const { loginUser } = useContext(AuthContext);
  //-----------------------------------------------/

  //Local state = login input value
  // Local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  //------------------------------------------------/

  //get username and password from loginForm. This happens when user types in username and password
  const { username, password } = loginForm;
  //------------------------------------------------/

  //listen to input change, set value to state loginForm
  const onChangeLoginForm = (event) =>
    setLoginForm(
      //se computed property to update properties in state loginForm
      { ...loginForm, [event.target.name]: event.target.value }
      //console log to see if it works
      );
      
  //-----------------------------------------------/

  //login submit function
  const login = async (event) => {
    event.preventDefault();
    try {
      //get data from loginUser, login form is user's input
      const loginData = await loginUser(loginForm);
      console.log(loginForm);
      console.log(loginData);
    } catch (error) {
      console.log(error);
    }

    
  };
  //------------------------------------------------/

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className="login-form"
            required
            //value = user input username, pass to onChangeLoginForm
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="my-2 login-form"
            required
            //value = user input password, pass to onChangeLoginForm
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="ml-2 login-btn" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
