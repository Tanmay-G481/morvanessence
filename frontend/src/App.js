import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./i18n";
import {
  Globe,
  Package,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Menu,
  X,
  Leaf,
  BookOpen,
  Clock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "nl", label: "Nederlands" }
];

const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1627769792188-d3f9f59833e5?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?crop=entropy&cs=srgb&fm=jpg&q=85"
];

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85"
];

const LanguageSwitcher = ({ className }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={`relative flex items-center gap-1.5 ${className || ""}`} data-testid="language-switcher">
      <Globe className="w-4 h-4 text-[#767169] pointer-events-none" />
      <select
        aria-label={t("language")}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none bg-transparent text-sm font-medium text-[#22201D]/80 hover:text-[#4A5D4E] cursor-pointer pe-4 focus:outline-none"
        data-testid="language-select"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
      <ChevronRight className="w-3 h-3 text-[#767169] rotate-90 absolute end-0 pointer-events-none" />
    </div>
  );
};

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("seo.title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("seo.desc"));
  }, [t, i18n.language]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [defaultEnquiryType, setDefaultEnquiryType] = useState("sample");
  const [activeArticle, setActiveArticle] = useState(null);

  const [formData, setFormData] = useState({
    enquiry_type: "sample",
    company_name: "",
    contact_person: "",
    business_email: "",
    phone_whatsapp: "",
    country: "United States",
    business_type: "importer",
    product_interest: "Organic Incense Sticks - Sandalwood (9-inch)",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productItems = t("products.items", { returnObjects: true });
  const fragranceItems = t("fragrances.items", { returnObjects: true });
  const plPoints = t("privateLabel.points", { returnObjects: true });
  const exportSteps = t("exportSec.steps", { returnObjects: true });
  const qualityCards = t("quality.cards", { returnObjects: true });
  const whyCards = t("why.cards", { returnObjects: true });
  const articles = t("blog.articles", { returnObjects: true });

  const modalTitle =
    defaultEnquiryType === "sample" ? t("modal.titleSample") :
    defaultEnquiryType === "quote" ? t("modal.titleQuote") :
    defaultEnquiryType === "distributor" ? t("modal.titleDistributor") : t("modal.titlePrivate");

  const handleOpenEnquiry = (type = "sample", product = "") => {
    setDefaultEnquiryType(type);
    setFormData((prev) => ({
      ...prev,
      enquiry_type: type,
      product_interest: product || prev.product_interest
    }));
    setEnquiryModalOpen(true);
  };

  const openArticle = (idx) => {
    setActiveArticle(idx);
    window.scrollTo({ top: 0 });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company_name || !formData.contact_person || !formData.business_email || !formData.phone_whatsapp) {
      toast.error(t("contact.toastRequired"));
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API}/enquiries`, formData);
      toast.success(t("contact.toastSuccess"), {
        description: `${t("contact.toastRef")}: ${res.data.id.substring(0, 8)}`
      });
      setEnquiryModalOpen(false);
      setFormData({
        enquiry_type: "sample",
        company_name: "",
        contact_person: "",
        business_email: "",
        phone_whatsapp: "",
        country: "",
        business_type: "importer",
        product_interest: "",
        message: ""
      });
    } catch (err) {
      console.error(err);
      toast.error(t("contact.toastFail"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (activeArticle !== null) {
    const art = articles[activeArticle];
    return (
      <div className="min-h-screen bg-[#F9F8F5] text-[#22201D]">
        <Toaster position="top-right" richColors />
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F9F8F5]/90 border-b border-[#E8E2D5]">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button onClick={() => setActiveArticle(null)} className="flex items-center gap-3 group" data-testid="article-brand-link">
              <div className="w-10 h-10 rounded-full bg-[#4A5D4E] flex items-center justify-center text-white font-serif text-xl tracking-widest shadow-md">M</div>
              <div>
                <span className="font-serif text-2xl tracking-wide font-bold text-[#22201D]">MORVAN ESSENCE</span>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-[#767169] font-sans">{t("nav.brandTag")}</span>
              </div>
            </button>
            <LanguageSwitcher />
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24" data-testid="article-view">
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A5D4E] hover:text-[#22201D] mb-8 group"
            data-testid="article-back-btn"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
            {t("blog.back")}
          </button>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
              <span className="text-[#C5A059] font-semibold">{art.category}</span>
              <span className="text-[#767169] flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime} {t("blog.minRead")}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D] leading-tight">{art.title}</h1>
          </div>

          <div className="rounded-3xl overflow-hidden mb-10 aspect-[16/9]">
            <img src={BLOG_IMAGES[activeArticle % BLOG_IMAGES.length]} alt={art.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            {art.content.map((p, i) => (
              <p key={i} className="text-[#22201D]/80 leading-relaxed text-base sm:text-lg">{p}</p>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-[#4A5D4E] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-light mb-1">{t("hero.ctaSample")}</h3>
              <p className="text-white/75 text-sm">{t("modal.desc")}</p>
            </div>
            <Button
              className="bg-[#C5A059] hover:bg-[#b08d48] text-[#22201D] font-semibold rounded-full px-7 h-12 shrink-0"
              onClick={() => handleOpenEnquiry("sample")}
              data-testid="article-cta-btn"
            >
              {t("nav.requestSample")}
              <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
            </Button>
          </div>
        </article>

        <Dialog open={enquiryModalOpen} onOpenChange={setEnquiryModalOpen}>
          <DialogContent className="sm:max-w-[550px] bg-[#F9F8F5] border-[#E8E2D5] text-[#22201D] p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-[#22201D]">{modalTitle}</DialogTitle>
              <DialogDescription className="text-sm text-[#767169]">{t("modal.desc")}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4" data-testid="modal-enquiry-form">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.company")}</label>
                  <Input placeholder={t("modal.companyPh")} value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="bg-white rounded-xl h-11" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.contact")}</label>
                  <Input placeholder={t("modal.contactPh")} value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} className="bg-white rounded-xl h-11" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.email")}</label>
                  <Input type="email" placeholder="name@company.com" value={formData.business_email} onChange={(e) => setFormData({ ...formData, business_email: e.target.value })} className="bg-white rounded-xl h-11" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.phone")}</label>
                  <Input placeholder="+1 (555) 000-0000" value={formData.phone_whatsapp} onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })} className="bg-white rounded-xl h-11" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.country")}</label>
                  <Input placeholder={t("modal.countryPh")} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="bg-white rounded-xl h-11" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.product")}</label>
                  <Input placeholder={t("modal.productPh")} value={formData.product_interest} onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })} className="bg-white rounded-xl h-11" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.message")}</label>
                <Textarea placeholder={t("modal.messagePh")} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-white rounded-xl min-h-[90px]" />
              </div>
              <Button type="submit" className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white h-12 rounded-xl font-semibold" disabled={isSubmitting} data-testid="modal-submit-btn">
                {isSubmitting ? t("modal.submitting") : t("modal.submit")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#22201D] overflow-x-hidden">
      <Toaster position="top-right" richColors />

      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#4A5D4E] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#C5A059]" />
        <span>{t("topbar")}</span>
      </div>

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F9F8F5]/90 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group shrink-0" data-testid="brand-logo-link">
            <div className="w-10 h-10 rounded-full bg-[#4A5D4E] flex items-center justify-center text-white font-serif text-xl tracking-widest shadow-md group-hover:bg-[#3C4C3F] transition-colors">M</div>
            <div>
              <span className="font-serif text-xl xl:text-2xl tracking-wide font-bold text-[#22201D] whitespace-nowrap">MORVAN ESSENCE</span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-[#767169] font-sans">{t("nav.brandTag")}</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-[#22201D]/80">
            <a href="#story" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-story">{t("nav.story")}</a>
            <a href="#products" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-products">{t("nav.products")}</a>
            <a href="#fragrances" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-fragrances">{t("nav.fragrances")}</a>
            <a href="#private-label" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-private-label">{t("nav.privateLabel")}</a>
            <a href="#export" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-export">{t("nav.export")}</a>
            <a href="#blog" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-blog">{t("nav.blog")}</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="outline"
              className="border-[#4A5D4E] text-[#4A5D4E] hover:bg-[#4A5D4E] hover:text-white rounded-full px-5 text-sm font-medium transition-all"
              onClick={() => handleOpenEnquiry("sample")}
              data-testid="header-sample-btn"
            >
              {t("nav.requestSample")}
            </Button>
            <Button
              className="bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full px-6 text-sm font-medium shadow-md shadow-[#4A5D4E]/20 transition-all"
              onClick={() => handleOpenEnquiry("quote")}
              data-testid="header-quote-btn"
            >
              {t("nav.requestQuote")}
            </Button>
          </div>

          <button className="lg:hidden p-2 text-[#22201D]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-toggle">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#F9F8F5] border-b border-[#E8E2D5] px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 font-medium text-lg">
                <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">{t("nav.story")}</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">{t("nav.products")}</a>
                <a href="#fragrances" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">{t("nav.fragrances")}</a>
                <a href="#private-label" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">{t("nav.privateLabel")}</a>
                <a href="#export" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">{t("nav.export")}</a>
                <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">{t("nav.blog")}</a>
              </div>
              <LanguageSwitcher className="pt-2" />
              <div className="pt-4 border-t border-[#E8E2D5] flex flex-col gap-3">
                <Button variant="outline" className="w-full border-[#4A5D4E] text-[#4A5D4E] rounded-full" onClick={() => { setMobileMenuOpen(false); handleOpenEnquiry("sample"); }}>
                  {t("nav.requestSample")}
                </Button>
                <Button className="w-full bg-[#4A5D4E] text-white rounded-full" onClick={() => { setMobileMenuOpen(false); handleOpenEnquiry("quote"); }}>
                  {t("nav.requestQuote")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden bg-[#22201D] text-[#F9F8F5]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Sandalwood incense smoke atmospheric background"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#22201D] via-[#22201D]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A5D4E]/60 backdrop-blur-md border border-[#C5A059]/40 text-[#E8E2D5] text-xs uppercase tracking-[0.2em]" data-testid="hero-badge">
              <Leaf className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-[1.1]">
              {t("hero.title")}
            </h1>

            <p className="text-lg sm:text-xl text-[#E8E2D5]/90 font-light max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#C5A059] hover:bg-[#b08d48] text-[#22201D] font-semibold rounded-full px-8 h-14 shadow-lg transition-all"
                onClick={() => handleOpenEnquiry("sample")}
                data-testid="hero-sample-btn"
              >
                {t("hero.ctaSample")}
                <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 backdrop-blur-sm transition-all"
                onClick={() => handleOpenEnquiry("distributor")}
                data-testid="hero-distributor-btn"
              >
                {t("hero.ctaDistributor")}
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/15">
              {[
                { v: t("hero.m1v"), l: t("hero.m1l") },
                { v: t("hero.m2v"), l: t("hero.m2l") },
                { v: t("hero.m3v"), l: t("hero.m3l") },
                { v: t("hero.m4v"), l: t("hero.m4l") }
              ].map((m, i) => (
                <div key={i}>
                  <p className="font-serif text-3xl font-light text-[#C5A059]">{m.v}</p>
                  <p className="text-xs text-[#E8E2D5]/70 uppercase tracking-wider mt-1">{m.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND ETHOS & VRINDAVAN STORY */}
      <section id="story" className="py-24 md:py-32 bg-[#F9F8F5] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-[#4A5D4E] text-xs uppercase tracking-[0.25em] font-semibold">
                <Globe className="w-4 h-4 text-[#C5A059]" />
                <span>{t("story.badge")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D] leading-tight">
                {t("story.title")}
              </h2>

              <p className="text-[#22201D]/80 leading-relaxed text-base sm:text-lg">{t("story.p1")}</p>
              <p className="text-[#22201D]/70 leading-relaxed text-sm sm:text-base">{t("story.p2")}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-2">{t("story.card1t")}</h3>
                  <p className="text-sm text-[#767169]">{t("story.card1d")}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-2">{t("story.card2t")}</h3>
                  <p className="text-sm text-[#767169]">{t("story.card2d")}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8E2D5] aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1627769792188-d3f9f59833e5?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Vrindavan temple ghats and incense ritual atmosphere"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-serif text-2xl font-light italic">{t("story.quote")}</p>
                    <p className="text-xs uppercase tracking-widest text-[#C5A059] mt-2">{t("story.quoteBy")}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 md:py-32 bg-[#EFECE6] border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">{t("products.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">{t("products.title")}</h2>
            <p className="text-[#767169] text-base">{t("products.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productItems.map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-sm flex flex-col justify-between transition-all hover:shadow-md" data-testid={`product-card-${idx + 1}`}>
                <div>
                  <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                    <img src={PRODUCT_IMAGES[idx]} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#4A5D4E]">
                      {p.badge}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-2">{p.title}</h3>
                  <p className="text-[#767169] text-sm mb-6">{p.desc}</p>

                  <div className="space-y-3 mb-6 text-xs text-[#22201D]">
                    <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                      <span className="font-medium text-[#767169]">{t("products.sizeLabel")}</span>
                      <span className="font-semibold">{p.sizes}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                      <span className="font-medium text-[#767169]">{p.burnLabelOverride || t("products.burnLabel")}</span>
                      <span>{p.burn}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                      <span className="font-medium text-[#767169]">{t("products.packLabel")}</span>
                      <span>{p.pack}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full h-12"
                  onClick={() => handleOpenEnquiry("sample", p.title)}
                  data-testid={`product-${idx + 1}-sample-btn`}
                >
                  {t("products.cta")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAGRANCE COLLECTION EXPLORER */}
      <section id="fragrances" className="py-24 md:py-32 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">{t("fragrances.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">{t("fragrances.title")}</h2>
            <p className="text-[#767169] text-base">{t("fragrances.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fragranceItems.map((frag, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm hover:border-[#4A5D4E] transition-all flex flex-col justify-between"
                data-testid={`fragrance-card-${idx}`}
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#EFECE6] flex items-center justify-center text-[#4A5D4E] font-serif font-bold mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-1">{frag.name}</h3>
                  <p className="text-xs text-[#C5A059] font-medium mb-3 uppercase tracking-wider">{frag.note}</p>
                  <p className="text-sm text-[#767169] mb-6">{frag.profile}</p>
                </div>
                <button
                  className="text-xs font-semibold text-[#4A5D4E] hover:text-[#22201D] flex items-center gap-1 group"
                  onClick={() => handleOpenEnquiry("sample", frag.name)}
                >
                  {t("fragrances.sampleCta")} <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE LABEL / OEM SECTION */}
      <section id="private-label" className="py-24 md:py-32 bg-[#4A5D4E] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">{t("privateLabel.badge")}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                {t("privateLabel.title")}
              </h2>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">{t("privateLabel.desc")}</p>

              <div className="space-y-4 pt-2">
                {plPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-[#C5A059] hover:bg-[#b08d48] text-[#22201D] font-semibold rounded-full px-8 h-14"
                  onClick={() => handleOpenEnquiry("private_label")}
                  data-testid="private-label-enquiry-btn"
                >
                  {t("privateLabel.cta")}
                  <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/20">
              <h3 className="font-serif text-2xl font-light text-white mb-6">{t("privateLabel.fastTitle")}</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenEnquiry("private_label"); }} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2">{t("privateLabel.f1l")}</label>
                  <Input placeholder={t("privateLabel.f1p")} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl h-12" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2">{t("privateLabel.f2l")}</label>
                  <Input type="email" placeholder={t("privateLabel.f2p")} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl h-12" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2">{t("privateLabel.f3l")}</label>
                  <Input placeholder={t("privateLabel.f3p")} className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl h-12" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-[#22201D] hover:bg-[#E8E2D5] rounded-xl h-12 font-semibold"
                  data-testid="private-label-form-submit"
                >
                  {t("privateLabel.fastCta")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* EXPORT & GLOBAL SUPPLY LOGISTICS */}
      <section id="export" className="py-24 md:py-32 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">{t("exportSec.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">{t("exportSec.title")}</h2>
            <p className="text-[#767169] text-base">{t("exportSec.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {exportSteps.map((st, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm relative flex flex-col justify-between">
                <div>
                  <span className="font-serif text-4xl text-[#C5A059] font-light block mb-4">{`0${i + 1}`}</span>
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-2">{st.title}</h3>
                  <p className="text-sm text-[#767169] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY & CERTIFICATIONS */}
      <section id="quality" className="py-24 md:py-32 bg-[#EFECE6] border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">{t("quality.badge")}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">{t("quality.title")}</h2>
              <p className="text-[#767169] leading-relaxed">{t("quality.desc")}</p>
              <div className="flex items-center gap-4 pt-2">
                <Button
                  className="bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full px-6 h-12"
                  onClick={() => handleOpenEnquiry("quote", "Quality Dossier & MSDS")}
                  data-testid="quality-dossier-btn"
                >
                  {t("quality.cta")}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {qualityCards.map((q, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-[#4A5D4E] mb-3" />
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-2">{q.title}</h3>
                  <p className="text-sm text-[#767169]">{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY MORVAN ESSENCE B2B */}
      <section className="py-24 md:py-32 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">{t("why.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">{t("why.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[Building2, Package, Globe].map((Icon, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm">
                <Icon className="w-10 h-10 text-[#C5A059] mb-4" />
                <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-3">{whyCards[idx].title}</h3>
                <p className="text-[#767169] text-sm leading-relaxed">{whyCards[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG / JOURNAL SECTION */}
      <section id="blog" className="py-24 md:py-32 bg-[#EFECE6] border-y border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">{t("blog.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">{t("blog.title")}</h2>
            <p className="text-[#767169] text-base">{t("blog.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art, idx) => (
              <div
                key={art.slug}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8E2D5] shadow-sm hover:shadow-md transition-all flex flex-col"
                data-testid={`blog-card-${idx}`}
              >
                <div className="h-44 overflow-hidden">
                  <img src={BLOG_IMAGES[idx % BLOG_IMAGES.length]} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest mb-3">
                      <span className="text-[#C5A059] font-semibold">{art.category}</span>
                      <span className="text-[#767169] flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime} {t("blog.minRead")}</span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#22201D] mb-2 leading-snug">{art.title}</h3>
                    <p className="text-sm text-[#767169] mb-5 line-clamp-3">{art.excerpt}</p>
                  </div>
                  <button
                    className="text-xs font-semibold text-[#4A5D4E] hover:text-[#22201D] flex items-center gap-1 group"
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
        </div>
      </section>

      {/* CONTACT / REQUEST A QUOTE SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-[#22201D] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">{t("contact.badge")}</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                  {t("contact.title")}
                </h2>
                <p className="text-white/80 leading-relaxed text-base">{t("contact.desc")}</p>
              </div>

              <div className="pt-6 border-t border-white/15 space-y-5" data-testid="contact-details-block">
                <p className="text-sm text-white/65 leading-relaxed">{t("contact.note")}</p>
                <div className="space-y-4">
                  <a href="mailto:tanmaygulati78@gmail.com" className="flex items-center gap-4 group" data-testid="contact-email-link">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C5A059]/25 transition-colors shrink-0">
                      <Mail className="w-4.5 h-4.5 text-[#C5A059]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("contact.emailLabel")}</p>
                      <p className="text-sm text-white font-medium group-hover:text-[#C5A059] transition-colors">tanmaygulati78@gmail.com</p>
                    </div>
                  </a>
                  <a href="https://wa.me/917060374484" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group" data-testid="contact-whatsapp-link">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C5A059]/25 transition-colors shrink-0">
                      <Phone className="w-4.5 h-4.5 text-[#C5A059]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("contact.waLabel")}</p>
                      <p className="text-sm text-white font-medium group-hover:text-[#C5A059] transition-colors">+91 70603 74484</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4" data-testid="contact-location">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-[#C5A059]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("contact.locLabel")}</p>
                      <p className="text-sm text-white font-medium">{t("contact.locValue")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 text-[#22201D] shadow-2xl">
              <h3 className="font-serif text-2xl font-light text-[#22201D] mb-6">{t("contact.formTitle")}</h3>

              <form onSubmit={handleFormSubmit} className="space-y-4" data-testid="b2b-enquiry-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.enquiryType")}</label>
                    <select
                      className="w-full h-12 rounded-xl border border-[#E8E2D5] bg-[#F9F8F5] px-3 text-sm font-medium"
                      value={formData.enquiry_type}
                      onChange={(e) => setFormData({ ...formData, enquiry_type: e.target.value })}
                      data-testid="form-enquiry-type"
                    >
                      <option value="sample">{t("contact.optSample")}</option>
                      <option value="quote">{t("contact.optQuote")}</option>
                      <option value="distributor">{t("contact.optDistributor")}</option>
                      <option value="private_label">{t("contact.optPrivate")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.businessType")}</label>
                    <select
                      className="w-full h-12 rounded-xl border border-[#E8E2D5] bg-[#F9F8F5] px-3 text-sm font-medium"
                      value={formData.business_type}
                      onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                      data-testid="form-business-type"
                    >
                      <option value="importer">{t("contact.bizImporter")}</option>
                      <option value="wholesaler">{t("contact.bizWholesaler")}</option>
                      <option value="distributor">{t("contact.bizDistributor")}</option>
                      <option value="retailer">{t("contact.bizRetailer")}</option>
                      <option value="private_label">{t("contact.bizPrivate")}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.companyName")}</label>
                    <Input placeholder={t("contact.companyPh")} value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="h-12 rounded-xl bg-[#F9F8F5]" required data-testid="form-company-name" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.contactPerson")}</label>
                    <Input placeholder={t("contact.contactPh")} value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} className="h-12 rounded-xl bg-[#F9F8F5]" required data-testid="form-contact-person" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.email")}</label>
                    <Input type="email" placeholder={t("contact.emailPh")} value={formData.business_email} onChange={(e) => setFormData({ ...formData, business_email: e.target.value })} className="h-12 rounded-xl bg-[#F9F8F5]" required data-testid="form-business-email" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.phone")}</label>
                    <Input placeholder={t("contact.phonePh")} value={formData.phone_whatsapp} onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })} className="h-12 rounded-xl bg-[#F9F8F5]" required data-testid="form-phone" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.country")}</label>
                    <Input placeholder={t("contact.countryPh")} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="h-12 rounded-xl bg-[#F9F8F5]" required data-testid="form-country" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.product")}</label>
                    <Input placeholder={t("contact.productPh")} value={formData.product_interest} onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })} className="h-12 rounded-xl bg-[#F9F8F5]" data-testid="form-product-interest" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">{t("contact.message")}</label>
                  <Textarea placeholder={t("contact.messagePh")} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-xl bg-[#F9F8F5] min-h-[100px]" data-testid="form-message" />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white h-14 rounded-xl font-semibold shadow-md"
                  disabled={isSubmitting}
                  data-testid="form-submit-btn"
                >
                  {isSubmitting ? t("contact.submitting") : t("contact.submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1816] text-[#E8E2D5]/70 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5D4E] flex items-center justify-center text-white font-serif text-xl tracking-widest">M</div>
                <span className="font-serif text-2xl tracking-wide font-bold text-white">MORVAN ESSENCE</span>
              </div>
              <p className="text-sm text-[#E8E2D5]/60 max-w-sm leading-relaxed">{t("footer.desc")}</p>
              <LanguageSwitcher className="pt-2" />
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white">{t("footer.catTitle")}</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#products" className="hover:text-white transition-colors">{t("footer.cat1")}</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">{t("footer.cat2")}</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">{t("footer.cat3")}</a></li>
                <li><a href="#fragrances" className="hover:text-white transition-colors">{t("footer.cat4")}</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white">{t("footer.servTitle")}</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#private-label" className="hover:text-white transition-colors">{t("footer.serv1")}</a></li>
                <li><a href="#export" className="hover:text-white transition-colors">{t("footer.serv2")}</a></li>
                <li><a href="#quality" className="hover:text-white transition-colors">{t("footer.serv3")}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t("footer.serv4")}</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white">{t("footer.hqTitle")}</p>
              <p className="text-sm text-[#E8E2D5]/60">{t("footer.hq1")}</p>
              <a href="mailto:tanmaygulati78@gmail.com" className="flex items-center gap-2 text-sm text-[#E8E2D5]/70 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" /> tanmaygulati78@gmail.com
              </a>
              <a href="https://wa.me/917060374484" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#E8E2D5]/70 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" /> +91 70603 74484
              </a>
              <p className="text-sm text-[#E8E2D5]/60">{t("footer.hq2")}</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8E2D5]/50 gap-4">
            <p>&copy; {new Date().getFullYear()} {t("footer.rights")}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("footer.msds")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DIALOG FOR ENQUIRY */}
      <Dialog open={enquiryModalOpen} onOpenChange={setEnquiryModalOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#F9F8F5] border-[#E8E2D5] text-[#22201D] p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#22201D]">{modalTitle}</DialogTitle>
            <DialogDescription className="text-sm text-[#767169]">{t("modal.desc")}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4" data-testid="modal-enquiry-form">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.company")}</label>
                <Input placeholder={t("modal.companyPh")} value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.contact")}</label>
                <Input placeholder={t("modal.contactPh")} value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.email")}</label>
                <Input type="email" placeholder="name@company.com" value={formData.business_email} onChange={(e) => setFormData({ ...formData, business_email: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.phone")}</label>
                <Input placeholder="+1 (555) 000-0000" value={formData.phone_whatsapp} onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.country")}</label>
                <Input placeholder={t("modal.countryPh")} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.product")}</label>
                <Input placeholder={t("modal.productPh")} value={formData.product_interest} onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })} className="bg-white rounded-xl h-11" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">{t("modal.message")}</label>
              <Textarea placeholder={t("modal.messagePh")} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-white rounded-xl min-h-[90px]" />
            </div>

            <Button type="submit" className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white h-12 rounded-xl font-semibold" disabled={isSubmitting} data-testid="modal-submit-btn">
              {isSubmitting ? t("modal.submitting") : t("modal.submit")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
