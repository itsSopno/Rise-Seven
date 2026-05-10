export type MenuColumn = {
  label?: string;
  items: string[];
};

export type NavDropdown = {
  key: "services" | "international" | "about";
  label: string;
  href: string;
  image: string;
  cta?: string;
  columns: MenuColumn[];
  mobileItems: string[];
};

export const dropdowns: NavDropdown[] = [
  {
    key: "services",
    label: "Services",
    href: "/services/",
    image: "/assets/menu-services.webp",
    cta: "View All Services",
    columns: [],
    mobileItems: [
      "Search & Growth Strategy",
      "Onsite SEO",
      "Content Experience",
      "B2B Marketing",
      "Digital PR",
      "Social Media & Campaigns",
      "Data & Insights",
      "Social SEO/Search",
    ],
  },
  {
    key: "international",
    label: "International",
    href: "/international/",
    image: "/assets/menu-international.webp",
    columns: [],
    mobileItems: [
      "US Digital PR",
      "Spain Digital PR",
      "Germany Digital PR",
      "Netherlands Digital PR",
    ],
  },
  {
    key: "about",
    label: "About",
    href: "/about/",
    image: "/assets/menu-about.webp",
    columns: [],
    mobileItems: ["About Us", "Meet The Risers", "Culture", "Testimonials"],
  },
];

export const plainLinks = [
  { label: "Work", href: "/work/", badge: "25" },
  { label: "Careers", href: "/careers/" },
  { label: "Blog", href: "/blog/" },
  { label: "Webinar", href: "/webinar/" },
];

export type ImageMenuItem = {
  label: string;
  href: string;
  image: string;
};

export const serviceMenuItems: ImageMenuItem[] = [
  {
    label: "Search & Growth Strategy",
    href: "/services/search-growth-strategy/",
    image:
      "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.14.49.png?w=2000&h=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847626&s=a51fa90e59f4de7a51395aaed8e58428",
  },
  {
    label: "Onsite SEO",
    href: "/services/onsite-seo/",
    image:
      "https://rise-atseven.transforms.svdcdn.com/production/images/WhatsApp-Image-2025-06-03-at-08.34.50.jpeg?w=2000&h=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1766399268&s=7b53d90905d984816762e873a47f385d",
  },
  {
    label: "Content Experience",
    href: "/services/content-experience/",
    image:
      "https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-23-at-23.16.14.png?w=2000&h=2000&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750847627&s=0eac1033a387c2e512f40f9edecda2a3",
  },
  {
    label: "B2B Marketing",
    href: "/services/b2b-marketing/",
    image: "/assets/services/b2b-marketing.webp",
  },
  {
    label: "Digital PR",
    href: "/services/digital-pr/",
    image: "/assets/services/digital-pr.webp",
  },
  {
    label: "Social Media & Campaigns",
    href: "/services/social-media-campaigns/",
    image: "/assets/services/social-media.webp",
  },
  {
    label: "Data & Insights",
    href: "/services/data-insights/",
    image: "/assets/services/data-insights.webp",
  },
  {
    label: "Social SEO/Search",
    href: "/services/social-seo-search/",
    image: "/assets/services/social-seo.webp",
  },
];

export const internationalMenuItems: ImageMenuItem[] = [
  {
    label: "US Digital PR",
    href: "/international/us-digital-pr/",
    image: "/assets/international/us-digital-pr.webp",
  },
  {
    label: "Spain Digital PR",
    href: "/international/spain-digital-pr/",
    image: "/assets/international/spain-digital-pr.webp",
  },
  {
    label: "Germany Digital PR",
    href: "/international/germany-digital-pr/",
    image: "/assets/international/germany-digital-pr.webp",
  },
  {
    label: "Netherlands Digital PR",
    href: "/international/netherlands-digital-pr/",
    image: "/assets/international/netherlands-digital-pr.webp",
  },
];

export const aboutMenuItems: ImageMenuItem[] = [
  {
    label: "About Us",
    href: "/about/",
    image: "/assets/about/about-us.webp",
  },
  {
    label: "Meet The Risers",
    href: "/about/meet-the-risers/",
    image: "/assets/about/meet-the-risers.webp",
  },
  {
    label: "Culture",
    href: "/about/culture/",
    image: "/assets/about/culture.webp",
  },
  {
    label: "Testimonials",
    href: "/about/testimonials/",
    image: "/assets/about/testimonials.webp",
  },
];

