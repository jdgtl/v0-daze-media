"use client"

import { useEffect } from "react"

const THEME_MAP: Record<
  string,
  {
    background: string
    text: string
    buttonBg: string
    buttonText: string
  }
> = {
  teal: {
    background: "--teal-background",
    text: "--teal-text",
    buttonBg: "--teal-button-bg",
    buttonText: "--teal-button-text",
  },
  cream: {
    background: "--cream-background",
    text: "--cream-text",
    buttonBg: "--cream-button-bg",
    buttonText: "--cream-button-text",
  },
}

type Props = {
  percentFromTop?: number
  minWidth?: number
  durationMs?: number
  easing?: string
}

function setRootTheme(themeId: string) {
  const vars = THEME_MAP[themeId]
  if (!vars) return
  const root = document.documentElement
  root.style.setProperty("--color-background", `var(${vars.background})`)
  root.style.setProperty("--color-text", `var(${vars.text})`)
  root.style.setProperty("--color-button-bg", `var(${vars.buttonBg})`)
  root.style.setProperty("--color-button-text", `var(${vars.buttonText})`)
}

function setElementTheme(el: HTMLElement, themeId: string) {
  const vars = THEME_MAP[themeId]
  if (!vars) return
  el.style.setProperty("--color-background", `var(${vars.background})`)
  el.style.setProperty("--color-text", `var(${vars.text})`)
  el.style.setProperty("--color-button-bg", `var(${vars.buttonBg})`)
  el.style.setProperty("--color-button-text", `var(${vars.buttonText})`)
}

export default function ThemeOnScroll({ percentFromTop = 50, minWidth = 0, durationMs, easing }: Props) {
  useEffect(() => {
    const root = document.documentElement

    if (durationMs != null) {
      root.style.setProperty("--theme-transition-duration", `${durationMs}ms`)
    }
    if (easing) {
      root.style.setProperty("--theme-transition-ease", easing)
    }

    const mql = minWidth > 0 ? window.matchMedia(`(min-width: ${minWidth}px)`) : null
    let enabled = mql ? mql.matches : true

    const wireElementThemes = () => {
      const elements = document.querySelectorAll<HTMLElement>("[element-theme]")
      elements.forEach((el) => {
        const themeId = el.getAttribute("element-theme")!
        setElementTheme(el, themeId)
      })
    }

    const clearElementThemes = () => {
      document.querySelectorAll<HTMLElement>("[element-theme]").forEach((el) => {
        el.style.removeProperty("--color-background")
        el.style.removeProperty("--color-text")
        el.style.removeProperty("--color-button-bg")
        el.style.removeProperty("--color-button-text")
      })
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[animate-body-to]"))

    const vh = window.innerHeight
    const offset = Math.round((percentFromTop / 100) * vh)
    const rootMargin = `${-offset}px 0px ${offset - vh}px 0px`

    let prevTheme: string | null = null
    let currentTheme: string | null = null

    const observer =
      enabled && sections.length
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const themeId = entry.target.getAttribute("animate-body-to")!
                if (entry.isIntersecting) {
                  prevTheme = currentTheme
                  currentTheme = themeId
                  setRootTheme(themeId)
                } else {
                  if (currentTheme === themeId) {
                    currentTheme = prevTheme
                    if (currentTheme) setRootTheme(currentTheme)
                  }
                }
              }
            },
            { root: null, rootMargin, threshold: 0 },
          )
        : null

    const enable = () => {
      enabled = true
      wireElementThemes()
      sections.forEach((s) => {
        observer?.observe(s)
      })
    }

    const disable = () => {
      enabled = false
      observer?.disconnect()
      clearElementThemes()
      setRootTheme("teal")
    }

    if (enabled) enable()

    const onChange = () => (mql?.matches ? enable() : disable())
    mql?.addEventListener("change", onChange)

    wireElementThemes()

    return () => {
      observer?.disconnect()
      mql?.removeEventListener("change", onChange)
    }
  }, [percentFromTop, minWidth, durationMs, easing])

  return null
}
