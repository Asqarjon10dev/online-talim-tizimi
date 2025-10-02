import { FaSearch, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bg-gradient-to-r from-[#02101B] to-[#08397B] relative overflow-hidden">
      {/* subtle grid dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1.5px)] [background-size:24px_24px]"
      />

      {/* tiny floating shapes */}


      <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">


        {/* headline */}
        <h1 className="mt-0  text-4xl md:text-6xl font-semibold leading-tight">
          <span className=" text-[#9BA0FF] drop-shadow-[0_0_15px_rgba(155,160,255,0.55)]">Kodni o‘rganish,</span>
          <br />
          <span className="text-slate-200/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.55)] mt-2">kelajakni </span>
          <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.55)]">
            {"{yaratish}"}
          </span>
        </h1>

        {/* sub text */}
        <p className="mt-6 text-slate-300/90 max-w-2xl  mx-auto text-base md:text-xl font-medium">
          Professional dasturchilar bilan zamonaviy texnologiyalarni o‘rganing va tech
          sohasida o‘z karerangizni boshlang.
        </p>

        {/* search */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Qidiruv..."
                className="w-full rounded-2xl bg-slate-900/40 border border-white/10 text-slate-100 placeholder:text-slate-400 px-5 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/40"
              />
              <button
                className="absolute right-1.5 top-1.5 h-10 w-10 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white grid place-items-center transition"
                aria-label="Qidirish"
              >
                <FaSearch className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Kurslar button */}
          <Link
            to="/kurslar"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 font-medium animate-pulseGlow"
          >
            <span className="inline-flex items-center justify-center rounded-xl w-7 h-7 bg-white/20">
              <FaCode className="text-sm" />
            </span>
            <span>Kurslarni ko‘rish</span>
          </Link>


        </div>

      </div>
    </main>


  );
}

export default Home

