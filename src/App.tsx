import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Configurator from "./pages/Configurator";
import ConfiguratorLogin from "./pages/ConfiguratorLogin";
import Home from "./pages/Home";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/configurator"
          element={
            <ProtectedRoute>
              <Configurator />
            </ProtectedRoute>
          }
        />
        <Route path="/configurator-login" element={<ConfiguratorLogin />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
