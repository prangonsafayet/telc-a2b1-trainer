import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GUIDE_HTML } from '@/content.js';

export default function Guide() {
  const { hash } = useLocation();

  /* The guide's table of contents uses in-page #anchors — jump after render,
     and again on a direct visit to /guide#g-lesen. */
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <article
      className="prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-base"
      dangerouslySetInnerHTML={{ __html: GUIDE_HTML }}
    />
  );
}
