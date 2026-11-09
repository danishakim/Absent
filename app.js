// ABSENT storefront — single-page app using hash routes.
// Product names/prices marked "placeholder" were not in the Figma design: edit them here.

const PRODUCTS = [
  { id: "lace-bleach-denim-jacket", name: "Lace Bleach Denim Jacket", price: 499, img: "jacket", cats: ["tops", "new"] },
  { id: "holy-grail-funnel-fleece", name: "Holy Grail Funnel Fleece White", price: 799, img: "fleece", alt: ["fleece-black"], cats: ["tops", "new"],
    bullets: ["HOLY SHIT", "I'M STILL ADDICTED", "TO BUYING SHIT I DON'T NEED", "OFF THE INTERNET"] },
  { id: "football-jersey", name: "Football Jersey", price: 259, img: "jersey", cats: ["tees", "new"] },          // placeholder
  { id: "falasonic-skateboard", name: "Falasonic Skateboard", price: 349, img: "skateboard", cats: ["accessories", "new"] }, // placeholder
  { id: "denim-jeans", name: "Denim Jeans", price: 459, img: "jeans", cats: ["bottoms", "new"] },             // placeholder
  { id: "air-max-silver", name: "Silver Runner Sneaker", price: 699, img: "shoe", cats: ["accessories", "new"] }, // placeholder
  { id: "reversible-jacket", name: "Reversible Hooded Jacket", price: 649, img: "reversible-jacket", cats: ["tops"] }, // placeholder
  { id: "puffer", name: "Navy Puffer Jacket", price: 899, img: "puffer", cats: ["tops"] },                    // placeholder
  { id: "bomber", name: "Quilted Bomber", price: 599, img: "bomber", cats: ["tops"] },                         // placeholder
  { id: "cap", name: "Navy 6-Panel Cap", price: 159, img: "cap-image", cats: ["accessories"] },               // placeholder
  { id: "leopard-jacket", name: "Leopard Sherpa Jacket", price: 749, img: "item-02", cats: ["tops"] },         // placeholder
  { id: "track-jacket-print", name: "Printed Track Jacket", price: 459, img: "item-03", cats: ["tops"] },       // placeholder
  { id: "falasonic-crewneck", name: "Falasonic Crewneck", price: 359, img: "item-04", cats: ["tops"] },        // placeholder
  { id: "track-jacket-white", name: "White Track Jacket", price: 459, img: "item-05", cats: ["tops"] },        // placeholder
  { id: "denim-shirt", name: "Denim Work Shirt", price: 399, img: "item-06", cats: ["shirts"] },               // placeholder
  { id: "plaid-shirt", name: "Patchwork Plaid Shirt", price: 399, img: "item-07", cats: ["shirts"] },          // placeholder
  { id: "camo-pants", name: "Camo Cargo Pants", price: 429, img: "item-08", cats: ["bottoms"] },               // placeholder
  { id: "green-pants", name: "Green Corduroy Pants", price: 389, img: "item-09", cats: ["bottoms"] },          // placeholder
  { id: "hoodie", name: "Two-Tone Hoodie", price: 459, img: "item-10", cats: ["tops"] },                       // placeholder
  { id: "patchwork-puffer", name: "Patchwork Puffer", price: 999, img: "item-11", cats: ["tops"] },            // placeholder
  { id: "balaclava", name: "Knit Balaclava", price: 129, img: "item-12", cats: ["accessories"] },              // placeholder
  { id: "boots", name: "Leather Derby Boots", price: 799, img: "item-13", cats: ["accessories"] },             // placeholder
];

const CATEGORIES = {
  all: "All", new: "New", tees: "Tees", shirts: "Shirts", tops: "Tops",
  bottoms: "Bottoms", accessories: "Accessories", undergarments: "Undergarments",
};
const SIZES = ["SMALL", "MEDIUM", "LARGE", "X-LARGE"];
const PAGE_SIZE = 12;

const PAGES = {
  returns: "Return & Refund Policy",
  shipping: "Shipping & Delivery",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
};

const app = document.getElementById("app");
const rm = (n) => "RM" + n.toLocaleString("en-MY", { minimumFractionDigits: 2 });
const img = (name) => `assets/${name}.png`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Cart (saved in this browser) ---------- */
function loadCart() {
  try { return JSON.parse(localStorage.getItem("absent-cart")) || []; } catch { return []; }
}
let cart = loadCart();
function saveCart() {
  try { localStorage.setItem("absent-cart", JSON.stringify(cart)); } catch {}
  document.getElementById("cartCount").textContent = cart.length;
}
function addToCart(id, size) {
  // "Limited to 1 per size / item" (from the Cart design)
  if (cart.some((c) => c.id === id && c.size === size)) return toast("Limited to 1 per size / item");
  cart.push({ id, size });
  saveCart();
  toast("Added to cart");
}
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

/* ---------- Views ---------- */
const card = (p) => `
  <a class="card" href="#/product/${p.id}">
    <div class="thumb"><img src="${img(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
    <p class="name">${esc(p.name)}</p>
    <p class="price">${rm(p.price)}</p>
  </a>`;

