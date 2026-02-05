import { time } from "console";
import { link } from "fs";
import { Contact } from "lucide-react";
import { text } from "stream/consumers";

export const navItems = [
  { id: 1, label: "Home", href: "#home" },
  { id: 2, label: "Work", href: "#work" },
  { id: 3, label: "Projects", href: "#projects" },
];
export const workSecItems = [
  {
    id: 1,
    title: "Unity XR Developer (Freelance)",
    time: "Jan 2022 - Now",
    text2: "Designed and developed VR WebGL experiences using the Unity platform. ",
     text3: "Created 3D models and assets, integrating them seamlessly into Unity environments.",
      text4: "Hosted and deployed WebGL experiences on various metaverse platforms, including Spatial.io and Meta Horizons.",
       text: "Collaborated remotely to deliver engaging and interactive virtual experiences.",
    img: "/images/work-1.jpeg",
  },
  {
    id: 2,
    title: "Teaching Assistant (TA) Object-Oriented Programming",
    time: "Aug 2023 - Dec 2022",
    text: "Assisted in grading and providing feedback on over 160 assignments and exams, maintaining a grading accuracy rate of 98%.",
    text2: "Facilitated interactive discussions and clarified complex concepts.",
    text3: "Held weekly office hours, providing one-on-one support to students, resulting in a 30% increase in student satisfaction ratings.",
    text4: "Collaborated with professors to develop supplementary materials, enhancing the overall learning experience for students.",
    img: "/images/work-2.jpg",
  },
  {
    id: 3,
    title: "Solaos (Contract)",
    time: "Jun 2024 - Aug 2024",
      text: "Engineered multiplayer VR systems with synchronized 3D objects and real-time state updates.",
    text2: "Built interactive quest and event logic using Unity’s Visual Scripting, translating gameplay requirements into functional code.",
      text3: "Implemented network ownership and data consistency for VR objects across multiple users.",
      text4: "Optimized VR experiences for performance and user engagement in a multiplayer setting.",
    img: "/images/work-3.jpg",
  },
];
export const projectItems = [
  {
    id: 1,
    title: "EstateFlow",
    description:
      "Built a server-side rendered application using Next.js with React Server Components and Server Actions. Developed a complete property rental platform featuring search functionality, property listings, pagination, and management tools. Implemented secure authentication with NextAuth.js using Google OAuth. Designed the backend with MongoDB and Mongoose, integrating Cloudinary for image storage and Mapbox for maps. Engineered seamless third-party integrations and advanced data workflows, enhancing platform scalability and elevating the user experience in the dynamic property rental market.",
    img: "/images/pro1.png",
    technologies: ["Next.js", "React Server Components", "Server Actions", "NextAuth.js", "MongoDB", "Mongoose", "Cloudinary", "Mapbox"],
  },
  {
    id: 2,
    title: "NUCES FYP Hub",
    description:
      "Architected a full-stack web application using the MERN stack (MongoDB, Express.js, React, Node.js) to manage end-to-end final year project workflows. Implemented milestone tracking, project lifecycle management, and automated report generation to streamline academic project execution. Developed a role-based grading and evaluation system that enables structured performance assessment and real-time feedback. Integrated Git-based version control workflows, allowing students to manage and link project repositories directly within the platform. Built an AI-powered chatbot to provide personalized assistance and instant responses to project-related queries. Implemented automated notifications and deadline reminder services to improve task completion rates and workflow efficiency.",
    img: "/images/proj2.jpeg",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Git", "AI Chatbot", "Notifications System"],
  },
  {
    id: 3,
    title: "ResumeShift",
    description:
      "Contributed to the development of a web application for creating personalized resumes with an intuitive interface and flexible customization options. Developed the platform using React and Bootstrap, streamlining the resume creation process for users. Additionally, worked with CSS, jQuery, PHP, WAMP, and MySQL to enhance functionality and ensure efficient handling of user data.",
    img: "/images/resume.png",
    technologies: ["React", "Bootstrap", "CSS", "jQuery", "PHP", "WAMP", "MySQL"],
  },
  {
    id: 4,
    title: "Spotify Clone",
    description:
      "Built a C++ application simulating Spotify-like users, playlists, and song data. Implemented linked lists for dynamic playlist management and hash tables for fast data lookup. Used heaps (priority queues) to rank top-played songs and binary search trees for efficient searching. Focused on optimizing data organization and computational complexity using core data structures and algorithms concepts.",
    img: "/images/spotify.png",
    technologies: ["C++", "Linked Lists", "Hash Tables", "Heaps (Priority Queues)", "Binary Search Trees", "DSA Concepts"],
  },
  {
    id: 5,
    title: "Pet Health Care",
    description:
      "Developed a platform to help pet owners manage and track their pets’ healthcare needs effectively. Built with HTML, Bootstrap, CSS, JSP, Servlets, WAMP, MySQL, and Java, the application provides access to a database of common pet diseases and symptoms. It enables pet owners to educate themselves about potential health issues and seek timely veterinary assistance.",
    img: "/images/project-2.jpg",
    technologies: ["HTML", "Bootstrap", "CSS", "JSP", "Servlets", "WAMP", "MySQL", "Java"],
  },
  {
    id: 6,
    title: "Sort It",
    description:
      "Created a web-based application that provides a visual representation of various sorting algorithms in action. Developed using HTML, Bootstrap, CSS, and jQuery, the project allows users to observe and understand how different sorting techniques work, enhancing comprehension of algorithm behavior and performance.",
    img: "/images/sort.png",
    technologies: ["HTML", "Bootstrap", "CSS", "jQuery", "Sorting Algorithms Visualization"],
  },
];


