import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JournalPage from "./Journal";
import { useTranslation } from "react-i18next";
import "./i18n";
import {
  Globe,
  Package,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Building2,
  Menu,
  X,
  Leaf,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  BadgeCheck,
  Landmark,
  FileBadge,
  ExternalLink,
  Ruler,
  Timer,
  Scale,
  Ship,
  Leaf as LeafIcon
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

export const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1627769792188-d3f9f59833e5?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?crop=entropy&cs=srgb&fm=jpg&q=85"
];

const FRAGRANCE_IMAGES = [
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1499002238440-d264edd596ec?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1590502593747-42a996133562?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?crop=entropy&cs=srgb&fm=jpg&q=85"
];

const CERT_DOCS = [
  { img: "/certificates/iec.jpg", pdf: "/certificates/iec.pdf" },
  { img: "/certificates/udyam.jpg", pdf: "/certificates/udyam.pdf" },
  { img: "/certificates/gst.jpg", pdf: "/certificates/gst.pdf" }
];

const VRINDAVAN_IMAGES = [
  "/images/vrindavan-keshi-ghat.jpg",
  "/images/vrindavan-radha-raman.jpg",
  "/images/vrindavan-prem-mandir.jpg",
  "/images/vrindavan-1860.jpg",
  "/images/giriraj-ji.jpg",
  "/images/vrindavan-shringar.jpg",
  "/images/vrindavan-darshan.jpg",
  "/images/vrindavan-kund.jpg"
];

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=srgb&fm=jpg&q=85",
  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?crop=entropy&cs=srgb&fm=jpg&q=85"
];

export const LanguageSwitcher = ({ className }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={`relative flex items-center gap-1.5 ${className || ""}`} data-testid="language-switcher">
      <Globe className="w-4 h-4 text-[#6E7A60] pointer-events-none" />
      <select
        aria-label={t("language")}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="appearance-none bg-transparent text-xs 2xl:text-sm font-medium text-[#33442C]/80 hover:text-[#5F7D53] cursor-pointer pe-4 focus:outline-none max-w-[80px] 2xl:max-w-none"
        data-testid="language-select"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
      <ChevronRight className="w-3 h-3 text-[#6E7A60] rotate-90 absolute end-0 pointer-events-none" />
    </div>
  );
};

