import {BrowserRouter , Routes, Route} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Home from './pages/Home';
import About from './pages/about';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import Poll from './pages/Poll';
import CreatePoll from './pages/CreatePoll';
import ResultsPoll from './pages/ResultsPoll';
import { PrivateRoute1, PrivateRoute2 } from "./components/PrivateRoute";
import Footer from './components/Footer';
export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route element={<PrivateRoute1 />}> */}
          <Route path="/profile/:username" element={<Profile />} />
          {/* <Route path="/create-poll" element={<CreatePoll />} /> */}
        {/* </Route> */}
          <Route path="/create-poll" element={<CreatePoll />} />

        <Route element={<PrivateRoute2 />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoute2 />}>
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/poll/:id" element={<Poll/>} />
        <Route path="/results/:id" element={<ResultsPoll />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
