import { useMemo, useState, useMemo as useReactMemo } from "react";
import { FiFilter, FiSearch, FiChevronDown, FiClock, FiBookOpen, FiUsers, FiTag, FiStar, FiSettings, FiZap } from "react-icons/fi";

/**
 * CoursesPage
 * - Chap tomonda sticky filter panel
 * - O'ng tomonda kurs kartalari grid
 * - 6 tadan ko'p bo'lsa pastda "Barcha kurslarni ko'rish" tugmasi chiqadi
 * - TailwindCSS + react-icons bilan bezatilgan, skrinshot ranglariga mos
 */
export default function CoursesPage() {
  // Demo data (xohlasangiz API bilan almashtiring)
  const allCourses = useMemo(
    () => [
      { id: 1, title: "UI/UX Dizayn Asoslari", desc: "Foydalanuvchi tajribasi va interfeys dizayni", weeks: 12, lessons: 18, teacher: "Malika Toshmatova", students: 2100, price: 380000, rating: 4.9, tags: ["Dizayn", "Boshlang'ich"], category: "Design", level: "Beginner" },
      { id: 2, title: "React va TypeScript Asoslari", desc: "Zamonaviy web ishlab chiqish uchun React va TypeScript", weeks: 8, lessons: 12, teacher: "Sardor Umarov", students: 1234, price: 299000, rating: 4.8, tags: ["Dasturlash", "Boshlang'ich"], category: "Frontend", level: "Beginner" },
      { id: 3, title: "Kiberxavfsizlik Asoslari", desc: "Axborot xavfsizligi va himoya usullari", weeks: 10, lessons: 22, teacher: "Rustam Narzullayev", students: 445, price: 450000, rating: 4.8, tags: ["Kiberxavfsizlik", "Yuqori"], category: "Security", level: "Advanced" },
      { id: 4, title: "Ma'lumotlar Bazasi MySQL", desc: "Relatsion ma'lumotlar bazasi bilan ishlash", weeks: 6, lessons: 15, teacher: "Bobur Rahimov", students: 567, price: 320000, rating: 4.7, tags: ["Ma'lumotlar analitikasi", "O'rta"], category: "Backend", level: "Intermediate" },
      { id: 5, title: "Python Dasturlash Tili", desc: "Noldan Python dasturlash tilini o'rganish", weeks: 10, lessons: 20, teacher: "Sardor Umarov", students: 890, price: 250000, rating: 4.6, tags: ["Dasturlash", "Boshlang'ich"], category: "Backend", level: "Beginner" },
      { id: 6, title: "Digital Marketing", desc: "Raqamli marketing strategiyalari va vositalari", weeks: 8, lessons: 16, teacher: "Dilshod Karimov", students: 756, price: 290000, rating: 4.5, tags: ["Marketing", "O'rta"], category: "Marketing", level: "Intermediate" },
      { id: 7, title: "Node.js Microservices", desc: "Microservice arxitekturasi va amaliyotlar", weeks: 9, lessons: 14, teacher: "Javlon Bek", students: 522, price: 420000, rating: 4.7, tags: ["Backend", "O'rta"], category: "Backend", level: "Intermediate" },
      { id: 8, title: "iOS SwiftUI", desc: "SwiftUI bilan mobil ilovalar yaratish", weeks: 7, lessons: 13, teacher: "Shahnoza X.", students: 301, price: 480000, rating: 4.6, tags: ["Mobile", "Boshlang'ich"], category: "Mobile", level: "Beginner" },
    ],
    []
  );

  // Filters & UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const byQuery = query
        ? (c.title + " " + c.desc + " " + c.teacher).toLowerCase().includes(query.toLowerCase())
        : true;
      const byCategory = category ? c.category === category : true;
      const byLevel = level ? c.level === level : true;
      return byQuery && byCategory && byLevel;
    });
  }, [allCourses, query, category, level]);

  const visible = showAll ? filtered : filtered.slice(0, 6);
  const shouldShowToggle = filtered.length > 6;

  return (
    <section className="relative py-10 sm:py-14">
      {/* background */}
      <DotsBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-emerald-300 text-2xl font-mono">
            <span className="text-cyan-400">&lt;</span>
            {/* <span className="text-cyan-400">_</span> */}
            <h2 className="text-white text-2xl sm:text-3xl font-semibold">Barcha kurslar</h2>
            <span className="text-fuchsia-400">/&gt;</span>
          </div>
          <p className="text-slate-300 mt-2 font-medium">O'zingizga mos tech kursni toping va professional developer bo'ling</p>
        </div>

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sticky Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-slate-800/30 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              {/* Header */}
              <div className="flex items-center gap-2 text-white mb-3">
                <FiFilter className="text-violet-300" />
                <h3 className="font-semibold">Filtrlar</h3>
              </div>

              {/* Search */}
              <div className="mb-4">
                <label className="text-slate-400 text-xs block mb-1 font-mono">Qidiruv</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search..."
                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/40 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Tech Stack (category) */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs mb-2 font-mono">&lt;/&gt; Tech Stack</p>
                <Select
                  value={category}
                  onChange={setCategory}
                  options={[
                    { label: "Hammasi", value: "" },
                    { label: "Design", value: "Design" },
                    { label: "Frontend", value: "Frontend" },
                    { label: "Backend", value: "Backend" },
                    { label: "Mobile", value: "Mobile" },
                    { label: "Security", value: "Security" },
                    { label: "Marketing", value: "Marketing" },
                  ]}
                />
              </div>

              {/* Level */}
              <div>
                <p className="text-slate-400 text-xs mb-2 font-mono">$ Skill Level</p>
                <Select
                  value={level}
                  onChange={setLevel}
                  options={[
                    { label: "Hammasi", value: "" },
                    { label: "Beginner", value: "Beginner" },
                    { label: "Intermediate", value: "Intermediate" },
                    { label: "Advanced", value: "Advanced" },
                  ]}
                />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visible.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>

            {/* Toggle button */}
            {shouldShowToggle && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="animate-pulseGlow inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-md transition"
                >
                  {showAll ? "Yopish" : "Barcha kurslarni ko'rish"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <div className="text-slate-200 text-sm mb-1 font-semibold">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none pr-10 pl-3 py-2 rounded-xl bg-slate-900/40 border border-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {options.map((o) => (
            <option key={o.label} value={o.value} className="bg-slate-800">
              {o.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function CourseCard({ course: c }) {
  return (
    <article className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-800/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition-shadow">
      {/* rating */}
      <div className="absolute right-4 top-6 flex items-center gap-1 text-yellow-300 text-sm font-medium">
        <FiStar />
        <span>{c.rating.toFixed(1)}</span>
      </div>

      {/* tags */}
      <div className="mb-3 flex flex-wrap gap-2">
        {c.tags.map((t, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-300/20"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">{c.title}</h3>
      <p className="text-slate-300 mb-4 leading-relaxed">{c.desc}</p>

      {/* meta */}
      <div className="grid grid-cols-2 gap-3 text-slate-300/95 text-sm">
        <Meta icon={FiClock} text={`${c.weeks} hafta`} />
        <Meta icon={FiBookOpen} text={`${c.lessons} dars`} />
        <Meta icon={FiTag} text={c.teacher} />
        <Meta icon={FiUsers} text={`${c.students}`} />
      </div>

      {/* divider */}
      <div className="my-4 h-px bg-white/10" />

      {/* price + cta */}
      <div className="flex items-center gap-4">
        <div className="text-white font-bold tracking-wide">
          {formatPrice(c.price)} <span className="text-slate-400 font-normal">so'm</span>
        </div>
        <button className="animate-pulseGlow px-2 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition">
          Kursni ko'rish
        </button>
      </div>

      {/* bottom-left decorative icon (gear) */}
      <div className="absolute left-3 bottom-3 text-slate-400/40">
        <FiSettings size={18} />
      </div>

      {/* lightning icon (decor) */}
      <div className="flex absolute right-7 top-1/2 -translate-y-1/2 text-amber-300/20 rotate-12 hover:rotate-0 hover:text-amber-300/40 transition">
        <FiZap size={32} />
      </div>
    </article>
  );
}

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

function DotsBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e33] via-[#0b2342] to-[#0a1a2e] opacity-95" />
    </div>
  );
}
