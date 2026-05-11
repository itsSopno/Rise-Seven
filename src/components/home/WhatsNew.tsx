import { newsItems } from "@/data/home";
import { MoveRight, Clock, ArrowUpRight } from "lucide-react";
import "./whats-new.css";

export function WhatsNew() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic effect: scale down the movement a bit to make it feel attached
    const magneticX = x * 0.3;
    const magneticY = y * 0.3;
    
    e.currentTarget.style.setProperty("--mouse-x", `${magneticX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${magneticY}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", "0px");
    e.currentTarget.style.setProperty("--mouse-y", "0px");
  };

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
            <article 
              key={index} 
              className="r7-news-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="r7-news-card-img-wrap">
                {item.category && <span className="r7-news-badge">{item.category}</span>}
                <img src={item.image} alt={item.title} />
                
                <div className="r7-news-card-hover-overlay">
                  <div className="r7-news-card-hover-circle">
                    <ArrowUpRight size={32} strokeWidth={2.5} />
                  </div>
                </div>
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