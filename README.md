# @bsent

A streetwear online store website, built from the **ABSENT** Figma design.

![ABSENT homepage](assets/hero.png)

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
