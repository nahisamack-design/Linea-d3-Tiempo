// stat = the big animated number on the left panel. age = his age at that moment.
const EVENTS = [
  { year: "1997", short: "Born", who: 1, emoji: "🏜️", age: 0,
    stat: { value: 1997, label: "The year he was born in Los Alamos, New Mexico" },
    title: "Born in Los Alamos, New Mexico",
    body: "Alexandr was born in January 1997 to Chinese immigrant parents who worked as physicists at Los Alamos National Laboratory.",
    fact: "He grew up in the same town where the first atomic bomb was designed." },
  { year: "2012–2014", short: "Prodigy", who: 1, emoji: "🧮", age: 17,
    stat: { value: 3, label: "Elite programs: USACO, Math Olympiad and the US Physics Team" },
    title: "A math and physics prodigy",
    body: "He was a USACO computing finalist in 2012 and 2013, joined the Math Olympiad Program in 2013, and made the US Physics Team in 2014.",
    fact: "He did all of this while still a student at Los Alamos High School." },
  { year: "Before 2016", short: "Silicon Valley", who: 1, emoji: "🎓", age: 18,
    stat: { value: 4, label: "Stops before founding a company: Quora, Addepar, Hudson River Trading and MIT" },
    title: "Early jobs and MIT",
    body: "As a teenager he worked as a programmer at Quora, then moved to Silicon Valley as an engineer at Addepar. He also did an internship at Hudson River Trading and briefly studied at MIT.",
    fact: "He chose to leave MIT to start a company." },
  { year: "2016", short: "Scale AI", who: 2, emoji: "🚀", age: 19,
    stat: { value: 19, label: "His age when he co-founded Scale AI", suffix: " yrs" },
    title: "Co-founds Scale AI",
    body: "Alexandr dropped out of MIT and co-founded Scale AI with Lucy Guo. The company labels data and evaluates models so AI systems can learn.",
    fact: "He was only 19 years old." },
  { year: "2018", short: "30 Under 30", who: 2, emoji: "🏆", age: 21,
    stat: { value: 2, label: "Forbes 30 Under 30 lists: 2018 and 2021" },
    title: "Forbes 30 Under 30",
    body: "Forbes named him to its 30 Under 30 list in Enterprise Technology. He made the list again in 2021.",
    fact: "Scale AI started winning big customers, including US defense projects." },
  { year: "2021", short: "Billionaire", who: 2, emoji: "💰", age: 24,
    stat: { value: 7.3, decimals: 1, prefix: "$", suffix: "B", label: "Scale AI's valuation, making him the youngest self-made billionaire" },
    title: "The youngest self-made billionaire",
    body: "Scale AI reached a valuation of $7.3 billion, and Alexandr, who owned about 15% of it, became the world's youngest self-made billionaire.",
    fact: "He was 24 years old." },
  { year: "2023", short: "Washington", who: 3, emoji: "🏛️", age: 26,
    stat: { value: 2, label: "New roles: Expedia Group board and a House Armed Services hearing" },
    title: "Talking AI policy with the government",
    body: "He joined the board of Expedia Group and testified before a House Armed Services subcommittee about how the US government can adopt AI.",
    fact: "Scale AI also helped the Pentagon test large language models." },
  { year: "Jan 2025", short: "AI race", who: 3, emoji: "🌍", age: 28,
    stat: { value: 4, label: "Leaders he met: Starmer, Modi, Macron and Speaker Johnson" },
    title: "\"America must win the AI war\"",
    body: "He wrote to President Trump, spoke at the World Economic Forum about the AI race with China, and met leaders such as Keir Starmer, Narendra Modi and Emmanuel Macron.",
    fact: "He became one of the most visible voices on AI and national security." },
  { year: "Jun 2025", short: "Meta deal", who: 3, emoji: "🤝", age: 28,
    stat: { value: 14.3, decimals: 1, prefix: "$", suffix: "B", label: "Meta's investment for 49% of Scale AI" },
    title: "Meta invests $14.3 billion in Scale AI",
    body: "Meta bought 49% of Scale AI. Alexandr stepped down as CEO, joined Meta as Chief AI Officer, and began leading Meta Superintelligence Labs.",
    fact: "He was 28 years old." },
  { year: "2026", short: "Muse Spark", who: 3, emoji: "🧠", age: 29,
    stat: { value: 29, label: "His age today, leading Meta Superintelligence Labs", suffix: " yrs" },
    title: "The first model: Muse Spark",
    body: "In April 2026 Meta released Muse Spark, the first AI model built since his arrival. A new version followed in July.",
    fact: "Today he is 29 and still leads Meta's push toward superintelligence." }
];

