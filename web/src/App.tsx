import { Route, Routes } from "react-router";
import Layout from "@/components/layout";
import HomePage from "@/pages/home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
