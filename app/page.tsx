import { Hero } from "@/components/hero"
import { Publishers } from "@/components/publishers"
import { Cultures } from "@/components/cultures"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Publishers />
      <Cultures />
      <Footer />
    </main>
  )
}
