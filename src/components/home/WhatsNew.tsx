import { newsItems } from "@/data/home";
import { MoveRight, Clock, User } from "lucide-react";
import "./whats-new.css";

export function WhatsNew() {
  return (
    <section className="r7-news-section">
      <div className="r7-container">
        {/* Header Row */}
        <div className="r7-news-header">
          <h2 className="r7-news-headline">
            <span>What's</span>
            <span className="r7-news-inline-img-wrap">
              <img
                src="https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-25-at-14.37.50.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750858763&s=624a1f990a8d128dd35cf3a6e1f44dbe"
                alt=""
              />
            </span>
            <span>New</span>
          </h2>

          <a href="/thoughts" className="r7-news-explore-btn">
            Explore More Thoughts
            <MoveRight size={16} />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="r7-news-grid">
          {newsItems.map((item, index) => (
            <article key={index} className="r7-news-card">
              {/* Image Wrap */}
              <div className="r7-news-card-img-wrap">
                {item.category && (
                  <span className="r7-news-badge">
                    {item.category}
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>

              {/* Meta Data */}
              <div className="r7-news-meta">
                <div className="r7-news-author">
                  <div className="r7-news-author-img">
                    {item.authorImage ? (
                      <img src={item.authorImage} alt={item.author} />
                    ) : (
                      <div className="r7-news-author-placeholder">
                        <User size={12} />
                      </div>
                    )}
                  </div>
                  <span>{item.author}</span>
                </div>
                <div className="r7-news-read-time">
                  <Clock size={14} />
                  <span>{item.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="r7-news-card-title">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


