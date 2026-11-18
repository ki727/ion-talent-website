"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { GA_MEASUREMENT_ID } from "@/lib/site-config"
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent"

/**
 * Google Analytics 4 with Google Consent Mode v2 in "basic" mode: the Google tag
 * is not loaded at all, and nothing is sent to Google, until the visitor accepts
 * analytics cookies. Consent defaults are still declared before config, and
 * advertising signals stay denied. Client-side route changes are counted by
 * GA4 enhanced measurement (browser history events).
 */
export function GoogleAnalytics() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    setGranted(readConsent() === "granted")
    const onChange = () => setGranted(readConsent() === "granted")
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }, [])

  if (!GA_MEASUREMENT_ID || !granted) return null

  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('consent', 'update', { analytics_storage: 'granted' });
gtag('set', 'ads_data_redaction', true);
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
      <Script id="ga4-loader" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
    </>
  )
}