function HomePage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("seo.title");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("seo.desc"));
  }, [t, i18n.language]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [defaultEnquiryType, setDefaultEnquiryType] = useState("sample");

  const [formData, setFormData] = useState({
    enquiry_type: "sample",
    company_name: "",
    contact_person: "",
    business_email: "",
    phone_whatsapp: "",
    country: "United States",
    business_type: "importer",
    product_interest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productItems = t("products.items", { returnObjects: true });
  const fragranceItems = t("fragrances.items", { returnObjects: true });
  const plPoints = t("privateLabel.points", { returnObjects: true });
  const exportSteps = t("exportSec.steps", { returnObjects: true });
  const qualityCards = t("quality.cards", { returnObjects: true });
  const whyCards = t("why.cards", { returnObjects: true });
  const certItems = t("certs.items", { returnObjects: true });
  const trustItems = t("trust.items", { returnObjects: true });
  const vrinCaps = t("vrin.caps", { returnObjects: true });

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

  return (
    <div className="min-h-screen bg-[#FAF7EF] text-[#33442C] overflow-x-hidden">
      <Toaster position="top-right" richColors />

      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#5F7D53] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#CDA94E]" />
        <span>{t("topbar")}</span>
      </div>

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FAF7EF]/90 border-b border-[#E6DFC9]">
        <div className="max-w-[88rem] mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 group shrink-0" data-testid="brand-logo-link">
            <img src="/images/logo-mark.png" alt="Morvan Essence logo" className="w-10 h-10 xl:w-11 xl:h-11 object-contain group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-serif text-base xl:text-xl tracking-wide font-bold text-[#33442C] whitespace-nowrap">MORVAN ESSENCE</span>
              <span className="hidden 2xl:block text-[10px] tracking-[0.25em] uppercase text-[#6E7A60] font-sans">{t("nav.brandTag")}</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-6 text-[11px] xl:text-xs 2xl:text-[13px] font-medium text-[#33442C]/80 whitespace-nowrap">
            <a href="#story" className="hover:text-[#5F7D53] transition-colors" data-testid="nav-story">{t("nav.story")}</a>
            <a href="#products" className="hover:text-[#5F7D53] transition-colors" data-testid="nav-products">{t("nav.products")}</a>
            <a href="#fragrances" className="hover:text-[#5F7D53] transition-colors" data-testid="nav-fragrances">{t("nav.fragrances")}</a>
            <a href="#private-label" className="hover:text-[#5F7D53] transition-colors" data-testid="nav-private-label">{t("nav.privateLabel")}</a>
            <a href="#export" className="hover:text-[#5F7D53] transition-colors" data-testid="nav-export">{t("nav.export")}</a>
            <Link to="/journal" className="hover:text-[#5F7D53] transition-colors" data-testid="nav-blog">{t("nav.blog")}</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="outline"
              className="hidden xl:inline-flex border-[#5F7D53] text-[#5F7D53] hover:bg-[#5F7D53] hover:text-white rounded-full px-4 text-xs font-medium transition-all whitespace-nowrap"
              onClick={() => handleOpenEnquiry("sample")}
              data-testid="header-sample-btn"
            >
              {t("nav.requestSample")}
            </Button>
            <Button
              className="bg-[#5F7D53] hover:bg-[#4C6642] text-white rounded-full px-4 xl:px-6 text-xs xl:text-sm font-medium shadow-md shadow-[#5F7D53]/20 transition-all whitespace-nowrap"
              onClick={() => handleOpenEnquiry("quote")}
              data-testid="header-quote-btn"
            >
              {t("nav.requestQuote")}
            </Button>
          </div>

          <button className="lg:hidden p-2 text-[#33442C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-toggle">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#FAF7EF] border-b border-[#E6DFC9] px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 font-medium text-lg">
                <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#5F7D53]">{t("nav.story")}</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#5F7D53]">{t("nav.products")}</a>
                <a href="#fragrances" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#5F7D53]">{t("nav.fragrances")}</a>
                <a href="#private-label" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#5F7D53]">{t("nav.privateLabel")}</a>
                <a href="#export" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#5F7D53]">{t("nav.export")}</a>
                <Link to="/journal" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#5F7D53]">{t("nav.blog")}</Link>
              </div>
              <LanguageSwitcher className="pt-2" />
              <div className="pt-4 border-t border-[#E6DFC9] flex flex-col gap-3">
                <Button variant="outline" className="w-full border-[#5F7D53] text-[#5F7D53] rounded-full" onClick={() => { setMobileMenuOpen(false); handleOpenEnquiry("sample"); }}>
                  {t("nav.requestSample")}
                </Button>
                <Button className="w-full bg-[#5F7D53] text-white rounded-full" onClick={() => { setMobileMenuOpen(false); handleOpenEnquiry("quote"); }}>
                  {t("nav.requestQuote")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden bg-[#33442C] text-[#FAF7EF]">
        <div className="absolute inset-0 z-0 opacity-55">
          <img
            src="/images/tulsi-diya-hero.jpg"
            alt="Sacred Tulsi plant with a glowing brass diya at night in Vrindavan"
            className="w-full h-full object-cover scale-105"
            style={{ objectPosition: "center 68%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#33442C] via-[#33442C]/65 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5F7D53]/60 backdrop-blur-md border border-[#CDA94E]/40 text-[#E6DFC9] text-xs uppercase tracking-[0.2em]" data-testid="hero-badge">
              <Leaf className="w-3.5 h-3.5 text-[#EAD18F]" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-[1.1]">
              {t("hero.title")}
            </h1>

            <p className="text-lg sm:text-xl text-[#E6DFC9]/90 font-light max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#CDA94E] hover:bg-[#B89840] text-[#33442C] font-semibold rounded-full px-8 h-14 shadow-lg transition-all"
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
                onClick={() => window.open(`https://wa.me/919762717978?text=${encodeURIComponent(t("hero.waDistributor"))}`, "_blank")}
                data-testid="hero-distributor-btn"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
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
                  <p className="font-serif text-3xl font-light text-[#EAD18F]">{m.v}</p>
                  <p className="text-xs text-[#E6DFC9]/70 uppercase tracking-wider mt-1">{m.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST & SPECIFICATIONS STRIP */}
      <section id="specs" className="relative z-20 -mt-16 md:-mt-20 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-xl shadow-[#33442C]/10 border border-[#E6DFC9] p-6 md:p-8"
            data-testid="trust-strip"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("trust.badge")}</span>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-[#33442C]">{t("trust.title")}</h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5F7D53]/10 text-[#5F7D53] text-xs font-semibold self-start md:self-auto" data-testid="trust-certline">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{t("trust.certLine")}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {trustItems.map((it, i) => {
                const Icon = [Ruler, Timer, Leaf, Package, Scale, Ship][i];
                return (
                  <div key={i} className="space-y-1.5" data-testid={`trust-item-${i}`}>
                    <Icon className="w-5 h-5 text-[#CDA94E]" />
                    <p className="text-[10px] uppercase tracking-widest text-[#6E7A60] font-semibold">{it.label}</p>
                    <p className="text-sm font-medium text-[#33442C] leading-snug">{it.value}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRAND ETHOS & VRINDAVAN STORY */}
      <section id="story" className="py-24 md:py-32 bg-[#FAF7EF] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-[#5F7D53] text-xs uppercase tracking-[0.25em] font-semibold">
                <Globe className="w-4 h-4 text-[#CDA94E]" />
                <span>{t("story.badge")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C] leading-tight">
                {t("story.title")}
              </h2>

              <p className="text-[#33442C]/80 leading-relaxed text-base sm:text-lg">{t("story.p1")}</p>
              <p className="text-[#33442C]/70 leading-relaxed text-sm sm:text-base">{t("story.p2")}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E6DFC9] shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-[#33442C] mb-2">{t("story.card1t")}</h3>
                  <p className="text-sm text-[#6E7A60]">{t("story.card1d")}</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#E6DFC9] shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-[#33442C] mb-2">{t("story.card2t")}</h3>
                  <p className="text-sm text-[#6E7A60]">{t("story.card2d")}</p>
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E6DFC9] aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1627769792188-d3f9f59833e5?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Vrindavan temple ghats and incense ritual atmosphere"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-serif text-2xl font-light italic">{t("story.quote")}</p>
                    <p className="text-xs uppercase tracking-widest text-[#CDA94E] mt-2">{t("story.quoteBy")}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VRINDAVAN ROOTS & SPIRITUALITY */}
      <section id="vrindavan-roots" className="py-24 md:py-32 bg-[#F1EDDF] border-y border-[#E6DFC9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("vrin.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("vrin.title")}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E6DFC9] h-full min-h-[440px]">
                <img
                  src="https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85"
                  alt="Incense smoke rising in a dark room"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <video
                  src="/videos/incense-vrindavan.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="absolute inset-0 w-full h-full object-cover"
                  data-testid="vrindavan-video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#33442C]/80 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white/90 text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#EAD18F]" />
                    {t("vrin.videoCap")}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 flex flex-col justify-center space-y-6"
            >
              <p className="font-serif text-2xl md:text-3xl font-light text-[#33442C] leading-relaxed">{t("vrin.p1")}</p>
              <div className="flex items-center gap-3">
                <div className="h-px w-16 bg-[#CDA94E]" />
                <Sparkles className="w-4 h-4 text-[#CDA94E]" />
                <div className="h-px w-16 bg-[#CDA94E]" />
              </div>
              <p className="text-[#33442C]/75 leading-relaxed text-base md:text-lg max-w-xl">{t("vrin.p2")}</p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {VRINDAVAN_IMAGES.map((src, i) => (
                  <div key={i} className={`group relative rounded-2xl overflow-hidden shadow-md border border-[#E6DFC9] ${i === 4 || i === 7 ? "col-span-2 h-48 md:h-60" : "h-40 md:h-48"}`} data-testid={`vrindavan-img-${i}`}>
                    <img src={src} alt={vrinCaps[i]} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#33442C]/75 via-transparent to-transparent flex items-end p-3">
                      <p className="text-white/90 text-[11px] md:text-xs font-medium tracking-wide">{vrinCaps[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 md:py-32 bg-[#F1EDDF] border-y border-[#E6DFC9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("products.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("products.title")}</h2>
            <p className="text-[#6E7A60] text-base">{t("products.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productItems.map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-[#E6DFC9] shadow-sm flex flex-col justify-between transition-all hover:shadow-md" data-testid={`product-card-${idx + 1}`}>
                <div>
                  <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                    <img src={PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]} alt={`${p.title} — Morvan Essence export product`} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#5F7D53]">
                      {p.badge}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[#33442C] mb-2">{p.title}</h3>
                  <p className="text-[#6E7A60] text-sm mb-6">{p.desc}</p>

                  <div className="space-y-3 mb-6 text-xs text-[#33442C]">
                    <div className="flex items-center justify-between py-2 border-b border-[#E6DFC9]">
                      <span className="font-medium text-[#6E7A60]">{t("products.sizeLabel")}</span>
                      <span className="font-semibold">{p.sizes}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E6DFC9]">
                      <span className="font-medium text-[#6E7A60]">{p.burnLabelOverride || t("products.burnLabel")}</span>
                      <span>{p.burn}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E6DFC9]">
                      <span className="font-medium text-[#6E7A60]">{t("products.packLabel")}</span>
                      <span>{p.pack}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#5F7D53] hover:bg-[#4C6642] text-white rounded-full h-12"
                  onClick={() => handleOpenEnquiry("sample", p.title)}
                  data-testid={`product-${idx + 1}-sample-btn`}
                >
                  {t("products.cta")}
                </Button>
                {p.badge === "Sacred Collection" && (
                  <button
                    className="w-full text-xs text-[#CDA94E] font-medium mt-2 py-1.5 flex items-center justify-center gap-1.5 hover:text-[#33442C] transition-colors"
                    onClick={() => handleOpenEnquiry("quote", p.title + " — Custom Blend")}
                  >
                    ✦ Custom fragrance blending available for bulk orders
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAGRANCE COLLECTION EXPLORER */}
      <section id="fragrances" className="py-24 md:py-32 bg-[#FAF7EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("fragrances.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("fragrances.title")}</h2>
            <p className="text-[#6E7A60] text-base">{t("fragrances.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fragranceItems.map((frag, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E6DFC9] shadow-sm hover:border-[#5F7D53] transition-all flex flex-col justify-between"
                data-testid={`fragrance-card-${idx}`}
              >
                <div>
                  <div className="h-32 rounded-xl overflow-hidden mb-4 relative">
                    <img src={FRAGRANCE_IMAGES[idx % FRAGRANCE_IMAGES.length]} alt={`${frag.name} — incense fragrance from Vrindavan`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#5F7D53] font-serif font-bold text-xs shadow-sm">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#33442C] mb-1">{frag.name}</h3>
                  <p className="text-xs text-[#CDA94E] font-medium mb-3 uppercase tracking-wider">{frag.note}</p>
                  <p className="text-sm text-[#6E7A60] mb-6">{frag.profile}</p>
                </div>
                <button
                  className="text-xs font-semibold text-[#5F7D53] hover:text-[#33442C] flex items-center gap-1 group"
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
      <section id="private-label" className="py-24 md:py-32 bg-[#5F7D53] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EAD18F]">{t("privateLabel.badge")}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                {t("privateLabel.title")}
              </h2>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">{t("privateLabel.desc")}</p>

              <div className="space-y-4 pt-2">
                {plPoints.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#EAD18F] shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-[#CDA94E] hover:bg-[#B89840] text-[#33442C] font-semibold rounded-full px-8 h-14"
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
                  className="w-full bg-white text-[#33442C] hover:bg-[#E6DFC9] rounded-xl h-12 font-semibold"
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
      <section id="export" className="py-24 md:py-32 bg-[#FAF7EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("exportSec.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("exportSec.title")}</h2>
            <p className="text-[#6E7A60] text-base">{t("exportSec.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {exportSteps.map((st, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-[#E6DFC9] shadow-sm relative flex flex-col justify-between">
                <div>
                  <span className="font-serif text-4xl text-[#CDA94E] font-light block mb-4">{`0${i + 1}`}</span>
                  <h3 className="font-serif text-xl font-medium text-[#33442C] mb-2">{st.title}</h3>
                  <p className="text-sm text-[#6E7A60] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY & CERTIFICATIONS */}
      <section id="quality" className="py-24 md:py-32 bg-[#F1EDDF] border-y border-[#E6DFC9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("quality.badge")}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("quality.title")}</h2>
              <p className="text-[#6E7A60] leading-relaxed">{t("quality.desc")}</p>
              <div className="flex items-center gap-4 pt-2">
                <Button
                  className="bg-[#5F7D53] hover:bg-[#4C6642] text-white rounded-full px-6 h-12"
                  onClick={() => handleOpenEnquiry("quote", "Quality Dossier & MSDS")}
                  data-testid="quality-dossier-btn"
                >
                  {t("quality.cta")}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {qualityCards.map((q, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E6DFC9] shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-[#5F7D53] mb-3" />
                  <h3 className="font-serif text-xl font-medium text-[#33442C] mb-2">{q.title}</h3>
                  <p className="text-sm text-[#6E7A60]">{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS CERTIFICATIONS */}
      <section id="certificates" className="py-24 md:py-32 bg-[#33442C] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EAD18F]">{t("certs.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white">{t("certs.title")}</h2>
            <p className="text-white/70 text-base">{t("certs.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certItems.map((c, idx) => {
              const Icon = [FileBadge, Landmark, BadgeCheck, LeafIcon][idx];
              return (
                <div key={idx} className="rounded-3xl bg-white/[0.06] border border-[#CDA94E]/25 overflow-hidden backdrop-blur-sm hover:border-[#CDA94E]/60 hover:bg-white/[0.09] transition-all flex flex-col" data-testid={`cert-card-${idx}`}>
                  <a href={CERT_DOCS[idx].pdf} target="_blank" rel="noopener noreferrer" className="block h-44 overflow-hidden bg-white/95 relative group" data-testid={`cert-preview-${idx}`}>
                    <img src={CERT_DOCS[idx].img} alt={c.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#33442C]/0 group-hover:bg-[#33442C]/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#33442C] text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" /> {t("certs.view")}
                      </span>
                    </div>
                  </a>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-[#EAD18F]/15 flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-[#EAD18F]" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-white leading-snug">{c.name}</h3>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#EAD18F] font-semibold mb-3">{c.issuer}</p>
                    <p className="text-sm text-white/70 leading-relaxed flex-1">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-white/50 mt-10" data-testid="certs-note">{t("certs.note")}</p>
        </div>
      </section>

      {/* WHY MORVAN ESSENCE B2B */}
      <section className="py-24 md:py-32 bg-[#FAF7EF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7D53]">{t("why.badge")}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#33442C]">{t("why.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[Building2, Package, Globe].map((Icon, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-[#E6DFC9] shadow-sm">
                <Icon className="w-10 h-10 text-[#CDA94E] mb-4" />
                <h3 className="font-serif text-2xl font-medium text-[#33442C] mb-3">{whyCards[idx].title}</h3>
                <p className="text-[#6E7A60] text-sm leading-relaxed">{whyCards[idx].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / REQUEST A QUOTE SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-[#33442C] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EAD18F]">{t("contact.badge")}</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                  {t("contact.title")}
                </h2>
                <p className="text-white/80 leading-relaxed text-base">{t("contact.desc")}</p>
              </div>

              <div className="pt-6 border-t border-white/15 space-y-5" data-testid="contact-details-block">
                <p className="text-sm text-white/65 leading-relaxed">{t("contact.note")}</p>
                <div className="space-y-4">
                  <a href="mailto:exports@morvanessence.com" className="flex items-center gap-4 group" data-testid="contact-email-link">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#CDA94E]/25 transition-colors shrink-0">
                      <Mail className="w-4.5 h-4.5 text-[#EAD18F]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("contact.emailLabel")}</p>
                      <p className="text-sm text-white font-medium group-hover:text-[#CDA94E] transition-colors">exports@morvanessence.com</p>
                    </div>
                  </a>
                  <a href="https://wa.me/919762717978" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group" data-testid="contact-whatsapp-link">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#CDA94E]/25 transition-colors shrink-0">
                      <Phone className="w-4.5 h-4.5 text-[#EAD18F]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("contact.waLabel")}</p>
                      <p className="text-sm text-white font-medium group-hover:text-[#CDA94E] transition-colors">+91 97627 17978</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4" data-testid="contact-location">
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-[#EAD18F]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{t("contact.locLabel")}</p>
                      <p className="text-sm text-white font-medium">{t("contact.locValue")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 text-[#33442C] shadow-2xl">
              <h3 className="font-serif text-2xl font-light text-[#33442C] mb-6">{t("contact.formTitle")}</h3>

              <form onSubmit={handleFormSubmit} className="space-y-4" data-testid="b2b-enquiry-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.enquiryType")}</label>
                    <select
                      className="w-full h-12 rounded-xl border border-[#E6DFC9] bg-[#FAF7EF] px-3 text-sm font-medium"
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
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.businessType")}</label>
                    <select
                      className="w-full h-12 rounded-xl border border-[#E6DFC9] bg-[#FAF7EF] px-3 text-sm font-medium"
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
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.companyName")}</label>
                    <Input placeholder={t("contact.companyPh")} value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="h-12 rounded-xl bg-[#FAF7EF]" required data-testid="form-company-name" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.contactPerson")}</label>
                    <Input placeholder={t("contact.contactPh")} value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} className="h-12 rounded-xl bg-[#FAF7EF]" required data-testid="form-contact-person" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.email")}</label>
                    <Input type="email" placeholder={t("contact.emailPh")} value={formData.business_email} onChange={(e) => setFormData({ ...formData, business_email: e.target.value })} className="h-12 rounded-xl bg-[#FAF7EF]" required data-testid="form-business-email" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.phone")}</label>
                    <Input placeholder={t("contact.phonePh")} value={formData.phone_whatsapp} onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })} className="h-12 rounded-xl bg-[#FAF7EF]" required data-testid="form-phone" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.country")}</label>
                    <Input placeholder={t("contact.countryPh")} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="h-12 rounded-xl bg-[#FAF7EF]" required data-testid="form-country" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.product")}</label>
                    <Input placeholder={t("contact.productPh")} value={formData.product_interest} onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })} className="h-12 rounded-xl bg-[#FAF7EF]" data-testid="form-product-interest" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1.5 font-medium">{t("contact.message")}</label>
                  <Textarea placeholder={t("contact.messagePh")} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-xl bg-[#FAF7EF] min-h-[100px]" data-testid="form-message" />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#5F7D53] hover:bg-[#4C6642] text-white h-14 rounded-xl font-semibold shadow-md"
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
      <footer className="bg-[#2B3A24] text-[#E6DFC9]/70 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src="/images/logo-mark.png" alt="Morvan Essence logo" className="w-10 h-10 object-contain" />
                <span className="font-serif text-2xl tracking-wide font-bold text-white">MORVAN ESSENCE</span>
              </div>
              <p className="text-sm text-[#E6DFC9]/60 max-w-sm leading-relaxed">{t("footer.desc")}</p>
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
              <p className="text-sm text-[#E6DFC9]/60">{t("footer.hq1")}</p>
              <a href="mailto:exports@morvanessence.com" className="flex items-center gap-2 text-sm text-[#E6DFC9]/70 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#EAD18F]" /> exports@morvanessence.com
              </a>
              <a href="https://wa.me/919762717978" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#E6DFC9]/70 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#EAD18F]" /> +91 97627 17978
              </a>
              <p className="text-sm text-[#E6DFC9]/60">{t("footer.hq2")}</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E6DFC9]/50 gap-4">
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
        <DialogContent className="sm:max-w-[550px] bg-[#FAF7EF] border-[#E6DFC9] text-[#33442C] p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#33442C]">{modalTitle}</DialogTitle>
            <DialogDescription className="text-sm text-[#6E7A60]">{t("modal.desc")}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4" data-testid="modal-enquiry-form">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.company")}</label>
                <Input placeholder={t("modal.companyPh")} value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.contact")}</label>
                <Input placeholder={t("modal.contactPh")} value={formData.contact_person} onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.email")}</label>
                <Input type="email" placeholder="name@company.com" value={formData.business_email} onChange={(e) => setFormData({ ...formData, business_email: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.phone")}</label>
                <Input placeholder="+1 (555) 000-0000" value={formData.phone_whatsapp} onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.country")}</label>
                <Input placeholder={t("modal.countryPh")} value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="bg-white rounded-xl h-11" required />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.product")}</label>
                <Input placeholder={t("modal.productPh")} value={formData.product_interest} onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })} className="bg-white rounded-xl h-11" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6E7A60] mb-1 font-medium">{t("modal.message")}</label>
              <Textarea placeholder={t("modal.messagePh")} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-white rounded-xl min-h-[90px]" />
            </div>

            <Button type="submit" className="w-full bg-[#5F7D53] hover:bg-[#4C6642] text-white h-12 rounded-xl font-semibold" disabled={isSubmitting} data-testid="modal-submit-btn">
              {isSubmitting ? t("modal.submitting") : t("modal.submit")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/919762717978?text=${encodeURIComponent(t("waGeneral"))}`}
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/:slug" element={<JournalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

