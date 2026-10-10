import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import { restaurant } from "@/config/restaurant";
import { Emblem } from "./common";

export function Hero() {
  return (
    <section id="bosh" className="relative flex min-h-[88svh] items-end overflow-hidden bg-forest-deep md:min-h-[92vh] md:items-center">
      <img src={restaurant.heroImage} alt="An’anaviy o‘zbek choyxonasi muhiti (namuna rasm)" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
      <div className="absolute inset-0 hidden bg-hero-overlay md:block" />
      <div className="absolute inset-0 bg-hero-overlay-mobile md:hidden" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28 lg:px-8">
        <div className="max-w-xl">
          <Emblem className="h-12 w-12 animate-fade-up text-gold" />
          <p className="eyebrow mt-6 animate-fade-up [animation-delay:100ms]">Rustambek Choyxona</p>
          <h1 aria-label={restaurant.tagline} className="hero-heading mt-4 text-5xl leading-[1.05] text-on-dark sm:text-6xl lg:text-7xl">
            {restaurant.tagline.split(" ").map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span aria-hidden="true" className="hero-word-window">
                  <span className="hero-word" style={{ animationDelay: `${100 + index * 35}ms` }}>{word}</span>
                </span>
                {" "}
              </Fragment>
            ))}
          </h1>
          <p className="mt-5 max-w-md animate-fade-up text-base leading-relaxed text-on-dark-muted [animation-delay:260ms] sm:text-lg">
            {restaurant.subtitle}
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-5 [animation-delay:400ms]">
            <a href="#menyu" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-forest-deep transition-colors duration-300 hover:bg-gold-soft active:bg-gold-soft">
              Menyuni ko‘rish <ArrowRight className="h-4 w-4 arrow-nudge" />
            </a>
            <a href="#biz-haqimizda" className="min-h-12 content-center text-sm text-on-dark underline-offset-8 hover:text-gold hover:underline">
              Biz haqimizda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
