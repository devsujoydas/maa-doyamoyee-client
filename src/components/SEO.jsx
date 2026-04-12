import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Shri Shri Ri Doyamoyee Temple",
  description = "Official website of Shri Shri Ri Doyamoyee Temple organization",
  url = "https://maa-doyamoyee.vercel.app/",
  image = "https://maa-doyamoyee.vercel.app/banner/newbanner1.webp",
  keywords = "maa doyamoyee temple, hindu temple bangladesh, spiritual blog, temple events",
  author = "Maa Doyamoyee Temple",
  type = "website", // website | article
  publishedTime = "", // 🆕 for blogs/events
  updatedTime = "", // 🆕 optional
}) => {
  return (
    <Helmet>
      {/* ================= BASIC SEO ================= */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* 🔥 upgraded robots */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* ================= CANONICAL ================= */}
      <link rel="canonical" href={url} />

      {/* ================= OPEN GRAPH ================= */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Maa Doyamoyee Temple" />
      <meta property="og:locale" content="bn_BD" />

      {/* 🔥 OG image enhancement */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ================= ARTICLE META (BLOG/NEWS) ================= */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {type === "article" && updatedTime && (
        <meta property="article:modified_time" content={updatedTime} />
      )}

      {/* ================= TWITTER ================= */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ================= THEME ================= */}
      <meta name="theme-color" content="#ffffff" />

      {/* ================= STRUCTURED DATA ================= */}
      <script type="application/ld+json">
        {JSON.stringify(
          type === "article"
            ? {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: title,
                description: description,
                image: image,
                url: url,
                author: {
                  "@type": "Organization",
                  name: author,
                },
                publisher: {
                  "@type": "Organization",
                  name: "Maa Doyamoyee Temple",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://maa-doyamoyee.vercel.app/omsymboll.jpg",
                  },
                },
                datePublished: publishedTime,
                dateModified: updatedTime || publishedTime,
              }
            : {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Maa Doyamoyee Temple",
                url: url,
                logo: "https://maa-doyamoyee.vercel.app/omsymboll.jpg",
                description: description,
              },
        )}
      </script>
    </Helmet>
  );
};

export default SEO;
