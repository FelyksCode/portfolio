export type Lang = "en" | "id";

export const EMAIL = "ifelixivander@gmail.com";
export const PHONE_DISPLAY = "0819-0261-2828";
export const PHONE_TEL = "+6281902612828";
export const LINKEDIN = "https://www.linkedin.com/in/felix-ivander-8b7172292";
export const GITHUB = "https://github.com/FelyksCode";
export const CV_PATH = "/Felix_Ivander_CV.pdf";

export interface NavContent {
  log: string;
  registry: string;
  spec: string;
  kontak: string;
  status: string;
  aria: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  sub: string;
  email: string;
  linkedin: string;
  github: string;
  cv: string;
}

export interface ConsoleLine {
  label: string;
  value: string;
  strong?: boolean;
  hot?: boolean;
}

export interface ConsoleContent {
  cmd: string;
  aria: string;
  lines: ConsoleLine[];
  exitLabel: string;
  exitValue: string;
}

export interface LogEntry {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface RegistryEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export interface ResearchContent {
  eyebrow: string;
  title: string;
  cohort: string;
  name: string;
  points: string[];
  methods: string;
  dataset: string;
  datasetValue: string;
}

export interface SpecGroup {
  name: string;
  techs: string[];
}

export interface Credential {
  eyebrow: string;
  title: string;
  sub: string;
  body: string;
}

export interface CtaContent {
  title: string;
  email: string;
  linkedin: string;
  github: string;
  cv: string;
}

export interface BadgeContent {
  hint: string;
  loading: string;
  aria: string;
}

export interface FooterContent {
  eof: string;
  updated: string;
}

export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  console: ConsoleContent;
  log: { eyebrow: string; title: string; entries: LogEntry[] };
  registry: { eyebrow: string; title: string; entries: RegistryEntry[] };
  research: ResearchContent;
  spec: { eyebrow: string; title: string; groups: SpecGroup[] };
  credentials: { eyebrow: string; title: string; entries: Credential[] };
  cta: CtaContent;
  badge: BadgeContent;
  footer: FooterContent;
}

