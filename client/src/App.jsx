import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./pages/Home";
import About from "./pages/About"; // Changed to PascalCase
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Poll from "./pages/Poll";
import CreatePoll from "./pages/CreatePoll";
import ResultsPoll from "./pages/ResultsPoll";
import { PrivateRoute1, PrivateRoute2 } from "./components/PrivateRoute";
import ChangePassword from "./pages/ChangePassword";
import Footer from "./components/Footer";
// import NotFound from "./pages/NotFound"; // Add a NotFound component

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute1 />}>
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/create-poll" element={<CreatePoll />} />
        </Route>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/poll/:pollId" element={<Poll />} />
        <Route path="/results/:pollId" element={<ResultsPoll />} />
        <Route element={<PrivateRoute2 />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> 404 route */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
