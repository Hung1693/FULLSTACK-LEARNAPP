import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            className="my-2 login-form"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="my-2 login-form"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="my-2 login-form"
            required
          />
        </Form.Group>
        <Button className="login-btn" variant="info" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already had an account?
        <Link to="/login">
          <Button variant="success" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