const en: SiteContent = {
  nav: {
    log: "Log",
    registry: "Registry",
    spec: "Spec",
    kontak: "Kontak",
    status: "Open to work",
    aria: "Sections",
  },
  hero: {
    eyebrow: "Software Engineer · Backend & Full-Stack · Jakarta, ID",
    title: "Dependable systems for real operations.",
    sub: "Final-year Informatics Engineering student at Universitas Multimedia Nusantara (GPA 3.86/4.00, expected graduation 2026) building full-stack business applications with Laravel — REST APIs, React/Next.js frontends, and Flutter mobile — with a growing focus on Python and FastAPI, and undergraduate research applying XGBoost and SHAP to clinical mortality prediction.",
    email: "Email me",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "Download CV",
  },
  console: {
    cmd: "./felix --status --verbose",
    aria: "Career status readout",
    lines: [
      { label: "OPERATOR", value: "FELIX IVANDER", strong: true },
      { label: "ROLE", value: "BACKEND · FULL-STACK ENGINEER" },
      { label: "BASE", value: "JAKARTA TIMUR · ID" },
      { label: "STATUS", value: "OPEN TO WORK", hot: true },
      { label: "STACK", value: "LARAVEL · PYTHON · REACT · FLUTTER" },
      { label: "RECORDS", value: "3 PROJECTS · 4 ROLES · 1 THESIS" },
      { label: "GRAD", value: "2026 · GPA 3.86 / 4.00" },
    ],
    exitLabel: "EXIT",
    exitValue: "0 · OK",
  },
  log: {
    eyebrow: "LOG — Employment record",
    title: "Where I’ve logged time.",
    entries: [
      {
        role: "Fullstack Engineer Intern",
        org: "PT Sannin Kreasi Indonesia · Tangerang",
        period: "2025-02 → 2025-06",
        points: [
          "Built and maintained full-stack business applications — a Warehouse Management System (WMS) and a Datalog Measuring System — with Laravel and Inertia.js",
          "Developed REST API endpoints and backend/frontend features aligned to business requirements",
          "Owned database-level development, debugging, and maintenance across existing applications",
        ],
      },
      {
        role: "Web Developer",
        org: "Pratama Ban · Freelance · Kota Tegal, ID · Remote",
        period: "2024-07 → 2024-12",
        points: [
          "Worked as part of a team on backend development with Laravel, building core features for the company’s website",
          "Assisted in deploying the website and setting up the environment for users",
          "Supported troubleshooting and maintenance, improving performance and overall user experience",
        ],
      },
      {
        role: "Laboratory Teaching Assistant",
        org: "Universitas Multimedia Nusantara · Contract",
        period: "2024-02 → 2025-01",
        points: [
          "Taught undergraduate students web development fundamentals with Laravel — MVC architecture, routing, Eloquent ORM, and authentication",
          "Guided hands-on projects so students build full-stack, secure, and scalable web applications",
        ],
      },
      {
        role: "Website Coordinator",
        org: "UMN Festival · South Tangerang",
        period: "2024-02 → 2025-02",
        points: [
          "Coordinated development and ongoing maintenance of the organizing committee’s website with a cross-functional team",
        ],
      },
    ],
  },
  registry: {
    eyebrow: "REGISTRY — Delivered projects",
    title: "Built and delivered.",
    entries: [
      {
        id: "REK-001",
        title: "Warehouse Management System",
        category: "Full-stack business prototype · PT Sannin Kreasi Indonesia",
        description:
          "Created a functional prototype of an inventory tracking and warehouse operations platform, validating the core workflows that would cut manual data-entry errors across the warehouse floor.",
        tags: ["Laravel", "Inertia.js", "MySQL", "REST API"],
      },
      {
        id: "REK-002",
        title: "Datalog Measuring System",
        category: "Full-stack business application · PT Sannin Kreasi Indonesia",
        description:
          "Measurement logging platform for operational data collection and analytics, built around an interface that non-technical operators can use daily.",
        tags: ["Laravel", "Database Design", "Data Analytics"],
      },
      {
        id: "REK-003",
        title: "UMN Festival Website",
        category: "Event portal · UMN Festival organizing committee",
        description:
          "Official hub of the UMN Festival committee — coordinated development and kept it maintained through the event cycle with a cross-functional team.",
        tags: ["Laravel", "Team Coordination", "Web"],
      },
    ],
  },
  research: {
    eyebrow: "RESEARCH — Thesis work",
    title: "Undergraduate research.",
    cohort: "MIMIC-IV cohort · 28-day mortality outcome",
    name: "Mortality Prediction in Cancer Patients with Sepsis",
    points: [
      "Applied XGBoost and Random Forest to predict 28-day mortality in septic cancer patients",
      "Used SHAP for explainable model interpretation",
      "Built LLM-based explanation and evaluation pipelines for clinical narrative generation",
    ],
    methods: "Methods",
    dataset: "Dataset",
    datasetValue: "MIMIC-IV · ICU records",
  },
  spec: {
    eyebrow: "SPEC — Toolkit & skills",
    title: "What I work with.",
    groups: [
      {
        name: "Languages",
        techs: ["Python", "PHP", "JavaScript", "TypeScript", "Java", "Dart", "HTML/CSS"],
      },
      { name: "Backend", techs: ["Laravel", "FastAPI", "REST API", "Node.js"] },
      { name: "Frontend & Mobile", techs: ["React", "Next.js", "Inertia.js", "Flutter"] },
      { name: "Databases", techs: ["PostgreSQL", "MySQL", "SQLite", "Firebase"] },
      {
        name: "DevOps & Tools",
        techs: ["Docker", "Git", "Nginx", "Ubuntu VPS", "Postman", "Linux"],
      },
      { name: "Machine Learning", techs: ["XGBoost", "Random Forest", "SHAP", "LLM Integration"] },
    ],
  },
  credentials: {
    eyebrow: "CREDENTIALS — Education & certification",
    title: "On paper.",
    entries: [
      {
        eyebrow: "Education",
        title: "Bachelor of Science in Informatics Engineering",
        sub: "Universitas Multimedia Nusantara · Expected 2026",
        body: "GPA 3.86 / 4.00. Coursework: web programming, OOP, database systems, AI, machine learning, expert systems, cloud & cybersecurity, secure coding.",
      },
      {
        eyebrow: "Certification",
        title: "Flutter Developer Path",
        sub: "Dicoding Indonesia · Jul 2025 – Nov 2025",
        body: "Intensive program covering Flutter, Dart, software development fundamentals, SOLID principles, and basic ML integration.",
      },
      {
        eyebrow: "Languages",
        title: "Bahasa Indonesia · English",
        sub: "Working communication",
        body: "Bahasa Indonesia — native. English — very good command, used daily in code, docs, and client communication.",
      },
    ],
  },
  cta: {
    title: "Let’s build something dependable.",
    email: "Email me",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "Download CV",
  },
  badge: {
    hint: "grab the badge — drag to flip it over",
    loading: "loading badge…",
    aria: "Interactive 3D event badge",
  },
  footer: {
    eof: "END OF FILE — © 2026 Felix Ivander · Jakarta Timur, ID",
    updated: "Last updated 2026-08-03 · Built with Next.js",
  },
};

