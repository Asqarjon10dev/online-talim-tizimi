import { FiBookOpen, FiUsers, FiAward, FiStar } from "react-icons/fi";

export default function StatisticsSection() {
  const stats = [
    { id: 1, value: "50+", label: "Kurslar", icon: FiBookOpen },
    { id: 2, value: "10K+", label: "Talabalar", icon: FiUsers },
    { id: 3, value: "8K+", label: "Sertifikatlar", icon: FiAward },
    { id: 4, value: "4.9", label: "Reyting", icon: FiStar },
  ];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-slate-100 mb-2 font-mono text-lg sm:text-4xl">
          Statistka
        </h2>
        <p className="mt-1 text-slate-300/90 max-w-2xl  mx-auto text-base md:text-xl font-medium mb-10">

          Platforma analytics va o&apos;quvchilar ma&apos;lumotlari
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 text-white"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/40 border border-slate-700/50 shadow-lg">
                <item.icon size={32} className="text-slate-200" />
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-slate-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Footer bracket */}
      </div>

      {/* Background */}
      <DotsBg />
    </section>
  );
}

function DotsBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e33] via-[#0b2342] to-[#0a1a2e] opacity-95" />
    </div>
  );
}
