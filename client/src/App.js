import "./App.css";
import {  Navigate, Route, Routes } from "react-router-dom";
// import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        // element={(props) => <Auth {...props} authRoute="login" />}
        element={<Auth authRoute="login" />}
      />
      <Route
        path="/register"
        // element={(props) => <Auth {...props} authRoute="register" />}
        element={<Auth authRoute="register" />}
      />
    </Routes>
  );
}

export default App;
