import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Petition, Petitions, Profile, Publish } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/start-a-petition" exact element={<Petition />} />
          <Route path="/publish" exact element={<Publish />} />
          <Route path="/petitions/:id" exact element={<Petitions />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
