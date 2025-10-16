"use client"

import { useRef } from "react"
import { Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion"

function AnimatedWord({
  word,
  index,
  scrollYProgress,
}: {
  word: string
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index * 0.04
  const end = start + 0.2
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1])

  const isDazMedia = word === "DAZE-MEDIA"

  return (
    <motion.span
      className="inline-block"
      style={{
        opacity,
        fontFamily: isDazMedia ? "var(--font-porka)" : undefined,
        fontSize: isDazMedia ? "1.15em" : undefined,
        fontWeight: isDazMedia ? "normal" : undefined,
        letterSpacing: isDazMedia ? "-0.025em" : undefined,
      }}
    >
      {word}
    </motion.span>
  )
}

export function Hero() {
  const tagline =
    "DAZE-MEDIA IS A ONE-OF-A-KIND NETWORK OF INDEPENDENT PUBLISHERS, EACH POWERING ITS OWN DISTINCT CULTURE."

  const headingRef = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start center", "end center"],
  })

  const words = tagline.split(" ")

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col items-center justify-start p-8"
        style={{
          color: "var(--color-text)",
        }}
      >
        <div className="w-full" style={{ padding: "2rem" }}>
          <h1
            className="text-[18vw] md:text-[16vw] lg:text-[14vw] font-normal tracking-tight leading-none text-center uppercase"
            style={{
              fontFamily: "var(--font-porka)",
              color: "var(--color-text)",
            }}
          >
            DAZE-MEDIA
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <Button
            size="lg"
            className="font-serif uppercase tracking-wide text-base md:text-lg h-auto border-2 transition-all hover:scale-105 flex flex-col items-center px-8 py-6 gap-px pb-3"
            style={{
              backgroundColor: "var(--color-button-bg)",
              color: "var(--color-button-text)",
              borderColor: "var(--color-button-bg)",
            }}
            asChild
          >
            <a href="/MEDIA KIT2025.pdf" download className="flex flex-col items-center gap-2 cursor-pointer">
              <span className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Media Kit
              </span>
              <span className="text-xs font-serif uppercase tracking-wider opacity-40">2025</span>
            </a>
          </Button>
        </div>

        <div className="pb-8 flex flex-col items-center">
          <ChevronDown className="w-8 h-8 opacity-60 animate-bounce" style={{ color: "var(--color-text)" }} />
          <ChevronDown className="w-8 h-8 opacity-60 animate-bounce -mt-4" style={{ color: "var(--color-text)" }} />
        </div>
      </section>

      <section
        animate-body-to="cream"
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "transparent" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            ref={headingRef}
            className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase text-balance leading-tight"
            style={{ color: "var(--color-text)" }}
          >
            {words.map((word, index) => (
              <span key={index}>
                <AnimatedWord word={word} index={index} scrollYProgress={scrollYProgress} />
                {index < words.length - 1 && " "}
              </span>
            ))}
          </h2>
        </div>
      </section>
    </>
  )
}
