import { Link, useLocation, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../context/courseApi";
import {
  FiArrowLeft,
  FiClock,
  FiBookOpen,
  FiTag,
  FiUsers,
  FiStar,
  FiDatabase,
  FiChevronRight,
} from "react-icons/fi";

/**
 * Rasmga mos neon/dark glassmorphism maketi:
 * - yuqori qatlam: media (chap) + o'ng info kartalar
 * - pastki qatlam: kurs sarlavha, meta, progress, narx
 */
export default function SinglePage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { data, isLoading } = useGetCourseByIdQuery(id, { skip: !!state });

  const course = state || (Array.isArray(data) ? data?.[0] : data);

  if (!course && isLoading) {
    return <div className="text-slate-300 p-6">Yuklanmoqda...</div>;
  }
  if (!course) {
    return (
      <div className="text-slate-300 p-6">
        Kurs topilmadi.{" "}
        <Link className="text-indigo-400 underline" to="/">
          Bosh sahifa
        </Link>
      </div>
    );
  }

  // Helpers
  const isVideoUrl = (url = "") => {
    const u = String(url || "").toLowerCase();
    return u.includes("youtube.com") || u.includes("youtu.be") || u.includes("vimeo.com");
  };
  const getEmbedUrl = (url = "") => {
    try {
      if (url.includes("youtu.be/"))
        return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split(/[?&]/)[0]}`;
      if (url.includes("youtube.com/watch")) {
        const vid = new URL(url).searchParams.get("v");
        if (vid) return `https://www.youtube.com/embed/${vid}`;
      }
      if (url.includes("vimeo.com/"))
        return `https://player.vimeo.com/video/${url.split("vimeo.com/")[1].split(/[?&]/)[0]}`;
    } catch {}
    return null;
  };
  const formatPrice = (n) => {
    const num = Number(n ?? 0);
    try {
      return new Intl.NumberFormat("uz-UZ").format(num);
    } catch {
      return String(num);
    }
  };

  // Derived
  const weeks = Number(String(course?.duration || "").replace(/\D/g, "")) || 10;
  const totalLessons = Number(course?.lessons ?? 20);
  const completed = Number(course?.completed ?? 0);
  const remaining = Math.max(totalLessons - completed, 0);
  const progress = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  const students = Number(course?.students ?? course?.views ?? 800);
  const rating = Number(course?.rating ?? 4.6).toFixed(1);
  const embed = isVideoUrl(course?.image) ? getEmbedUrl(course?.image) : null;

  return (
    <div
      className={[
        "min-h-[100dvh] py-6 px-4 sm:px-6 lg:px-8",
        // fon: radial + grid (rasmdagi kabi)
        "bg-[#02101B]",
        "bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(59, 131, 246, 0.8),transparent_60%),radial-gradient(900px_500px_at_110%_30%,rgba(99, 101, 241, 0.78),transparent_55%)]",
      ].join(" ")}
    >
      {/* back */}
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-5"
        >
          <FiArrowLeft /> goBack()
        </Link>
      </div>

      {/* TOP GRID: media + side-panels */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* MEDIA */}
        <div className="lg:col-span-2 relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-xl">
            {/* badges */}
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-indigo-600/90">
                {String(course?.category || "Dasturlash")}
              </span>
              {course?.level ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-emerald-600/90">
                  {String(course.level)}
                </span>
              ) : null}
            </div>
            {/* rating badge */}
            <span className="absolute right-3 top-3 z-10 flex items-center gap-1 text-yellow-300 bg-black/50 px-2 py-1 rounded-full text-sm font-medium">
              <FiStar /> {rating}
            </span>

            {/* media content */}
            {embed ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={embed}
                  title={String(course?.name || "preview")}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <img
                src={
                  course?.image ||
                  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop"
                }
                alt={String(course?.name || "course")}
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
            )}
          </div>
        </div>

        {/* SIDE PANELS */}
        <div className="space-y-6">
          {/* course.modules */}
          <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-xl">
            <div className="px-5 pt-4 pb-2 flex items-center gap-3">
              <span className="text-indigo-300">
                <FiDatabase />
              </span>
              <h3 className="text-slate-200 font-mono">course.modules</h3>
            </div>

            <div className="m-4 rounded-xl border border-white/10 bg-slate-900/40">
              <div className="p-4 flex items-center justify-between">
                <div className="text-slate-200 font-mono">
                  1-bo&apos;lim: Python Asoslari
                </div>
                <FiChevronRight className="text-slate-400" />
              </div>
              <div className="px-4 pb-4 text-slate-400 font-mono text-sm">
                // 1 lessons • 0 completed
              </div>
              <div className="absolute right-7 top-8">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600/90 text-white text-sm font-semibold shadow">
                  1
                </span>
              </div>
            </div>
          </div>

          {/* analytics.data */}
          <div className="rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-xl">
            <div className="px-5 pt-4 pb-2 flex items-center gap-3">
              <span className="text-indigo-300">
                <FiDatabase />
              </span>
              <h3 className="text-slate-200 font-mono">analytics.data</h3>
            </div>

            <div className="m-4 rounded-xl border border-white/10 bg-slate-900/40 p-4 font-mono">
              <Row label="sections.length:" value="1" />
              <Row label="totalLessons:" value={String(totalLessons)} />
              <Row label="completed:" value={String(completed)} accent="text-emerald-400" />
              <Row label="remaining:" value={String(remaining)} accent="text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CARD */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-800/60 backdrop-blur-xl">
          <div className="p-6">
            <h1 className="text-white text-3xl font-semibold">
              <span className="text-indigo-400 mr-2">_</span>
              {String(course?.name || "Python Dasturlash Tili")}
            </h1>
            {course?.description ? (
              <p className="text-slate-300 mt-2">// {String(course.description)}</p>
            ) : (
              <p className="text-slate-300 mt-2">
                // Noldan Python dasturlash tilini o&apos;rganish
              </p>
            )}

            {/* meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300/95 text-sm mt-4">
              <span className="flex items-center gap-2">
                <FiStar className="text-yellow-300" /> {rating}
              </span>
              <span className="flex items-center gap-2">
                <FiUsers /> {students}
              </span>
              <span className="flex items-center gap-2">
                <FiTag /> {String(course?.teacher || "Sardor Umarov")}
              </span>
              <span className="flex items-center gap-2">
                <FiClock /> {weeks} hafta
              </span>
              <span className="flex items-center gap-2">
                <FiBookOpen /> {totalLessons} lessons
              </span>
            </div>

            {/* progress */}
            <div className="mt-6 rounded-xl border border-white/10 p-4">
              <div className="text-slate-300 mb-3 font-mono">course.progress</div>
              <div className="relative h-2 rounded-full bg-slate-700/60 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-indigo-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-end text-slate-400 text-sm font-mono">
                {progress}% ({completed}/{totalLessons})
              </div>
            </div>

            {/* price */}
            <div className="mt-6 rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="text-slate-300 font-mono"></div>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                  💻 buyNow()
                </button>
              </div>
              <div className="text-3xl font-mono text-white mt-2">
                {formatPrice(course?.price ?? 250000)}{" "}
                <span className="text-slate-400 text-xl">so&apos;m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Small row component for analytics ---- */
function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-slate-400">{label}</span>
      <span className={["text-slate-200", accent || ""].join(" ")}>{value}</span>
    </div>
  );
}
