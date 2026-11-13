import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero';
import { blogs } from '../data/blogs';

export default function Blogs() {
  return (
    <div>
      <PageHero
        badge="Editorial & Insights"
        title="The Ganesha Print"
        highlight="Architecture Journal"
        subtitle="Dispatches on chromatic precision, paper substrates, tactile finishes, and modern corporate merchandising."
        breadcrumbs={[{ name: 'Journals' }]}
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
                    {blog.category}
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
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#56667a] line-clamp-3 leading-relaxed">
                      {blog.excerpt}
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

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-xs font-semibold text-[#1f66a8] hover:text-[#0f2a4a] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

