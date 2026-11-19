import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import { blogs } from '../data/blogs';
import { useLanguage } from '../context/LanguageContext';

export default function Blogs() {
  const { tr } = useLanguage();
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (!selectedBlog) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedBlog(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBlog]);

  return (
    <div>
      <PageHero
        badge="Printing Guides & Insights"
        title="Printing Knowledge &"
        highlight="Industry Insights"
        subtitle="Helpful guides and insights on paper types, print quality, finishing techniques, and corporate gifting in India."
        breadcrumbs={[{ name: 'Blogs & Insights' }]}
      />

      <section className="py-20 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-[#dbe4ee] hover:border-[#1f66a8] overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] bg-[#0f2a4a] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    onError={(e) => { e.currentTarget.src = blog.backupImage; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-[#0f2a4a]">
                    {tr(blog.category)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#56667a] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#1f66a8]" />
                      {blog.formattedDate} • {blog.readTime}
                    </span>
                    <Link to={`/blogs/${blog.slug}`}>
                      <h3 className="font-serif text-lg font-bold text-[#0f2a4a] group-hover:text-[#1f66a8] transition-colors line-clamp-2">
                        {tr(blog.title)}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#56667a] line-clamp-1 leading-relaxed">
                      {tr(blog.excerpt)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#edf3f9] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-[11px] font-medium text-[#0f2a4a]">
                        {blog.author.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedBlog(blog)}
                      className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{tr('View')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedBlog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedBlog.title} preview`}
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-[#dbe4ee] p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#edf3f9] pb-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#1f66a8]">{selectedBlog.category}</span>
                <h3 className="mt-1 font-serif text-2xl font-bold text-[#0f2a4a]">{selectedBlog.title}</h3>
                <p className="mt-1 text-xs text-[#56667a]">{selectedBlog.formattedDate} · {selectedBlog.readTime}</p>
              </div>
              <button type="button" onClick={() => setSelectedBlog(null)} aria-label="Close preview" className="p-2 rounded-full text-[#56667a] hover:bg-[#edf3f9]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#56667a]">{selectedBlog.excerpt}</p>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#17375e]">
              {selectedBlog.content.slice(0, 2).map((block, index) => (
                <p key={index}>{block.text}</p>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-[#edf3f9] pt-5">
              <Link
                to={`/blogs/${selectedBlog.slug}`}
                onClick={() => setSelectedBlog(null)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0f2a4a] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1f66a8]"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

