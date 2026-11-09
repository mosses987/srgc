import { EMAIL, Logo, PHONE_DISPLAY, PHONE_HREF } from "./shared";
import { SERVICES } from "./services";

export function Footer() {
  return (
    <footer className="bg-card pb-14 lg:pb-0">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Logo className="h-28 w-auto" />
          <p className="mt-5 max-w-[34ch] text-base text-foreground">
            Commercial and residential contracting across Ontario, Canada.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <h3 className="text-base font-bold text-navy">Services</h3>
          <ul className="mt-4 space-y-2 text-base text-foreground">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a
                  href="#services"
                  className="hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-base font-bold text-navy">Contact</h3>
          <ul className="mt-4 space-y-2 text-base text-foreground">
            <li>Berat Sorguc</li>
            <li>
              <a
                href={PHONE_HREF}
                className="hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="break-all hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                {EMAIL}
              </a>
            </li>
            <li>Ontario, Canada</li>
          </ul>
        </div>
      </div>
      <div className="bg-secondary py-6 text-center text-sm text-foreground">
        © {new Date().getFullYear()} SRGC Developments Ltd. All rights reserved.
      </div>
    </footer>
  );
}
