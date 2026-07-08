"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Folder, Globe } from "lucide-react";

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

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

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }
    )
    .fromTo(itemsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.04 },
      "-=0.15"
    );
  }, []);

  return (
    <section id="projects" className="py-24 relative" ref={sectionRef}>
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16" ref={titleRef}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center text-zinc-900 dark:text-white tracking-tight">
            <span className="text-zinc-550 dark:text-zinc-500 font-mono text-xl md:text-3xl mr-4 font-light">04.</span>
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 to-zinc-300 dark:from-white dark:to-zinc-600 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 hover:bg-zinc-200/50 dark:hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
              ref={el => itemsRef.current[index] = el}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-700"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <Folder size={40} strokeWidth={1} className="text-zinc-800 dark:text-white" />
                  <div className="flex items-center space-x-3">
                    {project.links.map((link, idx) => {
                      let icon;
                      let tooltip = link.label || (link.type === "playstore" ? "Play Store" : link.type === "appstore" ? "App Store" : link.type === "website" ? "Website" : "Link");
                      
                      switch (link.type) {
                        case "website":
                          icon = <Globe size={20} strokeWidth={1.5} />;
                          break;
                        case "playstore":
                          icon = (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
                              <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
                            </svg>
                          );
                          break;
                        case "appstore":
                          icon = (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
                              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                            </svg>
                          );
                          break;
                        default:
                          icon = <ExternalLink size={20} strokeWidth={1.5} />;
                          break;
                      }

                      return (
                        <a 
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          title={tooltip}
                          className="relative group/btn text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
                        >
                          {icon}
                          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 text-[10px] font-mono font-medium text-white bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/5 shadow-md z-20">
                            {tooltip}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zinc-900 group-hover:to-zinc-500 dark:group-hover:from-white dark:group-hover:to-zinc-400 transition-all duration-300">
                  <span className="text-zinc-450 dark:text-zinc-500 font-mono text-lg md:text-xl mr-3 font-light">{romanNumerals[index]}.</span>
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-light">
                  {project.description}
                </p>
                
                <ul className="flex flex-wrap gap-3 font-mono text-xs text-zinc-550 dark:text-zinc-500">
                  {project.tech.map((tech, i) => (
                    <li key={i} className="bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400">
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
