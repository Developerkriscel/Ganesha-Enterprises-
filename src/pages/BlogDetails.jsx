import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { blogs } from '../data/blogs';

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="py-32 text-center max-w-lg mx-auto px-4 space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#18191b]">Article Not Found</h2>
        <p className="text-sm text-[#686a71]">The editorial essay you are looking for does not exist in our archive.</p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18191b] text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Journal</span>
        </Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Article URL copied to clipboard.');
  };

  return (
    <div>
      <PageHero
        badge={blog.category}
        title={blog.title}
        subtitle={blog.subtitle}
        breadcrumbs={[
          { name: 'Journals', path: '/blogs' },
          { name: blog.title.slice(0, 24) + '...' }
        ]}
      />

      <article className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Metadata Bar */}
          <div className="flex items-center justify-between pb-8 border-b border-[#e4e2dd] mb-10 text-xs text-[#686a71]">
            <div className="flex items-center gap-3">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#e4e2dd]"
              />
              <div>
                <span className="font-bold text-[#18191b] block">{blog.author.name}</span>
                <span>{blog.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
                {blog.readTime}
              </span>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-[#f4f1ea] text-[#18191b] transition-colors"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Hero Photo */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-[#18191b] shadow-2xl mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              onError={(e) => { e.currentTarget.src = blog.backupImage; }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body Content */}
          <div className="space-y-8 text-base text-[#27282b] leading-relaxed">
            {blog.content.map((block, idx) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="whitespace-pre-line leading-relaxed font-normal">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h3 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-[#18191b] pt-4">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={idx} className="my-8 p-6 sm:p-8 rounded-3xl bg-[#faf8f5] border-l-4 border-[#b8860b] text-[#18191b] italic space-y-2">
                    <p className="font-serif text-lg sm:text-xl font-medium">"{block.text}"</p>
                    <footer className="text-xs uppercase tracking-widest text-[#b8860b] font-semibold not-italic">
                      — {block.author}
                    </footer>
                  </blockquote>
                );
              }
              if (block.type === 'keyTakeaways') {
                return (
                  <div key={idx} className="my-8 p-6 sm:p-8 rounded-3xl bg-[#faf8f5] border border-[#e4e2dd] space-y-3">
                    <h5 className="font-serif text-lg font-bold text-[#18191b] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#b8860b]" />
                      Executive Takeaways
                    </h5>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#686a71]">
                      {block.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Author Box */}
          <div className="mt-16 p-8 rounded-3xl bg-[#faf8f5] border border-[#e4e2dd] flex flex-col sm:flex-row items-center gap-6">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#b8860b]"
            />
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif text-lg font-bold text-[#18191b]">{blog.author.name}</h4>
              <p className="text-xs text-[#b8860b] font-semibold uppercase tracking-wider">{blog.author.role}</p>
              <p className="text-xs text-[#686a71] leading-relaxed">
                Guiding color accuracy, paper chemistry, and tactile finishing at Ganesha Enterprises Naraina plant for over a decade.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 bg-[#faf8f5] border-t border-[#e4e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-serif text-2xl font-bold text-[#18191b]">
              More from the Print Journal
            </h3>
            <Link to="/blogs" className="text-xs font-semibold text-[#b8860b] hover:text-[#18191b]">
              View All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(r => (
              <article key={r.id} className="p-6 rounded-2xl bg-white border border-[#e4e2dd] hover:border-[#b8860b] transition-all group flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#b8860b]">{r.category}</span>
                  <Link to={`/blogs/${r.slug}`}>
                    <h4 className="font-serif text-lg font-bold text-[#18191b] group-hover:text-[#b8860b] transition-colors mt-1 line-clamp-2">{r.title}</h4>
                  </Link>
                  <p className="text-xs text-[#686a71] mt-2 line-clamp-2">{r.excerpt}</p>
                </div>
                <Link to={`/blogs/${r.slug}`} className="mt-4 pt-4 border-t border-[#eceae5] text-xs font-semibold text-[#18191b] inline-flex items-center gap-1 group-hover:text-[#b8860b]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

