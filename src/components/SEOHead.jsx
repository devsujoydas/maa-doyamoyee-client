import { Helmet } from "react-helmet-async";



const SEOHead = ({ title, description, path = "" }) => {
  const siteUrl = "https://maa-doyamoyee.com";
  const fullTitle = `${title} | Maa Doyamoyee Temple`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={`${siteUrl}${path}`} />
    </Helmet>
  );
};

export default SEOHead;
