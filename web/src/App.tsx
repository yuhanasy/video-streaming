import { Route, Routes } from "react-router";
import Layout from "@/components/layout";
import HomePage from "@/pages/home";
import MeetingsPage from "@/pages/meetings";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
