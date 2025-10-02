// src/components/Footer.jsx
import {
  FiMail, FiPhone, FiMapPin,
  FiCpu, FiTool, FiSmartphone, FiSettings
} from "react-icons/fi";
import { FaGithub, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0b1e33] via-[#0b2342] to-[#0a1a2e] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* brand */}
          <div>
            <div className="text-center mt-0 mr-14 mb-5 flex items-center justify-center gap-3">
              {/* Gradient icon box */}
              <div className="relative w-14 h-14 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  width="35"
                  height="35"
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
                <h1 className="text-xl font-bold text-slate-200">
                  EduWay
                </h1>
                <p className="text-xs font-semibold text-slate-200">
                  E D U C A T I O N
                </p>
              </div>
            </div>

            <p className="mt-4  text-slate-400 text-sm md:text-base font-medium leading-6">
              Tech kelajagi uchun onlayn kurslar va professional dasturchilar bilan coding
              skillsni rivojlantiring.
            </p>

            {/* badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge text="&lt;/&gt; React" className="bg-cyan-500/15 text-cyan-300 border-cyan-300/25" />
              <Badge text="&gt;_ Node.js" className="bg-violet-500/15 text-violet-300 border-violet-300/25" />
              <Badge text="AI/ML" className="bg-emerald-500/15 text-emerald-300 border-emerald-300/25" />
            </div>
          </div>

          {/* links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xl">›_ Tezkor havolalar</h4>
            <ul className="space-y-2 text-slate-300/90 font-medium text-sm  cursor-pointer">
              <li className="hover:text-white transition">Biz haqimizda</li>
              <li className="hover:text-white transition">Kurslar</li>
              <li className="hover:text-white transition">O‘qituvchilar</li>
              <li className="hover:text-white transition">FAQ</li>
            </ul>
          </div>

          {/* tech stack */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xl">⌘ Tech Stack</h4>
            <ul className="space-y-3 text-slate-300/90 font-medium text-sm  cursor-pointer">
              <Item icon={FiCpu} text="Frontend" />
              <Item icon={FiTool} text="Backend" />
              <Item icon={FiSmartphone} text="Mobile" />
              <Item icon={FiSettings} text="DevOps" />
            </ul>
          </div>

          {/* connect */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xl">⚙ Connect</h4>
            <ul className="space-y-3 text-slate-300/90 font-medium text-sm cursor-pointer">
              <Item icon={FiMail} text="dev@eduway.uz" accent />
              <Item icon={FiPhone} text="+998 90 123 45 67" accent />
              <Item icon={FiMapPin} text="Toshkent, Uzbekistan" accent />
            </ul>
          </div>
        </div>

        {/* divider */}
        <hr className="mt-10 border-slate-700/50" />

        {/* socials row */}
        <div className="py-6">
          <div className="flex items-center justify-between">
            {/* left: label + socials */}
            <div className="flex items-center gap-4">

              <div className="flex items-center gap-3  cursor-pointer">
                <Social className="bg-slate-700/60 text-slate-200 hover:bg-white/10">
                  <FaGithub />
                </Social>
                <Social className="bg-[#1877F2] text-white hover:opacity-90">
                  <FaFacebookF />
                </Social>
                <Social className="bg-[#E1306C] text-white hover:opacity-90">
                  <FaInstagram />
                </Social>
                <Social className="bg-[#FF0000] text-white hover:opacity-90">
                  <FaYoutube />
                </Social>
              </div>
            </div>

            {/* right: copyright */}
            <p className="text-slate-400 text-sm">
              <span className="text-cyan-400 mr-2">©</span>
              2025 <span className="text-cyan-300 mx-1">&lt;EduWay/&gt;</span>
              <span className="text-slate-400">Powered by React</span>
            </p>
          </div>
        </div>

        {/* bottom line */}


      </div>
    </footer>
  );
}

/* helpers */
function Badge({ text, className = "" }) {
  return (
    <span className={`px-3 py-1 rounded-xl border text-xs font-mono ${className}`}>
      {text}
    </span>
  );
}
function Item({ icon: Icon, text, accent = false }) {
  return (
    <li className="flex items-center gap-2">
      <Icon className={accent ? "text-cyan-400" : "text-slate-400"} />
      <span>{text}</span>
    </li>
  );
}
function Social({ children, className = "" }) {
  return (
    <a
      href="#"
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition ${className}`}
    >
      {children}
    </a>
  );
}
