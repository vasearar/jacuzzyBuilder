const AUTH_KEY = "configurator_auth";
const SESSION_DURATION = 6 * 60 * 60 * 1000;

export const login = (password: string) => {
  if (password === import.meta.env.VITE_CONFIGURATOR_PASSWORD) {
    const expiresAt = Date.now() + SESSION_DURATION;

    localStorage.setItem(AUTH_KEY, JSON.stringify({ expiresAt }));

    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isLoggedIn = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return false;

  try {
    const { expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      logout();
      return false;
    }
    return true;
  } catch {
    logout();
    return false;
  }
};
