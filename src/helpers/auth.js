// src/helpers/auth.js



// data/helpers/media-helpers.js


const safeStr = (v) => (typeof v === "string" ? v.trim() : "");

export const toAbsolute = (p) => {
  const s = safeStr(p).replace(/\\/g, "/"); // '\' -> '/'
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `${"https://96d754169f5b.ngrok-free.app".replace(/\/+$/,"")}/${s.replace(/^\/+/,"")}`;
};

export const isVideoUrl = (url = "") => {
  const u = String(url || "").toLowerCase();
  return (
    u.includes("youtube.com") ||
    u.includes("youtu.be") ||
    u.includes("/shorts/") ||
    u.includes("/live/") ||
    u.includes("vimeo.com") ||
    /\.(mp4|webm|ogg)(\?|#|$)/.test(u)
  );
};

export const toEmbedUrl = (raw = "") => {
  const url = safeStr(raw);
  if (!url) return null;

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split(/[?&#]/)[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtube.com/watch")) {
    try {
      const id = new URL(url).searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    } catch {}
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
  if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(url)) return url; // <video> uchun
  return null;
};

/** Sening schema’ga mos resolver:
 * 1) Agar images[] bo‘lsa -> images[0].image (relative) -> absolute rasm
 * 2) Bo‘lmasa description ichidan 1-URL topamiz:
 *    - YouTube/Vimeo → embed
 *    - .mp4 → <video>
 *    - rasm → <img>
 */
export function resolveMediaForCourse(c = {}) {
  // 1) images[]
  if (Array.isArray(c.images) && c.images.length > 0) {
    const first = safeStr(c.images[0]?.image);
    if (first) {
      const abs = toAbsolute(first);
      if (isVideoUrl(abs)) {
        const em = toEmbedUrl(abs);
        return em ? { kind: "video-embed", url: em } : { kind: "video-file", url: abs };
      }
      return { kind: "image", url: abs };
    }
  }

  // 2) description ichidan URL qidiramiz
  const desc = safeStr(c.description);
  const m = desc.match(/https?:\/\/[^\s)]+/i);
  const url = safeStr(m?.[0]);
  if (url) {
    if (isVideoUrl(url)) {
      const em = toEmbedUrl(url);
      return em ? { kind: "video-embed", url: em } : { kind: "video-file", url };
    }
    if (/\.(png|jpe?g|webp|gif|avif|svg)(\?|#|$)/i.test(url)) return { kind: "image", url };
    return { kind: "image", url }; // boshqa link bo‘lsa ham rasm sifatida urinamiz
  }

  return { kind: "none", url: "" };
}

export function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }
  