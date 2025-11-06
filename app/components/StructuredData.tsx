export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://andeanskiguides.com/#organization",
        name: "Andean Ski Guides",
        url: "https://andeanskiguides.com",
        logo: {
          "@type": "ImageObject",
          url: "https://andeanskiguides.com/logo2.png",
          width: 250,
          height: 60,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+43670550353",
          contactType: "customer service",
          email: "andeanskiguides@gmail.com",
          areaServed: "AR",
          availableLanguage: ["English", "Spanish", "German"],
        },
        sameAs: ["https://www.instagram.com/andeanskiguides"],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://andeanskiguides.com/#localbusiness",
        name: "Andean Ski Guides",
        image: "https://andeanskiguides.com/images/carousel/image1.jpg",
        description:
          "Professional ski guides offering world-class skiing and ski touring experiences in the Andes Mountains, including Las Leñas, Paso Pehuenche, and Andean Corridor near Aconcagua.",
        url: "https://andeanskiguides.com",
        telephone: "+43670550353",
        email: "andeanskiguides@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mendoza",
          addressCountry: "AR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -35.2765,
          longitude: -70.0199,
        },
        priceRange: "$$",
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: -35.2765,
            longitude: -70.0199,
          },
          geoRadius: "200000", // 200km radius
        },
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://andeanskiguides.com/#service",
        name: "Andes Ski Touring & Backcountry Skiing",
        description:
          "Professional guided ski touring and backcountry skiing in the Andes Mountains, featuring Las Leñas ski resort, Paso Pehuenche backcountry, and the Andean Corridor near Aconcagua.",
        image: [
          "https://andeanskiguides.com/images/carousel/image1.jpg",
          "https://andeanskiguides.com/images/carousel/image2.jpg",
          "https://andeanskiguides.com/images/carousel/image3.jpg",
        ],
        url: "https://andeanskiguides.com",
        provider: {
          "@id": "https://andeanskiguides.com/#organization",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://andeanskiguides.com/#website",
        url: "https://andeanskiguides.com",
        name: "Andean Ski Guides",
        description:
          "Experience world-class skiing in the Andes Mountains with expert local guides",
        publisher: {
          "@id": "https://andeanskiguides.com/#organization",
        },
        inLanguage: ["en", "es", "de"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
