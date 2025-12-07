"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-TN54WWK3";
const LINK_SELECTOR = process.env.NEXT_PUBLIC_GTM_LINK_SELECTOR ?? "a[data-gtm], a[href^='mailto:'], a[href*='linkedin.com']";

export default function GTMClient() {
  const pathname = usePathname();

  // Push a page_view event for SPA navigations (Next.js app-router)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize dataLayer if it doesn't exist
    (window as any).dataLayer = (window as any).dataLayer || [];

    (window as any).dataLayer.push({
      event: "page_view",
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  // Delegated click tracking: pushes `link_click` to dataLayer for links matching LINK_SELECTOR
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleClick(e: MouseEvent) {
      try {
        // only left-click without modifier keys
        if ((e as any).button !== 0) return;
        if (e.defaultPrevented) return;
        const me = e as MouseEvent & { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; altKey?: boolean };
        if (me.ctrlKey || me.metaKey || me.shiftKey || me.altKey) return;

        const target = e.target as Element | null;
        if (!target || typeof (target as any).closest !== "function") return;
        const anchor = (target as Element).closest(LINK_SELECTOR) as HTMLAnchorElement | null;
        if (!anchor) return;

        const href = anchor.getAttribute("href") || "";
        const text = (anchor.textContent || "").trim();
        const classes = anchor.className || "";
        const cta = anchor.getAttribute("data-gtm") || undefined;

        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "link_click",
          link_url: href,
          link_text: text,
          link_classes: classes,
          cta_name: cta,
        });
      } catch (err) {
        // swallow errors to avoid breaking the app
        // eslint-disable-next-line no-console
        console.error("GTM link tracking error:", err);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer', '${GTM_ID}');
        `,
      }}
    />
  );
}
