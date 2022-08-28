import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
// import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import DashBoard from "./views/DashBoard";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            // element={(props) => <Auth {...props} authRoute="login" />}
            //passing all props to Auth component

            element={<Auth authRoute="login" />}
          />
          <Route
            path="/register"
            // element={(props) => <Auth {...props} authRoute="register" />}
            element={<Auth authRoute="register" />}
          />
          <Route path={`/dashboard/`} element={<DashBoard />} />
        </Routes>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
