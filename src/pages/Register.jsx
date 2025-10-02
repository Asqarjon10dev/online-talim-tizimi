// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation, useLoginMutation, useLazyMeQuery } from "../context/authApi";
import { setTokens, setUser } from "../context/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [err, setErr] = useState(null);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [triggerMe] = useLazyMeQuery();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    // oddiy validatsiya
    if (form.password.length < 6) return setErr("Parol kamida 6 ta belgidan iborat bo‘lsin.");
    if (form.password !== form.confirm) return setErr("Parollar mos emas.");

    try {
      // 1) /create_user
      await registerUser({
        name: form.name.trim(),
        username: form.username.trim(),
        password: form.password,
        phone: form.phone.trim(),
      }).unwrap();

      // 2) darhol /token bilan login
      const tok = await login({ username: form.username.trim(), password: form.password }).unwrap();
      const access_token = tok?.access_token;
      if (!access_token) throw new Error("Token topilmadi");

      dispatch(setTokens({ access_token, refresh_token: tok?.refresh_token }));

      // 3) /get_my_user
      const me = await triggerMe().unwrap();
      dispatch(setUser(me));

      // 4) rolga qarab redirect
      const role = me?.role;
      if (role === "admin") nav("/admin", { replace: true });
      else if (role === "teacher") nav("/teacher", { replace: true });
      else nav("/student", { replace: true });
    } catch (e) {
      setErr(e?.data?.detail || e?.message || "Ro‘yxatdan o‘tishda xatolik.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "linear-gradient(to right, #02101B, #08397B)" }}
    >
      <div className="bg-transparent rounded-xl shadow-lg border border-secondary/30 w-[420px] p-6"
           style={{ background:"rgba(255,255,255,0)", boxShadow:"0 8px 32px 0 rgba(19,34,255,0.37)", backdropFilter:"blur(10px)" }}>
        <h1 className="text-2xl font-mono text-secondary text-center mb-6">Register</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-secondary mb-1">Full name</label>
            <input name="name" value={form.name} onChange={onChange}
              className="w-full px-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary" required />
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">Username</label>
            <input name="username" value={form.username} onChange={onChange}
              className="w-full px-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary" required />
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={onChange} placeholder="+99890xxxxxxx"
              className="w-full px-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange}
              className="w-full px-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary" required />
          </div>

          <div>
            <label className="block text-sm text-secondary mb-1">Confirm password</label>
            <input type="password" name="confirm" value={form.confirm} onChange={onChange}
              className="w-full px-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary" required />
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-primary hover:bg-secondary text-white font-mono py-2 rounded-md transition disabled:opacity-60">
            {isLoading ? "Yaratilmoqda..." : "Create account"}
          </button>

          {err && <p className="text-red-400 text-sm">{err}</p>}
        </form>

        <p className="mt-6 text-center">
          Allaqachon akkaunt bormi?{" "}
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
