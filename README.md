# Phyo Thiha Win — Software Engineer

Welcome to the repository of my personal portfolio website. This is a Next.js web application built with React, styled using Tailwind CSS, and animated with GSAP (GreenSock Animation Platform) to deliver a fluid, interactive, and premium experience.

---

## 🖥️ Interactive Webpage Content & UI

Below is a complete markdown representation of the portfolio's content, interactive states, and page structure.

### 🗺️ Navigation & Header

The top navigation bar is highly responsive and adapts to user scrolling. It features:
* **Brand Logo**: `<PhThWn />` (Monospace branding linked to `#home`)
* **Navigation Links**:
  * [Profile](#01-my-profile)
  * [Tech Stack](#02-tech-stack)
  * [Experience](#03-professional-experience)
  * [Projects](#04-featured-projects)
  * [Contact](#05-get-in-touch)
* **Theme Toggle**: Switch between **Light Mode** and **Dark Mode** dynamically.

---

### 🚀 Hero Section & Developer Terminal Mockup

The hero section welcomes visitors with smooth Apple-style GSAP entrance animations and a signature interactive **Developer Terminal Mockup**.

#### Terminal Interface Representation:
```bash
➜ ~ node init_profile.js
// Profile Initialized
const developer = {
  name: 'PHYO THIHA WIN',
  role: 'Software Engineer',
  skills: ['Kotlin', 'Dart', 'Java', 'JS/TS'],
  platforms: ['Android', 'Flutter', 'React', 'Node.js'],
  focus: ['Clean Architecture', 'Security']
};

✓ Successfully built awesome app.
➜ ~ █
```

> **Aesthetic Highlights**: The terminal card tilts dynamically in response to mouse movement on desktop platforms using custom CSS and JS calculations, complete with classic macOS style control buttons (🔴 🟡 🟢) and a blurring glassmorphism backdrop.

---

### 01. My Profile

An overview of my background, interests, and foundations.

* **Role**: Software Engineer
* **Bio**: I’m an Android and Flutter developer passionate about building apps that make a real impact. With hands-on experience in **Kotlin, Java, Dart**, and web technologies, I love turning ideas into clean, high-performing, and user-friendly experiences. I’m eager to join a team that values creativity, collaboration, and clean code, where I can keep growing, share what I know, and help deliver products people enjoy using.

#### 🌍 Languages
* **Burmese**: Native
* **English**: Intermediate
* **Japanese**: N5

#### 🎓 Education Timeline
* **IES Intermediate In-person Course**
  * *Ivy English School (2023 - 2024)*
* **Samsung Tech Institute Mobile Training**
  * *University of Computer Studies, Yangon (2017)*
* **Bachelor of Computer Science (B.C.Sc)**
  * *University of Computer Studies, Thaton (2014 - 2019)*

---

### 02. Tech Stack

Curated technologies and architectures I specialize in:

| Category | Skills & Concepts |
| :--- | :--- |
| **💻 Languages** | Kotlin, Dart, Go, JS & TS |
| **📐 Architecture** | Clean Architecture, MVVM & MVI, BLoC Pattern, Redux |
| **🛡️ Security & Testing** | JWT & RASP (Runtime Application Self-Protection), Biometrics, SSL Pinning, JUnit, Espresso, Mockito |
| **⚙️ Tools & Deploy** | CI/CD (GitLab, GitHub Actions), Fastlane, Firebase, App Stores |

---

### 03. Professional Experience

#### **Senior Android Developer** @ ONENEX (Atlas Digi Myanmar Limited)
*📅 2024-01 – Present | [onenex.co](https://onenex.co/)*
* Manage and mentor junior developers, assign tasks, solve complex problems, and architect software design.
* Implement Jetpack Compose, Unit Testing, and SOLID principles.
* Heavy focus on software security, code integrity, and performance.

#### **Mid Android Developer** @ ONENEX (Atlas Digi Myanmar Limited)
*📅 2022-09 – 2024-01 | [onenex.co](https://onenex.co/)*
* Worked within large team environments, prioritizing communication, software quality, and agile delivery.
* Developed multi-module applications utilizing clean architecture and Kotlin.
* Configured automated deployment via CI/CD pipelines and Firebase distribution.
* Followed emerging Android development trends and complex business workflows.

#### **Mid Android Developer** @ EZAY Enterprise Co., Ltd.
*📅 2021-08 – 2022-09 | [ezaymyanmar.com](https://ezaymyanmar.com/)*
* Handled UI/UX designs targeting senior/elderly demographics for maximum usability.
* Developed and maintained 3 core apps: Buyer (E-commerce), Seller (Stock Management & Reports), and Delivery (Logistics & Tracking).
* Maintained active roles in business alignment and tech reports.

#### **Android Developer** @ NANOLABS (Legend Myanmar Technology)
*📅 2020-01 – 2021-08 | [lmtech.asia](https://lmtech.asia/)*
* Started Android development journey using Kotlin and Jetpack libraries.
* Delivered high-quality features ahead of project deadlines under senior guidelines.

---

### 04. Featured Projects

#### 1. Pocket MM (ONENEX)
* **Description**: Integrates a Loyalty Point System with seamless QR Pay and Collect functionality, aimed at enhancing user engagement for restaurants and shops. Points and reward coupons are giftable between users and redeemable at merchants. Security is prioritized with JWT, biometrics, a secured database, and RASP.
* **Tech Stack**: `Kotlin`, `Jetpack Compose`, `Dagger-Hilt`, `Room Database`, `SQLCipher`, `JWT`, `Biometrics`, `RASP`, `SSL Pinning`, `GitLab CI/CD`, `JUnit`, `Mockito`
* **Links**: [Website](https://pocket.com.mm/) | [Customer App](https://play.google.com/store/apps/details?id=com.pocket.customer) | [Partner App](https://play.google.com/store/apps/details?id=com.pocket.partner)

#### 2. 2c2p Wave (ONENEX)
* **Description**: The wallet app, built with Flutter, is a secure financial solution featuring OCR for document scanning, passcode and biometric login, seamless fund transfers, and top-ups via payment gateways. Integrated with RASP, it ensures robust security against threats.
* **Tech Stack**: `Flutter`, `Dart`, `BLoC Pattern`, `Get-It`, `Zoloz eKYC`, `OCR`, `JWT`, `Hive Encryption`, `RASP`, `SSL Pinning`, `Fastlane`, `CI/CD`
* **Links**: [Website Details](https://www.wavemoney.com.mm/2c2p-wave-app/) | [Google Play](https://play.google.com/store/apps/details?id=mm.com.wavemoney.wave2c2p) | [App Store](https://apps.apple.com/th/app/2c2p-wave/id6746779611)

#### 3. Heal by Pun Hlaing (ONENEX)
* **Description**: A comprehensive healthcare application designed for Pun Hlaing Hospital, offering features like appointment bookings, medical records management, realtime chat, and video conferencing with patients and doctors. Emphasizing app security and integrity, it ensures the protection of sensitive medical records.
* **Tech Stack**: `Kotlin`, `Jetpack Compose`, `Firestore Chat`, `Twilio / Zoom SDK`, `Pusher Websocket`, `Dagger-Hilt`, `Room`, `SQLCipher`, `RASP`, `SSL Pinning`, `GitLab CI/CD`, `JUnit`, `Mockito`
* **Links**: [Website](https://heal.healbypunhlaing.com/) | [Google Play](https://play.google.com/store/apps/details?id=com.punhlaing.healapp)

#### 4. Star City Living App (ONENEX)
* **Description**: An estate residence app allowing users to upgrade their residential status, purchase estate sports club memberships, and buy packages. It also features a maintenance ticket management system for addressing residents' issues and supports a community feed.
* **Tech Stack**: `Kotlin`, `Jetpack Compose`, `MVVM`, `Dagger-Hilt`, `Room`, `SQLCipher`, `RASP`, `2c2p`, `Wave Pay`, `KBZPay`, `AYA Pay`, `CyberSource`, `GitLab CI/CD`
* **Links**: [Website](https://starcityyangon.com/) | [Google Play](https://play.google.com/store/apps/details?id=com.starcityyangon.yla)

#### 5. Thurriza Consultancy (Freelance)
* **Description**: A startup project for astrological consultancy, where I handled full-stack development. It features a Mobile App, a Dashboard Portal, and Backend services. Developed tools for managing astrology content and booking appointments for astrologers and customers.
* **Tech Stack**: `Flutter`, `Dart`, `BLoC Pattern`, `Go Router`, `Hive Encryption`, `RASP`, `Laravel 11`, `Vue 3`, `PrimeVue`, `Pinia`, `MySQL`, `Tailwind CSS`
* **Links**: [Website](https://thurriza.com/) | [Google Play](https://play.google.com/store/apps/details?id=com.thurriza.astrology) | [App Store](https://apps.apple.com/us/app/thurriza/id6744538911) | [Dashboard Portal](https://dashboard.thurriza.com/)

#### 6. Ezay Apps (EZAY Enterprise)
* **Description**: A platform connecting buyers and sellers for a seamless shopping and delivery process. Includes 3 custom apps: Buyer (e-commerce), Seller (stock, inventory, and sales reports), and Delivery (navigation, drop points, and tracking status).
* **Tech Stack**: `Kotlin`, `MVVM`, `Dagger-Hilt`, `Jetpack Libraries`, `Google Maps`, `Firebase`
* **Links**: [Website](https://ezaymyanmar.com/)

---

### 05. Get in Touch

Feel free to connect or drop a message!

* **📧 Email**: [phyothiha2580@gmail.com](mailto:phyothiha2580@gmail.com)
* **📞 Phone**: [+95 997 358 4655](tel:+959973584655)
* **📍 Location**: Yangon, Myanmar

---

## 🛠️ Project Development Setup

This project was built using [Next.js](https://nextjs.org/) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, install dependencies:
```bash
pnpm install
```

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.js`.

### Learn More

To learn more about Next.js, take a look at the following resources:
* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
