// src/components/AdminConsole.jsx
import { useMemo, useState } from "react";
import {
    FiMonitor,
    FiBookOpen,
    FiUsers,
    FiShield,
    FiSearch,
    FiEye,
    FiEdit2,
    FiTrash2,
    FiStar,
    FiPlus,
    FiX,
    FiZap,


} from "react-icons/fi";
import { useCreateCourseMutation } from "../context/courseApi";;

/** AdminConsole – 4 ta tabli admin panel */
export default function AdminConsole() {
    const [tab, setTab] = useState("dashboard");

    return (
        <section className="relative min-h-screen py-6 sm:py-10">
            <Bg />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 text-cyan-300 font-mono text-2xl">
                        <span className="text-emerald-300">&lt;</span>
                        <h1 className="text-white font-semibold">Admin Panel</h1>
                        <span className="text-fuchsia-400">/&gt;</span>
                    </div>
                    <CreateCourseModal onCreate={(data) => alert("Yangi kurs yaratildi: " + JSON.stringify(data))} />

                </div>

                {/* Top Nav (4 buttons) */}
                <div className="w-full rounded-2xl bg-slate-800/40 border border-white/10 p-1 flex flex-wrap items-center justify-between gap-2">
                    <NavBtn active={tab === "dashboard"} onClick={() => setTab("dashboard")} icon={FiMonitor} text="Dashboard" />
                    <NavBtn active={tab === "courses"} onClick={() => setTab("courses")} icon={FiBookOpen} text="Kurslar" />
                    {/* <NavBtn active={tab === "teachers"} onClick={() => setTab("teachers")} icon={FiShield} text="O‘qituvchilar" /> */}
                    <NavBtn active={tab === "students"} onClick={() => setTab("students")} icon={FiUsers} text="Talabalar" />
                </div>

                {/* Content */}
                <div className="mt-6">
                    {tab === "dashboard" && <DashboardView />}
                    {tab === "courses" && <CoursesView />}
                    {/* {tab === "teachers" && <TeachersView />} */}
                    {tab === "students" && <StudentsView />}
                </div>
            </div>
        </section>
    );
}

