"use client";
import { useRef } from "react";
import { ExternalLink, Folder, Globe } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "./SectionHeading";
import { AppStoreIcon, PlayStoreIcon } from "./BrandIcons";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const projects = [
  {
    title: "Pocket MM",
    company: "ONENEX",
    description: "Integrates a Loyalty Point System with seamless QR Pay and Collect functionality, aimed at enhancing user engagement for restaurants and shops. Points and reward coupons are giftable between users and redeemable at merchants. Security is prioritized with JWT, biometrics, a secured database, and RASP.",
    tech: ["Kotlin", "Jetpack Compose", "Dagger-Hilt", "Room Database", "SQLCipher", "JWT", "Biometrics", "RASP", "SSL Pinning", "GitLab CI/CD", "JUnit", "Mockito"],
    links: [
      { type: "website", url: "https://pocket.com.mm/" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.pocket.customer", label: "Customer App" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.pocket.partner", label: "Partner App" }
    ]
  },
  {
    title: "2c2p Wave",
    company: "ONENEX",
    description: "The wallet app, built with Flutter, is a secure financial solution featuring OCR for document scanning, passcode and biometric login, seamless fund transfers, and top-ups via payment gateways. Integrated with RASP (Runtime Application Self-Protection), it ensures robust security against threats.",
    tech: ["Flutter", "Dart", "BLoC Pattern", "Get-It", "Zoloz eKYC", "OCR", "JWT", "Hive Encryption", "RASP", "SSL Pinning", "Fastlane", "CI/CD"],
    links: [
      { type: "website", url: "https://www.wavemoney.com.mm/2c2p-wave-app/" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=mm.com.wavemoney.wave2c2p" },
      { type: "appstore", url: "https://apps.apple.com/th/app/2c2p-wave/id6746779611" }
    ]
  },
  {
    title: "Heal by Pun Hlaing",
    company: "ONENEX",
    description: "A comprehensive healthcare application designed for Pun Hlaing Hospital, offering features like appointment bookings, medical records management, realtime chat, and video conferencing with patients and doctors. Emphasizing app security and integrity, it ensures the protection of sensitive medical records.",
    tech: ["Kotlin", "Jetpack Compose", "Firestore Chat", "Twilio / Zoom SDK", "Pusher Websocket", "Dagger-Hilt", "Room", "SQLCipher", "RASP", "SSL Pinning", "GitLab CI/CD", "JUnit", "Mockito"],
    links: [
      { type: "website", url: "https://heal.healbypunhlaing.com/" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.punhlaing.healapp" }
    ]
  },
  {
    title: "Star City Living App",
    company: "ONENEX",
    description: "An estate residence app allowing users to upgrade their residential status, purchase estate sports club memberships, and buy packages. It also features a maintenance ticket management system for addressing residents' issues and supports a community feed.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "Dagger-Hilt", "Room", "SQLCipher", "RASP", "2c2p", "Wave Pay", "KBZPay", "AYA Pay", "CyberSource", "GitLab CI/CD"],
    links: [
      { type: "website", url: "https://starcityyangon.com/" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.starcityyangon.yla" }
    ]
  },
  {
    title: "Thurriza Consultancy",
    company: "Freelance",
    description: "A startup project for astrological consultancy, where I handled full-stack development. It features a Mobile App, a Dashboard Portal, and Backend services. Developed tools for managing astrology content and booking appointments for astrologers and customers.",
    tech: ["Flutter", "Dart", "BLoC Pattern", "Go Router", "Hive Encryption", "RASP", "Laravel 11", "Vue 3", "PrimeVue", "Pinia", "MySQL", "Tailwind CSS"],
    links: [
      { type: "website", url: "https://thurriza.com/" },
      { type: "playstore", url: "https://play.google.com/store/apps/details?id=com.thurriza.astrology" },
      { type: "appstore", url: "https://apps.apple.com/us/app/thurriza/id6744538911" },
      { type: "dashboard", url: "https://dashboard.thurriza.com/", label: "Dashboard" }
    ]
  },
  {
    title: "Ezay Apps",
    company: "EZAY ENTERPRISE",
    description: "A platform connecting buyers and sellers for a seamless shopping and delivery process. Includes 3 custom apps: Buyer (e-commerce), Seller (stock, inventory, and sales reports), and Delivery (navigation, drop points, and tracking status).",
    tech: ["Kotlin", "MVVM", "Dagger-Hilt", "Jetpack Libraries", "Google Maps", "Firebase"],
    links: [
      { type: "website", url: "https://ezaymyanmar.com/" }
    ]
  }
];

// Default tooltip label and icon per link type (a link's own `label` wins for the tooltip)
const LINK_TYPES = {
  website: { label: "Website", icon: <Globe size={20} strokeWidth={1.5} /> },
  playstore: { label: "Play Store", icon: <PlayStoreIcon className="w-5 h-5" /> },
  appstore: { label: "App Store", icon: <AppStoreIcon className="w-5 h-5" /> },
};
const FALLBACK_LINK_TYPE = { label: "Link", icon: <ExternalLink size={20} strokeWidth={1.5} /> };

export default function Projects() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section id="projects" className="py-24 relative" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading number="04" title="Featured Projects" />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              data-reveal-item
              className="glass-panel spotlight p-8 rounded-3xl group hover:-translate-y-2 hover:bg-zinc-200/50 dark:hover:bg-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-700"></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <Folder size={40} strokeWidth={1} className="text-zinc-800 dark:text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  <div className="flex items-center space-x-3">
                    {project.links.map((link) => {
                      const type = LINK_TYPES[link.type] ?? FALLBACK_LINK_TYPE;
                      const tooltip = link.label || type.label;

                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          title={tooltip}
                          aria-label={`${project.title}: ${tooltip}`}
                          className="relative group/btn text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:-translate-y-0.5 transition-[color,translate] duration-300 p-1"
                        >
                          {type.icon}
                          <span aria-hidden="true" className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-[10px] font-mono font-medium text-white bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/5 shadow-md z-20">
                            {tooltip}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-500 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-all duration-300">
                  <span className="text-zinc-500 font-mono text-lg md:text-xl mr-3 font-light">{romanNumerals[index]}.</span>
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-light">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-3 font-mono text-xs text-zinc-500">
                  {project.tech.map((tech) => (
                    <li key={tech} className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 transition-colors duration-300 group-hover:border-zinc-300 dark:group-hover:border-white/20">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
