const $app = document.getElementById("app");
const $search = document.getElementById("search");
const $status = document.getElementById("status");
const $nav = document.getElementById("nav");
const $navLinks = document.getElementById("nav-links");
const BASE_TITLE = document.title; // taken from <title> in index.html

// topics > sections > videos. Order is kept exactly as written in data.js (nothing is sorted here).
// A topic with a plain "videos" list (no sections) still works as one untitled section.
SITE.topics.forEach((t) => {
  t.all = [];
  t.sections = (t.sections || [{ title: "", videos: t.videos }]).map((s) => ({
    title: s.title || "",
    videos: (s.videos || []).filter((v) => v.ready === "Y")
  }));

  t.sections.forEach((s) => {
    s.videos.forEach((v) => {
      v._sec = s.title;
      v._i = t.all.length;
      t.all.push(v);
    });
  });
});

const esc = (s) => String(s).replace(/[&<>\"]/g, (c) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
}[c]));

// Encode each path segment so characters like "#" or spaces in file names work in URLs.
const enc = (p) => p.split("/").map(encodeURIComponent).join("/");
const has = (s, q) => s.toLowerCase().includes(q);

const hi = (text, q) => {
  if (!q) return esc(text);

  const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  let out = "";
  let last = 0;
  let m;

  while ((m = re.exec(text))) {
    out += esc(text.slice(last, m.index)) + `<mark>${esc(m[0])}</mark>`;
    last = m.index + m[0].length;
  }

  return out + esc(text.slice(last));
};

// Accepts watch?v=, youtu.be/, /shorts/, /live/, /embed/ links or a bare 11-character video ID.
const ytId = (u) => {
  if (!u) return "";

  const m = String(u).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : (/^[\w-]{11}$/.test(u) ? u : "");
};

const thumb = (v) => {
  const id = ytId(v.youtube);
  const src = v.thumbnail ? enc(v.thumbnail) : id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";

  return src
    ? `<img class="thumb" src="${esc(src)}" alt="" loading="lazy">`
    : `<div class="thumb ph" aria-hidden="true">▶</div>`;
};

const topicCard = (t) => {
  const n = t.all.length;

  return `<a class="card tcard${n ? "" : " soon"}" href="#/t/${t.id}">
    <h3>${esc(t.name)}</h3><p>${esc(t.description)}</p>
    <span class="badge">${n ? `${n} video${n > 1 ? "s" : ""}` : "Coming soon"}</span>
  </a>`;
};

const videoCard = (t, v, q = "", showTopic = false) => `
  <a class="card vcard" href="#/v/${t.id}/${v._i}">
    ${thumb(v)}
    <div class="cbody">
      ${showTopic ? `<small>${esc(t.name)}${v._sec ? " · " + esc(v._sec) : ""}</small>` : ""}
      <h3>${hi(v.title, q)}</h3>
    </div>
  </a>
`;

const renderNav = (id) => {
  $navLinks.innerHTML = [
    `<a href="#/"${!id ? ' class="active" aria-current="page"' : ""}>Home</a>`,
    ...SITE.topics.map((t) =>
      `<a href="#/t/${t.id}"${t.id === id ? ' class="active" aria-current="page"' : ""}>${esc(t.name)}</a>`
    )
  ].join("");
};

const topicBody = (t) => {
  if (!t.all.length && !t.sections.some((s) => s.title)) {
    return `<p class="vdesc">No videos here yet. Check back soon.</p>`;
  }

  const titled = t.sections.filter((s) => s.title);
  const hasTabs = titled.length > 1;

  if (hasTabs) {
    const activeSection = t.sections.findIndex((section) => section.title);

    return `<div class="section-tabs" role="tablist" aria-label="Subtopics">
      ${t.sections.map((s, n) => s.title
        ? `<button type="button" class="section-tab${n === activeSection ? " active" : ""}" id="tab-${n}" role="tab" aria-controls="sec-${n}" aria-selected="${n === activeSection}" tabindex="${n === activeSection ? "0" : "-1"}" data-sec="${n}">
            ${esc(s.title)}<span>${s.videos.length}</span>
          </button>`
        : "").join("")}
    </div>` + t.sections.map((s, n) => s.title ? `
      <section class="sec tab-panel" id="sec-${n}" role="tabpanel" aria-labelledby="tab-${n}" tabindex="0"${n === activeSection ? "" : " hidden"}>
        ${s.videos.length
          ? `<div class="grid">${s.videos.map((v) => videoCard(t, v)).join("")}</div>`
          : `<p class="vdesc">Coming soon.</p>`}
      </section>
    ` : "").join("");
  }

  return t.sections.map((s, n) => `
    <section class="sec" id="sec-${n}">
      ${s.title ? `<h3 class="sec-title">${esc(s.title)}<span>${s.videos.length}</span></h3>` : ""}
      ${s.videos.length
        ? `<div class="grid">${s.videos.map((v) => videoCard(t, v)).join("")}</div>`
        : `<p class="vdesc">Coming soon.</p>`}
    </section>
  `).join("");
};

