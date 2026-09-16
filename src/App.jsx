import React, { useState } from 'react';
import { 
  Github, Linkedin, FileText, GraduationCap,
  X, ExternalLink, Code, BookOpen, Image as ImageIcon,
  PlayCircle, Eye, EyeOff, Sliders
} from 'lucide-react';

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
      I am a 4th year computer science Ph.D. student at the <a href="https://myuvm.uvm.edu/" target="_blank" rel="noreferrer" className="font-semibold text-slate-800 hover:underline">University of Vermont</a>, working with <a href="https://www.wshahaigroup.com/" target="_blank" rel="noreferrer" className="font-semibold text-slate-800 hover:underline">Prof. Safwan Wshah</a>. My research interest is in <b>generative models</b>, <b>cross-view synthesis</b>, and <b>computer assisted interventions</b>.
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
    "IPCAI 2026", "ECAI 2025", "IJCARS", "Pattern Recognition", "Pattern Recognition Letters"
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

const PUBLICATIONS = [
  {
    id: 1,
    selected: true,
    title: "Cross-View Meets Diffusion: Aerial Image Synthesis with Geometry and Text Guidance",
    authors: "A. Arrabi*, X. Zhang*, W. Sultani, C. Chen, S. Wshah",
    venue: "WACV 2025",
    year: "2025",
    teaserColor: "bg-purple-100",
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
    teaserColor: "bg-indigo-100",
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
    teaserColor: "bg-teal-100",
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
    teaserColor: "bg-amber-100",
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
    period: "2023 - Present"
  },
  {
    id: 2,
    role: "BSc in Computer Engineering",
    org: "Princess Sumaya University for Technology",
    period: "2017 - 2022"
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
    color: "bg-indigo-100",
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
    color: "bg-rose-100",
    interactive: true,
    assets: {
      ref: "./assets/gallery/5Km/condition.png",
      abstract: { gif: "./assets/gallery/5Km/abstract.gif", png: "./assets/gallery/5Km/abstract.png" },
      weak: { gif: "./assets/gallery/5Km/weak.gif", png: "./assets/gallery/5Km/weak.png" },
      medium: { gif: "./assets/gallery/5Km/med.gif", png: "./assets/gallery/5Km/med.png" },
      strong: { gif: "./assets/gallery/5Km/strong.gif", png: "./assets/gallery/5Km/strong.png" }
    }
  },
  //{
  //  id: 3,
  //  category: "Artwork",
  //  title: "Overstepping is allowed",
  //  desc: "The best two software engineers in the MENA region!",
  //  color: "bg-emerald-100",
  //  interactive: true,
  //  assets: {
  //    ref: "./assets/gallery/reemaandhussein/condition.png",
  //    abstract: { gif: "./assets/gallery/reemaandhussein/abstract.gif", png: "./assets/gallery/reemaandhussein/abstract.png" },
  //    weak: { gif: "./assets/gallery/reemaandhussein/weak.gif", png: "./assets/gallery/reemaandhussein/weak.png" },
  //    medium: { gif: "./assets/gallery/reemaandhussein/med.gif", png: "./assets/gallery/reemaandhussein/med.png" },
  //    strong: { gif: "./assets/gallery/reemaandhussein/strong.gif", png: "./assets/gallery/reemaandhussein/strong.png" }
  //  }
  //},
  {
    id: 4,
    category: "Artwork",
    title: "The Monument",
    desc: "A trip through history",
    color: "bg-amber-100",
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
    desc: "Tony",
    color: "bg-cyan-100",
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
    color: "bg-slate-200",
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
    color: "bg-slate-200",
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
    color: "bg-slate-200",
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
    color: "bg-slate-200",
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
    color: "bg-slate-200",
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
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/headhunting.png"
  },
  {
    id: 12,
    category: "Cool Generations",
    title: "transcending",
    desc: "Cool looking face generated by mistake",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/budda2.png"
  },
  {
    id: 13,
    category: "Cool Generations",
    title: "transcending Forest",
    desc: "Forest spirit",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/buddah.png"
  },
  {
    id: 14,
    category: "Cool Generations",
    title: "Toy",
    desc: "Mixing chopper with humans",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/chopper.png"
  },
  {
    id: 15,
    category: "Cool Generations",
    title: "Alive Toy",
    desc: "Mixing chopper with humans wow",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/chopper2.png"
  },
  {
    id: 16,
    category: "Cool Generations",
    title: "Group Activity",
    desc: "Neurips",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/group.png"
  },
  {
    id: 17,
    category: "Cool Generations",
    title: "Ice",
    desc: "Mixing vermont snow with faces, icey",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/ice1.png"
  },
  {
    id: 18,
    category: "Cool Generations",
    title: "Icey",
    desc: "Mixing vermont snow with faces, oily",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/ice2.png"
  },
  {
    id: 20,
    category: "Cool Generations",
    title: "Stand Alone",
    desc: "Godsmack, Techno",
    color: "bg-slate-200",
    interactive: false,
    asset: "./assets/gallery/cool/stand.png"
  },
];

