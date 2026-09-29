"use client";
import { useRef } from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "./SectionHeading";
import { AppStoreIcon, GitHubIcon, LinkedInIcon, PlayStoreIcon, WhatsAppIcon } from "./BrandIcons";

const socials = [
  { label: "GitHub", href: "https://github.com/phyothihawin", icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/phyo-thiha-win-a8a496183/", icon: LinkedInIcon },
  { label: "WhatsApp", href: "https://wa.me/qr/SXKII6FBHRTGE1", icon: WhatsAppIcon },
  { label: "Google Play developer page", href: "https://play.google.com/store/apps/dev?id=5729357381500909341", icon: PlayStoreIcon },
  { label: "App Store developer page", href: "https://apps.apple.com/us/developer/phyo-thiha-win/id1808051048", icon: AppStoreIcon },
];

const languages = ["Burmese (Native)", "English (Intermediate)", "Japanese (N5)"];

const education = [
  { title: "IES Intermediate In-person Course", detail: "Ivy English School (2023 - 2024)" },
  { title: "Samsung Tech Institute Mobile Training", detail: "University of Computer Studies, Yangon (2017)" },
  { title: "Bachelor of Computer Science (B.C.Sc)", detail: "University of Computer Studies, Thaton (2014 - 2019)" },
];

export default function Profile() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="profile" className="py-24 relative" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading number="01" title="My Profile" />

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 blur-3xl rounded-full group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-700 pointer-events-none"></div>
            <div data-reveal-item className="glass-panel spotlight p-8 rounded-3xl relative z-10 text-center hover:-translate-y-2">
              <div className="relative w-48 h-48 mx-auto mb-6">
                {/* Accent ring: fades in and slowly rotates on hover (desktop) */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-80 blur-[3px] transition-opacity duration-500 md:group-hover:animate-spin-slow bg-[conic-gradient(from_0deg,var(--color-accent-from),var(--color-accent-to),transparent_60%,var(--color-accent-from))]"
                ></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-200 dark:border-white/10 group-hover:border-zinc-300 dark:group-hover:border-white/30 transition-colors duration-500 shadow-2xl">
                  <Image
                    src="/assets/profile.jpg"
                    alt="Phyo Thiha Win"
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Phyo Thiha Win</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-mono mb-6 text-sm">Software Engineer</p>

              <div className="flex justify-center flex-wrap gap-4">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-1 hover:scale-105 transition-[background-color,color,translate,scale] duration-300 text-zinc-600 dark:text-zinc-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div data-reveal-item className="glass-panel spotlight p-6 rounded-3xl relative z-10 mt-6 hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-4">
                <Globe size={20} className="text-zinc-800 dark:text-white" />
                <h4 className="font-bold text-zinc-800 dark:text-white text-lg">Languages</h4>
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
                {languages.map((language) => (
                  <li key={language} className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-500/50 dark:bg-white/50 mr-2"></span> {language}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 space-y-6 text-lg text-zinc-600 dark:text-zinc-300 font-light">
            <div data-reveal-item className="glass-panel spotlight p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-700"></div>
              <p className="mb-6 leading-relaxed">
                I’m an Android and Flutter developer passionate about building apps that make a real impact. With hands-on experience in <span className="text-zinc-900 dark:text-zinc-100 font-mono text-base bg-zinc-200/80 dark:bg-white/10 px-2 py-1 rounded">Kotlin, Dart, Go, JavaScript, TypeScript</span> and web technologies, I love turning ideas into clean, high-performing, and user-friendly experiences.
              </p>
              <p className="mb-0 leading-relaxed">
                I’m eager to join a team that values creativity, collaboration, and clean code, where I can keep growing, share what I know, and help deliver products people enjoy using.
              </p>
            </div>

            <div data-reveal-item className="mt-8 glass-panel spotlight p-8 rounded-3xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Education</h3>
              <div data-timeline className="relative ml-4 space-y-8 pb-4 pt-4 mt-4">
                <div aria-hidden="true" className="absolute -left-0.5 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-white/10"></div>
                <div aria-hidden="true" data-timeline-line className="absolute -left-0.5 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-accent-from to-accent-to"></div>

                {education.map(({ title, detail }) => (
                  <div key={title} data-timeline-item className="relative pl-8 group">
                    <div className="absolute w-4 h-4 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-400 dark:border-zinc-500 rounded-full -left-[9px] top-1 group-hover:bg-zinc-900 group-hover:border-zinc-900 dark:group-hover:bg-white dark:group-hover:border-white group-data-[active=true]:bg-zinc-900 group-data-[active=true]:border-zinc-900 dark:group-data-[active=true]:bg-white dark:group-data-[active=true]:border-white transition-colors duration-500 z-10 shadow-[0_0_0_4px_rgba(244,244,245,1)] dark:shadow-[0_0_0_4px_rgba(0,0,0,1)]"></div>
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-white">{title}</div>
                      <div className="text-zinc-500 dark:text-zinc-400 text-sm">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
