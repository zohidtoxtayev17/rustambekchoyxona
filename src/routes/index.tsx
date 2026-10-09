import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { MenuSection } from "@/components/site/MenuSection";
import { About, Contact, Footer, Gallery, MobileBar } from "@/components/site/Sections";
import { restaurant } from "@/config/restaurant";

const title = "Rustambek Choyxona — Milliy ta’m, samimiy muhit";
const description = "An’anaviy o‘zbek taomlari va unutilmas choyxona muhiti: osh, somsa, shashlik, lagʻmon va ko‘k choy.";

function structuredData() {
  const c = restaurant.contact;
  const data: Record<string, unknown> = { "@context": "https://schema.org", "@type": "Restaurant", name: restaurant.name, servesCuisine: "O‘zbek oshxonasi" };
  if (c.phone) data["telephone"] = c.phone;
  if (c.address) data["address"] = c.address;
  const same = [c.telegram, c.instagram].filter(Boolean);
  if (same.length) data["sameAs"] = same;
  return JSON.stringify(data);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: structuredData() }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
