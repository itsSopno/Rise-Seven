"use client";

import { services, servicesHeadingImage as headingImage, type ServiceItem } from "@/data/home";


function ArrowIcon() {
  return (
    <span className="r7svc-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function ServiceBigArrow() {
  return (
    <span className="r7svc-big-arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function ServicesButton() {
  return (
    <a href="/services/" className="r7svc-button">
      <span className="r7svc-button-window">
        <span className="r7svc-button-line r7svc-button-current">
          <span>View All Services</span>
          <ArrowIcon />
        </span>

        <span className="r7svc-button-line r7svc-button-next">
          <span>View All Services</span>
          <ArrowIcon />
        </span>
      </span>
    </a>
  );
}

function ServiceRow({ service }: { service: ServiceItem }) {
  return (
    <a href={service.href} className="r7svc-row">
      <span className="r7svc-pill" aria-hidden="true">
        <img src={service.image} alt="" className="r7svc-pill-img" />
        <span className="r7svc-pill-overlay" />
      </span>

      <span className="r7svc-row-content">
        <ServiceBigArrow />
        <span className="r7svc-title">{service.title}</span>
      </span>
    </a>
  );
}

export function ServicesSection() {
  return (
    <section className="r7svc-section">
      <div className="r7svc-container">
        <div className="r7svc-header">
          <h2 className="r7svc-heading">
            <span>Our</span>
            <span className="r7svc-heading-img-wrap">
              <img src={headingImage} alt="" className="r7svc-heading-img" />
            </span>
            <span>Services</span>
          </h2>

          <div className="r7svc-header-button">
            <ServicesButton />
          </div>
        </div>

        <div className="r7svc-grid">
          {services.map((service) => (
            <ServiceRow key={service.title} service={service} />
          ))}
        </div>

        <div className="r7svc-mobile-button">
          <ServicesButton />
        </div>
      </div>
    </section>
  );
}
