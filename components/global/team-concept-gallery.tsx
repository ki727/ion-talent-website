import Image from "next/image"

/** Classic individual portrait studies, clearly separate from actual staff profiles. */
export function TeamConceptGallery() {
  return <section id="team-concepts" aria-labelledby="team-concepts-heading" className="border-y border-ion-border bg-[#f7f7f5] px-6 py-10 md:py-14">
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center"><h2 id="team-concepts-heading" className="font-display text-2xl font-bold text-ion-navy md:text-3xl">Individual portrait concepts</h2><p className="mt-3 text-xs leading-relaxed text-ion-gray">AI-generated fictional characters for design review, not ION employees.</p></div>
      <div className="mx-auto grid max-w-2xl gap-9 sm:grid-cols-2 sm:gap-12">
        <figure className="mx-auto w-full max-w-[260px]"><Image src="/photography/team/cofounder-concept.webp" alt="AI-generated fictional co-founder portrait concept" width={640} height={960} className="aspect-[4/5] w-full rounded-lg bg-[#e8e8e4] object-cover object-top" sizes="260px" /><figcaption className="pt-4"><h3 className="text-lg font-semibold text-ion-navy">Co-founder concept</h3><p className="mt-1 text-sm leading-relaxed text-ion-gray">Individual portrait study</p></figcaption></figure>
        <figure className="mx-auto w-full max-w-[260px]"><Image src="/photography/team/anna-wynn-concept.webp" alt="AI-generated fictional Anna Wynn portrait concept" width={640} height={960} className="aspect-[4/5] w-full rounded-lg bg-[#e8e8e4] object-cover object-top" sizes="260px" /><figcaption className="pt-4"><h3 className="text-lg font-semibold text-ion-navy">Anna Wynn</h3><p className="mt-1 text-sm leading-relaxed text-ion-gray">Business-development portrait concept</p></figcaption></figure>
      </div>
    </div>
  </section>
}
