import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, MapPin, Mail, Github, Linkedin, 
  FileText, GraduationCap, Link as LinkIcon, 
  Menu, X, ExternalLink, Code, Database, 
  ChevronRight, Award, BookOpen, Layers, Image as ImageIcon,
  PlayCircle, Star, GitFork, Eye, EyeOff, Sliders, Check, Maximize2,
  Zap, Image, Film
} from 'lucide-react';

// --- VISUALIZATION COMPONENT: LOSS LANDSCAPE ---
const LossLandscapeBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Much more transparent lines for readability
      ctx.strokeStyle = darkMode ? 'rgba(139, 92, 246, 0.08)' : 'rgba(76, 29, 149, 0.04)'; 
      ctx.lineWidth = 1;

      const width = canvas.width;
      const height = canvas.height;
      
      // Tighter grid for more detail (more "local minima")
      const step = 40; 
      const cols = Math.ceil(width / step) + 4;
      const rows = Math.ceil(height / step) + 4;
      
      const center = { x: width / 2, y: height / 2 };
      
      ctx.beginPath();

      // Draw Grid
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const gx = (x - cols / 2) * step;
          const gy = (y - rows / 2) * step;
          
          // --- Complex Loss Landscape Function ---
          const slowTime = time * 0.0005;
          
          const z = 
            Math.sin(gx * 0.003 + slowTime) * 60 + 
            Math.cos(gy * 0.003 + slowTime) * 60 +
            Math.sin(gx * 0.01 - gy * 0.01 + slowTime * 2) * 15 +
            Math.cos(gx * 0.005 + gy * 0.005) * 10;

          // Simple Isometric Projection
          const isoX = center.x + (gx - gy) * 0.7;
          const isoY = center.y + (gx + gy) * 0.35 - z * 0.6;

          if (x === 0) ctx.moveTo(isoX, isoY);
          else ctx.lineTo(isoX, isoY);
        }
      }
      ctx.stroke();

      // Transverse lines
      ctx.beginPath();
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const gx = (x - cols / 2) * step;
          const gy = (y - rows / 2) * step;
          
          const slowTime = time * 0.0005;
          
          const z = 
            Math.sin(gx * 0.003 + slowTime) * 60 + 
            Math.cos(gy * 0.003 + slowTime) * 60 +
            Math.sin(gx * 0.01 - gy * 0.01 + slowTime * 2) * 15 +
            Math.cos(gx * 0.005 + gy * 0.005) * 10;

          const isoX = center.x + (gx - gy) * 0.7;
          const isoY = center.y + (gx + gy) * 0.35 - z * 0.6;

          if (y === 0) ctx.moveTo(isoX, isoY);
          else ctx.lineTo(isoX, isoY);
        }
      }
      ctx.stroke();

      time += 1; 
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
};

// --- DATA CONFIGURATION ---
const USER_DATA = {
  name: "Ahmad Arrabi",
  title: "PhD Student in Computer Science",
  university: "University of Vermont",
  advisor: "Prof. Safwan Wshah",
  email: "ahmad.arrabi@uvm.edu",
  location: "Burlington, VT",
  bio: (
    <span>
      I am a 3rd year computer science Ph.D. student at the <a href="https://myuvm.uvm.edu/" target="_blank" rel="noreferrer" className="font-semibold text-violet-900 dark:text-violet-300 hover:underline">University of Vermont</a>, working with <a href="https://www.wshahaigroup.com/" target="_blank" rel="noreferrer" className="font-semibold text-violet-900 dark:text-violet-300 hover:underline">Prof. Safwan Wshah</a>. My research interest is in <b>generative models</b>, <b>cross-view synthesis</b>, and <b>computer assisted interventions</b>.
    </span>
  ),
  bio_secondary: (
    <span>
      Right now I’m focusing on <b>multi-modal diffusion models</b>, finding ways to allow <b>unconditional joint generation</b> instead of the traditional conditional unimodal methods like text conditioning. At the same time, I’m working on medical imaging applications, particularly in <b>computer assisted interventions</b>. I got hooked on optimizing fluoroscopy control and autonomously guiding C-arms and biplanes, mainly for neurointerventions.
    </span>
  ),
  links: {
    github: "https://github.com/AhmadArrabi",
    linkedin: "https://www.linkedin.com/in/Ahmad-Arrabi/",
    scholar: "https://scholar.google.com/citations?user=rpg3l8QAAAAJ",
    orcid: "https://orcid.org/0000-0001-9482-4964",
    semantic: "https://www.semanticscholar.org/author/Ahmad-Arrabi/2315298518"
  },
  reviews: [
    "IPCAI 2026", "ECAI 2025", "Pattern Recognition Letters"
  ]
};

