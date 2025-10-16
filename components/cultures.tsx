const cultures = [
  { name: "Cycling", description: "Road, gravel, and adventure cycling culture" },
  { name: "Product", description: "Design-forward gear and everyday carry" },
  { name: "Youth", description: "Contemporary art, music, and street culture" },
  { name: "Menswear", description: "Heritage craftsmanship and denim culture" },
  { name: "Golf", description: "Modern golf lifestyle and culture" },
  { name: "Outdoors", description: "Adventure, exploration, and nature" },
  { name: "Watches", description: "Horology and timepiece appreciation" },
]

export function Cultures() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center mb-4">
          The Cultures We Represent
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          {"Each culture is powered by passionate communities and authentic storytelling"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cultures.map((culture, index) => (
            <div
              key={culture.name}
              className="group p-8 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-serif text-xl md:text-2xl font-bold uppercase mb-3 group-hover:text-primary transition-colors">
                {culture.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{culture.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
