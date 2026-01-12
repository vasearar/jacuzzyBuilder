import React, { useState } from "react";
import { login } from "../auth/simpleAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

const ConfiguratorLogin: React.FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "common" });
  const { refreshAuth } = useAuth();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(password)) {
      refreshAuth(); // 🔥 THIS is the missing piece
      navigate("/configurator");
    } else {
      setError(t("wrong_password"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 -mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-medium mb-6 text-center">
          {t("configurator_login_title")}
        </h1>

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full border p-3 rounded pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#202020] text-white p-3 rounded hover:opacity-90"
        >
          {t("enter")}
        </button>
      </form>
    </div>
  );
};

export default ConfiguratorLogin;
