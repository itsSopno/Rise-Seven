import { newsItems } from "@/data/home";
import { MoveRight, Clock } from "lucide-react";
import "./whats-new.css";

export function WhatsNew() {
  return (
    <section className="r7-news-section">
        <header className="r7-news-header">
          <h2 className="r7-news-headline">
            What's 
            <span className="r7-news-inline-img-wrap">
              <img src="https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-25-at-14.37.50.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750858763&s=624a1f990a8d128dd35cf3a6e1f44dbe" alt="decoration" />
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
    </section>
  );
}