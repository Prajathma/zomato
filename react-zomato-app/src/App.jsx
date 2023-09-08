import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import Search from "./components/Search";
import PageNotFound from "./components/PageNot";

function App() {
  return <>
    <main className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search/:id/:name" element={<Search />} />
        <Route path="/Restaurant-details/:id" element={<Restaurant />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>



    </main>
  </>;
};

export default App;