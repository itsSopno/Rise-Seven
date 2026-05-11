"use client";

import { useState } from "react";
import "./footer.css";


const navCol1 = [
  { label: "Services", href: "/services/" },
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Culture", href: "/culture/" },
  { label: "Meet The Risers", href: "/meet-the-team/" },
];

const navCol2 = [
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Blog & Resources", href: "/blog/" },
  { label: "Webinars", href: "/webinars/" },
  { label: "Careers", href: "/careers/" },
];

const navCol3 = [
  { label: "Sheffield", href: "https://g.co/kgs/4Br7JaS" },
  { label: "Manchester", href: "https://g.co/kgs/9vh5imK" },
  { label: "London", href: "https://g.co/kgs/hsv6LhR" },
  { label: "New York", href: "https://g.co/kgs/NxzhAKU" },
  { label: "Contact", href: "/contact/" },
];

const socialLinks = [
  { label: "FB", href: "#", icon: "f" },
  { label: "X", href: "#", icon: "𝕏" },
  { label: "IG", href: "#", icon: "◎" },
  { label: "LI", href: "#", icon: "in" },
  { label: "YT", href: "#", icon: "▶" },
  { label: "TK", href: "#", icon: "♪" },
  { label: "TH", href: "#", icon: "⧉" },
  { label: "PT", href: "#", icon: "p" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="r7-footer" id="contact">
      <div className="r7-footer-card">
        {/* Top: Newsletter + Nav */}
        <div className="r7-footer-top">
          {/* Left: Newsletter & Socials */}
          <div className="r7-footer-left">
            <h2 className="r7-footer-heading">Stay updated with Rise news</h2>

            <form className="r7-footer-form" onSubmit={(e) => e.preventDefault()}>
              <input
                className="r7-footer-input"
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="r7-footer-submit" type="submit" aria-label="Subscribe">
                <span className="r7-footer-submit-arrow">↗</span>
              </button>
            </form>

            <div className="r7-footer-socials">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="r7-footer-social" aria-label={s.label}>
                  <span className="r7-footer-social-icon">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Nav Columns */}
          <nav className="r7-footer-nav">
            <div className="r7-footer-nav-col">
              {navCol1.map((l) => (
                <a key={l.label} href={l.href} className="r7-footer-nav-link">{l.label}</a>
              ))}
            </div>
            <div className="r7-footer-nav-col">
              {navCol2.map((l) => (
                <a key={l.label} href={l.href} className="r7-footer-nav-link">{l.label}</a>
              ))}
            </div>
            <div className="r7-footer-nav-col">
              {navCol3.map((l) => (
                <a key={l.label} href={l.href} className="r7-footer-nav-link">{l.label}</a>
              ))}
            </div>
          </nav>
        </div>

        {/* Big Wordmark */}
        <div className="r7-footer-wordmark">
          <div className="r7-footer-logo-container">
            <span className="r7-footer-logo-text">Rise at Seven</span>
            <span className="r7-footer-trademark">®</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="r7-footer-bottom">
          <div className="r7-footer-legal">
            <span>© 2025 Rise at Seven Ltd. All rights reserved</span>
            <span className="r7-footer-dot">•</span>
            <span>Company Number 11950187</span>
            <span className="r7-footer-dot">•</span>
            <span>VAT Registered GB 322402945</span>
            <span className="r7-footer-dot">•</span>
            <a href="/privacy-policy/">Privacy Policy</a>
            <span className="r7-footer-dot">•</span>
            <a href="/terms-conditions/">Terms & conditions</a>
          </div>
          <div className="r7-footer-credit">
            <a href="https://madebyshape.co.uk">Website MadeByShape</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
