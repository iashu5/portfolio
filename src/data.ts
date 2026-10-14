// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Ashutosh Kumar',
  role: '.NET Full Stack Developer',
  roles: ['.NET Full Stack Developer', 'ASP.NET Core & Web API', 'SQL Server', 'React + TypeScript'],
  tagline:
    'I build enterprise web applications for ERP and finance (NBFC) businesses: REST APIs, database logic, reports and UI, end to end.',
  location: 'Pune, India',
  email: 'iashu205@gmail.com',
  github: 'https://github.com/iashu5',
  linkedin: 'https://www.linkedin.com/in/iashu5',
  resume: '/Ashutosh_Kumar_DotNet_Developer_Resume.pdf',
  photo: '/ashutosh.webp',
};

export const stats = [
  { value: 2, suffix: '', label: 'Years of experience' },
  { value: 4, suffix: '', label: 'Companies' },
  { value: 6, suffix: '', label: 'Third-party integrations' },
  { value: 2, suffix: '', label: 'Domains · ERP & NBFC' },
];

export const expertise = [
  {
    icon: 'Landmark',
    title: 'Loan Processing',
    text: 'Loan Requisition, customer onboarding, verification and financial workflows for an NBFC.',
  },
  {
    icon: 'ScanFace',
    title: 'KYC & Verification',
    text: 'Webcam capture and biometric/fingerprint devices, with DigiLocker, Aadhaar and CIBIL checks.',
  },
  {
    icon: 'FileBarChart',
    title: 'RDLC Reporting',
    text: 'Loan statements, operational documents and management reports.',
  },
  {
    icon: 'Building2',
    title: 'ERP Modules',
    text: 'Talent Acquisition (HR Admin, Candidate Management), NCR and Conference Room Booking.',
  },
  {
    icon: 'Server',
    title: 'REST APIs',
    text: 'ASP.NET Core Web APIs with clean service layers, JWT auth, logging and Swagger docs.',
  },
  {
    icon: 'MessageSquareText',
    title: 'SMS & Notifications',
    text: 'SMS gateway integrations that send automated alerts and status updates to customers.',
  },
] as const;

export const skillGroups = [
  { title: 'Backend', items: ['C#', '.NET Core', 'ASP.NET MVC', 'Web API', 'REST', 'ADO.NET', 'Java', 'Spring Boot'] },
  { title: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'jQuery', 'Material-UI', 'Bootstrap', 'Tailwind', 'HTML5 / CSS3'] },
  { title: 'Database', items: ['SQL Server (SSMS)', 'MySQL', 'Query optimization'] },
  { title: 'Reporting & Integrations', items: ['RDLC', 'SMS Gateway', 'DigiLocker', 'Aadhaar', 'CIBIL', 'Webcam / Biometric'] },
  { title: 'Tools & Deployment', items: ['Git', 'GitLab', 'Postman', 'Swagger', 'IIS', 'PuTTY', 'WinSCP', 'Visual Studio'] },
  { title: 'Practices', items: ['OOP', 'Agile / Scrum', 'RBAC', 'Clean code'] },
];

export const skillIcons = 'cs,dotnet,react,ts,js,mysql,java,spring,materialui,bootstrap,tailwind,git,gitlab,postman,visualstudio,docker,aws';

export const experience = [
  {
    role: 'Software Developer',
    company: 'Gtech WebSolutions Pvt Ltd',
    logo: '/logos/Gtech_logo_circle.png',
    period: 'May 2026 – Sep 2026',
    location: 'Kolkata',
    domain: 'NBFC · Finance',
    points: [
      'Built and maintained .NET Core MVC applications for an NBFC, supporting end-to-end loan processing and customer onboarding.',
      'Implemented KYC verification with webcam capture and biometric/fingerprint devices.',
      'Developed the Loan Requisition module: loan application, customer details, verification and financial workflows.',
      'Designed and integrated RDLC reports for loan statements, operational documents and management reporting.',
      'Integrated SMS services for automated notifications, alerts and status updates.',
    ],
    tech: ['C#', '.NET Core MVC', 'SQL Server', 'RDLC', 'SMS APIs', 'CIBIL', 'Aadhaar', 'DigiLocker'],
  },
  {
    role: '.NET Developer',
    company: 'YSAAS Infotech Pvt Ltd',
    logo: '',
    period: 'Nov 2024 – Apr 2026',
    location: 'Pune',
    domain: 'ERP',
    points: [
      'Developed and maintained a custom ERP with Talent Acquisition, Non-Conformance Report (NCR) and Conference Room Booking modules.',
      'Designed and built the HR Admin and Candidate Management submodules for recruitment tracking and onboarding.',
      'Improved operational efficiency through process automation and unified data management across modules.',
    ],
    tech: ['C#', '.NET Core', 'SQL Server', 'RESTful API', 'Git'],
  },
  {
    role: 'Java Developer (Intern)',
    company: 'SevenMentor Pvt Ltd',
    logo: '/logos/seven.webp',
    period: 'Mar 2024 – Aug 2024',
    location: 'Pune',
    domain: 'EdTech',
    points: [
      'Designed and developed RESTful APIs with Java and Spring Boot.',
      'Worked with front-end teams to define API endpoints and data flow.',
      'Optimized MySQL queries for efficient database operations.',
    ],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Git'],
  },
  {
    role: 'Trainee Software Developer (Intern)',
    company: 'Medimaze Solutions Pvt Ltd',
    logo: '/logos/medimaze.jpg',
    period: 'Aug 2023 – Feb 2024',
    location: 'Pune',
    domain: 'Fundraising',
    points: [
      'Developed a fundraising website with role-based access control and department-specific admin permissions.',
      'Gathered client requirements, led daily stand-ups and managed end-to-end deployment.',
    ],
    tech: ['React', 'TypeScript', 'Axios', 'Material-UI', 'REST APIs'],
  },
];