async function mountPlayer(box, v) {
  const id = ytId(v.youtube);

  if (id) {
    const cc = encodeURIComponent(v.lang || "en");
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&cc_load_policy=1&cc_lang_pref=${cc}"
      title="${esc(v.title)}" allow="encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    return;
  }

  const el = document.createElement("video");
  el.controls = true;
  el.preload = "metadata";
  el.setAttribute("playsinline", "");
  el.src = enc(v.video);

  el.addEventListener("error", async () => {
    let why;

    try {
      const r = await fetch(el.currentSrc || el.src, { method: "HEAD" });
      why = r.ok
        ? `file found, but the browser cannot play it (error code ${el.error ? el.error.code : "?"})`
        : `server answered ${r.status}: no file at that path`;
    } catch (e) {
      why = location.protocol === "file:"
        ? "page opened by double-click, use a local server"
        : "cannot reach the server";
    }

    box.insertAdjacentHTML("beforeend", `<p class="err">Video could not be loaded: ${esc(v.video)} (${why}).</p>`);
  }, { once: true });

  box.appendChild(el);

  if (!v.subtitle) return;

  try {
    // Browsers only support WebVTT in <track>, so convert .srt on the fly.
    const res = await fetch(enc(v.subtitle));
    if (!res.ok) throw new Error(res.status);

    const srt = (await res.text()).replace(/^\uFEFF/, "").replace(/\r/g, "");
    const vtt = "WEBVTT\n\n" + srt.replace(/(\d\d:\d\d:\d\d),(\d{3})/g, "$1.$2");
    const t = document.createElement("track");
    t.kind = "subtitles";
    blobUrl = URL.createObjectURL(new Blob([vtt], { type: "text/vtt" }));
    t.src = blobUrl;
    t.srclang = v.lang || "en";
    t.label = v.label || v.lang || "Subtitles";
    t.default = true;
    el.appendChild(t);
    t.track.mode = "showing";
  } catch (e) {
    const hint = location.protocol === "file:"
      ? "Open this site with a local server (python -m http.server), not by double-clicking index.html."
      : `Check the path in data.js: ${esc(v.subtitle)}`;
    box.insertAdjacentHTML("beforeend", `<p class="err">Subtitles could not be loaded. ${hint}</p>`);
  }
}

function render() {
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl);
    blobUrl = null;
  }

  const q = $search.value.trim().toLowerCase();
  renderNav("");

  if (q) {
    const items = [];
    SITE.topics.forEach((t) => {
      const topicHit = has(t.name, q) || has(t.description || "", q);
      t.all.forEach((v) => {
        if (topicHit || has(v.title, q) || has(v._sec, q)) {
          items.push(videoCard(t, v, q, true));
        }
      });
    });

    $status.textContent = items.length
      ? `${items.length} video${items.length > 1 ? "s" : ""} found.`
      : "No match. Try a shorter keyword.";
    $app.innerHTML = `<div class="grid">${items.join("")}</div>`;
    return;
  }

  $status.textContent = "";
  const [, kind, tid, idx] = location.hash.split("/");
  const t = SITE.topics.find((x) => x.id === tid);
  const v = t && /^\d+$/.test(idx || "") ? t.all[+idx] : null;
  document.title = BASE_TITLE;

  if (t && ((kind === "v" && v) || kind === "t")) {
    renderNav(t.id);
  }

  if (kind === "v" && v) {
    document.title = `${v.title} | ${BASE_TITLE}`;
    $app.innerHTML = `<a class="back" href="#/t/${t.id}">← ${esc(t.name)}</a>
      <h2>${esc(v.title)}</h2><div class="player"></div>`;
    mountPlayer($app.querySelector(".player"), v);
  } else if (kind === "t" && t) {
    document.title = `${t.name} | ${BASE_TITLE}`;
    $app.innerHTML = `<h2>${esc(t.name)}</h2><p class="vdesc">${esc(t.description || "")}</p>` + topicBody(t);
  } else {
    $app.innerHTML = `<h2>Choose a topic</h2><div class="grid">${SITE.topics.map(topicCard).join("")}</div>`;
  }

  window.scrollTo(0, 0);
}

let blobUrl;
let timer;

$search.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(render, 150);
});

const clearHomeSearch = () => {
  if ($search.value) {
    $search.value = "";
    render();
  }
};

document.getElementById("home").addEventListener("click", clearHomeSearch);

$navLinks.addEventListener("click", (e) => {
  const link = e.target.closest('a[href="#/"]');
  if (link) clearHomeSearch();
});

$app.addEventListener("click", (e) => {
  const b = e.target.closest('[role="tab"][data-sec]');
  if (b) {
    selectSectionTab(b);
  }
});

$app.addEventListener("keydown", (e) => {
  const b = e.target.closest('[role="tab"][data-sec]');
  if (!b) return;

  const tabs = [...$app.querySelectorAll('[role="tab"][data-sec]')];
  const index = tabs.indexOf(b);
  let nextIndex;

  if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
  else if (e.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
  else if (e.key === "Home") nextIndex = 0;
  else if (e.key === "End") nextIndex = tabs.length - 1;
  else return;

  e.preventDefault();
  tabs[nextIndex].focus();
  selectSectionTab(tabs[nextIndex]);
});

function selectSectionTab(tab) {
  const tabs = $app.querySelectorAll('[role="tab"][data-sec]');
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
  });
}

window.addEventListener("hashchange", () => {
  $search.value = "";
  render();
});

render();
