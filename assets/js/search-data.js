// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Publications are sorted by date. (*) denotes equal contribution",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-we-got-a-paper-accepted-in-wacv-2025",
          title: 'We got a paper accepted in WACV 2025!',
          description: "",
          section: "News",},{id: "news-our-lab-will-be-leading-a-tutorial-session-on-cross-view-geolocalization-at-wacv-2025-join-us",
          title: 'Our lab will be leading a tutorial session on cross-view geolocalization at WACV...',
          description: "",
          section: "News",},{id: "news-we-got-a-paper-accepted-in-isbi-2025",
          title: 'We got a paper accepted in ISBI 2025!',
          description: "",
          section: "News",},{id: "news-i-finally-made-a-website-smile",
          title: 'I finally made a website! :smile:',
          description: "",
          section: "News",},{id: "news-i-was-invited-to-the-1st-international-workshop-on-video-surveillance-systems-in-smart-cities-i-will-be-presenting-my-most-recent-paper-in-wacv",
          title: 'I was invited to the 1st International Workshop on Video Surveillance Systems in...',
          description: "",
          section: "News",},{id: "news-our-paper-automated-c-arm-positioning-via-conformal-landmark-localization-got-accepted-at-the-workshop-on-advanced-perception-for-autonomous-healthcare-apah-at-iccv",
          title: 'Our paper “Automated C-Arm Positioning via Conformal Landmark Localization” got accepted at the...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%68%6D%61%64.%61%72%72%61%62%69@%75%76%6D.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/AhmadArrabi", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/Ahmad-Arrabi", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0001-9482-4964", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=rpg3l8QAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
