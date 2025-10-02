// src/pages/Login.jsx
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useLazyMeQuery } from "../context/authApi";
import { setTokens, setUser } from "../context/authSlice";
import { parseJwt } from "../helpers/auth";

function isAdmin(user) {
  if (!user) return false;
  return (
    user.role === "admin" ||
    user.role === "Admin" ||
    user.is_admin === true ||
    user.is_superuser === true
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [triggerMe] = useLazyMeQuery();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    const u = username.trim();
    const p = password.trim();
    if (!u || !p) {
      setErr("Username va parol shart");
      return;
    }

    try {
      // 0) Eski seansni tozalash
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 1) /token — form-urlencoded (authApi shu formatda yuboradi)
      const res = await login({ username: u, password: p }).unwrap();
      const access_token = res?.access_token;
      if (!access_token) throw new Error("Token topilmadi");
      dispatch(setTokens({ access_token, refresh_token: res?.refresh_token }));

      // 2) /get_my_user — backenddan foydalanuvchi
      const me = await triggerMe().unwrap();

      // 2.1) JWT claimlardan role/flags qo‘shib, birlashtiramiz
      const claims = parseJwt(access_token); // { sub, exp, role?, is_admin?, ... }
      const meWithFlags = {
        ...me,
        role: me?.role ?? claims?.role ?? null,
        is_admin: me?.is_admin ?? claims?.is_admin ?? false,
        is_superuser: me?.is_superuser ?? claims?.is_superuser ?? false,
      };
      dispatch(setUser(meWithFlags));

      // 3) Role/flag bo‘yicha yo‘naltirish
      if (isAdmin(meWithFlags)) nav("/admin", { replace: true });
      else if (meWithFlags?.role === "teacher") nav("/teacher", { replace: true });
      else nav("/student", { replace: true });
    } catch (e) {
      // Xatoni toza matnga aylantirish
      const detail = e?.data?.detail;
      let message = "Login xatosi";
      if (typeof detail === "string") message = detail;
      else if (Array.isArray(detail)) message = detail.map(d => d?.msg || "").filter(Boolean).join(", ");
      else if (e?.error) message = e.error;
      else if (e?.message) message = e.message;
      setErr(message || "Login xatosi");
      console.warn("LOGIN ERROR:", e);
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(to right, #02101B, #08397B)" }}
    >
      <div
        className="bg-transparent rounded-xl shadow-lg border border-secondary/30 w-[380px] p-6"
        style={{ background: "rgba(255,255,255,0)", boxShadow: "0 8px 32px 0 rgba(19,34,255,0.37)", backdropFilter: "blur(10px)" }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-mono text-secondary">Login</h1>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block font-mono text-secondary text-sm mb-1">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full pl-10 pr-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-secondary text-sm mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full pl-10 pr-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-secondary text-white font-mono py-2 rounded-md transition disabled:opacity-60"
          >
            {isLoading ? "Kirilmoqda..." : "Login"}
          </button>

          {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
        </form>

        <p className="mt-6 text-center">
          Account yo‘qmi?{" "}
          <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
