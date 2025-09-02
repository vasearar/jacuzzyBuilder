import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import Documents from "./pages/Documents.tsx";
import Members from "./pages/Members";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/members" element={<Members />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div className="p-10">404 Not Found</div>} />
      </Route>
    </Routes>
  );
}
