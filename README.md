# @bsent

A streetwear online store website, built from the **ABSENT** Figma design.

> **Human Computer Interaction (CRM1953) — PBL Assignment, January 2025**

![ABSENT homepage](assets/hero.png)

## Group members

| No. | Name | Student ID |
|----:|------|-----------|
| 1 | Muhammad Danish Hakim bin Mohd Rizal Suhardi | SWE24070235 |
| 2 | Muhammad Aliff bin Mohammad Shukri | SWE24070626 |
| 3 | Muhammad Adham bin Md Fadzli | SWE24070029 |
| 4 | Muhammad Akmal Safwan bin Badro Hisham | SWE24070328 |

**Reviewer:** Muhammad Najmi Qayyum Mohd Akhir

## How the design meets the assessment criteria

| Criteria | What we did |
|----------|-------------|
| **Usability & User Experience** | Same header on every page (menu, logo, cart count). Categories in the top bar on desktop and in a slide-out menu on mobile. Feedback messages for "Added to cart" and the 1-per-size limit. Checkout stays disabled until the terms box is ticked. |
| **Accessibility** | Alt text on product images, labels on every form field, `aria-label` on icon-only buttons (menu, close, cart, gallery arrows). Black-on-white text for high contrast. Menu closes with the Esc key. |
| **Consistency & Design Principles** | One colour palette (black, white, ABSENT red `#A70000`) and two fonts (Inter, Archivo Narrow) used throughout. Layouts follow the Figma screens. Related controls are grouped together (size picker beside Add to Cart), following the proximity principle and Fitts's Law. |
| **Functionality & Interactivity** | Working category filter, price sort, pagination, image gallery, size picker, cart (saved in the browser), checkout form and contact form. |
| **Performance & Responsiveness** | Responsive grid: 2 columns on phones, 3 on tablets, 4 on desktop. Images load lazily. Tested at 375 px (phone) and 1280 px (desktop). |
| **Innovation & Creativity** | Bold streetwear brand identity (star-and-horse artwork, italic display headings) and an animated slide-out menu. |

## Pages

| Page | What it does |
|------|--------------|
| **Home** | Hero artwork, featured products, "View All" button |
| **Shop** | All products, filter by category, sort by price, pagination |
| **Product** | Image gallery, size picker, add to cart |
| **Cart** | Remove items, subtotal, agree-to-terms checkbox before checkout |
| **Checkout** | Shipping details form (demo — no payment is taken) |
| **Contact Us** | Contact form |
| **Menu** | Slide-out menu with categories and policy links |

Categories: All, New, Tees, Shirts, Tops, Bottoms, Accessories, Undergarments.

The site is responsive and works on phone, tablet and desktop. The cart is saved in the browser (`localStorage`).

## Run it

No build step or install needed. Plain HTML, CSS and JavaScript.

- **Quickest:** double-click `index.html` to open it in your browser.
- **Local server (optional):**
  ```bash
  npx serve .
  # or
  python -m http.server 8000
  ```

## Project structure

```
index.html    page layout, header, menu, footer
styles.css    all styling
app.js        products list, page routing, cart, forms
assets/       logo, hero artwork and product images
ABSENT.md     links to the Figma designs
```

## Editing products

Products live in the `PRODUCTS` list at the top of `app.js`:

```js
{ id: "holy-grail-funnel-fleece", name: "Holy Grail Funnel Fleece White",
  price: 799, img: "fleece", alt: ["fleece-black"], cats: ["tops", "new"] }
```

- `img` / `alt` — image file names in `assets/` (without `.png`)
- `cats` — which categories the product appears in
- Items marked `// placeholder` have temporary names and prices.

## Publish with GitHub Pages

1. Go to **Settings → Pages** in this repository.
2. Under **Source**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Save. The site will be live at `https://danishakim.github.io/Absent/` after a minute.

## Design

- [Figma — Mobile](https://www.figma.com/design/wFy2g00eL0cQGcL0JxaOyh/ABSENT?node-id=0-1)
- [Figma — Desktop](https://www.figma.com/design/wFy2g00eL0cQGcL0JxaOyh/ABSENT?node-id=141-48)

Fonts: [Inter](https://fonts.google.com/specimen/Inter) and [Archivo Narrow](https://fonts.google.com/specimen/Archivo+Narrow).

## To do

- [ ] Real product names and prices for placeholder items
- [ ] Policy page content (Return & Refund, Shipping, Terms, Privacy, Size Chart)
- [ ] Login, Profile, Orders and Settings pages
- [ ] Real payment and contact form backend
- [ ] Compress product images (currently ~23 MB)