const MAX_AGE = 29;
const SPEAKERS = { 1: "Álvaro · The Prodigy", 2: "Jeffrey · The Founder", 3: "Nathan · The AI Leader" };
const COLORS = { 1: "var(--s1)", 2: "var(--s2)", 3: "var(--s3)" };

const svg = document.getElementById("curve");
const nodesBox = document.getElementById("nodes");
const n = EVENTS.length;
let current = 0;

// Position of each point on the growth curve (viewBox is 1000 x 260).
const pts = EVENTS.map((_, i) => {
  const t = i / (n - 1);
  return { x: 60 + t * 880, y: 225 - 190 * Math.pow(t, 1.6) };
});

const NS = "http://www.w3.org/2000/svg";
const segments = [];
for (let i = 0; i < n - 1; i++) {
  const a = pts[i], b = pts[i + 1], mx = (a.x + b.x) / 2;
  const d = `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  const base = document.createElementNS(NS, "path");
  base.setAttribute("d", d); base.setAttribute("class", "base");
  const live = document.createElementNS(NS, "path");
  live.setAttribute("d", d); live.setAttribute("class", "live");
  svg.append(base, live);
  segments.push(live);
}
requestAnimationFrame(() => segments.forEach(s => {
  const L = s.getTotalLength();
  s.style.strokeDasharray = L;
  s.style.strokeDashoffset = L;
  s._len = L;
}));

const nodes = EVENTS.map((e, i) => {
  const b = document.createElement("button");
  b.className = "node";
  b.style.left = (pts[i].x / 10) + "%";
  b.style.top = (pts[i].y / 260 * 100) + "%";
  b.style.background = COLORS[e.who];
  b.style.color = COLORS[e.who];
  b.setAttribute("aria-label", `${e.year}: ${e.title}`);
  b.innerHTML = `<span>${e.short}</span>`;
  b.addEventListener("click", () => show(i));
  nodesBox.appendChild(b);
  return b;
});

// Counts the big number up from 0 to its value.
let countFrame;
function countUp(el, s) {
  cancelAnimationFrame(countFrame);
  const dec = s.decimals || 0, pre = s.prefix || "", suf = s.suffix || "";
  const fmt = v => pre + (dec ? v.toFixed(dec) : Math.round(v)) + suf;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = fmt(s.value); return; }
  const start = performance.now(), dur = 900;
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = fmt(s.value * (1 - Math.pow(1 - p, 3)));
    if (p < 1) countFrame = requestAnimationFrame(tick);
  };
  countFrame = requestAnimationFrame(tick);
}

const $ = id => document.getElementById(id);
function show(i) {
  current = (i + n) % n;
  const e = EVENTS[current];
  nodes.forEach((b, k) => b.classList.toggle("active", k === current));
  segments.forEach((s, k) => { if (s._len) s.style.strokeDashoffset = k < current ? 0 : s._len; });

  const text = document.querySelector(".text");
  text.classList.remove("swap"); void text.offsetWidth; text.classList.add("swap");

  const who = $("who");
  who.textContent = SPEAKERS[e.who]; who.style.background = COLORS[e.who];
  $("year").textContent = e.year;
  $("title").textContent = e.title;
  $("body").textContent = e.body;
  $("fact").textContent = e.fact; $("fact").style.color = COLORS[e.who];
  $("count").textContent = `${current + 1} / ${n}`;

  // Left panel: color, emoji, animated number, label and age bar.
  $("stat").style.setProperty("--c", COLORS[e.who]);
  $("emoji").textContent = e.emoji;
  $("label").textContent = e.stat.label;
  countUp($("big"), e.stat);
  $("ageTxt").textContent = e.age === 0 ? "Age 0 · the beginning" : `Age ${e.age}`;
  $("ageFill").style.width = "0";
  requestAnimationFrame(() => requestAnimationFrame(() => { $("ageFill").style.width = (e.age / MAX_AGE * 100) + "%"; }));
}

$("prev").onclick = () => show(current - 1);
$("next").onclick = () => show(current + 1);
document.addEventListener("keydown", ev => {
  if (ev.key === "ArrowRight") show(current + 1);
  if (ev.key === "ArrowLeft") show(current - 1);
});
show(0);