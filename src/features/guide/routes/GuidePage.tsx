import { GUIDE_HTML } from '@content/guide.ts';

import { useHashScroll } from '../hooks/useHashScroll.ts';

/** The exam guide is authored HTML in content/guide.ts and injected into a prose container. */
const GuidePage = () => {
  useHashScroll();

  return (
    <article
      className="prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-base"
      dangerouslySetInnerHTML={{ __html: GUIDE_HTML }}
    />
  );
};

export default GuidePage;
