# Dr. Ayesha Karim Cardiology Website

React single-page website built with Vite.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The heart animation keeps its original frames in `public/f/` and includes sharpened 3840x2160 WebP variants in `public/f-4k/`. High-resolution variants are loaded only on large or high-DPI screens with a three-frame decode cache; other devices keep using the lightweight originals. The doctor portrait is in `public/assets/`.
