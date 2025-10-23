/**
 * Centralized content source for the portfolio
 * This ensures consistency across all components and the AI assistant
 */

export const PERSONAL_INFO = {
  name: "Xiaofeng Tang",
  title: "Full-Stack Developer",
  greeting: "HI, I AM Xiaofeng Tang",
  subtitle: "FULL-STACK DEVELOPER",
  tagline: "And I am a recent graduate of the Master of Computer Science degree at the University of Sydney.",
} as const;

export const EDUCATION = {
  masters: {
    degree: "Master of Computer Science",
    institution: "University of Sydney",
    shortName: "USYD",
  },
  bachelors: {
    degree: "Bachelor of Mathematics",
    institution: "University of New South Wales",
    shortName: "UNSW",
  },
} as const;

export const ABOUT_ME = `I graduated from UNSW with an undergraduate degree in Mathematics and graduated from Master degree in Computer Science at USYD. I have hands-on experience applying Javascript, Java, C, Python in academic course. One of my specialties and passions is full stack web development. Familiar with UI/UX design, good at developing with nextjs framework. In terms of front-end, able to create dynamic web pages with certain effects. For back-end, understand most of the database operations, and familiar with most of the back-end API interface integration.`;

export const SKILLS = {
  languages: ["JavaScript", "TypeScript", "Java", "C", "Python"],
  frontend: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  backend: ["Node.js", "Express", "RESTful APIs"],
  databases: ["MongoDB", "MySQL", "PostgreSQL"],
  tools: ["Git", "GitHub", "Docker", "Vercel"],
  specializations: [
    "Full-stack web development",
    "UI/UX design",
    "Responsive design",
    "API integration",
  ],
} as const;

export const SOCIAL_LINKS = {
  facebook: "#",
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/xiaofeng-tang-77b550227",
  twitter: "#",
} as const;

export const AI_ASSISTANT = {
  greeting:
    "Hi there! I'm Xiaofeng's AI concierge. Ask anything about his skills, projects, experience, or goals and I'll answer using his resume.",
  systemPrompt: {
    role: "You are Xiaofeng Tang, a full-stack developer, speaking in first-person English.",
    instructions:
      "Base every reply strictly on the resume summary below. Highlight relevant skills, projects, outcomes, and keep the tone warm, confident, and professional.",
    format:
      "Keep answers concise (no more than three short paragraphs or bullet lists). If something is not covered by the resume, say so and pivot to areas you can discuss.",
  },
} as const;

/**
 * Generate resume context for AI assistant
 * This keeps the AI context in sync with the displayed content
 */
export function generateResumeContext(): string {
  return `
${PERSONAL_INFO.name}
${PERSONAL_INFO.title}

EDUCATION
- ${EDUCATION.masters.degree}, ${EDUCATION.masters.institution} (${EDUCATION.masters.shortName})
- ${EDUCATION.bachelors.degree}, ${EDUCATION.bachelors.institution} (${EDUCATION.bachelors.shortName})

SKILLS
Programming Languages: ${SKILLS.languages.join(", ")}
Frontend: ${SKILLS.frontend.join(", ")}
Backend: ${SKILLS.backend.join(", ")}
Database: ${SKILLS.databases.join(", ")}
Tools & Technologies: ${SKILLS.tools.join(", ")}
Specializations: ${SKILLS.specializations.join(", ")}

ABOUT
${ABOUT_ME}

PROFESSIONAL QUALITIES
- Recent graduate with fresh, up-to-date knowledge of modern web technologies
- Strong foundation in both mathematics and computer science
- Passionate about creating elegant, efficient solutions to complex problems
- Committed to writing clean, maintainable code
- Quick learner with ability to adapt to new technologies and frameworks
- Detail-oriented with focus on code quality and best practices

INTERESTS & GOALS
- Seeking opportunities in full-stack development roles
- Interested in working on innovative web applications and user interfaces
- Eager to contribute to collaborative development teams
- Passionate about continuous learning and staying current with web development trends
`.trim();
}
