// src/context/courseApi.js
import { api } from "./api";

// Yordamchi funksiya: string bo'lsa trim; bo'lmasa "" qaytar
const s = (v) => (typeof v === "string" ? v.trim() : "");

// Yordamchi: birinchi to‘g‘ri rasmni olish (string yoki obyekt {url|image|path})
function pickFirstImage(images) {
  if (!Array.isArray(images) || images.length === 0) return "";
  for (const it of images) {
    if (typeof it === "string" && s(it)) return s(it);
    if (it && typeof it === "object") {
      const cand = s(it.url) || s(it.image) || s(it.path);
      if (cand) return cand;
    }
  }
  return "";
}

export const courseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // LIST
    getCourses: build.query({
      query: () => ({ url: "/get_courses", method: "GET" }),
      transformResponse: (res) => {
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.results)
          ? res.results
          : Array.isArray(res?.courses)
          ? res.courses
          : [];

        return list.map((raw) => {
          const id =
            raw?.id ??
            raw?._id ??
            raw?.course_id ??
            raw?.courseId ??
            raw?.uuid ??
            null;

          const images = Array.isArray(raw?.images) ? raw.images : [];
          const imageCover =
            // 1) images[] ichidan topamiz
            pickFirstImage(images) ||
            // 2) alohida image maydoni bo‘lsa
            s(raw?.image);

          return {
            ...raw,
            id,
            name: s(raw?.name) || `Kurs #${id ?? "-"}`,
            description: s(raw?.description),
            category: s(raw?.category),
            level: s(raw?.level),
            teacher: s(raw?.teacher),
            duration: s(raw?.duration), // "8 hafta" yoki "", "string" bo‘lishi mumkin
            price: Number(raw?.price ?? 0),
            lessons: Number(raw?.lessons ?? 0),
            views: Number(raw?.views ?? 0),
            sections: Array.isArray(raw?.sections) ? raw.sections : [],
            images,                // original massivni saqlab qo‘yamiz
            image: imageCover,     // kartalar uchun birlamchi rasm
            imageCover,            // sinonim
            rating: Number(raw?.rating ?? 4.8),
          };
        });
      },
      providesTags: (result) =>
        result?.length
          ? [
              ...result.map((c) => ({ type: "Courses", id: c.id })),
              { type: "Courses", id: "LIST" },
            ]
          : [{ type: "Courses", id: "LIST" }],
    }),

    // DETAIL
    getCourseById: build.query({
      query: (id) => ({ url: `/get_courses?id=${id}`, method: "GET" }),
      transformResponse: (res) => {
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.results)
          ? res.results
          : Array.isArray(res?.courses)
          ? res.courses
          : [];

        const raw = list?.[0];
        if (!raw) return null;

        const images = Array.isArray(raw?.images) ? raw.images : [];
        const imageCover = pickFirstImage(images) || s(raw?.image);

        return {
          ...raw,
          id: raw?.id ?? raw?._id ?? raw?.course_id ?? raw?.courseId ?? null,
          name: s(raw?.name),
          description: s(raw?.description),
          category: s(raw?.category),
          level: s(raw?.level),
          teacher: s(raw?.teacher),
          duration: s(raw?.duration),
          price: Number(raw?.price ?? 0),
          lessons: Number(raw?.lessons ?? 0),
          views: Number(raw?.views ?? 0),
          sections: Array.isArray(raw?.sections) ? raw.sections : [],
          images,
          image: imageCover,
          imageCover,
          rating: Number(raw?.rating ?? 4.8),
        };
      },
      providesTags: (res, err, id) => [{ type: "Courses", id }],
    }),

    // CREATE (x-www-form-urlencoded)
   
    createCourse: build.mutation({
      query: (p) => {
        // Agar p FormData bo'lsa to'g'ridan-to'g'ri yuboramiz
        let body = p instanceof FormData ? p : null;

        if (!body) {
          const fd = new FormData();
          fd.append("name", (p?.name ?? "").trim());
          fd.append("teacher", (p?.teacher ?? "").trim());
          fd.append("description", (p?.description ?? "").trim());
          fd.append("category", (p?.category ?? "").trim());
          fd.append("level", (p?.level ?? "").trim());
          fd.append("duration", (p?.duration ?? "").trim());
          fd.append("price", String(Number(p?.price ?? 0)));
          fd.append("lessons", String(parseInt(p?.lessons, 10) || 0));
          fd.append("views", String(parseInt(p?.views, 10) || 0));

          // ⚠️ Backend nomiga moslang:
          // Bitta fayl bo'lsa:
          if (p?.imageFile) fd.append("image", p.imageFile);
          // Yoki ko'p fayl bo'lsa:
          if (Array.isArray(p?.images)) {
            p.images.forEach((f) => f && fd.append("images", f));
          }
          body = fd;
        }

        return { url: "/create_course", method: "POST", body }; // header qo'ymaymiz
      },
      invalidatesTags: [{ type: "Courses", id: "LIST" }],
    }),

    // UPDATE (demo)
    updateCourse: build.mutation({
      query: (payload) => ({
        url: "/update_apartment",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: payload?.id,
          name: s(payload?.name),
          teacher: s(payload?.teacher),
          description: s(payload?.description),
          category: s(payload?.category),
          level: s(payload?.level),
          duration: s(payload?.duration),
          price: Number(payload?.price ?? 0),
          image: s(payload?.image),
          lessons: Number(payload?.lessons ?? 0),
          views: Number(payload?.views ?? 0),
        }),
      }),
      invalidatesTags: (res, err, arg) => [
        { type: "Courses", id: arg?.id },
        { type: "Courses", id: "LIST" },
      ],
    }),

    deleteCourse: build.mutation({
      query: (id) => ({ url: `/delete_apartment?id=${id}`, method: "DELETE" }),
      invalidatesTags: (res, err, id) => [
        { type: "Courses", id },
        { type: "Courses", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
