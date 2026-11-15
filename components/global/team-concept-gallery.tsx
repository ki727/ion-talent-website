import Image from "next/image"

/** Preview design imagery; fictional characters are never represented as real employees. */
export function TeamConceptGallery() {
  return <section id="team-concepts" aria-labelledby="team-concepts-heading" className="border-y border-ion-border bg-[#f5f6f8] px-6 py-12 md:py-16">
    <div className="mx-auto max-w-6xl">
      <div className="mb-7"><p className="ion-editorial-number mb-3">ION TALENT · VISUAL CONCEPTS</p><h2 id="team-concepts-heading" className="font-display text-3xl font-bold text-ion-navy md:text-4xl">People &amp; perspective.</h2><p className="mt-3 max-w-2xl leading-relaxed text-ion-gray">AI-generated imagery for the website preview. The two fictional characters below are design concepts, not ION employees.</p></div>
      <figure className="overflow-hidden rounded-2xl border border-ion-border bg-white shadow-sm">
        <Image src="/photography/team/team-concept.webp" alt="AI-generated team concept featuring Khaled in a pink shirt with two fictional characters in an office" width={1400} height={934} className="h-auto w-full" sizes="(min-width: 1200px) 1152px, 100vw" />
        <figcaption className="px-5 py-4 text-xs leading-relaxed text-ion-gray">Team concept featuring Khaled’s likeness and two fictional characters. AI-generated illustrative imagery.</figcaption>
      </figure>
      <div className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl border border-ion-border bg-white shadow-sm"><Image src="/photography/team/cofounder-concept.webp" alt="AI-generated fictional co-founder character with salt-and-pepper hair and a navy blazer" width={640} height={960} className="h-auto w-full" sizes="(min-width: 768px) 432px, 100vw" /><figcaption className="p-5"><h3 className="font-display text-xl font-bold text-ion-navy">Co-founder character</h3><p className="mt-2 text-sm leading-relaxed text-ion-gray">Fictional portrait concept · AI-generated</p></figcaption></figure>
        <figure className="overflow-hidden rounded-2xl border border-ion-border bg-white shadow-sm"><Image src="/photography/team/anna-wynn-concept.webp" alt="AI-generated fictional Anna Wynn character with chestnut hair, a cream blazer and teal blouse" width={640} height={960} className="h-auto w-full" sizes="(min-width: 768px) 432px, 100vw" /><figcaption className="p-5"><h3 className="font-display text-xl font-bold text-ion-navy">Anna Wynn</h3><p className="mt-2 text-sm leading-relaxed text-ion-gray">Fictional business-development character · AI-generated</p></figcaption></figure>
      </div>
    </div>
  </section>
}
