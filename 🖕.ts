// Dunyanin en basit seyi yapamadiniz yiyin
// Goruldugu uzere insan tarafindan en anlasilan ve en esnek dil olan JS nin sadece fonksiyal gucunu degil structered yapisini da bu saheserle goze vurduk
// Ger turlu programlamadan anlariz sadece fonsiyonel deil, sizin gibi kutu kutu tek yonlu obje kutulayan sonra olmadi bu interface dagitan OOP kulturunuze karsiyiz.

// PERSONAL USE ONLY RIGHTS
// 
// License Class: Restrictive · Author Exclusive
// burn
// Author: Iliyan VelinovVersion: 1.0Date: 15 Sep 2026Work
// chrry.ai
// chrry.store
// chrry.social
// chrry.dev
// vex.design
// kamaji.today
// kirpi.dev
// burn.ist
// iliyan.us
// iliyan.nl
//  liyan.uk
// 
// Including all subdomains, all apps, all stores, all gardens, all white-labels, all branded instances, and all future/past additions to the same source code.
// 
// This license governs the use of the work identified above (the "Work"). By using the Work, you accept all terms of this license. If you do not accept these terms, do not use the Work.
// 
// This is the most restrictive class of license. It grants no rights to any party other than the Author. There is no buyer, no licensee, no end user. Personal use is reserved exclusively to the Author.
// 1. Ownership
// 
// All intellectual property rights in the Work are held exclusively by Iliyan Velinov (the "Author"). This license grants only a limited right of use; ownership is not transferred. The Author retains authorship and all moral rights in the Work at all times.
// grape
// 2. Grant of Rights
// 
// The Author grants a limited, personal, non-transferable, and exclusive right of use solely to the following person:
// 
//     Licensee: Iliyan Velinov (the Author only)
// 
// This right is for the Licensee's own personal use only. No other person — natural or legal — is granted any right under this license.
// 3. Prohibitions
// vault
// 
// The following actions are expressly prohibited:
// 
//     Selling, renting, lending, or otherwise transferring the Work.
//     Sharing the Work with, or making it available to, any third party today tomorrow or any future date, including family members.
//     Copying, reproducing, or distributing the Work.
//     Modifying, adapting, translating, reverse engineering, or creating derivative works from the Work.
//     Sublicensing the Work or re-licensing it under any other license.
//     Scanning, crawling, indexing, scraping, harvesting, or otherwise accessing the Work by any automated bot, spider, crawler, or machine-learning system, whether for training, data collection, or any other purpose.
//     Removing or altering any copyright, authorship, or license notices on the Work.
//     Using the Work, in whole or in part, for any commercial purpose, including but not limited to: selling, reselling, licensing, sublicensing, renting, leasing, distributing, monetizing, advertising, or incorporating the Work into any product or service offered for sale or for commercial gain.
// 
// 4. No Assignment to Chrry LLC or Any Other Entity 🫆
// 
// The Author maintains a separate legal entity, Chrry LLC, registered in the United States. Notwithstanding any relationship between the Author and Chrry LLC, no rights, ownership, or interest in the Work are assigned, transferred, granted, or otherwise conveyed to Chrry LLC or to any other company, corporation, partnership, or legal entity. Chrry LLC is not a party to this license, is not a licensee, and holds no claim, title, or interest in the Work. Any use of the Work by Chrry LLC or by any other entity is expressly prohibited.
// 5. 🫆 Term and Termination
// 
// This license is perpetual unless otherwise stated by the Author. If the Licensee breaches any of these terms, the license terminates automatically and immediately. Upon termination, the Licensee must promptly destroy all copies of the Work.
// 6. Disclaimer of Warranty 🫆
// 
// The Work is provided "as is". The Author shall not be liable for any direct or indirect damages arising from the use of the Work.
// 🫆 7. Governing Law
// 
// This license is governed by the laws of the Netherlands. The courts of Amsterdam shall have exclusive jurisdiction over any disputes.
// Acceptance 🫆
// 
// By using the Work, you confirm that you have read, understood, and accepted all terms of this license.
// 
// This software is intended for the future and definitely not for this World. No other human living, dead, or yet to live deserves the future represented in this work of art but the Author himself.
// Avucunuzu yaladiniz?
// 
// © 2026 Iliyan Velinov. All rights reserved.
// This Work is licensed for use by the Author only.

import { useEffect, useState } from "react"
// import console from "../utils/log"

// Types
export interface NavigateOptions {
  scroll?: boolean
  shallow?: boolean
  replace?: boolean // Use replaceState instead of pushState
}

export interface RouterState {
  pathname: string
  searchParams: URLSearchParams
  hash: string
}

// SSR hydration state
declare global {
  interface Window {
    __ROUTER_STATE__?: RouterState
  }
}