const RESEARCH_INTERESTS = [
  "Generative Models",
  "Computer Assisted Interventions",
  "Medical Imaging",
  "Multi-Modal Diffusion",
  "Cross-View Synthesis",
  "Deep Learning Applications"
];

const NEWS = [
  { date: "Nov 19, 2024", text: <span>I attended <a href="https://rise-miccai.org/event/ws2025/" target="_blank" rel="noreferrer" className="text-violet-900 dark:text-violet-300 hover:underline font-bold">RISE-MICCAI Winter School 2025</a>.</span> },
  { date: "Oct 19, 2025", text: <span>Our paper "Automated C-Arm Positioning via Conformal Landmark Localization" got accepted at the <a href="#" className="text-violet-900 dark:text-violet-300 hover:underline font-bold">Workshop on Advanced Perception for Autonomous Healthcare (APAH)</a> at ICCV!</span> },
  { date: "Sep 15, 2025", text: "I passed my qualifying exams!" },
  { date: "Feb 22, 2025", text: <span>I was invited to the <a href="#" className="text-violet-900 dark:text-violet-300 hover:underline font-bold">1st International Workshop on Video Surveillance Systems in Smart Cities!</a> I will be presenting my most recent paper in WACV!</span> },
  { date: "Jan 02, 2025", text: <span>We got a paper accepted in <a href="#" className="text-violet-900 dark:text-violet-300 hover:underline font-bold">ISBI 2025!</a></span> },
  { date: "Dec 17, 2024", text: <span>Our lab will be leading a tutorial session on <a href="#" className="text-violet-900 dark:text-violet-300 hover:underline font-bold">cross-view geolocalization at WACV 2025!</a> Join us!</span> },
  { date: "Nov 04, 2024", text: <span>We got a paper accepted in <a href="#" className="text-violet-900 dark:text-violet-300 hover:underline font-bold">WACV 2025!</a></span> }
];

const PUBLICATIONS = [
  {
    id: 1,
    selected: true,
    title: "Cross-View Meets Diffusion: Aerial Image Synthesis with Geometry and Text Guidance",
    authors: "A. Arrabi*, X. Zhang*, W. Sultani, C. Chen, S. Wshah",
    venue: "WACV 2025",
    year: "2025",
    teaserColor: "bg-purple-100 dark:bg-purple-900/30",
    abstract: "A novel framework integrating geometry and text guidance into diffusion models for high-fidelity aerial image synthesis from cross-view inputs.",
    links: { 
      pdf: "https://openaccess.thecvf.com/content/WACV2025/html/Arrabi_Cross-View_Meets_Diffusion_Aerial_Image_Synthesis_with_Geometry_and_Text_WACV_2025_paper.html", 
      website: "https://ahmadarrabi.github.io/GPG2A_web",
      arxiv: "https://arxiv.org/abs/2408.04224",
      code: "https://github.com/AhmadArrabi/GPG2A",
      demo: "https://huggingface.co/spaces/ahmadarrabi/test_sketch"
    }
  },
  {
    id: 2,
    selected: true,
    title: "Automated C-Arm Positioning via Conformal Landmark Localization",
    authors: "A. Arrabi, J. H. Jung, J. Luo, N. Franssen, S. Raymond, S. Wshah",
    venue: "ICCV Workshops 2025",
    year: "2025",
    teaserColor: "bg-indigo-100 dark:bg-indigo-900/30",
    abstract: "Proposing a conformal landmark localization framework for automated C-Arm positioning to assist in medical interventions with uncertainty quantification.",
    links: { 
      code: "https://github.com/AhmadArrabi/C_arm_guidance_APAH",
      arxiv: "https://arxiv.org/abs/2510.16160",
      pdf: "https://openaccess.thecvf.com/content/ICCV2025W/APAH/html/Arrabi_Automated_C-Arm_Positioning_via_Conformal_Landmark_Localization_ICCVW_2025_paper.html"
    }
  },
  {
    id: 3,
    selected: true,
    title: "C-Arm Guidance: a Self-Supervised Approach to Automated Positioning During Stroke Thrombectomy",
    authors: "A. Arrabi*, J. H. Jung*, J. Le, A. H. Nguyen, J. Reed, E. Stahl, N. T. Franssen, S. B. Raymond, S. Wshah",
    venue: "ISBI 2025",
    year: "2025",
    teaserColor: "bg-teal-100 dark:bg-teal-900/30",
    abstract: "A self-supervised learning approach for automated C-Arm positioning during stroke thrombectomy, significantly reducing radiation exposure.",
    links: { 
      code: "https://github.com/AhmadArrabi/C_arm_guidance",
      pdf: "https://ieeexplore.ieee.org/document/10980945",
      arxiv: "https://www.arxiv.org/abs/2510.16145"
    }
  },
  {
    id: 4,
    selected: false,
    title: "A reinforcement learning-based reverse-parking system for autonomous vehicles",
    authors: "A. Al-Mousa, A. Arrabi, H. Daoud",
    venue: "IET Intelligent Transport Systems",
    year: "2025",
    teaserColor: "bg-amber-100 dark:bg-amber-900/30",
    abstract: "A robust reinforcement learning system utilizing Proximal Policy Optimization for efficient and safe autonomous vehicle reverse parking.",
    links: { 
      pdf: "https://ietresearch.onlinelibrary.wiley.com/doi/pdf/10.1049/itr2.12614"
    }
  }
];

