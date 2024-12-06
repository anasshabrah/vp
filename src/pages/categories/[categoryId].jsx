// pages/categories/[categoryId].jsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import Portfolios from '../../components/Portfolios';
import categoriesData from '../../data/categories.json';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (categoryId) {
      const foundCategory = categoriesData.find(c => c.id === categoryId);
      setCategory(foundCategory);
    }
  }, [categoryId]);

  if (!category) {
    return <div>Loading...</div>;
  }

  // Construct the canonical URL dynamically
  const canonicalUrl = `https://www.virixpro.com/categories/${category.id}`;

  return (
    <div className="rokstar">
      {/* SEO Meta Tags */}
      <Head>
        {/* Primary Meta Tags */}
        <title>{`${category.name} | VirixPro`}</title>
        <meta name="description" content={category.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${category.name} | VirixPro`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:image" content={`/images/portfolio/${category.image}`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="VirixPro" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.name} | VirixPro`} />
        <meta name="twitter:description" content={category.description} />
        <meta name="twitter:image" content={`/images/portfolio/${category.image}`} />
        <meta name="twitter:site" content="@VirixPro" />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Product",
            "name": category.name,
            "description": category.description,
            "image": [`https://www.virixpro.com/images/portfolio/${category.image}`],
            "url": canonicalUrl,
            "brand": {
              "@type": "Brand",
              "name": "VirixPro",
              "logo": "https://www.virixpro.com/images/logo-dark.png",
              "url": "https://www.virixpro.com"
            },
            "offers": {
              "@type": "Offer",
              "url": canonicalUrl,
              "priceCurrency": "USD",
              "availability": "http://schema.org/InStock",
              "itemCondition": "http://schema.org/NewCondition"
            }
          })}
        </script>
      </Head>

      {/* Page Content */}
      <Header />
      <section className="pt-28 pb-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold my-6 py-3">{category.name}</h1>
          <p className="text-lg my-6 py-3">{category.description}</p>
        </div>
      </section>
      <Portfolios categoryId={categoryId} />
      <Contact />
      <Footer />
    </div>
  );
};

export default CategoryPage;