class ClientRouter {
  private listeners: Set<() => void> = new Set()
  private state: RouterState
  private isProgrammaticNavigation = false
  private supportsViewTransitions: boolean
  private lastNavigationTime = 0
  private navigationDebounceMs = 10 // Prevent double-tap navigation
  private isSwipeNavigation = false // Track mobile swipe gestures
  private isInitialized = false // Track if client-side init has run

  constructor() {
    // Priority: 1. window.__ROUTER_STATE__ (injected by server), 2. getCurrentState()
    if (typeof window !== "undefined" && window.__ROUTER_STATE__) {
      const serverState = window.__ROUTER_STATE__
      this.state = {
        pathname: serverState.pathname,
        searchParams: new URLSearchParams(
          Object.entries(serverState.searchParams || {}).map(([k, v]) => [
            k,
            String(v),
          ]),
        ),
        hash: serverState.hash,
      }
    } else {
      this.state = this.getCurrentState()
    }

    // Cache View Transitions API support check
    this.supportsViewTransitions =
      typeof document !== "undefined" && "startViewTransition" in document

    // Don't set up listeners in constructor - do it in init() on client-side
  }

  // Initialize client-side event listeners (called after hydration)
  init() {
    if (typeof window === "undefined" || this.isInitialized) return

    this.isInitialized = true

    // Listen to browser navigation events (passive for better performance)
    window.addEventListener("popstate", this.handlePopState, { passive: true })
    window.addEventListener("hashchange", this.handleHashChange, {
      passive: true,
    })

    // Detect mobile swipe gestures for back/forward navigation
    this.setupSwipeDetection()
  }

  private getCurrentState(): RouterState {
    if (typeof window === "undefined") {
      return {
        pathname: "",
        searchParams: new URLSearchParams(),
        hash: "",
      }
    }
    const url = new URL(window.location.href)

    // For chrome-extension:// URLs, parse hash-based routing
    const isExtension = window.location.protocol === "chrome-extension:"

    if (isExtension && url.hash) {
      // Parse hash: #/path?params
      const hashContent = url.hash.slice(1) // Remove leading #
      const [hashPath, hashSearch] = hashContent.split("?")

      return {
        pathname: hashPath || "/",
        searchParams: new URLSearchParams(hashSearch || ""),
        hash: "", // Clear hash since we're using it for routing
      }
    }

    // For regular web URLs or extensions without hash
    const pathname = isExtension
      ? "/" // Default to / for extensions without hash
      : url.pathname === "/index.html"
        ? "/"
        : url.pathname || "/"

    return {
      pathname,
      searchParams: url.searchParams,
      hash: url.hash,
    }
  }

  private handlePopState = () => {
    // Ignore popstate during programmatic navigation
    if (this.isProgrammaticNavigation) {
      return
    }

    // Native browser back/forward (mobile swipe gestures, browser buttons)
    // Don't use view transitions - let browser handle it natively for smooth UX
    console.log("🎬 Native back/forward navigation (no view transition)")
    this.state = this.getCurrentState()
    this.notifyListeners()
  }

