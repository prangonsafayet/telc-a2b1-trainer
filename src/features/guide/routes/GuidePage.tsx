import { A2B1_GUIDE } from '@content/trainers/a2b1/guide.ts';

import { useHashScroll } from '../hooks/useHashScroll.ts';

/** The exam guide is authored HTML in the trainer's content and injected into a prose container. */
const GuidePage = () => {
  useHashScroll();

  return (
    <article
      className="prose prose-stone max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-base"
      dangerouslySetInnerHTML={{ __html: A2B1_GUIDE }}
    />
  );
};

export default GuidePage;
