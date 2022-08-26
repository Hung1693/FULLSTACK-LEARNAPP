import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = ({ authRoute }) => {
  let body = (
    <>
      {authRoute === "login" && <LoginForm />}
      {authRoute === "register" && <RegisterForm />}
    </>
  );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome to <span className="branch-name">Asalala</span></h1>
          <h4>We keep your notes secured and organized</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