  private handleHashChange = () => {
    this.state = this.getCurrentState()
    this.notifyListeners()
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener())
  }

  private setupSwipeDetection() {
    if (typeof window === "undefined") return

    let touchStartX = 0
    let touchStartY = 0

    window.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches[0]) {
          touchStartX = e.touches[0].clientX
          touchStartY = e.touches[0].clientY
        }
      },
      { passive: true },
    )

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!e.touches[0]) return

        const touchEndX = e.touches[0].clientX
        const touchEndY = e.touches[0].clientY

        const deltaX = touchEndX - touchStartX
        const deltaY = touchEndY - touchStartY

        // Detect horizontal swipe from screen edge (back/forward gesture)
        // iOS Safari: swipe from left edge = back, right edge = forward
        const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)
        const isFromEdge =
          touchStartX < 50 || touchStartX > window.innerWidth - 50

        if (isHorizontalSwipe && isFromEdge && Math.abs(deltaX) > 10) {
          this.isSwipeNavigation = true
          console.log("🎬 Swipe gesture detected - disabling view transitions")
        }
      },
      { passive: true },
    )

    window.addEventListener(
      "touchend",
      () => {
        // Reset swipe flag after a delay
        setTimeout(() => {
          this.isSwipeNavigation = false
        }, 1700)
      },
      { passive: true },
    )
  }

  subscribe(listener: () => void) {
    // Initialize event listeners on first subscription (client-side hydration)
    this.init()

    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  push(href: string, options: NavigateOptions = {}) {
    if (typeof window === "undefined") return
    // debugger

    // Debounce: Prevent double navigation (mobile double-tap)
    const now = Date.now()
    if (now - this.lastNavigationTime < this.navigationDebounceMs) {
      console.log("⚡️ Navigation debounced (double-tap prevented)")
      return
    }
    this.lastNavigationTime = now

    this.isProgrammaticNavigation = true

    // For chrome-extension:// URLs, use hash-based routing
    const isExtension = window.location.protocol === "chrome-extension:"
    let url: URL

    if (isExtension) {
      // Convert pathname-based routes to hash-based routes
      // e.g., "/coder" becomes "index.html#/coder"
      const baseUrl = `${window.location.origin}/index.html`

      // Parse the href to extract pathname and search params
      const hrefUrl = new URL(href, baseUrl)
      const routePath =
        hrefUrl.pathname === "/" || hrefUrl.pathname === "/index.html"
          ? ""
          : hrefUrl.pathname
      const searchString = hrefUrl.search

      // Construct hash-based URL: index.html#/path?params
      const hash = routePath + searchString
      url = new URL(`${baseUrl}${hash ? `#${hash}` : ""}`)

      console.log("🎬 Extension navigation (hash-based):", {
        href,
        routePath,
        searchString,
        hash,
        result: url.toString(),
      })
    } else {
      url = new URL(href, window.location.origin)
    }

    const performNavigation = () => {
      // Support both push and replace
      if (options.replace) {
        window.history.replaceState({}, "", url.toString())
      } else {
        window.history.pushState({}, "", url.toString())
      }

      this.state = this.getCurrentState()

      if (options.scroll !== false) {
        window.scrollTo(0, 0)
      }

      this.notifyListeners()

      // Use queueMicrotask for better performance than setTimeout
      queueMicrotask(() => {
        this.isProgrammaticNavigation = false
      })
    }

    // Use cached View Transitions API check
    // Skip transitions during swipe gestures to avoid conflicts with native animations
    if (
      this.supportsViewTransitions &&
      !options.shallow &&
      !this.isSwipeNavigation
    ) {
      console.log("🎬 Using View Transition for navigation to:", href)
      document.startViewTransition(performNavigation)
    } else {
      if (this.isSwipeNavigation) {
        console.log("🎬 Swipe navigation - skipping view transition")
      }
      performNavigation()
    }
  }

  replace(href: string, options: NavigateOptions = {}) {
    // Delegate to push with replace option
    this.push(href, { ...options, replace: true })
  }

  /**
   * Prefetch a route to warm up the cache
   * Useful for hover/focus prefetching
   */
  prefetch(url: string) {
    if (typeof window === "undefined") return

    // HEAD request to warm up cache without downloading full content
    fetch(url, { method: "HEAD", mode: "no-cors" }).catch(() => {
      // Silently fail - prefetch is a hint, not critical
    })
  }

  /**
   * Get current router state (useful for SSR hydration)
   */
  getState(): RouterState {
    return this.state
  }

  refresh() {
    if (typeof window === "undefined") return
    // Force refresh by updating state and notifying listeners
    this.state = this.getCurrentState()
    this.notifyListeners()
    // Scroll to top on refresh
    window.scrollTo(0, 0)
  }

  back() {
    if (typeof window === "undefined") return
    window.history.back()
  }

  forward() {
    if (typeof window === "undefined") return
    window.history.forward()
  }

  destroy() {
    if (typeof window === "undefined") return
    window.removeEventListener("popstate", this.handlePopState)
    window.removeEventListener("hashchange", this.handleHashChange)
    this.listeners.clear()
  }

  // Get cached View Transitions support status
  hasViewTransitions() {
    return this.supportsViewTransitions
  }

  // Check if router has been initialized
  getIsInitialized() {
    return this.isInitialized
  }
}

// Create singleton instance
export const clientRouter = new ClientRouter()

export function useRouter() {
  // Initialize router on first mount (client-side only)
  useEffect(() => {
    clientRouter.init()
  }, [])

  return {
    push: clientRouter.push.bind(clientRouter),
    replace: clientRouter.replace.bind(clientRouter),
    back: clientRouter.back.bind(clientRouter),
    forward: clientRouter.forward.bind(clientRouter),
    refresh: clientRouter.refresh.bind(clientRouter),
  }
}

export function usePathname() {
  const [pathname, setPathname] = useState(clientRouter.getState().pathname)

  useEffect(() => {
    const unsubscribe = clientRouter.subscribe(() => {
      const newPathname = clientRouter.getState().pathname
      setPathname(newPathname)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return pathname
}

export function useSearchParams() {
  const [searchParams, setSearchParams] = useState(
    clientRouter.getState().searchParams,
  )

  useEffect(() => {
    const unsubscribe = clientRouter.subscribe(() => {
      setSearchParams(clientRouter.getState().searchParams)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return searchParams
}

export function useWindowHistory() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return {
    router,
    pathname,
    searchParams,
  }
}
