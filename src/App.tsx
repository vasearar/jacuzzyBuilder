import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Configurator from "./pages/Configurator.tsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/configurator" element={<Configurator />} />
        <Route
          path="*"
          element={
            <div className="p-10">
              <a
                href="/configurator"
                className="hover:underline hover:text-blue-500"
              >
                Configurator
              </a>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