const id: SiteContent = {
  nav: {
    log: "Log",
    registry: "Proyek",
    spec: "Skill",
    kontak: "Kontak",
    status: "Siap kerja",
    aria: "Navigasi",
  },
  hero: {
    eyebrow: "Software Engineer · Backend & Full-Stack · Jakarta, ID",
    title: "Sistem yang andal untuk operasi nyata.",
    sub: "Mahasiswa tingkat akhir Teknik Informatika di Universitas Multimedia Nusantara (IPK 3.86/4.00, lulus 2026) yang membangun aplikasi bisnis full-stack dengan Laravel — REST API, frontend React/Next.js, dan Flutter — dengan fokus yang terus berkembang pada Python dan FastAPI, serta riset sarjana yang menerapkan XGBoost dan SHAP untuk prediksi mortalitas klinis.",
    email: "Kirim email",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "Unduh CV",
  },
  console: {
    cmd: "./felix --status --verbose",
    aria: "Bacaan status karier",
    lines: [
      { label: "OPERATOR", value: "FELIX IVANDER", strong: true },
      { label: "PERAN", value: "BACKEND · FULL-STACK ENGINEER" },
      { label: "LOKASI", value: "JAKARTA TIMUR · ID" },
      { label: "STATUS", value: "SIAP KERJA", hot: true },
      { label: "STACK", value: "LARAVEL · PYTHON · REACT · FLUTTER" },
      { label: "REKAM", value: "3 PROYEK · 4 PERAN · 1 SKRIPSI" },
      { label: "LULUS", value: "2026 · IPK 3.86 / 4.00" },
    ],
    exitLabel: "EXIT",
    exitValue: "0 · OK",
  },
  log: {
    eyebrow: "LOG — Catatan pekerjaan",
    title: "Tempat saya mencatat waktu.",
    entries: [
      {
        role: "Magang Fullstack Engineer",
        org: "PT Sannin Kreasi Indonesia · Tangerang",
        period: "2025-02 → 2025-06",
        points: [
          "Membangun dan memelihara aplikasi bisnis full-stack — Warehouse Management System (WMS) dan Datalog Measuring System — dengan Laravel dan Inertia.js",
          "Mengembangkan endpoint REST API serta fitur backend/frontend yang selaras dengan kebutuhan bisnis",
          "Menangani pengembangan, debugging, dan pemeliharaan tingkat database pada aplikasi yang ada",
        ],
      },
      {
        role: "Pengembang Web",
        org: "Pratama Ban · Freelance · Kota Tegal, ID · Remote",
        period: "2024-07 → 2024-12",
        points: [
          "Bekerja dalam tim pada pengembangan backend dengan Laravel, membangun fitur inti website perusahaan",
          "Membantu proses deployment website dan penyiapan lingkungan agar dapat diakses pengguna",
          "Mendukung troubleshooting dan pemeliharaan, meningkatkan performa dan pengalaman pengguna",
        ],
      },
      {
        role: "Asisten Dosen Laboratorium",
        org: "Universitas Multimedia Nusantara · Kontrak",
        period: "2024-02 → 2025-01",
        points: [
          "Mengajar mahasiswa S1 dasar-dasar pengembangan web dengan Laravel — arsitektur MVC, routing, Eloquent ORM, dan autentikasi",
          "Memandu proyek praktik agar mahasiswa dapat membangun aplikasi web full-stack yang aman dan skalabel",
        ],
      },
      {
        role: "Koordinator Website",
        org: "UMN Festival · Tangerang Selatan",
        period: "2024-02 → 2025-02",
        points: [
          "Mengkoordinasikan pengembangan dan pemeliharaan website panitia bersama tim lintas fungsi",
        ],
      },
    ],
  },
  registry: {
    eyebrow: "REGISTRY — Proyek yang dikerjakan",
    title: "Dibangun dan dikirim.",
    entries: [
      {
        id: "REK-001",
        title: "Warehouse Management System",
        category: "Prototipe bisnis full-stack · PT Sannin Kreasi Indonesia",
        description:
          "Membuat prototipe fungsional platform pelacakan inventaris dan operasi gudang, memvalidasi alur kerja inti yang dapat mengurangi kesalahan input data manual di lantai gudang.",
        tags: ["Laravel", "Inertia.js", "MySQL", "REST API"],
      },
      {
        id: "REK-002",
        title: "Datalog Measuring System",
        category: "Aplikasi bisnis full-stack · PT Sannin Kreasi Indonesia",
        description:
          "Platform pencatatan pengukuran untuk pengumpulan dan analitik data operasional, dibangun dengan antarmuka yang mudah dipakai operator non-teknis sehari-hari.",
        tags: ["Laravel", "Database Design", "Data Analytics"],
      },
      {
        id: "REK-003",
        title: "Website UMN Festival",
        category: "Portal acara · Panitia UMN Festival",
        description:
          "Pusat informasi resmi panitia UMN Festival — mengoordinasikan pengembangan dan memeliharanya sepanjang siklus acara bersama tim lintas fungsi.",
        tags: ["Laravel", "Team Coordination", "Web"],
      },
    ],
  },
  research: {
    eyebrow: "RESEARCH — Karya skripsi",
    title: "Penelitian sarjana.",
    cohort: "Kohort MIMIC-IV · luaran mortalitas 28 hari",
    name: "Prediksi Mortalitas pada Pasien Kanker dengan Sepsis",
    points: [
      "Menerapkan XGBoost dan Random Forest untuk memprediksi mortalitas 28 hari pada pasien kanker dengan sepsis",
      "Menggunakan SHAP untuk interpretasi model yang dapat dijelaskan",
      "Membangun pipeline penjelasan dan evaluasi berbasis LLM untuk pembuatan narasi klinis",
    ],
    methods: "Metode",
    dataset: "Dataset",
    datasetValue: "MIMIC-IV · Rekam medis ICU",
  },
  spec: {
    eyebrow: "SPEC — Perangkat & keterampilan",
    title: "Yang saya pakai.",
    groups: [
      {
        name: "Bahasa Pemrograman",
        techs: ["Python", "PHP", "JavaScript", "TypeScript", "Java", "Dart", "HTML/CSS"],
      },
      { name: "Backend", techs: ["Laravel", "FastAPI", "REST API", "Node.js"] },
      { name: "Frontend & Mobile", techs: ["React", "Next.js", "Inertia.js", "Flutter"] },
      { name: "Database", techs: ["PostgreSQL", "MySQL", "SQLite", "Firebase"] },
      {
        name: "DevOps & Tools",
        techs: ["Docker", "Git", "Nginx", "Ubuntu VPS", "Postman", "Linux"],
      },
      { name: "Machine Learning", techs: ["XGBoost", "Random Forest", "SHAP", "LLM Integration"] },
    ],
  },
  credentials: {
    eyebrow: "CREDENTIALS — Pendidikan & sertifikasi",
    title: "Di atas kertas.",
    entries: [
      {
        eyebrow: "Pendidikan",
        title: "S1 Teknik Informatika",
        sub: "Universitas Multimedia Nusantara · Lulus 2026",
        body: "IPK 3.86 / 4.00. Mata kuliah: pemrograman web, OOP, sistem basis data, AI, machine learning, sistem pakar, cloud & keamanan siber, secure coding.",
      },
      {
        eyebrow: "Sertifikasi",
        title: "Jalur Pengembang Flutter",
        sub: "Dicoding Indonesia · Jul 2025 – Nov 2025",
        body: "Program intensif mencakup Flutter, Dart, fundamental pengembangan perangkat lunak, prinsip SOLID, dan integrasi ML dasar.",
      },
      {
        eyebrow: "Bahasa",
        title: "Bahasa Indonesia · English",
        sub: "Komunikasi kerja",
        body: "Bahasa Indonesia — penutur asli. Bahasa Inggris — sangat baik, digunakan sehari-hari dalam kode, dokumen, dan komunikasi klien.",
      },
    ],
  },
  cta: {
    title: "Mari bangun sesuatu yang andal.",
    email: "Kirim email",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "Unduh CV",
  },
  badge: {
    hint: "pegang badge — seret untuk membaliknya",
    loading: "memuat badge…",
    aria: "Badge acara 3D interaktif",
  },
  footer: {
    eof: "AKHIR FILE — © 2026 Felix Ivander · Jakarta Timur, ID",
    updated: "Diperbarui 2026-08-03 · Dibuat dengan Next.js",
  },
};

export const content: Record<Lang, SiteContent> = { en, id };
