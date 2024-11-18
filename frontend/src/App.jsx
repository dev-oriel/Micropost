import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SearchResults from "./components/SearchResults";
import Auth from "./pages/AuthPage";
import Profile from "./pages/Profile";
import ProfileCard from "./components/ProfileCard";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile/:userId" element={<ProfileCard />} />
      </Routes>
    </Router>
  );
};

export default App;