function viewHome() {
  return `
    <section class="hero"><img src="${img("hero")}" alt="@bsent"></section>
    <section class="grid">${PRODUCTS.slice(0, 10).map(card).join("")}</section>
    <div class="center"><a class="btn btn-red" href="#/shop/all">View All</a></div>`;
}

function viewShop(cat = "all", page = 1, sort = "") {
  if (!CATEGORIES[cat]) cat = "all";
  let list = cat === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.cats.includes(cat));
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  page = Math.min(Math.max(1, page), pages);
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const options = Object.entries(CATEGORIES)
    .map(([k, v]) => `<option value="${k}" ${k === cat ? "selected" : ""}>${v}</option>`).join("");
  return `
    <h1 class="cat-title">${CATEGORIES[cat]}</h1>
    <div class="toolbar">
      <label>Filter <select id="filterSel" aria-label="Filter">${options}</select></label>
      <label>Sort <select id="sortSel" aria-label="Sort">
        <option value="">Featured</option>
        <option value="low" ${sort === "low" ? "selected" : ""}>Price: low → high</option>
        <option value="high" ${sort === "high" ? "selected" : ""}>Price: high → low</option>
      </select></label>
    </div>
    ${shown.length ? `<section class="grid">${shown.map(card).join("")}</section>`
                   : `<p class="empty">Nothing here yet — check back soon.</p>`}
    ${pages > 1 ? `<nav class="pager">${Array.from({ length: pages }, (_, i) =>
        `<button data-page="${i + 1}" class="${i + 1 === page ? "active" : ""}">${i + 1}</button>`).join("")}</nav>` : ""}`;
}

function viewProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return `<p class="empty">Product not found. <a class="u" href="#/shop/all">Back to shop</a></p>`;
  const imgs = [p.img, ...(p.alt || [])];
  return `
    <article class="product" data-id="${p.id}">
      <div>
        <div class="gallery-main">
          <img id="mainImg" src="${img(imgs[0])}" alt="${esc(p.name)}">
          ${imgs.length > 1 ? `<button class="nav prev" aria-label="Previous image">‹</button>
                               <button class="nav next" aria-label="Next image">›</button>` : ""}
        </div>
        ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((m, i) =>
          `<button data-i="${i}" class="${i ? "" : "active"}"><img src="${img(m)}" alt=""></button>`).join("")}</div>` : ""}
      </div>
      <div>
        <h1>${esc(p.name.toUpperCase())}</h1>
        <p class="price">${rm(p.price).replace(".00", "")}</p>
        <div class="buy-row">
          <select id="sizeSel" aria-label="Size">${SIZES.map((s) => `<option>${s}</option>`).join("")}</select>
          <button class="btn" id="addBtn">ADD TO CART</button>
        </div>
        ${p.bullets ? `<ul class="bullets">${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : `<div style="height:24px"></div>`}
        <div class="links">
          <a href="#/page/technical">TECHNICAL DETAILS</a>
          <a href="#/page/sizechart">SIZE CHART</a>
        </div>
      </div>
    </article>`;
}

