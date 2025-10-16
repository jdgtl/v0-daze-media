import Image from "next/image"

const publishers = [
  {
    name: "The Radavist",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radevist-UdcgCrtzqk81YoBeGgFsMm511PeYaj.png",
    url: "https://theradavist.com",
    culture: "Cycling",
  },
  {
    name: "Gear Patrol",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gearpatrol-4Ywea9ldDCzZ75LmKbS0uiGSMkijnu.png",
    url: "https://gearpatrol.com",
    culture: "Product",
  },
  {
    name: "Monster Children",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/monsterchildren-D5DKK860afcpicfbOooZjh3CbN651x.png",
    url: "https://monsterchildren.com",
    culture: "Youth",
  },
  {
    name: "Heddels",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/heddels-AtKnlMEdKVIvUSzcU46ULyAVvoNpmx.png",
    url: "https://heddels.com",
    culture: "Menswear",
  },
  {
    name: "Fairgame",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fairgame-dJtAMX8fvKBFdQ1EPIhRJ1VXwPQlep.png",
    url: "https://fairgame.com",
    culture: "Golf",
  },
  {
    name: "Worn & Wound",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/worn-wound-EHCft3h1Bq81IHoe8aayCRfjgXOVIk.png",
    url: "https://wornandwound.com",
    culture: "Watches",
  },
]

export function Publishers() {
  return (
    <section className="py-20 md:py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-4 text-secondary-foreground">
          Our Network
        </h2>
        <p className="text-center text-secondary-foreground/80 mb-16 max-w-2xl mx-auto text-lg">
          {"Independent publishers with authentic voices and engaged communities"}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {publishers.map((publisher) => (
            <a
              key={publisher.name}
              href={publisher.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 md:p-8 bg-background/5 hover:bg-background/10 rounded-lg transition-all duration-300 hover:scale-105 !cursor-pointer"
            >
              <div className="relative w-full h-16 md:h-20 mb-4 flex items-center justify-center cursor-pointer">
                <Image
                  src={publisher.logo || "/placeholder.svg"}
                  alt={publisher.name}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xs md:text-sm font-serif uppercase tracking-wide text-secondary-foreground/60 group-hover:text-secondary-foreground transition-colors cursor-pointer">
                {publisher.culture}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