export type Project = {
  title: string;
  tag: '.NET' | 'Full Stack' | 'React';
  description: string;
  highlights: string[];
  flow: string[];
  tech: string[];
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: 'Talent Acquisition System',
    tag: '.NET',
    description:
      'End-to-end hiring platform covering job postings, candidates, applications, interview scheduling with feedback, and offer management.',
    highlights: ['7 MVC controllers', 'Layered solution (MVC · Data · Models)', 'SQL Server scripts'],
    flow: ['Razor Views', 'ASP.NET Core MVC', 'ADO.NET', 'SQL Server'],
    tech: ['ASP.NET Core 8', 'MVC', 'ADO.NET', 'SQL Server'],
    links: [{ label: 'Code', url: 'https://github.com/iashu5/TalentAcquisition' }],
  },
  {
    title: 'Student Management System',
    tag: 'Full Stack',
    description:
      'A .NET 8 Web API with JWT authentication, global exception middleware, Serilog logging and Swagger, plus a React + TypeScript dashboard.',
    highlights: ['JWT login', 'Search & filter', 'Centralized error handling'],
    flow: ['React + TS', 'JWT', '.NET 8 Web API', 'SQL Server'],
    tech: ['.NET 8', 'Web API', 'JWT', 'Serilog', 'React', 'TypeScript', 'Tailwind'],
    links: [
      { label: 'API', url: 'https://github.com/iashu5/StudentManagement.API' },
      { label: 'UI', url: 'https://github.com/iashu5/student-management-ui' },
    ],
  },
  {
    title: 'Loan Management · EMI Scheduler',
    tag: '.NET',
    description:
      'Loan plan master with auto-generated EMI repayment schedules: principal, interest and outstanding balance for each month.',
    highlights: ['EMI calculation', 'Plan master CRUD', 'DB setup script'],
    flow: ['Razor Views', 'ASP.NET Core MVC', 'DbHelper', 'SQL Server'],
    tech: ['ASP.NET Core MVC', 'ADO.NET', 'SQL Server'],
    links: [{ label: 'Code', url: 'https://github.com/iashu5/LoanManagement' }],
  },
  {
    title: 'GitHub Cloud Connector',
    tag: '.NET',
    description:
      'A REST API that connects to GitHub with a Personal Access Token and exposes endpoints for repositories and issues.',
    highlights: ['Typed HttpClient', 'Interface-based service layer', 'Swagger / OpenAPI'],
    flow: ['Client', 'ASP.NET Core API', 'GitHubService', 'GitHub API'],
    tech: ['ASP.NET Core 8', 'Web API', 'HttpClient', 'Swagger'],
    links: [{ label: 'Code', url: 'https://github.com/iashu5/github-connector' }],
  },
  {
    title: 'Knowledge Base UI',
    tag: 'React',
    description:
      'Knowledge-base frontend built from a design, with reusable typed components.',
    highlights: ['Strict TypeScript', 'Component-driven', 'Vite build'],
    flow: ['Header', 'Sidebar', 'Content', 'Tailwind'],
    tech: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'],
    links: [{ label: 'Code', url: 'https://github.com/iashu5/knowledge-base-ui' }],
  },
];

export const education = [
  { degree: 'Master of Computer Applications (MCA)', school: 'Chandigarh University', place: 'Mohali, Punjab', period: '2024 – 2026', logo: '/logos/CU_logo.png' },
  { degree: 'Bachelor of Computer Applications (BCA)', school: 'Netaji Subhas University', place: 'Jamshedpur, Jharkhand', period: '2021 – 2024', logo: '/logos/NSU_logo.png' },
];

export const certifications = [
  { title: 'AWS Cloud Practitioner', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-c32a3026-58aa-453c-8bcb-44dccfad419f/' },
  { title: 'AWS Advanced Networking', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-695cb9ff-e02f-4880-8d0f-edbf14105573/' },
  { title: 'Docker Basics', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-b9ac3bae-9ddf-41ee-b900-6eae42cfd704/' },
  { title: 'ReactJS', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-fae8e760-b512-4a4b-8de9-7b974e82c74e/' },
];
