# Carousel Images

Place your 4 carousel images in this folder with the following names:

- `image1.jpg` (or .png, .webp)
- `image2.jpg` (or .png, .webp)
- `image3.jpg` (or .png, .webp)
- `image4.jpg` (or .png, .webp)

## Recommended specifications:
- **Dimensions:** 1200x600 pixels (2:1 aspect ratio)
- **Format:** JPG, PNG, or WebP
- **File size:** Keep under 500KB for optimal loading

## How to add images:

1. Copy your images to this folder: `public/images/carousel/`
2. Rename them to: image1.jpg, image2.jpg, image3.jpg, image4.jpg
3. The carousel will automatically display them

## To use different filenames:

Edit the image paths in: `app/components/ImageCarousel.tsx`

```typescript
const images: CarouselImage[] = [
  {
    url: '/images/carousel/your-custom-name.jpg',
    alt: 'Description of your image',
  },
  // ... more images
];
```