export const processItems = [
  {
    id: "1",
    icon: "b",
    iconName: "laptop", // The name of your .glb file in /public/models/
    title: "Full-Stack Web Developement",
    text: "Expert in building high-performance applications using Next.js, React, and TypeScript and AngularJS.",
  },
  {
    id: "2",
    icon: "i",
    iconName: "data", 
    title: "Backend Architect & API Development",
    text: "Proficient in architecting scalable server-side systems using Node.js (Express), PHP, and Java (JSP/Servlets), including secure OAuth implementations.",
  },
  {
    id: "3",
    icon: "p",
    iconName: "robot",
    title: "AI Chatbot & System Automation",
    text: "Experienced in developing AI-powered chatbots for personalized assistance and automating complex academic or project workflows.",
  },
  {
    id: "4",
    icon: "e",
    iconName: "vr",
    title: "Unity XR/VR & WebGL Development",
    text: "Capable of designing 3D models and deploying interactive virtual experiences on metaverse platforms like Spatial.io and Meta Horizons.",
  },
];

export const awards = [
  {
    id: 1,
    img: "/images/a-1.png",
    link: "https://coursera.org/verify/55ERGBY4QFPT",
  },
  {
    id: 2,
    img: "/images/a-2.png",
    link: "https://coursera.org/verify/professional-cert/DNZN6HLUQRXB",
  },
 
];