const EXPERIENCES = [
  {
    id: 1,
    role: "Graduate Research Assistant",
    org: "University of Vermont",
    period: "2022 - Present",
    desc: (
      <div className="space-y-4 text-base">
        <p>
          Carried out research in <b>generative models</b> and <b>applied deep learning</b>, managing full projects lifecycles from ideation to complete implementaion. My work has recently pivoted towards <b>medical interventions</b> particularly in autonomous C-arm control.
        </p>
        <ul className="list-disc list-outside ml-4 space-y-2 marker:text-violet-900 dark:marker:text-violet-400">
          <li>
            <b>Interdisciplinary Collaboration:</b> Worked with experts from the <b>Cleveland Clinic</b> to develop computer-assisted intervention <i>in vivo</i> systems, bridging the gap between deep learning and clinical need.
          </li>
          <li>
            <b>High-Volume Experimentation:</b> I maintain a rigorous experimental workflow, running an average of <b>5-10 experiments per week</b>. I have extensive experience managing jobs and resources on <b>HPC clusters using Slurm</b>.
          </li>
          <li>
            <b>End-to-End Research:</b> I start projects from scratch, taking raw ideas and formulating them into research problems, ultimately leading execution into fully functioning open-source projects and papers.
          </li>
          <li>
            <b>Academic Leadership:</b> Assisted advisor in <b>grant writing</b> and actively contribute to the community as a reviewer for top-tier venues.
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    role: "BSc in Computer Engineering",
    org: "Princess Sumaya University for Technology",
    period: "2017 - 2022",
    desc: (
      <div className="space-y-2 text-base">
        <p>
          Located in Amman, Jordan. Gained initial footing in research as an Undergraduate Researcher.
        </p>
        <ul className="list-disc list-outside ml-4 space-y-1 marker:text-violet-900 dark:marker:text-violet-400">
            <li>Developed <b>Reinforcement Learning</b> agents for autonomous parking systems.</li>
            <li>Executed full <b>Sim2Real transfer</b>: Validated policies in simulation and successfully deployed them on physical hardware using NVIDIA Jetson Nano.</li>
        </ul>
      </div>
    )
  }
];

// NOTE: Items with 'assets' are interactive. Items with 'asset' are static.
// Structure includes separate paths for GIF (dynamic) and PNG (static) for interactive items.
const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Artwork",
    title: "My Face",
    desc: "Graduating with a smile",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    interactive: true,
    assets: {
      ref: "./assets/gallery/myface/condition.png",
      // Format: { gif: 'path.gif', png: 'path.png' }
      abstract: { gif: "./assets/gallery/myface/abstract.gif", png: "./assets/gallery/myface/abstract.png" }, // Fallback
      weak: { gif: "./assets/gallery/myface/weak.gif", png: "./assets/gallery/myface/weak.png" },
      medium: { gif: "./assets/gallery/myface/med.gif", png: "./assets/gallery/myface/med.png" },
      strong: { gif: "./assets/gallery/myface/strong.gif", png: "./assets/gallery/myface/strong.png" }
    }
  },
  {
    id: 2,
    category: "Artwork",
    title: "5 Km",
    desc: "Fall in Vermont",
    color: "bg-rose-100 dark:bg-rose-900/30",
    interactive: true,
    assets: {
      ref: "./assets/gallery/5Km/condition.png",
      abstract: { gif: "./assets/gallery/5Km/abstract.gif", png: "./assets/gallery/5Km/abstract.png" },
      weak: { gif: "./assets/gallery/5Km/weak.gif", png: "./assets/gallery/5Km/weak.png" },
      medium: { gif: "./assets/gallery/5Km/med.gif", png: "./assets/gallery/5Km/med.png" },
      strong: { gif: "./assets/gallery/5Km/strong.gif", png: "./assets/gallery/5Km/strong.png" }
    }
  },
  {
    id: 3,
    category: "Artwork",
    title: "Overstepping is allowed",
    desc: "The best two software engineers in the MENA region!",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    interactive: true,
    assets: {
      ref: "./assets/gallery/reemaandhussein/condition.png",
      abstract: { gif: "./assets/gallery/reemaandhussein/abstract.gif", png: "./assets/gallery/reemaandhussein/abstract.png" },
      weak: { gif: "./assets/gallery/reemaandhussein/weak.gif", png: "./assets/gallery/reemaandhussein/weak.png" },
      medium: { gif: "./assets/gallery/reemaandhussein/med.gif", png: "./assets/gallery/reemaandhussein/med.png" },
      strong: { gif: "./assets/gallery/reemaandhussein/strong.gif", png: "./assets/gallery/reemaandhussein/strong.png" }
    }
  },
  {
    id: 4,
    category: "Artwork",
    title: "The Monument",
    desc: "A trip through history",
    color: "bg-amber-100 dark:bg-amber-900/30",
    interactive: true,
    assets: {
      ref: "./assets/gallery/themonument/condition.png",
      abstract: { gif: "./assets/gallery/themonument/abstract.gif", png: "./assets/gallery/themonument/abstract.png" },
      weak: { gif: "./assets/gallery/themonument/weak.gif", png: "./assets/gallery/themonument/weak.png" },
      medium: { gif: "./assets/gallery/themonument/med.gif", png: "./assets/gallery/themonument/med.png" },
      strong: { gif: "./assets/gallery/themonument/strong.gif", png: "./assets/gallery/themonument/strong.png" }
    }
  },
  {
    id: 5,
    category: "Artwork",
    title: "Chopper",
    desc: "Tony Tony Copper, a legend",
    color: "bg-cyan-100 dark:bg-cyan-900/30",
    interactive: true,
    assets: {
      ref: "./assets/gallery/chopper/condition.png",
      abstract: { gif: "./assets/gallery/chopper/abstract.gif", png: "./assets/gallery/chopper/abstract.png" },
      weak: { gif: "./assets/gallery/chopper/weak.gif", png: "./assets/gallery/chopper/weak.png" },
      medium: { gif: "./assets/gallery/chopper/med.gif", png: "./assets/gallery/chopper/med.png" },
      strong: { gif: "./assets/gallery/chopper/strong.gif", png: "./assets/gallery/chopper/strong.png" }
    }
  },
  {
    id: 6,
    category: "Artwork", // Changed from Failure Cases per request
    title: "Where?",
    desc: "I removed some humans with some cheap blurring editing tool",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: true,
    assets: {
      ref: "./assets/gallery/where/condition.png",
      abstract: { gif: "./assets/gallery/where/abstract.gif", png: "./assets/gallery/where/abstract.png" }, // Fallback
      weak: { gif: "./assets/gallery/where/weak.gif", png: "./assets/gallery/where/weak.png" },
      medium: { gif: "./assets/gallery/where/med.gif", png: "./assets/gallery/where/med.png" },
      strong: { gif: "./assets/gallery/where/strong.gif", png: "./assets/gallery/where/strong.png" }
    }
  },
  {
    id: 7,
    category: "Artwork", // Changed from Failure Cases per request
    title: "Church Street",
    desc: "Downtown Burlington 29th November 2025 8:15:43 pm",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: true,
    assets: {
      ref: "./assets/gallery/churchstreet/condition.png",
      abstract: { gif: "./assets/gallery/churchstreet/abstract.gif", png: "./assets/gallery/churchstreet/abstract.png" }, // Fallback
      weak: { gif: "./assets/gallery/churchstreet/weak.gif", png: "./assets/gallery/churchstreet/weak.png" },
      medium: { gif: "./assets/gallery/churchstreet/med.gif", png: "./assets/gallery/churchstreet/med.png" },
      strong: { gif: "./assets/gallery/churchstreet/strong.gif", png: "./assets/gallery/churchstreet/strong.png" }
    }
  },
  {
    id: 8,
    category: "Artwork", // Changed from Failure Cases per request
    title: "Lava",
    desc: "Lava in north beach Hawaii",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: true,
    assets: {
      ref: "./assets/gallery/lava/condition.png",
      abstract: { gif: "./assets/gallery/lava/abstract.gif", png: "./assets/gallery/lava/abstract.png" }, // Fallback
      weak: { gif: "./assets/gallery/lava/weak.gif", png: "./assets/gallery/lava/weak.png" },
      medium: { gif: "./assets/gallery/lava/med.gif", png: "./assets/gallery/lava/med.png" },
      strong: { gif: "./assets/gallery/lava/strong.gif", png: "./assets/gallery/lava/strong.png" }
    }
  },
  {
    id: 9,
    category: "Artwork", // Changed from Failure Cases per request
    title: "Roots",
    desc: "Jamjoom",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: true,
    assets: {
      ref: "./assets/gallery/roots/condition.png",
      abstract: { gif: "./assets/gallery/roots/abstract.gif", png: "./assets/gallery/roots/abstract.png" }, // Fallback
      weak: { gif: "./assets/gallery/roots/weak.gif", png: "./assets/gallery/roots/weak.png" },
      medium: { gif: "./assets/gallery/roots/med.gif", png: "./assets/gallery/roots/med.png" },
      strong: { gif: "./assets/gallery/roots/strong.gif", png: "./assets/gallery/roots/strong.png" }
    }
  },
  {
    id: 10,
    category: "Artwork", // Changed from Failure Cases per request
    title: "Waterfront",
    desc: "Waterfront, downtown Burlington",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: true,
    assets: {
      ref: "./assets/gallery/waterfront/condition.png",
      abstract: { gif: "./assets/gallery/waterfront/abstract.gif", png: "./assets/gallery/waterfront/abstract.png" }, // Fallback
      weak: { gif: "./assets/gallery/waterfront/weak.gif", png: "./assets/gallery/waterfront/weak.png" },
      medium: { gif: "./assets/gallery/waterfront/med.gif", png: "./assets/gallery/waterfront/med.png" },
      strong: { gif: "./assets/gallery/waterfront/strong.gif", png: "./assets/gallery/waterfront/strong.png" }
    }
  },
  {
    id: 11,
    category: "Cool Generations",
    title: "Head Hunting",
    desc: "One of the many scary outputs when training a model on CelebA-HQ",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/headhunting.png"
  },
  {
    id: 12,
    category: "Cool Generations",
    title: "transcending",
    desc: "Cool looking face generated by mistake",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/budda2.png"
  },
  {
    id: 13,
    category: "Cool Generations",
    title: "transcending Forest",
    desc: "Forest spirit",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/buddah.png"
  },
  {
    id: 14,
    category: "Cool Generations",
    title: "Toy",
    desc: "Mixing chopper with humans",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/chopper.png"
  },
  {
    id: 15,
    category: "Cool Generations",
    title: "Alive Toy",
    desc: "Mixing chopper with humans wow",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/chopper2.png"
  },
  {
    id: 16,
    category: "Cool Generations",
    title: "Group Activity",
    desc: "Neurips",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/group.png"
  },
  {
    id: 17,
    category: "Cool Generations",
    title: "Ice",
    desc: "Mixing vermont snow with faces, icey",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/ice1.png"
  },
  {
    id: 18,
    category: "Cool Generations",
    title: "Icey",
    desc: "Mixing vermont snow with faces, oily",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/ice2.png"
  },
  {
    id: 19,
    category: "Cool Generations",
    title: "Beware",
    desc: "Inverse me",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/beware.gif"
  },
  {
    id: 20,
    category: "Cool Generations",
    title: "Stand Alone",
    desc: "Godsmack, Techno",
    color: "bg-slate-200 dark:bg-slate-800",
    interactive: false,
    asset: "./assets/gallery/cool/stand.png"
  },
];

