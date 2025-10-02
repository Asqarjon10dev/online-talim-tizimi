// src/sections/RecommendedCoursesSection.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiClock,
  FiBookOpen,
  FiEye,
  FiTag,
  FiStar,
  FiSettings,
  FiZap,
  FiMaximize2,
} from "react-icons/fi";
import { useGetCoursesQuery } from "../context/courseApi";

// Agar upload yo'li nisbiy bo'lsa to'liq URL yasash (kerak bo'lsa .env dan oling)
const BASE_URL = "https://96d754169f5b.ngrok-free.app";

const absolutize = (src = "") => {
  const url = src.replace(/\\/g, "/"); // Windows slash
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  // "uploads/..." bo'lsa backend bazasini qo'shamiz
  return BASE_URL ? `${BASE_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}` : url;
};

export default function RecommendedCoursesSection() {
  const { data, isLoading, isError } = useGetCoursesQuery();
  const courses = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? courses : courses.slice(0, 6);

  return (
    <section className="relative py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-teal-300 text-2xl">&lt;</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Tavsiya qilinadigan kurslar
            </h2>
            <span className="text-fuchsia-400 text-2xl">/&gt;</span>
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-md transition animate-pulseGlow"
          >
            <span className="text-lg">&gt;_</span>
            <span>{showAll ? "Yopish" : "Barchasini ko‘rish"}</span>
          </button>
        </div>

        {isLoading && <p className="text-slate-400 mb-4">Yuklanmoqda...</p>}
        {isError && (
          <p className="text-red-400 mb-4">Ma’lumotni olishda xatolik.</p>
        )}
        {!isLoading && !isError && courses.length === 0 && (
          <p className="text-slate-300">Hozircha kurslar topilmadi.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {visible.map((c) => (
            <CourseCard key={c.id ?? Math.random()} course={c} />
          ))}
        </div>

        <div className="sm:hidden flex justify-center mt-8">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-md transition animate-pulseGlow"
          >
            <span className="text-lg">&gt;_</span>
            <span>{showAll ? "Yopish" : "Barchasini ko‘rish"}</span>
          </button>
        </div>
      </div>

      <DotsBg />

      <style>{`
        @keyframes pulseGlow { 0%{box-shadow:0 0 0 rgba(99,102,241,0)} 50%{box-shadow:0 0 22px rgba(99,102,241,0.55)} 100%{box-shadow:0 0 0 rgba(99,102,241,0)} }
        .animate-pulseGlow { animation: pulseGlow 2.1s ease-in-out infinite; }
        .badge { padding:2px 10px; border-radius:9999px; font-size:12px; font-weight:600; color:#7dd3fc; background:rgba(14,165,233,.12); border:1px solid rgba(125,211,252,.25) }
        .clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden }
        .media-wrap { position:relative; border-radius:14px; overflow:hidden }
        .media-grad:before{ content:""; position:absolute; inset:0; background: radial-gradient(90% 120% at 90% 10%, rgba(255,255,255,0.06), transparent 60%); pointer-events:none }
      `}</style>
    </section>
  );
}

function CourseCard({ course: c }) {
  const navigate = useNavigate();

  // sonlarga fallback
  const lessons = Number(c?.lessons ?? 0);
  const views = Number(c?.views ?? 0);
  const durationText = typeof c?.duration === "string" ? c.duration : "";
  const weeks = Number(String(durationText).replace(/\D/g, "")) || 8;

  // media tanlash: avval normalize qilingan `image`/`imageCover`,
  // bo'lmasa images[] ichidan birinchi mosini olamiz
  let media = "";
  if (typeof c?.image === "string" && c.image.trim()) {
    media = c.image.trim();
  } else if (Array.isArray(c?.images) && c.images.length > 0) {
    const f = c.images[0];
    media =
      (typeof f === "string" ? f : f?.url || f?.image || f?.path || "") || "";
  }

  media = absolutize(media);

  const isVideo = isVideoUrl(media);
  const embed = isVideo ? getEmbedUrl(media) : null;

  // to‘g‘ri fallback rasm (YouTube URL qo‘ymaymiz <img> ichiga!)
  const fallbackImg =
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1280&auto=format&fit=crop";

  return (
    <article className="relative rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_34px_rgba(0,0,0,0.35)] transition-shadow">
      <div className="media-wrap media-grad">
        {c.level && (
          <span className="absolute left-3 top-3 z-10 badge">{c.level}</span>
        )}
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 text-yellow-300 bg-[#0006] px-2 py-0.5 rounded-full text-sm font-medium">
          <FiStar /> {Number(c?.rating ?? 4.8).toFixed(1)}
        </span>
        <span className="absolute right-3 bottom-3 z-10 text-slate-300/70 bg-[#0006] p-2 rounded-lg">
          <FiMaximize2 />
        </span>

        {embed ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              src={embed}
              title={c?.name || "course"}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <img
            src={media || fallbackImg}
            alt={c?.name || "course"}
            className="w-full h-52 sm:h-56 object-cover"
            loading="lazy"
          />
        )}
      </div>

      {c?.category && (
        <div className="mt-3">
          <span className="badge">{c.category}</span>
        </div>
      )}

      <h3 className="text-white text-xl sm:text-2xl font-semibold mt-3">
        {c?.name || "Nomlanmagan kurs"}
      </h3>
      <p className="text-slate-300 mt-1 clamp-2">{c?.description || ""}</p>

      <div className="grid grid-cols-2 gap-3 text-slate-300/95 text-sm mt-4">
        <Meta icon={FiClock} text={`${weeks} hafta`} />
        <Meta icon={FiBookOpen} text={`${lessons} dars`} />
        <Meta icon={FiTag} text={c?.teacher || ""} />
        <Meta icon={FiEye} text={`${views} ko‘rish`} />
      </div>

      <div className="my-4 h-px bg-white/10" />

      <div className="flex items-center gap-4">
        <div className="text-white font-bold tracking-wide">
          {formatPrice(Number(c?.price ?? 0))}{" "}
          <span className="text-slate-400 font-normal">so'm</span>
        </div>

        <button
          onClick={() => navigate(`/kurslar/${c?.id}`, { state: c })}
          className="ml-auto inline-flex items-center justify-center px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition animate-pulseGlow"
        >
          Kursni ko'rish
        </button>
      </div>

      <div className="absolute left-3 bottom-3 text-slate-400/40">
        <FiSettings size={18} />
      </div>
      <div className="flex absolute right-7 top-1/2 -translate-y-1/2 text-amber-300/20 rotate-12 hover:rotate-0 hover:text-amber-300/40 transition">
        <FiZap size={32} />
      </div>
    </article>
  );
}

/* helpers */
function Meta({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-slate-300/80" />
      <span>{text}</span>
    </div>
  );
}
function formatPrice(n) {
  try {
    return new Intl.NumberFormat("uz-UZ").format(n);
  } catch {
    return n;
  }
}
function isVideoUrl(url = "") {
  if (!url) return false;
  const u = url.toLowerCase();
  return (
    u.includes("youtube.com") ||
    u.includes("youtu.be") ||
    u.includes("m.youtube.com") ||
    u.includes("vimeo.com") ||
    u.includes("/shorts/") ||
    u.includes("/live/")
  );
}
function getEmbedUrl(raw = "") {
  try {
    const url = raw.trim();
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split(/[?&#]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("/shorts/")) {
      const id = url.split("/shorts/")[1].split(/[?&#]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("/live/")) {
      const id = url.split("/live/")[1].split(/[?&#]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("vimeo.com/")) {
      const id = url.split("vimeo.com/")[1].split(/[?&#]/)[0];
      return `https://player.vimeo.com/video/${id}`;
    }
  } catch {}
  return null;
}
function DotsBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e33] via-[#0b2342] to-[#0a1a2e] opacity-95" />
    </div>
  );
}