export const testimonialsItems = [
  {
    id: 1,
    name: "Myriam GUILLAUME",
    company: "Clermont School of Business",
    contact:"https://www.esc-clermont.fr/en/",
    project: "Metaverse Campus",
    img: "/images/1.png",
    desc: "Such a creative approach to online teaching. The campus feels alive, navigation is smooth, and the interactive spaces make learning so much more fun.",
  }, {
    id: 2,
    name: "Kujanga Jackson",
    contact:"https://www.linkedin.com/in/kujanga/",
    company: "Solaos Inc",
    project: "Solaos VR Experience",
    img: "/images/2.png",
    desc: "Excellent communication and and knowledge. Delivered just what I wanted and was willing to work through the process with me. Excellent customer support in this journey. Great partner to have!",
  }, {
    id: 3,
    name: "Clark",
    company: "Bdaypin.com",
    contact:"https://bdaypin.com/",
    project: "BdayLand Universe",
    img: "/images/3.png",
    desc: "Absolutely loved it! Bdaypin Land makes virtual play feel real — my children were smiling the entire time, and even their friends were impressed with the interactive rides.",
  }, 
   {
    id: 4,
    name: "Miram Ali",
    contact:"https://www.linkedin.com/in/miram-ali-103aa2119/",
    company: "Reflect Design Studio",
    project: "Architecture Theories 2 ",
    img: "/images/4.jpg",
    desc: "The VR environments and interactive interfaces built by Aun were instrumental in bringing the course to life. Students were able to engage directly with architectural theories through movement, exploration, and spatial experimentation.",
  }, 
  {
    id: 5,
    name: "Carolina Perez Gutt",
    contact:"https://www.linkedin.com/in/carope/",
    company: "Loopita",
    project: "Loopita VR Experience",
    img: "/images/5.jpg",
    desc: "The Loopita metaverse exhibition is incredible! Aun built an interactive space where businesses can showcase their products, host meetings, and engage visitors with games and activities. The environment is immersive, fun, and professional — a perfect blend of marketing and experience.",
  }, 



];

export const companyLogos = [
  {
    id: 1,
    icon: "/images/l_1 (1).svg",
  },
  {
    id: 2,
    icon: "/images/l_1 (2).svg",
  },
  {
    id: 3,
    icon: "/images/l_1 (3).svg",
  },
  {
    id: 4,
    icon: "/images/l_1 (4).svg",
  },
  {
    id: 5,
    icon: "/images/l_1 (5).svg",
  },
  {
    id: 6,
    icon: "/images/l_1 (6).svg",
  },
  {
    id: 7,
    icon: "/images/l_1 (7).svg",
  },
  {
    id: 8,
    icon: "/images/l_1 (8).svg",
  },{
    id: 9,
    icon: "/images/l_1 (9).svg",
  } ,
  {
    id: 10,
    icon: "/images/l_1 (10).svg",
  }   ,
  {
    id: 11,
    icon: "/images/l_1 (11).svg",
  }    
  ,{
    id: 12,
    icon: "/images/l_1 (12).svg",
  }
  ,
  {
    id: 13,
    icon: "/images/l_1 (13).svg",
  }
  ,{
    id: 14,
    icon: "/images/l_1 (14).svg",
  },
  {
    id: 15,
    icon: "/images/l_1 (15).svg",
  }
  ,
  {
    id: 16,
    icon: "/images/l_1 (16).svg",
  },
  {
    id: 17,
    icon: "/images/l_1 (17).svg",
  }
  ,
  {    id: 18,
    icon: "/images/l_1 (18).svg",
  },{
    id: 19,
    icon: "/images/l_1 (19).svg",
  },
  {
    id: 20,
    icon: "/images/l_2 (20).svg",
  },{
    id: 21,
    icon: "/images/l_2 (21).svg",
  }
];

export const xrProjects = [
  {
    id: 0,
    title: "Education",
    description:
      "Immersive XR experiences designed to enhance learning through interaction.",
    video: "https://www.youtube.com/embed/yERxym4K6tw?si=YKTsh_dZ_K1KDPfS",
  },
  {
    id: 1,
    title: "Training",
    description:
      "Hands-on virtual training environments for real-world skills.",
    video: "https://www.youtube.com/embed/Pv_fudcAg7A?si=iIj7qIa8TcPvqP3_",
  },
  {
    id: 2,
    title: "Sales",
    description:
      "Interactive XR showcases for product exploration and sales enablement.",
    video: "https://www.youtube.com/embed/ikSIS_OIP5U?si=c8WXEtPYBw1l8fXF",
  },
];
