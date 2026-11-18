import Image from "next/image"

export function WorkspaceScene() {
  return <section aria-label="Illustrative workspace" className="border-b border-ion-border bg-white px-6 py-8 md:py-10">
    <figure className="mx-auto max-w-6xl">
      <Image src="/photography/about-office.webp" alt="Illustrative shared workspace with people working at desks" width={1600} height={1066} className="aspect-[4/3] w-full rounded-xl object-cover object-[center_75%] md:aspect-[16/7]" sizes="(min-width: 1200px) 1152px, 100vw" />
      <figcaption className="mt-3 text-xs text-ion-gray">Workspace imagery for illustration.</figcaption>
    </figure>
  </section>
}
