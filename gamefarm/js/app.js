import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { collection, addDoc, getDocs, getDoc, doc, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged };

export const BREEDS = ["Sweater", "Pumpkin Hatch", "Golden Boy", "Hatch"];
export const CATS = ["Below 6 Months", "Above 6 Months", "Stag", "Pullet"];
export const FARM = { address: "Sabang Road, Concepcion, San Pablo City, Laguna", phone: "09923287825", email: "sabanggamefarm@gmail.com" };

export const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const whenUser = () => new Promise(r => { const un = onAuthStateChanged(auth, u => { un(); r(u); }); });
export async function checkAdmin(u) {
  if (!u) return false;
  try { return (await getDoc(doc(db, "admins", u.uid))).exists(); } catch { return false; }
}
export function toast(m) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
  t.textContent = m; t.style.display = "block"; setTimeout(() => t.style.display = "none", 3000);
}
export function birdCard(b) {
  const img0 = b.image ? `<img src="${b.image}" alt="${esc(b.name)}">` : `<div class="ph">${esc((b.name||"?")[0])}</div>`;
  const img = `<a href="bird.html?bird=${b.id}">${img0}</a>`;
  const ok = (b.status || "Available") === "Available";
  return `<article class="card bird">${img}<div class="pad"><div class="row"><h3><a href="bird.html?bird=${b.id}">${esc(b.name)}</a></h3><span class="tag ${ok ? "ok" : "no"}">${esc(b.status || "Available")}</span></div>
  <p class="mut">Breed: ${esc(b.breed)}<br>Category: ${esc(b.category)}<br>Weight: ${esc(b.weight)} lbs<br>Price: ₱${Number(b.price || 0).toLocaleString()}</p>
  <a class="mut" href="bird.html?bird=${b.id}">View details</a><br>
  ${ok ? `<a class="btn" href="book.html?bird=${b.id}">Reserve &amp; Book Visit</a>` : `<span class="btn dis">Not available</span>`}</div></article>`;
}
export function initNav(active) {
  const n = document.getElementById("nav");
  const bad = firebaseConfig.apiKey.startsWith("PASTE");
  n.innerHTML = `${bad ? `<div class="warn">Firebase is not connected yet. Open js/firebase-config.js and paste your config (see README.md).</div>` : ""}
  <div class="top">Farm visits by appointment · Pay in person at the farm. No online payment.</div>
  <header><div class="bar"><a class="logo" href="index.html"><img src="img/logo.png" alt=""><span class="gold">Sabang’s Gamefarm</span></a>
  <nav><a href="index.html" class="${active === "home" ? "on" : ""}">Home</a><a href="gamecocks.html" class="${active === "birds" ? "on" : ""}">Gamecocks</a><a href="book.html" class="${active === "book" ? "on" : ""}">Book a Visit</a></nav>
  <form class="search" id="sf"><input id="sq" placeholder="Search gamecocks by name or breed…" aria-label="Search gamecocks"><button type="submit">Search</button></form>
  <div id="authbox"></div></div></header>`;
  document.getElementById("sf").addEventListener("submit", e => { e.preventDefault(); location.href = "gamecocks.html?q=" + encodeURIComponent(document.getElementById("sq").value.trim()); });
  onAuthStateChanged(auth, async u => {
    const box = document.getElementById("authbox");
    if (!u) { box.innerHTML = `<a class="btn sm" href="login.html">Login</a>`; return; }
    const admin = await checkAdmin(u);
    const ini = (u.displayName || u.email || "U").slice(0, 2).toUpperCase();
    box.innerHTML = `${admin ? `<a href="admin.html" class="btn sm alt">Admin</a>` : ""}<span class="av" title="${esc(u.email)}">${esc(ini)}</span><button class="btn sm" id="lo">Logout</button>`;
    document.getElementById("lo").onclick = async () => { await signOut(auth); location.href = "index.html"; };
  });
}
export function initFooter() {
  document.getElementById("foot").innerHTML = `<footer><div class="wrap"><b>Sabang’s Gamefarm</b><br>Chicken cock breeding and training · Est. 2026<br>${esc(FARM.address)}<br>${esc(FARM.phone)} · ${esc(FARM.email)}<br>© Sabang’s Gamefarm. All rights reserved.</div></footer>`;
}
