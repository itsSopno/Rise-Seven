import { newsItems } from "@/data/home";
import { MoveRight, Clock } from "lucide-react";
import "./whats-new.css";

export function WhatsNew() {
  return (
    <section className="r7-news-section">
      <div className="r7-container">
        <header className="r7-news-header">
          <h2 className="r7-news-headline">
            What's 
            <span className="r7-news-inline-img-wrap">
              <img src="/api/placeholder/100/60" alt="decoration" />
            </span> 
            New
          </h2>
          <a href="/thoughts" className="r7-news-explore-btn">
            Explore More Thoughts <MoveRight size={14} />
          </a>
        </header>

        <div className="r7-news-grid">
          {newsItems.map((item, index) => (
            <article key={index} className="r7-news-card">
              <div className="r7-news-card-img-wrap">
                {item.category && <span className="r7-news-badge">{item.category}</span>}
                <img src={item.image} alt={item.title} />
              </div>

              <div className="r7-news-meta-row">
                <div className="r7-news-meta-item">
                  <img src={item.authorImage} alt="" className="r7-news-author-avatar" />
                  <span>{item.author}</span>
                </div>
                <div className="r7-news-meta-item">
                  <Clock size={12} strokeWidth={3} />
                  <span>{item.readTime}</span>
                </div>
              </div>

              <h3 className="r7-news-card-title">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}