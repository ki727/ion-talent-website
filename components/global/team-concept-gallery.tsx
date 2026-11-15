import Image from "next/image"

/** Small illustrative profile concepts, separate from actual staff identities. */
export function TeamConceptGallery() {
  return <section id="team-concepts" aria-labelledby="team-concepts-heading" className="border-y border-ion-border bg-white px-6 py-7 md:py-9">
    <div className="mx-auto max-w-4xl">
      <h2 id="team-concepts-heading" className="text-lg font-semibold text-ion-navy">Profile concepts</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-2 sm:gap-10">
        <figure className="flex items-center gap-4">
          <Image src="/photography/team/cofounder-concept.webp" alt="Fictional AI-generated co-founder portrait" width={88} height={88} className="h-[88px] w-[88px] shrink-0 rounded-md object-cover object-[center_30%] saturate-[0.8]" sizes="88px" />
          <figcaption><h3 className="text-base font-semibold text-ion-navy">Co-founder concept</h3><p className="mt-1 text-xs leading-relaxed text-ion-gray">Individual portrait study</p></figcaption>
        </figure>
        <figure className="flex items-center gap-4">
          <Image src="/photography/team/anna-wynn-concept.webp" alt="Fictional AI-generated Anna Wynn portrait" width={88} height={88} className="h-[88px] w-[88px] shrink-0 rounded-md object-cover object-[center_30%] saturate-[0.8]" sizes="88px" />
          <figcaption><h3 className="text-base font-semibold text-ion-navy">Anna Wynn</h3><p className="mt-1 text-xs leading-relaxed text-ion-gray">Business-development concept</p></figcaption>
        </figure>
      </div>
      <p className="mt-5 text-xs text-ion-gray">AI-generated fictional profiles for the preview.</p>
    </div>
  </section>
}