// --- COMPONENTS ---

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
    <span className="w-1.5 h-8 bg-violet-900 dark:bg-violet-400 rounded-sm inline-block"></span>
    {children}
  </h2>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    primary: "bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-300",
    outline: "border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400"
  };
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${styles[type]}`}>
      {children}
    </span>
  );
};

// --- MAIN APP COMPONENT ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Gallery State
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [selectedArt, setSelectedArt] = useState(null);
  const [artAlignment, setArtAlignment] = useState('medium');
  const [showReference, setShowReference] = useState(false);
  const [artViewMode, setArtViewMode] = useState('dynamic'); // 'static' | 'dynamic'

  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio_dark_mode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_dark_mode', 'false');
    }
  }, [darkMode]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    const subject = `Contact from Portfolio Website`;
    const body = `Hi Ahmad,\n\n${message}\n\nBest regards,\n${name}\n${email}`;
    window.location.href = `mailto:${USER_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    if (!selectedArt) {
      setArtAlignment('medium');
      setShowReference(false);
      setArtViewMode('dynamic'); // Reset to dynamic when closing/opening
    }
  }, [selectedArt]);

  const navItems = [
    { id: 'home', label: 'Home', icon: <MapPin size={20} /> },
    { id: 'publications', label: 'Publications', icon: <BookOpen size={20} /> },
    { id: 'cv', label: 'CV', icon: <Award size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* MAIN COLUMN */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* Hero / Bio */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">{USER_DATA.name}</h1>
                    <p className="text-xl text-violet-900 dark:text-violet-400 font-medium mt-2">{USER_DATA.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-2 text-lg">
                       <GraduationCap size={20} /> {USER_DATA.university}
                    </p>
                  </div>
                  <div className="text-slate-800 dark:text-slate-300 leading-relaxed text-lg space-y-4">
                    <p>{USER_DATA.bio}</p>
                    <p>{USER_DATA.bio_secondary}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {[
                      { href: USER_DATA.links.github, icon: <Github size={20} />, label: "GitHub" },
                      { href: USER_DATA.links.linkedin, icon: <Linkedin size={20} />, label: "LinkedIn" },
                      { href: USER_DATA.links.scholar, icon: <GraduationCap size={20} />, label: "Scholar" },
                      { href: USER_DATA.links.orcid, icon: <FileText size={20} />, label: "ORCID" },
                      { href: USER_DATA.links.semantic, icon: <BookOpen size={20} />, label: "Semantic Scholar" }
                    ].map((link, idx) => (
                      <a key={idx} href={link.href} target="_blank" rel="noreferrer" className="bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 backdrop-blur-sm text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-2 font-bold text-sm px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                        {link.icon} {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* News Section */}
                <div className="space-y-6">
                  <SectionTitle>Latest News</SectionTitle>
                  <div className="h-80 overflow-y-auto pr-2 custom-scrollbar bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    {NEWS.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                        <span className="font-mono text-slate-500 dark:text-slate-400 text-sm w-24 shrink-0 pt-0.5">{item.date}</span>
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Publications (Minimal Text Only) */}
                <div className="space-y-8">
                  <SectionTitle>Selected Publications</SectionTitle>
                  <div className="space-y-6">
                    {PUBLICATIONS.filter(p => p.selected).map(pub => (
                      <div key={pub.id} className="flex flex-col space-y-2 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                         <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{pub.title}</h4>
                         <p className="text-slate-600 dark:text-slate-400 text-sm">{pub.authors}</p>
                         <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-violet-900 dark:text-violet-300 font-bold text-xs uppercase">{pub.venue}</span>
                            <span className="text-slate-400 text-xs font-mono">• {pub.year}</span>
                         </div>
                         <div className="flex gap-3 pt-1">
                            {pub.links.pdf && <a href={pub.links.pdf} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-violet-900 dark:text-slate-400 dark:hover:text-violet-300 flex items-center gap-1 uppercase tracking-wide"><FileText size={14} /> PDF</a>}
                            {pub.links.code && <a href={pub.links.code} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-violet-900 dark:text-slate-400 dark:hover:text-violet-300 flex items-center gap-1 uppercase tracking-wide"><Code size={14} /> Code</a>}
                            {pub.links.website && <a href={pub.links.website} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-violet-900 dark:text-slate-400 dark:hover:text-violet-300 flex items-center gap-1 uppercase tracking-wide"><ExternalLink size={14} /> Website</a>}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-6">
                  <SectionTitle>Service</SectionTitle>
                  <div className="flex flex-col gap-3">
                    <p className="text-slate-600 dark:text-slate-400">I have served as a reviewer for:</p>
                    <div className="flex flex-wrap gap-2">
                      {USER_DATA.reviews.map((rev, idx) => (
                        <Badge key={idx} type="outline">{rev}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDE COLUMN */}
              <div className="lg:col-span-4 space-y-10">
                 {/* Profile Image - Clean */}
                 <div className="w-full aspect-square relative mx-auto lg:mx-0 max-w-sm rounded-xl overflow-hidden shadow-md">
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800">
                      <img src="./assets/main_page/profile.jpg" alt={USER_DATA.name} className="w-full h-full object-cover" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-900 dark:bg-violet-400"></span>
                      Research Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {RESEARCH_INTERESTS.map((interest, idx) => (
                        <Badge key={idx} type="primary">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">Contact</h3>
                    <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                       <input type="text" placeholder="Name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} className="p-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-900 text-sm" />
                       <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} className="p-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-900 text-sm" />
                       <textarea placeholder="Message..." rows={3} value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} className="p-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-900 text-sm"></textarea>
                       <button type="submit" className="flex items-center justify-center gap-2 py-3 px-4 w-full bg-violet-900 hover:bg-violet-800 text-white font-bold rounded-lg transition-colors shadow-md">
                         <Mail size={16} /> Send Email
                       </button>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        );
      
      case 'publications':
        return (
          <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
              <div>
                <SectionTitle>All Publications</SectionTitle>
                <p className="text-slate-500 dark:text-slate-400 -mt-6">Full list of research works.</p>
              </div>
              <a href={USER_DATA.links.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-2 py-2 px-6 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold rounded-lg transition-colors">
                <GraduationCap size={18} /> Google Scholar
              </a>
            </div>
            
            <div className="space-y-8">
              {PUBLICATIONS.map((pub) => (
                <Card key={pub.id} className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex-1 p-6 space-y-3">
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{pub.title}</h3>
                     <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{pub.authors}</p>
                     <div className="flex flex-wrap gap-2 items-center">
                        <span className="bg-violet-100 text-violet-900 dark:bg-violet-900/30 dark:text-violet-300 text-xs font-bold px-2 py-1 rounded-md">{pub.venue}</span>
                        <span className="text-slate-500 text-xs font-mono">{pub.year}</span>
                     </div>
                     
                     <div className="flex flex-wrap gap-3 pt-3">
                        {pub.links.pdf && <a href={pub.links.pdf} target="_blank" rel="noreferrer" className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><FileText size={14} /> PDF</a>}
                        {pub.links.arxiv && <a href={pub.links.arxiv} target="_blank" rel="noreferrer" className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><BookOpen size={14} /> ArXiv</a>}
                        {pub.links.code && <a href={pub.links.code} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><Github size={14} /> Code</a>}
                        {pub.links.demo && <a href={pub.links.demo} target="_blank" rel="noreferrer" className="bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><PlayCircle size={14} /> Demo</a>}
                        {pub.links.website && <a href={pub.links.website} target="_blank" rel="noreferrer" className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><ExternalLink size={14} /> Website</a>}
                     </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'cv':
        return (
          <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
              <SectionTitle>Curriculum Vitae</SectionTitle>
              <button className="flex items-center gap-2 py-2 px-6 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold rounded-lg transition-colors -mt-6">
                 <FileText size={18} /> Download PDF
               </button>
            </div>

            <div className="space-y-16">
               {EXPERIENCES.map((exp) => (
                 <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-900 dark:bg-violet-400 border-4 border-white dark:border-zinc-950"></div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <span className="text-sm font-mono text-violet-900 dark:text-violet-300 font-bold bg-violet-100 dark:bg-violet-900/20 px-3 py-1 rounded-md">{exp.period}</span>
                    </div>
                    <div className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">{exp.org}</div>
                    <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                      {exp.desc}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );

      case 'gallery':
        const filteredItems = galleryFilter === 'All' 
          ? GALLERY_ITEMS 
          : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

        return (
          <div className="space-y-12 animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto space-y-6">
               <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Gallery</h2>
               <p className="text-xl text-slate-700 dark:text-slate-400 leading-relaxed">
                 Working with diffusion models leads to some weirdly unplanned generations that make you question your life choices. Enjoy the following curated collection of outputs, artifacts, and generally amusing images from my experiments.
               </p>
            </div>

            <div className="flex justify-center gap-4 mb-12">
              {['All', 'Artwork', 'Cool Generations'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-6 py-2.5 text-sm font-bold uppercase tracking-widest rounded-lg transition-all ${
                    galleryFilter === filter 
                    ? 'bg-violet-900 text-white shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {filteredItems.map(item => (
                 <div 
                   key={item.id} 
                   onClick={() => setSelectedArt(item)}
                   className="break-inside-avoid bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden cursor-pointer group hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-lg transition-all"
                 >
                    <div className={`w-full h-80 ${item.color} flex items-center justify-center relative`}>
                        {item.assets && item.assets.medium ? (
                           // Default thumbnail for interactive items
                           <img src={item.assets.medium.png} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : item.asset ? (
                           // Static items
                           <img src={item.asset} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                           <ImageIcon size={48} className="text-slate-400 dark:text-slate-600 opacity-50" />
                        )}
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                           <span className="opacity-0 group-hover:opacity-100 bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">View</span>
                        </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                         <Badge>{item.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''} bg-transparent relative`}>
      <LossLandscapeBackground darkMode={darkMode} />
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <span className="font-bold text-lg dark:text-white">Ahmad Arrabi</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-screen relative z-10">
        
        {/* Sidebar Navigation */}
        <aside className={`hidden md:flex fixed left-0 top-0 z-50 h-screen w-20 hover:w-64 transition-all duration-300 ease-in-out flex-col justify-between group bg-white/90 dark:bg-black/90 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 shadow-xl`}>
          <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="p-6 mb-2 flex items-center overflow-hidden whitespace-nowrap">
               <div className="w-8 h-8 flex shrink-0 items-center justify-center bg-violet-900 text-white rounded-lg font-bold text-xl shadow-lg shadow-violet-900/30">AA</div>
               <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider">{USER_DATA.name}</h2>
               </div>
            </div>

            <nav className="flex-1 px-4 space-y-3">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center px-2 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap overflow-hidden
                    ${activeSection === item.id 
                      ? 'bg-violet-50 text-violet-900 dark:bg-violet-900/20 dark:text-violet-300' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }
                  `}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <aside className={`md:hidden fixed top-0 h-screen w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 p-6 z-30 transition-transform duration-300 ease-in-out flex flex-col justify-between ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div>
             <div className="mb-12">
               <div className="w-10 h-10 bg-violet-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">AA</div>
               <h2 className="font-bold text-slate-900 dark:text-white">{USER_DATA.name}</h2>
             </div>
             <nav className="space-y-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-4 px-2 py-2 text-sm font-bold uppercase tracking-widest ${activeSection === item.id ? 'text-violet-900 dark:text-violet-400' : 'text-slate-400 dark:text-slate-500'}`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
             </nav>
           </div>
        </aside>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-8 md:p-16 md:ml-20 overflow-x-hidden transition-all duration-300">
           {renderContent()}
           <footer className="mt-32 pt-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-600 text-sm font-mono uppercase tracking-widest">
              <p>&copy; {new Date().getFullYear()} Ahmad Arrabi. Built with React & Tailwind.</p>
           </footer>
        </main>
      </div>

      {/* GALLERY MODAL - RENDERED OUTSIDE OF MAIN CONTENT FOR FULL SCREEN COVERAGE */}
      {selectedArt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setSelectedArt(null)}>
          <div className="bg-white dark:bg-zinc-900 max-w-7xl w-full h-[90vh] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
             
             {/* Main Image Area */}
             <div className={`w-full h-1/2 md:h-full flex bg-gray-100 dark:bg-black relative border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800`}>
                <button 
                  onClick={() => setSelectedArt(null)} 
                  className="absolute top-4 right-4 md:hidden p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-10"
                >
                  <X size={20} className="text-slate-900" />
                </button>

                {selectedArt.interactive ? (
                    <div className="w-full h-full flex gap-4 p-4">
                        {/* Generated Image */}
                        <div className="relative flex-1 h-full flex items-center justify-center bg-white/50 dark:bg-black/50 rounded-lg border border-slate-200 dark:border-slate-800">
                            <img 
                                src={selectedArt.assets[artAlignment][artViewMode === 'static' ? 'png' : 'gif']} 
                                alt={selectedArt.title}
                                className="max-w-full max-h-full object-contain shadow-md"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                                Alignment: {artAlignment}
                            </div>
                        </div>

                        {/* Reference Image (Conditional) */}
                        {showReference && (
                            <div className="relative flex-1 h-full flex items-center justify-center bg-white/50 dark:bg-black/50 rounded-lg border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-right-4 duration-500">
                                <img 
                                    src={selectedArt.assets.ref} 
                                    alt="Reference"
                                    className="max-w-full max-h-full object-contain shadow-md"
                                />
                                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                                    Reference
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center p-4 w-full h-full flex items-center justify-center">
                       <div className="relative h-full flex items-center justify-center">
                          <img 
                             src={selectedArt.asset} 
                             alt={selectedArt.title}
                             className="max-w-full max-h-full object-contain shadow-xl rounded-lg"
                           />
                       </div>
                    </div>
                )}
             </div>

             {/* Sidebar / Controls */}
             <div className="w-full md:w-1/4 p-8 overflow-y-auto flex flex-col bg-white dark:bg-zinc-900">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">{selectedArt.title}</h3>
                      <Badge>{selectedArt.category}</Badge>
                   </div>
                   <button onClick={() => setSelectedArt(null)} className="hidden md:block p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <X size={24} className="text-slate-500" />
                   </button>
                </div>
                
                <div className="prose dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-10 flex-1">
                  {selectedArt.desc}
                </div>

                {/* Interactive Controls */}
                {selectedArt.interactive && (
                   <div className="space-y-8 border-t border-slate-200 dark:border-slate-800 pt-8 mt-auto">
                      {/* Mode Toggle */}
                      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                         <button 
                           onClick={() => setArtViewMode('dynamic')}
                           className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${artViewMode === 'dynamic' ? 'bg-white dark:bg-zinc-900 text-violet-900 dark:text-violet-300 shadow-sm' : 'text-slate-500'}`}
                         >
                           Dynamic
                         </button>
                         <button 
                           onClick={() => setArtViewMode('static')}
                           className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${artViewMode === 'static' ? 'bg-white dark:bg-zinc-900 text-violet-900 dark:text-violet-300 shadow-sm' : 'text-slate-500'}`}
                         >
                           Static
                         </button>
                      </div>

                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Compare Reference</span>
                         <button onClick={() => setShowReference(!showReference)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${showReference ? 'bg-violet-900 text-white border-violet-900' : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-700'}`}>
                           {showReference ? <Eye size={14} /> : <EyeOff size={14} />} {showReference ? 'ON' : 'OFF'}
                         </button>
                      </div>

                      <div className="transition-opacity duration-200 opacity-100">
                         <div className="flex items-center gap-2 mb-4">
                            <Sliders size={16} className="text-violet-900 dark:text-violet-400" />
                            <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Alignment</span>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                            {['abstract', 'weak', 'medium', 'strong'].map((align) => (
                               <button key={align} onClick={() => setArtAlignment(align)} className={`px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${artAlignment === align ? 'bg-violet-900 text-white border-violet-900 shadow-md' : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-800 hover:border-violet-400'}`}>{align}</button>
                            ))}
                         </div>
                      </div>
                   </div>
                )}
                
                {/* Application specific controls */}
                {selectedArt.category === 'Applications' && (
                    <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-800">
                       <a href="#" className="flex items-center justify-center gap-3 w-full py-4 bg-violet-900 hover:bg-violet-800 text-white rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg">
                          <PlayCircle size={18} /> View Live Demo
                       </a>
                    </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}