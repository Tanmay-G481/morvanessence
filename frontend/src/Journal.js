import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BookOpen, Clock, ChevronRight, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { LanguageSwitcher, BLOG_IMAGES } from "./App";

export default function JournalPage() {
  const { t } = useTranslation();
  const [activeArticle, setActiveArticle] = useState(null);
  const articles = t("blog.articles", { returnObjects: true });

  const openArticle = (idx) => {
    setActiveArticle(idx);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-[#FAF7EF] text-[#33442C]">
      <Toaster position="top-right" richColors />

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FAF7EF]/90 border-b border-[#E6DFC9]">
        <div className="max-w-[88rem] mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" data-testid="journal-brand-link">
            <img src="/images/logo-mark.png" alt="Morvan Essence logo" className="w-10 h-10 xl:w-11 xl:h-11 rounded-full object-cover shadow-md border border-[#E6DFC9] group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-serif text-base xl:text-xl tracking-wide font-bold text-[#33442C] whitespace-nowrap">MORVAN ESSENCE</span>
              <span className="hidden 2xl:block text-[10px] tracking-[0.25em] uppercase text-[#6E7A60] font-sans">{t("nav.brandTag")}</span>
            </div>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-sm font-medium text-[#33442C]/80 hover:text-[#5F7D53] transition-colors" data-testid="journal-home-link">
              Morvan Essence
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {activeArticle === null ? (
        <main className="max-w-7xl mx-auto px-6 py-16 md:py-24" data-testid="journal-page">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("blog.badge")}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("blog.title")}</h1>
            <p className="text-[#6E7A60] text-base">{t("blog.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art, idx) => (
              <div
                key={art.slug}
                className="bg-white rounded-3xl overflow-hidden border border-[#E6DFC9] shadow-sm hover:shadow-md transition-all flex flex-col"
                data-testid={`blog-card-${idx}`}
              >
                <div className="h-48 overflow-hidden">
                  <img src={BLOG_IMAGES[idx % BLOG_IMAGES.length]} alt={art.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest mb-3">
                      <span className="text-[#CDA94E] font-semibold">{art.category}</span>
                      <span className="text-[#6E7A60] flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime} {t("blog.minRead")}</span>
                    </div>
                    <h2 className="font-serif text-lg font-medium text-[#33442C] mb-2 leading-snug">{art.title}</h2>
                    <p className="text-sm text-[#6E7A60] mb-5 line-clamp-3">{art.excerpt}</p>
                  </div>
                  <button
                    className="text-xs font-semibold text-[#5F7D53] hover:text-[#33442C] flex items-center gap-1 group"
                    onClick={() => openArticle(idx)}
                    data-testid={`blog-read-${idx}`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {t("blog.readMore")}
                    <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-20" data-testid="article-view">
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F7D53] hover:text-[#33442C] mb-8 group"
            data-testid="article-back-btn"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
            {t("blog.back")}
          </button>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
              <span className="text-[#CDA94E] font-semibold">{articles[activeArticle].category}</span>
              <span className="text-[#6E7A60] flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {articles[activeArticle].readTime} {t("blog.minRead")}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C] leading-tight">{articles[activeArticle].title}</h1>
          </div>

          <div className="rounded-3xl overflow-hidden mb-10 aspect-[16/9]">
            <img src={BLOG_IMAGES[activeArticle % BLOG_IMAGES.length]} alt={articles[activeArticle].title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            {articles[activeArticle].content.map((p, i) => (
              <p key={i} className="text-[#33442C]/80 leading-relaxed text-base sm:text-lg">{p}</p>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-[#5F7D53] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-light mb-1">{t("hero.ctaSample")}</h3>
              <p className="text-white/75 text-sm">{t("modal.desc")}</p>
            </div>
            <Button
              className="bg-[#CDA94E] hover:bg-[#B89840] text-[#33442C] font-semibold rounded-full px-7 h-12 shrink-0"
              onClick={() => (window.location.href = "/#contact")}
              data-testid="article-cta-btn"
            >
              {t("nav.requestSample")}
              <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
            </Button>
          </div>
        </article>
      )}

      <footer className="bg-[#2B3A24] text-[#E6DFC9]/70 py-10 border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <Link to="/" className="font-serif text-lg font-bold text-white">MORVAN ESSENCE</Link>
          <p>&copy; {new Date().getFullYear()} {t("footer.rights")}</p>
        </div>
      </footer>

      <a
        href={`https://wa.me/917060374484?text=${encodeURIComponent(t("waGeneral"))}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 rtl:right-auto rtl:left-6"
        data-testid="floating-whatsapp-btn"
        aria-label="WhatsApp"
      >
        <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity bg-[#33442C] text-white text-xs font-medium px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
          WhatsApp
        </span>
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#5F7D53] hover:bg-[#4C6642] shadow-xl shadow-[#5F7D53]/40 transition-all hover:scale-105">
          <span className="absolute inset-0 rounded-full bg-[#5F7D53] animate-ping opacity-20" />
          <MessageCircle className="w-6 h-6 text-white relative" />
        </span>
      </a>
    </div>
  );
}
