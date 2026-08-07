import {
  Globe,
  Cpu,
  Terminal,
  Layers,
  Server,
  Bot,
  Cloud,
  type LucideIcon,
} from 'lucide-react'

export interface ProjectDetail {
  id: string
  slug: string
  fileNo: string
  category: string
  title: string
  subtitle: string
  year: string
  status: string
  image: string
  tags: string[]
  icon: LucideIcon
  color: string
  description: string
  longDescription: string
  features: string[]
  challenges: string[]
  techStack: { name: string; role: string }[]
  timeline: string
  role: string
}

export const projectsData: ProjectDetail[] = [
  {
    id: 'p1',
    slug: 'productivityflow',
    fileNo: 'FILE_01',
    category: 'WEB APPLICATION',
    title: 'ProductivityFlow Management App',
    subtitle: 'Fokus Lebih Baik, Capai Lebih Banyak',
    year: '2026',
    status: 'Active',
    image: '/images/project1.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Kanban'],
    icon: Globe,
    color: '#a855f7',
    description:
      'Platform manajemen produktivitas all-in-one yang membantu pengguna mengelola tugas harian, membangun kebiasaan positif, dan menganalisa produktivitas dengan satu platform intuitif.',
    longDescription:
      'ProductivityFlow adalah aplikasi web manajemen produktivitas yang dirancang untuk membantu pengguna fokus lebih baik dan mencapai lebih banyak. Dilengkapi dengan fitur Kanban board untuk manajemen tugas, Focus Session timer (Pomodoro-style), serta dashboard analitik produktivitas real-time yang menunjukkan peningkatan performa hingga +45%. Aplikasi ini dibangun menggunakan Next.js dengan TypeScript untuk keandalan tipe data, serta Tailwind CSS untuk desain UI yang modern dan responsif.',
    features: [
      'Kanban board interaktif untuk manajemen tugas visual',
      'Focus Session timer dengan teknik Pomodoro (25:00)',
      'Dashboard analitik produktivitas real-time (+45%)',
      'Checklist tugas harian (Tugas Hari Ini)',
      'Dark mode UI premium dengan navigasi intuitif',
      'Fitur "Coba Sekarang" dan "Lihat Demo"',
    ],
    challenges: [
      'Merancang UX yang tidak membuat pengguna overwhelmed dengan fitur',
      'Implementasi real-time sync antar fitur Kanban dan analytics',
      'Optimasi performa dengan banyak komponen interaktif',
    ],
    techStack: [
      { name: 'Next.js', role: 'Framework full-stack React' },
      { name: 'TypeScript', role: 'Type safety & developer experience' },
      { name: 'Tailwind CSS', role: 'Utility-first styling' },
      { name: 'Kanban Logic', role: 'Drag & drop task management' },
    ],
    timeline: 'Jan 2026 — Sekarang',
    role: 'Full-Stack Developer',
  },
  {
    id: 'p2',
    slug: 'z-learn',
    fileNo: 'FILE_02',
    category: 'GAMIFIED LEARNING',
    title: 'A gamified web-based learning platform for Gen Z',
    subtitle: 'Level Up Your Brain, Kill the Brainrot',
    year: '2025',
    status: 'Completed',
    image: '/images/project2.png',
    tags: ['Next.js', 'Gamification', 'AI Quiz', 'Leaderboard'],
    icon: Cpu,
    color: '#10b981',
    description:
      'Z-Learn adalah platform belajar revolusioner yang menggabungkan gamifikasi dan AI untuk membuat Gen Z ketagihan belajar. "Read, recall, battle" — cara paling adiktif untuk benar-benar belajar.',
    longDescription:
      'Z-Learn (Gen Z Learning Revolution) adalah platform web-based learning yang dirancang khusus untuk Gen Z. Dengan tagline "Level Up Your Brain, Kill the Brainrot", platform ini menggunakan pendekatan gamifikasi yang membuat belajar menjadi adiktif. Fitur utama meliputi SKIM 5 Pages untuk membaca cepat, Type Your Recall untuk menguji ingatan, AI Battle Quiz untuk kompetisi berbasis AI, dan Leaderboard global. Dengan 500K+ active learners, 10M+ pages read, dan 95% retention rate, Z-Learn membuktikan bahwa belajar bisa seru.',
    features: [
      'Daily Challenge system dengan 5 level progression',
      'SKIM 5 Pages — speed reading module',
      'Type Your Recall — memory testing engine',
      'AI Battle Quiz — kompetisi melawan AI',
      'Global Leaderboard & ranking system',
      'Current Level tracking real-time',
      'Start Challenge workflow dengan progress bar',
    ],
    challenges: [
      'Merancang mekanik gamifikasi yang benar-benar engaging untuk Gen Z',
      'Integrasi AI untuk generate quiz yang adaptif terhadap level user',
      'Membangun sistem leaderboard real-time yang scalable',
    ],
    techStack: [
      { name: 'Next.js', role: 'Full-stack React framework' },
      { name: 'Gamification Engine', role: 'XP, levels, dan daily challenges' },
      { name: 'AI/ML', role: 'Adaptive quiz generation' },
      { name: 'Real-time DB', role: 'Leaderboard & progress sync' },
    ],
    timeline: 'Mar 2025 — Nov 2025',
    role: 'Full-Stack Developer & UI Designer',
  },
  {
    id: 'p3',
    slug: 'niscahya-portal',
    fileNo: 'FILE_03',
    category: 'COMPANY WEBSITE',
    title: 'SMK Telkom Academic & Student Portal',
    subtitle: 'CV Niscahya Indonesia Cerdas — Penerangan Jalan Umum Tenaga Surya',
    year: '2024',
    status: 'Completed',
    image: '/images/project3.png',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind'],
    icon: Terminal,
    color: '#22c55e',
    description:
      'Website company profile untuk CV Niscahya Indonesia Cerdas, perusahaan yang bergerak di bidang penerangan jalan umum berbasis tenaga surya. Dilengkapi dengan katalog produk, blog, galeri, dan halaman kontak.',
    longDescription:
      'Website ini dibangun untuk CV Niscahya Indonesia Cerdas, sebuah perusahaan yang menyediakan solusi penerangan jalan berbasis tenaga surya yang modern, hemat energi, dan ramah lingkungan. Website menampilkan hero slider dengan foto instalasi lapangan, navigasi multi-halaman (Beranda, Produk, Blog, Kontak, Galeri), serta fitur pencarian unit. Desain bersih dengan tema hijau-putih yang mencerminkan brand eco-friendly perusahaan.',
    features: [
      'Hero image slider dengan auto-play dan navigasi manual',
      'Katalog produk penerangan jalan tenaga surya',
      'Halaman blog untuk artikel dan berita perusahaan',
      'Galeri foto instalasi dan produk',
      'Fitur pencarian unit (search bar)',
      'Responsive design untuk semua perangkat',
    ],
    challenges: [
      'Menampilkan foto produk outdoor dengan kualitas tinggi tanpa memperlambat load time',
      'Merancang UI yang clean namun informatif untuk audiens B2B',
      'Implementasi CMS sederhana untuk update konten mandiri oleh klien',
    ],
    techStack: [
      { name: 'PHP', role: 'Server-side scripting' },
      { name: 'Laravel', role: 'MVC framework' },
      { name: 'MySQL', role: 'Database relasional' },
      { name: 'Tailwind CSS', role: 'Utility-first styling' },
    ],
    timeline: 'Jun 2024 — Des 2024',
    role: 'Full-Stack Developer',
  },
  {
    id: 'p4',
    slug: 'docker-laravel',
    fileNo: 'FILE_04',
    category: 'DEVOPS & CONTAINER',
    title: 'Implementasi Laravel dengan Redis & MySQL Menggunakan Docker',
    subtitle: 'Laravel System Status — Redis + MySQL + Docker',
    year: '2025',
    status: 'Completed',
    image: '/images/project4.png',
    tags: ['Docker', 'Laravel', 'Redis', 'MySQL'],
    icon: Layers,
    color: '#3b82f6',
    description:
      'Proyek DevOps yang mengimplementasikan aplikasi Laravel dalam container Docker dengan integrasi Redis untuk caching dan MySQL sebagai database, lengkap dengan dashboard status system monitoring.',
    longDescription:
      'Proyek ini mengimplementasikan arsitektur container Docker untuk menjalankan aplikasi Laravel yang terintegrasi dengan Redis dan MySQL. Halaman status dashboard menampilkan status koneksi real-time: Redis Status (CONNECTED) dengan cached value, Database Status (CONNECTED) dengan nama database aktif, dan Cache Driver (redis). Aksesibel melalui IP lokal (10.45.1.18:8000/status), membuktikan deployment berhasil di environment Docker. Proyek ini mendemonstrasikan kemampuan DevOps dalam containerization dan orchestration.',
    features: [
      'Docker multi-container setup (Laravel + Redis + MySQL)',
      'System Status Dashboard real-time',
      'Redis caching dengan cached value monitoring',
      'Database connection health check',
      'Cache driver configuration display',
      'Accessible via local network IP',
    ],
    challenges: [
      'Konfigurasi networking antar container Docker',
      'Sinkronisasi environment variable antara Laravel, Redis, dan MySQL',
      'Implementasi health check otomatis untuk monitoring container',
    ],
    techStack: [
      { name: 'Docker', role: 'Containerization platform' },
      { name: 'Laravel', role: 'PHP web application framework' },
      { name: 'Redis', role: 'In-memory caching layer' },
      { name: 'MySQL', role: 'Relational database' },
    ],
    timeline: 'Feb 2025 — Apr 2025',
    role: 'DevOps Engineer',
  },
  {
    id: 'p5',
    slug: 'nginx-loadbalancer',
    fileNo: 'FILE_05',
    category: 'NETWORKING & SERVER',
    title: 'Website Load Balancer Menggunakan Nginx',
    subtitle: 'Cloud Solutions Expert — pandjirizki.my.id',
    year: '2025',
    status: 'Completed',
    image: '/images/project5.png',
    tags: ['Nginx', 'Load Balancer', 'Linux', 'Reverse Proxy'],
    icon: Server,
    color: '#06b6d4',
    description:
      'Portfolio website profesional yang di-deploy dengan Nginx sebagai load balancer dan reverse proxy, mendistribusikan traffic ke multiple backend instances untuk high availability.',
    longDescription:
      'Proyek ini mengimplementasikan Nginx sebagai load balancer untuk mendistribusikan traffic website portfolio (pandjirizki.my.id) ke multiple backend server instances. Website menampilkan profil "Cloud Solutions Expert" dengan expertise di Multi-Cloud Architecture & Strategy, Cloud Migration & Digital Transformation, DevOps & Infrastructure Automation, dan Serverless Computing & Microservices. Konfigurasi Nginx mencakup reverse proxy, SSL termination, dan load balancing algorithm untuk memastikan high availability dan optimal performance.',
    features: [
      'Nginx reverse proxy configuration',
      'Load balancing antar multiple backend',
      'Multi-language support (EN/ID toggle)',
      'Portfolio sections: About, Skills, Projects, Contact',
      'Responsive cloud-themed dark UI design',
      'Custom domain deployment (pandjirizki.my.id)',
    ],
    challenges: [
      'Konfigurasi Nginx upstream untuk distribusi traffic yang merata',
      'Setup SSL certificate untuk custom domain',
      'Optimasi caching strategy untuk static assets',
    ],
    techStack: [
      { name: 'Nginx', role: 'Load balancer & reverse proxy' },
      { name: 'Linux', role: 'Server operating system' },
      { name: 'Load Balancer', role: 'Traffic distribution' },
      { name: 'Reverse Proxy', role: 'Request forwarding' },
    ],
    timeline: 'Mar 2025 — Mei 2025',
    role: 'System Administrator & Cloud Engineer',
  },
  {
    id: 'p6',
    slug: 'chatbot-ai',
    fileNo: 'FILE_06',
    category: 'ARTIFICIAL INTELLIGENCE',
    title: 'Interactive Chatbot AI Engine',
    subtitle: 'Niscahya AI Bot — Floating Chatbot Demo',
    year: '2025',
    status: 'Active',
    image: '/images/project6.png',
    tags: ['AI Chatbot', 'Python', 'React', 'FastAPI'],
    icon: Bot,
    color: '#f59e0b',
    description:
      'Chatbot AI interaktif bernama "Niscahya AI Bot" yang menggunakan teknologi AI + RAG untuk menjawab pertanyaan secara cepat dan kontekstual, diintegrasikan sebagai floating widget pada website.',
    longDescription:
      'Niscahya AI Bot adalah chatbot AI yang diimplementasikan sebagai floating widget pada website. Menggunakan backend FastAPI (Python) dengan endpoint /api/chat, chatbot ini memanfaatkan teknologi AI + RAG (Retrieval-Augmented Generation) untuk memberikan jawaban yang cepat dan kontekstual. UI menampilkan "AI Chat Test" page dengan floating green button yang membuka chat window, input field "Ketik pesan...", dan tombol "Kirim" berwarna merah. Bot menyapa dengan "Halo, tulis pertanyaan kamu di bawah." — memberikan pengalaman chatting yang natural.',
    features: [
      'Floating chat widget (expandable/collapsible)',
      'AI + RAG powered responses',
      'FastAPI backend endpoint (/api/chat)',
      'Real-time message streaming',
      'Clean chat UI dengan bubble messages',
      'Quick response greeting system',
    ],
    challenges: [
      'Integrasi RAG pipeline untuk konteks yang akurat',
      'Optimasi latency response dari AI model',
      'Desain floating widget yang tidak mengganggu UX utama',
    ],
    techStack: [
      { name: 'Python', role: 'Backend AI logic' },
      { name: 'FastAPI', role: 'REST API framework' },
      { name: 'React', role: 'Frontend chat widget' },
      { name: 'AI + RAG', role: 'Retrieval-augmented generation' },
    ],
    timeline: 'Apr 2025 — Jul 2025',
    role: 'AI Engineer & Full-Stack Developer',
  },
  {
    id: 'p7',
    slug: 'vps-cloudflare',
    fileNo: 'FILE_07',
    category: 'CLOUD & DEPLOYMENT',
    title: 'Deploy HTTPS Server via VPS & Tunneling Cloudflare',
    subtitle: 'Cloud Engineer Portfolio — pandjirizki.com',
    year: '2025',
    status: 'Completed',
    image: '/images/project7.png',
    tags: ['Cloudflare', 'VPS', 'Tunneling', 'HTTPS / SSL'],
    icon: Cloud,
    color: '#8b5cf6',
    description:
      'Deployment portfolio website profesional ke VPS dengan HTTPS melalui Cloudflare Tunnel, menampilkan profil Junior Cloud Engineer dengan expertise di cloud architecture dan DevOps.',
    longDescription:
      'Proyek ini mendeploy website portfolio (pandjirizki.com) ke VPS dengan HTTPS secure connection menggunakan Cloudflare Tunnel. Website menampilkan profil Muhammad Pandji Ar Rizky Munib sebagai "Junior Cloud Engineer" dengan tagline "Transforming businesses through cloud innovation". Foto profil dengan glowing border effect, dan expertise cards mencakup Multi-Cloud Architecture & Strategy, Cloud Migration & Digital Transformation, DevOps & Infrastructure Automation, dan Serverless Computing & Microservices. Background menampilkan animated particles untuk efek premium.',
    features: [
      'Cloudflare Tunnel secure connection setup',
      'VPS deployment & server configuration',
      'HTTPS/SSL automatic certificate management',
      'Animated particle background effect',
      'Glowing profile image border effect',
      'Multi-language support (EN/ID)',
    ],
    challenges: [
      'Konfigurasi Cloudflare Tunnel untuk routing yang benar',
      'Setup DNS records dan SSL certificate',
      'Optimasi server VPS untuk performance website',
    ],
    techStack: [
      { name: 'Cloudflare', role: 'CDN & tunnel provider' },
      { name: 'VPS', role: 'Virtual private server hosting' },
      { name: 'Tunneling', role: 'Secure connection bridge' },
      { name: 'HTTPS / SSL', role: 'Encryption & security' },
    ],
    timeline: 'Mei 2025 — Jul 2025',
    role: 'Cloud Engineer',
  },
  {
    id: 'p8',
    slug: 'virtual-museum',
    fileNo: 'FILE_08',
    category: '3D GRAPHICS & WEBGL',
    title: 'Interactive 3D Virtual Museum',
    subtitle: 'TelkomVerse — SMK Telkom Sidoarjo Virtual Museum',
    year: '2026',
    status: 'Completed',
    image: '/images/project8.png',
    tags: ['Three.js', 'React Three Fiber', 'WebGL', 'Blender'],
    icon: Cpu,
    color: '#ec4899',
    description:
      'TelkomVerse adalah museum virtual 3D interaktif untuk SMK Telkom Sidoarjo. Pengunjung dapat menjelajahi ruang pameran 3D, melihat karya siswa, dan menyelesaikan misi "Jelajahi Tata Tertib" dengan navigasi first-person.',
    longDescription:
      'TelkomVerse adalah pengalaman museum virtual 3D yang dibangun untuk SMK Telkom Sidoarjo. Menampilkan interior museum yang detail dengan pencahayaan neon merah-putih, lantai reflektif marmer, dan display pedestals untuk pameran karya. HUD menampilkan navigasi compass, progress tracker "SELESAI 0% — 0 dari 10 pameran", dan misi "Jelajahi Tata Tertib 0/10". Pengunjung dapat berjalan bebas dalam environment 3D first-person, berinteraksi dengan exhibit, dan melacak progres eksplorasi mereka. Panel sidebar menampilkan daftar ISI museum untuk navigasi cepat.',
    features: [
      'Full 3D walkable museum environment',
      'First-person navigation dengan compass',
      'Mission system: "Jelajahi Tata Tertib" (0/10)',
      'Progress tracker (0% — 0 dari 10 pameran)',
      'Neon lighting effects (merah & putih)',
      'Reflective marble floor rendering',
      'Interactive exhibit pedestals',
      'Audio controls & settings menu',
      'Sidebar museum ISI (table of contents)',
    ],
    challenges: [
      'Optimasi rendering 3D untuk performa browser yang smooth',
      'Implementasi collision detection untuk navigasi first-person',
      'Asset creation dan texturing untuk interior museum realistis',
      'Desain lighting system yang atmospheric namun performant',
    ],
    techStack: [
      { name: 'Three.js', role: '3D rendering engine' },
      { name: 'React Three Fiber', role: 'React wrapper untuk Three.js' },
      { name: 'WebGL', role: 'Hardware-accelerated graphics' },
      { name: 'Blender', role: '3D modeling & asset creation' },
    ],
    timeline: 'Jan 2026 — Jun 2026',
    role: '3D Developer & Designer',
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug)
}
