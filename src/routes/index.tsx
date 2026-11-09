import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header, MobileActionBar } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Sectors } from "@/components/sections/sectors";
import { EMAIL, useReveal } from "@/components/sections/shared";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";

const TITLE = "SRGC Developments Ltd | Commercial & Residential Contractor in Ontario";
const DESC =
  "SRGC Developments Ltd provides stucco, EIFS, siding and drywall contracting for commercial and residential properties across Ontario. Request a quote today.";

// ASSUMPTION: confirm the production domain. Social crawlers need an absolute image URL.
const SITE_URL = "https://srgcdevelopments.ca";
const OG_IMAGE = `${SITE_URL}/og-hero.jpg`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "SRGC Developments Ltd",
  description: DESC,
  telephone: "+1-647-721-4804",
  email: EMAIL,
  areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
  knowsAbout: ["Stucco", "EIFS", "Siding", "Drywall"],
  contactPoint: {
    "@type": "ContactPoint",
    name: "Berat Sorguc",
    contactType: "customer service",
    telephone: "+1-647-721-4804",
    email: EMAIL,
    areaServed: "CA-ON",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      {
        property: "og:image:alt",
        content: "Modern commercial building exterior at dusk, finished by SRGC Developments Ltd",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Sectors />
        <WhyUs />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
