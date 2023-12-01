"use client";

import "./CookieBanner.scss";
import { useEffect, useState } from "react";
import Script from "next/script";
import * as gtag from "../../../gtag";

import CookieConsent, {
  Cookies,
  getCookieConsentValue,
  resetCookieConsentValue,
} from "react-cookie-consent";

const GA_TRACKING_ID = `${gtag.GA_TRACKING_ID}`;

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const disableGoogleAnalytics = () => {
    resetCookieConsentValue("cookieConsent");
    window[`ga-disable-${GA_TRACKING_ID}`] = true;
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "_ga_EJ53PTCMRW=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const initializeGoogleAnalytics = () => {
    window[`ga-disable-${GA_TRACKING_ID}`] = false;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  };

  useEffect(() => {
    const consent = getCookieConsentValue("cookieConsent");
    setShowBanner(consent !== "true");

    if (consent === "true") {
      initializeGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }
  }, []);

  return (
    <>
      {showBanner ? (
        <CookieConsent
          location="bottom"
          buttonText="J'accepte"
          declineButtonText="Je refuse"
          cookieName="cookieConsent"
          style={{
            background: "#2B373B",
            display: "flex",
            alignItems: "center",
          }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          declineButtonStyle={{ color: "#fff", fontSize: "13px" }}
          expires={150}
          onAccept={() => {
            initializeGoogleAnalytics();
            setShowBanner(false);
          }}
          enableDeclineButton
          onDecline={() => {
            disableGoogleAnalytics();
            setShowBanner(false);
          }}
        >
          J&rsquo;utilise des cookies uniquement pour analyser le trafic sur mon
          site et améliorer l&rsquo;expérience utilisateur. Aucune publicité
          n&rsquo;est affichée et aucune donnée n&rsquo;est partagée avec des
          annonceurs. Pour comprendre comment je traite les données, je vous
          invite à consulter ma Politique de Confidentialité. En utilisant mon
          site, vous acceptez l&rsquo;utilisation de ces cookies.
        </CookieConsent>
      ) : (
        <>
          <section>
            <div>
              <button
                className="cancelCookies"
                onClick={() => {
                  disableGoogleAnalytics();
                  setShowBanner(true);
                }}
              >
                Réinitialiser mon choix pour les cookies 🍪
              </button>
            </div>
          </section>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}

export default CookieBanner;
