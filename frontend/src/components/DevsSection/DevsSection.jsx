import { Code2, ExternalLink, UserCircle, Mail, Globe } from 'lucide-react';

// Custom SVG icons for brands (lucide-react removed brand icons)
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
import './DevsSection.css';

const developers = [
  {
    name: 'Developer One',
    initials: 'D1',
    role: 'Full Stack Developer',
    bio: 'Passionate about building tools that help students succeed. Loves React, Node.js, and cyberpunk aesthetics.',
    socials: {
      github: '#',
      linkedin: '#',
      email: 'mailto:dev1@example.com',
      website: '#',
    },
  },
  {
    name: 'Developer Two',
    initials: 'D2',
    role: 'Frontend Developer & UI Designer',
    bio: 'Crafting pixel-perfect interfaces with a love for design systems, animations, and user experience.',
    socials: {
      github: '#',
      linkedin: '#',
      email: 'mailto:dev2@example.com',
      website: '#',
    },
  },
  {
    name: 'Developer Three',
    initials: 'D3',
    role: 'Backend Developer',
    bio: 'Database wizard and API architect. Making sure every paper is stored safely and served fast.',
    socials: {
      github: '#',
      linkedin: '#',
      email: 'mailto:dev3@example.com',
      website: '#',
    },
  },
];

export default function DevsSection() {
  return (
    <section className="devs-section">
      <div className="container-vault">
        {/* Header */}
        <div className="devs-header">
          <div className="devs-badge">
            <Code2 size={14} />
            Meet The Team
          </div>
          <h1 className="devs-title">Built By Students, For Students</h1>
          <p className="devs-subtitle">
            We&apos;re a team of Assam University students who built this platform to
            make exam preparation easier for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="devs-grid">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="dev-card animate-slideUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="dev-avatar">
                <div className="dev-avatar-ring" />
                {dev.initials}
              </div>
              <h3 className="dev-name">{dev.name}</h3>
              <p className="dev-role">{dev.role}</p>
              <p className="dev-bio">{dev.bio}</p>
              <div className="dev-socials">
                <a
                  href={dev.socials.github}
                  className="dev-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <GithubIcon />
                </a>
                <a
                  href={dev.socials.linkedin}
                  className="dev-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href={dev.socials.email}
                  className="dev-social-link"
                  title="Email"
                >
                  <Mail size={16} />
                </a>
                <a
                  href={dev.socials.website}
                  className="dev-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Website"
                >
                  <Globe size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="devs-decoration">
          Crafted with passion at AUS
        </div>
      </div>
    </section>
  );
}
