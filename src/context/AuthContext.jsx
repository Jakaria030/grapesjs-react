import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const BASE_URL = "http://localhost:3000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Check user on app load
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      setUser(data.user);
    } catch (err) {
      // invalid token → remove it
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);

    await checkAuth(); // verify + load user
  };

  // REGISTER
  const register = async (name, email, password) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);

    await checkAuth(); // verify + load user
  };

  //  LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);