/* ---------------------- Dashboard ---------------------- */
function DashboardView() {
    const stats = [
        { label: "Faol Talabalar", value: 7 },
        { label: "Jami Kurslar", value: 6 },
        // { label: "Faol O‘qituvchilar", value: 5 },
        { label: "Jami Darslar", value: 103 },
    ];
    const rows = [
        { name: "UI/UX Dizayn Asoslari", students: 3, done: 64, rating: "4.9/5", teacher: "Malika Toshmatova" },
        { name: "React va TypeScript Asoslari", students: 6, done: 68, rating: "4.8/5", teacher: "Sardor Umarov" },
        { name: "Kiberxavfsizlik Asoslari", students: 2, done: 74, rating: "4.8/5", teacher: "Rustam Narzullayev" },
        { name: "Ma'lumotlar Bazasi MySQL", students: 3, done: 75, rating: "4.7/5", teacher: "Bobur Rahimov" },
        { name: "Python Dasturlash Tili", students: 5, done: 63, rating: "4.6/5", teacher: "Sardor Umarov" },
    ];
    return (
        <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((s) => (
                    <Card key={s.label}>
                        <div className="text-slate-300">{s.label}</div>
                        <div className="mt-6 text-3xl text-white">{s.value}</div>
                        <div className="mt-2 text-xs text-slate-500">// real-time</div>
                    </Card>
                ))}
            </div>

            {/* Table */}
            <Card className="mt-8">
                <div className="text-slate-300 font-semibold mb-3">Mashhur Kurslar Analitikasi</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-300">
                        <thead>
                            <tr className="text-slate-400 text-sm border-b border-white/10">
                                <th className="py-3 pr-4">Kurs Nomi</th>
                                <th className="py-3 pr-4">Talabalar</th>
                                <th className="py-3 pr-4">Tugatilgan</th>
                                <th className="py-3 pr-4">Reyting</th>
                                {/* <th className="py-3">O‘qituvchi</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={r.name} className={`text-sm ${i !== rows.length - 1 ? "border-b border-white/5" : ""}`}>
                                    <td className="py-3 pr-4 text-white">{r.name}</td>
                                    <td className="py-3 pr-4 text-cyan-300">{r.students}</td>
                                    <td className="py-3 pr-4 text-emerald-300">{r.done}%</td>
                                    <td className="py-3 pr-4 text-amber-300">{r.rating}</td>
                                    <td className="py-3 text-sky-300">{r.teacher}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
}

/* ---------------------- Courses ---------------------- */
function CoursesView() {
    const list = useMemo(
        () => [
            {
                cover:
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
                title: "UI/UX Dizayn Asoslari",
                meta: "Malika Toshmatova • Boshlang‘ich • 18 dars • 3 talaba",
                modules: [{ title: "1-bo‘lim: Dizayn Printsiplari", lessons: 1 }],
                enrolled: [
                    { name: "Malika Toshmatova", progress: 45 },
                    { name: "Nodira Rakhimova", progress: 23 },
                    { name: "Farida Saidova", progress: 56 },
                ],
            },
            {
                cover:
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
                title: "React va TypeScript Asoslari",
                meta: "Sardor Umarov • Boshlang‘ich • 12 dars • 6 talaba",
                modules: [
                    { title: "1-bo‘lim: React Asoslari", lessons: 3 },
                    { title: "2-bo‘lim: TypeScript Integratsiyasi", lessons: 1 },
                ],
                enrolled: [
                    { name: "Akmal Karimov", progress: 67 },
                    { name: "Malika Toshmatova", progress: 45 },
                    { name: "Nodira Rakhimova", progress: 23 },
                    { name: "Dilshod Umarov", progress: 78 },
                    { name: "Farida Saidova", progress: 56 },
                ],
            },
        ],
        []
    );

    return (
        <>
            {/* Search */}
            <div className="mb-4">
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        placeholder="Kurslarni qidirish..."
                        className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/40 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                {list.map((c) => (
                    <Card key={c.title} className="p-0">
                        <div className="p-4 sm:p-6">
                            <div className="flex items-start gap-4">
                                <img src={c.cover} alt="" className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-white font-semibold">{c.title}</div>
                                    <div className="text-emerald-300 text-sm mt-1">{c.meta}</div>
                                </div>
                                <div className="hidden sm:flex items-center gap-3 text-slate-300">
                                    <IconBtn title="Ko‘rish">
                                        <FiEye />
                                    </IconBtn>
                                    <IconBtn title="Tahrirlash">
                                        <FiEdit2 />
                                    </IconBtn>
                                    <IconBtn title="O‘chirish">
                                        <FiTrash2 />
                                    </IconBtn>
                                </div>
                            </div>

                            {/* Modules + Enrolled */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                                <div>
                                    <div className="text-slate-300 mb-2">Bo‘limlar va Darslar:</div>
                                    <div className="space-y-2">
                                        {c.modules.map((m) => (
                                            <div
                                                key={m.title}
                                                className="rounded-xl border border-white/10 bg-slate-900/30 px-4 py-3 text-slate-300"
                                            >
                                                <div className="text-sky-300 font-mono">{m.title}</div>
                                                <div className="text-xs text-slate-400 mt-1">{m.lessons} dars</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-slate-300 mb-2">Kursga yozilgan talabalar:</div>
                                    <div className="space-y-2">
                                        {c.enrolled.map((s) => (
                                            <div key={s.name} className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                                <span className="text-slate-200">{s.name}</span>
                                                <span className="ml-auto text-xs text-slate-900 bg-sky-300/30 rounded-full px-2 py-0.5">
                                                    {s.progress}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}

// /* ---------------------- Teachers ---------------------- */
// function TeachersView() {
//     const rows = [
//         { name: "Sardor Umarov", email: "sardor.teacher@example.com", course: "React va TypeScript Asoslari / Python Dasturlash Tili", students: 156, rating: 4.8, joined: "2023-09-15", status: "Faol" },
//         { name: "Bobur Rahimov", email: "bobur.teacher@example.com", course: "Ma'lumotlar Bazasi MySQL", students: 89, rating: 4.7, joined: "2023-11-20", status: "Faol" },
//         { name: "Malika Toshmatova", email: "malika.teacher@example.com", course: "UI/UX Dizayn Asoslari", students: 234, rating: 4.9, joined: "2023-08-10", status: "Faol" },
//         { name: "Dilshod Karimov", email: "dilshod.teacher@example.com", course: "Digital Marketing", students: 67, rating: 4.5, joined: "2024-01-12", status: "Faol" },
//         { name: "Rustam Narzullayev", email: "rustam.teacher@example.com", course: "Kiberxavfsizlik Asoslari", students: 45, rating: 4.8, joined: "2023-12-03", status: "Faol" },
//     ];

//     return (
//         <>
//             {/* Search */}
//             <div className="mb-4">
//                 <div className="relative max-w-md">
//                     <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                     <input
//                         placeholder="O‘qituvchilarni qidirish..."
//                         className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/40 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                 </div>
//             </div>

//             <Card>
//                 <div className="text-slate-300 font-semibold mb-3">O‘qituvchilar Boshqaruvi</div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left text-slate-300">
//                         <thead>
//                             <tr className="text-slate-400 text-sm border-b border-white/10">
//                                 <th className="py-3 pr-4">O‘qituvchi</th>
//                                 <th className="py-3 pr-4">Kurslari</th>
//                                 <th className="py-3 pr-4">Talabalar</th>
//                                 <th className="py-3 pr-4">Reyting</th>
//                                 <th className="py-3 pr-4">Qo‘shilgan</th>
//                                 <th className="py-3 pr-4">Status</th>
//                                 <th className="py-3">Amallar</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {rows.map((r, i) => (
//                                 <tr key={r.email} className={`text-sm ${i !== rows.length - 1 ? "border-b border-white/5" : ""}`}>
//                                     <td className="py-3 pr-4">
//                                         <div className="text-white">{r.name}</div>
//                                         <div className="text-slate-400 text-xs">{r.email}</div>
//                                     </td>
//                                     <td className="py-3 pr-4 text-sky-300">{r.course}</td>
//                                     <td className="py-3 pr-4 text-cyan-300">{r.students}</td>
//                                     <td className="py-3 pr-4"><span className="inline-flex items-center gap-1 text-amber-300"><FiStar /> {r.rating}</span></td>
//                                     <td className="py-3 pr-4 text-slate-300">{r.joined}</td>
//                                     <td className="py-3 pr-4"><Badge text={r.status} color="emerald" /></td>
//                                     <td className="py-3"><RowActions /></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>

//             {/* Teacher → Students cards (preview bloklari) */}
//             <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                 <StudentMiniCard name="Sardor Nazarov" email="sardor@example.com" progress={12} status="Faol" />
//                 <StudentMiniCard name="Malika Toshmatova" email="malika@example.com" progress={45} status="Faol" />
//                 <StudentMiniCard name="Guzal Mirzayeva" email="guzal@example.com" progress={91} status="Faol" />
//             </div>
//         </>
//     );
// }

/* ---------------------- Students ---------------------- */
function StudentsView() {
    const rows = [
        { name: "Akmal Karimov", email: "akmal@example.com", courses: "React va TypeScript Asoslari / Python Dasturlash Tili", more: 1, progress: 67, joined: "2024-01-15", status: "Faol" },
        { name: "Malika Toshmatova", email: "malika@example.com", courses: "React va TypeScript Asoslari / UI/UX Dizayn Asoslari", more: 0, progress: 45, joined: "2024-02-01", status: "Faol" },
        { name: "Sardor Nazarov", email: "sardor@example.com", courses: "Python Dasturlash Tili", more: 0, progress: 89, joined: "2024-01-28", status: "Faol" },
        { name: "Nodira Rakhimova", email: "nodira@example.com", courses: "React va TypeScript Asoslari", more: 2, progress: 23, joined: "2024-03-05", status: "Faol" },
        { name: "Dilshod Umarov", email: "dilshod@example.com", courses: "React va TypeScript Asoslari / Ma'lumotlar Bazasi MySQL", more: 0, progress: 78, joined: "2024-02-20", status: "Nofaol" },
        { name: "Farida Saidova", email: "farida@example.com", courses: "React va TypeScript Asoslari / Python Dasturlash Tili", more: 3, progress: 56, joined: "2024-01-10", status: "Faol" },
        { name: "Bekzod Juraev", email: "bekzod@example.com", courses: "Digital Marketing", more: 0, progress: 12, joined: "2024-03-12", status: "To‘xtatilgan" },
    ];
    return (
        <>
            {/* Search */}
            <div className="mb-4">
                <div className="relative max-w-md">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        placeholder="Talabalarni qidirish..."
                        className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-900/40 border border-white/10 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <Card>
                <div className="text-slate-300 font-semibold mb-3">Talabalar Boshqaruvi</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-300">
                        <thead>
                            <tr className="text-slate-400 text-sm border-b border-white/10">
                                <th className="py-3 pr-4">Talaba</th>
                                <th className="py-3 pr-4">Faol Kurslar</th>
                                <th className="py-3 pr-4">Progress</th>
                                <th className="py-3 pr-4">Ro‘yxatdan o‘tgan</th>
                                <th className="py-3 pr-4">Status</th>
                                <th className="py-3">Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={r.email} className={`text-sm ${i !== rows.length - 1 ? "border-b border-white/5" : ""}`}>
                                    <td className="py-3 pr-4">
                                        <div className="text-white">{r.name}</div>
                                        <div className="text-slate-400 text-xs">{r.email}</div>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <div className="text-sky-300">{r.courses}</div>
                                        {r.more > 0 && <div className="text-slate-500 text-xs">+{r.more} boshqa</div>}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <ProgressBar value={r.progress} />
                                    </td>
                                    <td className="py-3 pr-4 text-slate-300">{r.joined}</td>
                                    <td className="py-3 pr-4">
                                        {r.status === "Faol" && <Badge text="Faol" color="emerald" />}
                                        {r.status === "Nofaol" && <Badge text="Nofaol" color="slate" />}
                                        {r.status === "To‘xtatilgan" && <Badge text="To‘xtatilgan" color="rose" />}
                                    </td>
                                    <td className="py-3"><RowActions /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </>
    );
}

/* ---------------------- UI helpers ---------------------- */
function NavBtn({ active, onClick, icon: Icon, text }) {
    return (
        <button
            onClick={onClick}
            className={` flex items-center gap-2 px-14 py-2 rounded-xl transition ${active
                ? "bg-cyan-500/15 border border-cyan-400/30 text-cyan-200"
                : "bg-slate-900/30 border border-white/10 text-slate-300 hover:bg-slate-900/50"
                }`}
        >
            <Icon />
            <span className="text-sm">{text}</span>
        </button>
    );
}
function Card({ children, className = "" }) {
    return (
        <div
            className={
                "rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-800/10 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] " +
                className
            }
        >
            {children}
        </div>
    );
}
function IconBtn({ children, title }) {
    return (
        <button
            title={title}
            className="w-9 h-9 rounded-lg border border-white/10 bg-slate-900/40 hover:bg-slate-900/60 flex items-center justify-center text-slate-300"
        >
            {children}
        </button>
    );
}
function Badge({ text, color = "emerald" }) {
    const map = {
        emerald: "bg-emerald-600/20 text-emerald-300",
        slate: "bg-slate-600/20 text-slate-300",
        rose: "bg-rose-600/20 text-rose-300",
    }[color];
    return <span className={`px-2 py-0.5 rounded-full text-xs ${map}`}>{text}</span>;
}
function ProgressBar({ value }) {
    return (
        <div className="w-40 h-2 rounded-full bg-slate-700/40">
            <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                style={{ width: `${value}%` }}
            />
            <span className="ml-2 text-slate-300 text-sm align-middle">{value}%</span>
        </div>
    );
}
function StudentMiniCard({ name, email, progress, status = "Faol" }) {
    return (
        <Card>
            <div className="flex items-center justify-between mb-2">
                <div className="text-white">{name}</div>
                <Badge text={status} color="emerald" />
            </div>
            <div className="text-slate-400 text-sm">{email}</div>
            <div className="mt-4">
                <div className="text-slate-400 text-xs mb-1">Progress</div>
                <div className="h-2 rounded-full bg-slate-700/40">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-slate-300 text-xs mt-1">{progress}%</div>
            </div>
        </Card>
    );
}
function RowActions() {
    return (
        <div className="flex items-center gap-2 text-slate-300">
            <IconBtn title="Ko‘rish">
                <FiEye />
            </IconBtn>
            <IconBtn title="Tahrirlash">
                <FiEdit2 />
            </IconBtn>
            <IconBtn title="O‘chirish">
                <FiTrash2 />
            </IconBtn>
        </div>
    );
}
function Bg() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1e33] via-[#0b2342] to-[#0a1a2e] opacity-95" />
        </div>
    );
}


function CreateCourseModal({ onCreate }) {
    const [open, setOpen] = useState(false);
    const [createCourse, { isLoading }] = useCreateCourseMutation();
    const [err, setErr] = useState(null);
  
    const [form, setForm] = useState({
      name: "",
      teacher: "",
      description: "",
      category: "",
      level: "",
      duration: "",
      price: "",
      lessons: "",
      views: 0,
    });
  
    // ✅ Yangi: rasm fayli (bitta)
    const [imageFile, setImageFile] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const handlePickFile = (e) => {
      const f = e.target.files?.[0] || null;
      // ixtiyoriy filtrlash
      if (f && !f.type.startsWith("image/")) {
        setErr("Faqat rasm tanlang");
        return;
      }
      setErr(null);
      setImageFile(f);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErr(null);
  
      const required = ["name", "teacher", "description", "category", "level", "duration", "price"];
      for (const k of required) {
        if (!String(form[k] ?? "").trim()) {
          setErr(`${k} majburiy`);
          return;
        }
      }
      if (!imageFile) {
        setErr("Rasm tanlash majburiy");
        return;
      }
  
      // ✅ FormData jo'natamiz (backend UploadFile qabul qiladi)
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("teacher", form.teacher.trim());
      fd.append("description", form.description.trim());
      fd.append("category", form.category.trim());
      fd.append("level", form.level.trim());
      fd.append("duration", form.duration.trim());
      fd.append("price", String(Number(form.price) || 0));
      fd.append("lessons", String(parseInt(form.lessons, 10) || 0));
      fd.append("views", String(parseInt(form.views, 10) || 0));
  
      // ⚠️ MUHIM: headerda Content-Type qo‘ymaymiz — brauzer o‘zi qo‘yadi
      // Backend nomi qanday bo‘lsa shunga moslang:
      // Agar backend 'image' deb kutsa:
      fd.append("image", imageFile);
      // Agar backend 'images' (array) kutsa, xohlasang shu tarzda ham jo'natish mumkin:
      // fd.append("images", imageFile);
  
      try {
        const res = await createCourse(fd).unwrap();
        onCreate?.(res);
        setOpen(false);
        setForm({
          name: "", teacher: "", description: "", category: "",
          level: "", duration: "", price: "", lessons: "", views: 0,
        });
        setImageFile(null);
      } catch (e) {
        const detail = e?.data?.detail;
        let message = "Kurs yaratishda xatolik";
        if (Array.isArray(detail)) message = detail.map(d => d?.msg || "").filter(Boolean).join(", ");
        else if (typeof detail === "string") message = detail;
        else if (e?.error) message = e.error;
        else if (e?.message) message = e.message;
        setErr(message);
        console.log("create course error:", message);
      }
    };
  
    return (
      <div>
        {/* Header + Open modal */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">
            <span className="text-cyan-400">&lt;</span>Admin Console<span className="text-fuchsia-400">/&gt;</span>
          </h1>
          <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm shadow">
            + createCourse()
          </button>
        </div>
  
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 text-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">
              <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-slate-400 hover:text-white">✕</button>
              <h2 className="text-lg font-bold mb-4">Yangi Kurs Yaratish</h2>
  
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Masalan: React va TypeScript" className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required/>
                  <input name="teacher" value={form.teacher} onChange={handleChange} type="text" placeholder="O'qituvchi ismi" className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required/>
                </div>
  
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Kurs haqida..." rows="3" className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required/>
  
                <div className="grid grid-cols-3 gap-4">
                  <select name="category" value={form.category} onChange={handleChange} className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
                    <option value="">Kategoriya</option>
                    <option value="Dasturlash">Dasturlash</option>
                    <option value="Dizayn">Dizayn</option>
                    <option value="Kiberxavfsizlik">Kiberxavfsizlik</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <select name="level" value={form.level} onChange={handleChange} className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required>
                    <option value="">Daraja tanla</option>
                    <option value="Boshlang'ich">Boshlang'ich</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Yuqori">Yuqori</option>
                  </select>
                  <input name="duration" value={form.duration} onChange={handleChange} type="text" placeholder="Masalan: 8 hafta" className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required/>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Masalan: 299000" className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500" required/>
  
                  {/* ❌ URL maydoni o'rniga ✅ Fayl tanlash */}
                  <div>
                    <label className="block text-slate-300 mb-1">Kurs rasmi (jpg/png)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePickFile}
                      className="block w-full text-slate-200 file:mr-3 file:rounded-lg file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:border-0 file:hover:bg-indigo-500 file:cursor-pointer"
                      required
                    />
                    {imageFile && (
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        Tanlangan: {imageFile.name}
                      </p>
                    )}
                  </div>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <input name="lessons" value={form.lessons} onChange={handleChange} type="number" min="0" placeholder="Darslar soni (mas: 12)" className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"/>
                  <input name="views" value={form.views} onChange={handleChange} type="number" min="0" placeholder="Ko‘rishlar (0)" className="px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"/>
                </div>
  
                {err && <p className="text-red-400 text-sm">{err}</p>}
  
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600">Cancel</button>
                  <button type="submit" disabled={isLoading} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50">
                    ⚡ {isLoading ? "Yaratilmoqda..." : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  
