import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaUserSecret } from "react-icons/fa"; // email va password ikonlari va student/admin ikonlari

function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #02101B, #08397B)",
      }}
    >
      {/* Glassmorphism box */}
      <div
        className="bg-transparent rounded-xl shadow-lg border border-secondary/30 w-[380px] p-6"
        style={{
          background: "rgba(255, 255, 255, 0)",
          boxShadow: "0 8px 32px 0 rgba(19, 34, 255, 0.37)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo & Title */}
        <div className="text-center mt-5 mb-5 flex items-center justify-center gap-3">
          {/* Gradient icon box */}
          <div className="relative w-12 h-12 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="transform -rotate-6"
            >
              <path
                d="M2 12L12 7L22 12L12 17L2 12Z"
                fill="white"
                fillOpacity="0.9"
              />
              <circle cx="12" cy="12" r="1" fill="white" />
              <path
                d="M18 12V16C18 17 16 18 12 18C8 18 6 17 6 16V12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <line
                x1="22"
                y1="12"
                x2="22"
                y2="16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="17" r="1" fill="white" />
            </svg>

            {/* Dekor nuqtalar */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-300 rounded-full animate-floatY"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-sky-300 rounded-full animate-floatX"></div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent">
              EduWay
            </h1>
            <p className="text-xs tracking-widest text-slate-500">
              E D U C A T I O N
            </p>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-mono text-secondary">Login</h1>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-mono text-secondary text-sm mb-1">
              email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-mono text-secondary text-sm mb-1">
              password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded bg-transparent border border-secondary/50 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-mono py-2 rounded-md transition"
          >
            login
          </button>
        </form>

        {/* Demo accounts */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-4">
            <button className="px-4 py-1 rounded bg-secondary/20 text-secondary font-mono hover:bg-secondary hover:text-dark transition">
              <FaUser className="inline mr-2" />
              Student
            </button>
            <button className="px-4 py-1 rounded bg-accent/20 text-accent font-mono hover:bg-accent hover:text-dark transition">
              <FaUserSecret className="inline mr-2" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
