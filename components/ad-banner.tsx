"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

const ADS_CLIENT = "ca-pub-2057297855731557"

interface AdBannerProps {
  slotId: string
  className?: string
}

export function AdBanner({ slotId, className }: AdBannerProps) {
  const insRef = useRef<HTMLModElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (!scriptLoaded) return
    const ins = insRef.current
    if (!ins) return

    const alreadyFilled = ins.getAttribute("data-adsbygoogle-status") === "done"
    if (alreadyFilled) return

    try {
      // @ts-ignore
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error("Adsense error", e)
    }
  }, [scriptLoaded])

  return (
    <>
      <Script
        id="adsbygoogle-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div className={className}>
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADS_CLIENT}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  )
}

