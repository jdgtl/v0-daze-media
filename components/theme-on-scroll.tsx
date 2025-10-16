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

export default function ThemeOnScroll({ percentFromTop = 20, minWidth = 0, durationMs, easing }: Props) {
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

    let currentTheme = "teal"
    const fallbackTheme = "teal"

    setRootTheme(fallbackTheme)

    const handleScroll = () => {
      if (!enabled) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      if (scrollPercent >= 20 && currentTheme !== "cream") {
        currentTheme = "cream"
        setRootTheme("cream")
      } else if (scrollPercent < 20 && currentTheme !== "teal") {
        currentTheme = "teal"
        setRootTheme("teal")
      }
    }

    const enable = () => {
      enabled = true
      wireElementThemes()
      window.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll()
    }

    const disable = () => {
      enabled = false
      window.removeEventListener("scroll", handleScroll)
      clearElementThemes()
      setRootTheme("teal")
    }

    if (enabled) enable()

    const onChange = () => (mql?.matches ? enable() : disable())
    mql?.addEventListener("change", onChange)

    wireElementThemes()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      mql?.removeEventListener("change", onChange)
    }
  }, [percentFromTop, minWidth, durationMs, easing])

  return null
}