// --- COMPONENTS ---

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
    <span className="w-1.5 h-8 bg-slate-800 rounded-sm inline-block"></span>
    {children}
  </h2>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-slate-100 text-slate-800",
    outline: "border border-slate-300 text-slate-600"
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
  // Gallery State
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [selectedArt, setSelectedArt] = useState(null);
  const [artAlignment, setArtAlignment] = useState('medium');
  const [showReference, setShowReference] = useState(false);
  const [artViewMode, setArtViewMode] = useState('dynamic'); // 'static' | 'dynamic'

  const openArtwork = (item) => {
    setArtAlignment('medium');
    setShowReference(false);
    setArtViewMode('dynamic');
    setSelectedArt(item);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* MAIN COLUMN */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Hero / Bio */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">{USER_DATA.name}</h1>
                    <p className="text-xl text-slate-800 font-medium mt-2">PhD Student in Computer Science at the University of Vermont</p>
                  </div>
                  <div className="text-slate-800 leading-relaxed text-lg space-y-4">
                    <p>{USER_DATA.bio}</p>
                    <p>{USER_DATA.bio_secondary}</p>
                    <p className="text-blue-700">I'll be graduating in Summer 2027! Looking for research positions in surgical automation!</p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900">Research Interests</h2>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 leading-snug">
                    {RESEARCH_INTERESTS.map((interest) => <li key={interest}>{interest}</li>)}
                  </ul>
                </section>

                {/* Reviewing */}
                <section className="space-y-2 border-t border-slate-200 pt-4">
                  <h2 className="text-lg font-bold text-slate-900">Reviewing</h2>
                  <p className="text-sm text-slate-600 leading-snug">I have served as a reviewer for: {USER_DATA.reviews.join(', ')}.</p>
                </section>

                <section className="border-t border-slate-200 pt-4 space-y-2">
                  <h2 className="text-lg font-bold text-slate-900">Gallery</h2>
                  <p className="text-sm text-slate-700 leading-snug">
                    Working with diffusion models leads to some weirdly unplanned generations. Enjoy the following curated collection of outputs, artifacts, and generally amusing images from my experiments.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection('gallery');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border border-slate-400 px-3 py-1 text-sm"
                  >
                    View Gallery
                  </button>
                </section>
              </div>

              {/* SIDE COLUMN */}
              <div className="lg:col-span-4 space-y-5">
                 {/* Profile Image - Clean */}
                 <div className="w-full aspect-square relative mx-auto lg:mx-0 max-w-sm rounded-xl overflow-hidden shadow-md">
                    <div className="w-full h-full bg-slate-100">
                      <img src="./assets/main_page/profile.jpg" alt={USER_DATA.name} className="w-full h-full object-cover" />
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                    {[
                      { href: "./assets/arrabi_cv.pdf", label: "CV (PDF)" },
                      { href: USER_DATA.links.github, label: "GitHub" },
                      { href: USER_DATA.links.linkedin, label: "LinkedIn" },
                      { href: USER_DATA.links.scholar, label: "Google Scholar" },
                      { href: USER_DATA.links.orcid, label: "ORCID" },
                      { href: USER_DATA.links.semantic, label: "Semantic Scholar" }
                    ].map((link) => (
                      <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">
                        {link.label}
                      </a>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-300 text-slate-800 leading-relaxed">
                    <p>Feel free to contact me at <a href={`mailto:${USER_DATA.email}`} className="font-bold underline">{USER_DATA.email}</a>.</p>
                  </div>
              </div>
            </div>
          </div>
        );
      
      case 'publications':
        return (
          <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-8">
              <div>
                <SectionTitle>All Publications</SectionTitle>
                <p className="text-slate-500 -mt-6">Full list of research works.</p>
              </div>
              <a href={USER_DATA.links.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-2 py-2 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors">
                <GraduationCap size={18} /> Google Scholar
              </a>
            </div>
            
            <div className="space-y-8">
              {PUBLICATIONS.map((pub) => (
                <Card key={pub.id} className="flex flex-col md:flex-row gap-6 p-0 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex-1 p-6 space-y-3">
                     <h3 className="text-xl font-bold text-slate-900 leading-tight">{pub.title}</h3>
                     <p className="text-slate-600 text-sm font-medium">{pub.authors}</p>
                     <div className="flex flex-wrap gap-2 items-center">
                        <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-1 rounded-md">{pub.venue}</span>
                        <span className="text-slate-500 text-xs font-mono">{pub.year}</span>
                     </div>
                     
                     <div className="flex flex-wrap gap-3 pt-3">
                        {pub.links.pdf && <a href={pub.links.pdf} target="_blank" rel="noreferrer" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><FileText size={14} /> PDF</a>}
                        {pub.links.arxiv && <a href={pub.links.arxiv} target="_blank" rel="noreferrer" className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><BookOpen size={14} /> ArXiv</a>}
                        {pub.links.code && <a href={pub.links.code} target="_blank" rel="noreferrer" className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><Github size={14} /> Code</a>}
                        {pub.links.demo && <a href={pub.links.demo} target="_blank" rel="noreferrer" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><PlayCircle size={14} /> Demo</a>}
                        {pub.links.website && <a href={pub.links.website} target="_blank" rel="noreferrer" className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-colors"><ExternalLink size={14} /> Website</a>}
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
              <a 
                href="./assets/arrabi_cv.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 py-2 px-6 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold rounded-lg transition-colors -mt-6"
              >
                 <FileText size={18} /> Download PDF
               </a>
            </div>

            <div className="space-y-16">
               {EXPERIENCES.map((exp) => (
                 <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-4 border-white"></div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-sm font-mono text-slate-800 font-bold bg-slate-100 px-3 py-1 rounded-md">{exp.period}</span>
                    </div>
                    <div className="text-lg font-medium text-slate-700 mb-4">{exp.org}</div>
                    <div className="text-slate-600 leading-relaxed text-lg">
                      {exp.desc}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );

      case 'gallery': {
        const filteredItems = galleryFilter === 'All' 
          ? GALLERY_ITEMS 
          : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

        return (
          <div className="space-y-8 max-w-6xl">
            <div className="max-w-3xl space-y-3">
               <button type="button" onClick={() => setActiveSection('home')} className="border border-slate-400 px-3 py-1 text-sm">← Back to home</button>
               <h2 className="text-2xl font-bold text-slate-900">Gallery</h2>
               <p className="text-slate-700 leading-relaxed">
                 Working with diffusion models leads to some weirdly unplanned generations. Enjoy the following curated collection of outputs, artifacts, and generally amusing images from my experiments.
               </p>
            </div>

            <div className="flex gap-2">
              {['All', 'Artwork', 'Cool Generations'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setGalleryFilter(filter)}
                  className={`px-3 py-1 text-sm border ${
                    galleryFilter === filter 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
               {filteredItems.map(item => (
                 <div 
                   key={item.id} 
                   onClick={() => openArtwork(item)}
                   className="break-inside-avoid bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer group hover:border-slate-400 hover:shadow-lg transition-all"
                 >
                    <div className={`w-full h-80 ${item.color} flex items-center justify-center relative`}>
                        {item.assets && item.assets.medium ? (
                           // Default thumbnail for interactive items
                           <img src={item.assets.medium.png} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : item.asset ? (
                           // Static items
                           <img src={item.asset} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                           <ImageIcon size={48} className="text-slate-400 opacity-50" />
                        )}
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                           <span className="opacity-0 group-hover:opacity-100 bg-white text-slate-900 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">View</span>
                        </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                         <Badge>{item.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl ml-0 px-6 py-8 md:ml-10 md:px-8 md:py-10">
        {renderContent()}
        <footer className="mt-16 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ahmad Arrabi.</p>
        </footer>
      </main>

      {/* GALLERY MODAL - RENDERED OUTSIDE OF MAIN CONTENT FOR FULL SCREEN COVERAGE */}
      {selectedArt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setSelectedArt(null)}>
          <div className="bg-white max-w-7xl w-full h-[90vh] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
             
             {/* Main Image Area */}
             <div className={`w-full h-1/2 md:h-full flex bg-gray-100 relative border-b md:border-b-0 md:border-r border-slate-200`}>
                <button 
                  onClick={() => setSelectedArt(null)} 
                  className="absolute top-4 right-4 md:hidden p-2 bg-white/50 rounded-full hover:bg-white transition-colors z-10"
                >
                  <X size={20} className="text-slate-900" />
                </button>

                {selectedArt.interactive ? (
                    <div className="w-full h-full flex gap-4 p-4">
                        {/* Generated Image */}
                        <div className="relative flex-1 h-full flex items-center justify-center bg-white/50 rounded-lg border border-slate-200">
                            <img 
                                src={selectedArt.assets[artAlignment][artViewMode === 'static' ? 'png' : 'gif']} 
                                alt={selectedArt.title}
                                className="max-w-full max-h-full object-contain shadow-md"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                                Alignment: {artAlignment}
                            </div>
                        </div>

                        {/* Reference Image (Conditional) */}
                        {showReference && (
                            <div className="relative flex-1 h-full flex items-center justify-center bg-white/50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-right-4 duration-500">
                                <img 
                                    src={selectedArt.assets.ref} 
                                    alt="Reference"
                                    className="max-w-full max-h-full object-contain shadow-md"
                                />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm">
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
             <div className="w-full md:w-1/4 p-8 overflow-y-auto flex flex-col bg-white">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{selectedArt.title}</h3>
                      <Badge>{selectedArt.category}</Badge>
                   </div>
                   <button onClick={() => setSelectedArt(null)} className="hidden md:block p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <X size={24} className="text-slate-500" />
                   </button>
                </div>
                
                <div className="prose text-slate-700 leading-relaxed text-base mb-10 flex-1">
                  {selectedArt.desc}
                </div>

                {/* Interactive Controls */}
                {selectedArt.interactive && (
                   <div className="space-y-8 border-t border-slate-200 pt-8 mt-auto">
                      {/* Mode Toggle */}
                      <div className="flex items-center justify-between bg-slate-100 p-1 rounded-lg">
                         <button 
                           onClick={() => setArtViewMode('dynamic')}
                           className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${artViewMode === 'dynamic' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                         >
                           Dynamic
                         </button>
                         <button 
                           onClick={() => setArtViewMode('static')}
                           className={`flex-1 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${artViewMode === 'static' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                         >
                           Static
                         </button>
                      </div>

                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Compare Reference</span>
                         <button onClick={() => setShowReference(!showReference)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${showReference ? 'bg-slate-800 text-white border-slate-800' : 'bg-transparent text-slate-500 border-slate-300'}`}>
                           {showReference ? <Eye size={14} /> : <EyeOff size={14} />} {showReference ? 'ON' : 'OFF'}
                         </button>
                      </div>

                      <div className="transition-opacity duration-200 opacity-100">
                         <div className="flex items-center gap-2 mb-4">
                            <Sliders size={16} className="text-slate-800" />
                            <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Alignment</span>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                            {['abstract', 'weak', 'medium', 'strong'].map((align) => (
                               <button key={align} onClick={() => setArtAlignment(align)} className={`px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${artAlignment === align ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-transparent text-slate-500 border-slate-200 hover:border-slate-400'}`}>{align}</button>
                            ))}
                         </div>
                      </div>
                   </div>
                )}
                
                {/* Application specific controls */}
                {selectedArt.category === 'Applications' && (
                    <div className="mt-auto pt-8 border-t border-slate-200">
                       <a href="#" className="flex items-center justify-center gap-3 w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg">
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