function viewCart() {
  if (!cart.length) {
    return `<p class="empty">Your cart is empty.<br><br><a class="btn" href="#/shop/all">SHOP NOW</a></p>`;
  }
  const items = cart.map((c, i) => {
    const p = PRODUCTS.find((x) => x.id === c.id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <a href="#/product/${p.id}"><img src="${img(p.img)}" alt="${esc(p.name)}"></a>
        <div>
          <h3>${esc(p.name)}</h3>
          <p>${c.size}</p>
          <p>${rm(p.price)}</p>
          <button class="remove" data-i="${i}">REMOVE</button>
        </div>
        <p>${rm(p.price)}</p>
      </div>`;
  }).join("");
  return `
    ${items}
    <div class="cart-summary">
      <p>SUBTOTAL ${rm(subtotal())}</p>
      <label><input type="checkbox" id="agree"> I AGREE TO THE <a class="u" href="#/page/terms">TERMS AND CONDITIONS</a></label>
      <div><button class="btn" id="checkoutBtn" disabled>CHECKOUT</button></div>
      <p class="note">LIMITED TO 1 PER SIZE / ITEM<br>*SOME EXCEPTIONS APPLY</p>
    </div>`;
}
const subtotal = () => cart.reduce((s, c) => s + (PRODUCTS.find((p) => p.id === c.id)?.price || 0), 0);

function viewCheckout() {
  if (!cart.length) return viewCart();
  return `
    <form class="form" id="checkoutForm">
      <h1>CHECKOUT</h1>
      <label>EMAIL<input type="email" required autocomplete="email"></label>
      <div class="row2">
        <label>FIRST NAME<input required autocomplete="given-name"></label>
        <label>LAST NAME<input required autocomplete="family-name"></label>
      </div>
      <label>ADDRESS<input required autocomplete="street-address"></label>
      <div class="row2">
        <label>CITY<input required autocomplete="address-level2"></label>
        <label>POSTCODE<input required autocomplete="postal-code" inputmode="numeric"></label>
      </div>
      <label>PHONE<input type="tel" required autocomplete="tel"></label>
      <p><strong>TOTAL ${rm(subtotal())}</strong></p>
      <button class="btn" type="submit">PLACE ORDER</button>
      <p class="note" style="color:#888;font-size:12px">Demo checkout — no payment is taken.</p>
    </form>`;
}

function viewContact() {
  return `
    <form class="form" id="contactForm">
      <h1>CONTACT US</h1>
      <label>NAME<input required autocomplete="name"></label>
      <label>EMAIL<input type="email" required autocomplete="email"></label>
      <label>ORDER NUMBER (OPTIONAL)<input></label>
      <label>MESSAGE<textarea required></textarea></label>
      <button class="btn" type="submit">SEND</button>
    </form>`;
}

function viewPage(key) {
  const title = PAGES[key] || (key === "sizechart" ? "Size Chart" : key === "technical" ? "Technical Details" : "Page");
  return `<article class="text-page"><h1>${esc(title.toUpperCase())}</h1>
    <p>Content coming soon.</p></article>`;
}

const done = (title, msg) => `<div class="done"><h1>${title}</h1><p>${msg}</p><br><a class="btn" href="#/shop/all">CONTINUE SHOPPING</a></div>`;

/* ---------- Router ---------- */
function render() {
  const [, route = "", a, b] = location.hash.split("/");
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  let html;
  switch (route.split("?")[0]) {
    case "shop": html = viewShop((a || "all").split("?")[0], +params.get("p") || 1, params.get("sort") || ""); break;
    case "product": html = viewProduct(a); break;
    case "cart": html = viewCart(); break;
    case "checkout": html = viewCheckout(); break;
    case "contact": html = viewContact(); break;
    case "page": html = viewPage(a); break;
    default: html = viewHome();
  }
  app.innerHTML = html;
  closeMenu();
  window.scrollTo(0, 0);
  bind();
}

function bind() {
  // Shop filter / sort / pager
  const shopHash = (cat, p, sort) => `#/shop/${cat}?p=${p}${sort ? `&sort=${sort}` : ""}`;
  const curCat = () => (location.hash.split("/")[2] || "all").split("?")[0];
  const curSort = () => new URLSearchParams(location.hash.split("?")[1] || "").get("sort") || "";
  app.querySelector("#filterSel")?.addEventListener("change", (e) => (location.hash = shopHash(e.target.value, 1, curSort())));
  app.querySelector("#sortSel")?.addEventListener("change", (e) => (location.hash = shopHash(curCat(), 1, e.target.value)));
  app.querySelectorAll(".pager button").forEach((btn) =>
    btn.addEventListener("click", () => (location.hash = shopHash(curCat(), btn.dataset.page, curSort()))));

  // Product gallery + add to cart
  const prod = app.querySelector(".product");
  if (prod) {
    const p = PRODUCTS.find((x) => x.id === prod.dataset.id);
    const imgs = [p.img, ...(p.alt || [])];
    let i = 0;
    const show = (n) => {
      i = (n + imgs.length) % imgs.length;
      app.querySelector("#mainImg").src = img(imgs[i]);
      app.querySelectorAll(".thumbs button").forEach((t, k) => t.classList.toggle("active", k === i));
    };
    app.querySelector(".prev")?.addEventListener("click", () => show(i - 1));
    app.querySelector(".next")?.addEventListener("click", () => show(i + 1));
    app.querySelectorAll(".thumbs button").forEach((t) => t.addEventListener("click", () => show(+t.dataset.i)));
    app.querySelector("#addBtn").addEventListener("click", () => addToCart(p.id, app.querySelector("#sizeSel").value));
  }

  // Cart
  app.querySelectorAll(".remove").forEach((btn) => btn.addEventListener("click", () => {
    cart.splice(+btn.dataset.i, 1); saveCart(); render();
  }));
  const agree = app.querySelector("#agree");
  const checkoutBtn = app.querySelector("#checkoutBtn");
  agree?.addEventListener("change", () => (checkoutBtn.disabled = !agree.checked));
  checkoutBtn?.addEventListener("click", () => (location.hash = "#/checkout"));

  // Forms
  app.querySelector("#checkoutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    cart = []; saveCart();
    app.innerHTML = done("THANK YOU", "Your order has been placed.");
  });
  app.querySelector("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    app.innerHTML = done("MESSAGE SENT", "We'll get back to you soon.");
  });
}

/* ---------- Menu ---------- */
const menu = document.getElementById("menu");
function openMenu() { menu.hidden = false; document.body.style.overflow = "hidden"; }
function closeMenu() { menu.hidden = true; document.body.style.overflow = ""; }
document.getElementById("menuOpen").addEventListener("click", openMenu);
document.getElementById("menuClose").addEventListener("click", closeMenu);
menu.addEventListener("click", (e) => { if (e.target === menu || e.target.closest("a")) closeMenu(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

document.getElementById("year").textContent = new Date().getFullYear();
window.addEventListener("hashchange", render);
saveCart();
render();
