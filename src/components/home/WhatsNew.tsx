import { newsItems } from "@/data/home";
import { MoveRight, Clock, User } from "lucide-react";

export function WhatsNew() {
  return (
    <section className="r7-news-section bg-[#f5f3f0] py-20 lg:py-32">
      <div className="r7-container">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-20">
          <h2 className="r7-news-headline flex flex-wrap items-center gap-x-6 gap-y-2 text-[56px] md:text-[80px] lg:text-[110px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111212]">
            <span>What's</span>
            <span className="r7-news-inline-img-wrap relative inline-block h-[0.7em] w-[1.2em] overflow-hidden rounded-2xl md:rounded-[2rem] bg-gray-200 align-middle">
              <img
                src="https://rise-atseven.transforms.svdcdn.com/production/images/Screenshot-2025-06-25-at-14.37.50.png?w=400&h=400&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1750858763&s=624a1f990a8d128dd35cf3a6e1f44dbe"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </span>
            <span>New</span>
          </h2>

          <a
            href="/thoughts"
            className="group flex items-center gap-3 rounded-full border border-[#111212]/20 bg-white px-8 py-4 text-sm font-bold uppercase transition-all hover:bg-[#111212] hover:text-white"
          >
            Explore More Thoughts
            <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {newsItems.map((item, index) => (
            <article key={index} className="r7-news-card group flex flex-col cursor-pointer">
              {/* Image Wrap */}
              <div className="relative mb-6 overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/3] md:aspect-[5/6]">
                {item.category && (
                  <span className="absolute left-6 top-6 z-10 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase backdrop-blur-sm">
                    {item.category}
                  </span>
                )}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Meta Data */}
              <div className="flex items-center gap-4 mb-4 text-[#111212]/50 text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                    {item.authorImage ? (
                      <img src={item.authorImage} alt={item.author} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#111212]/5">
                        <User className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <span>{item.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-[28px] font-black leading-[1.1] tracking-tight text-[#111212] transition-colors group-hover:text-[#cb7b3a]">
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

