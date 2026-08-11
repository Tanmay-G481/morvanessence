import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Package, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Building2, 
  Award, 
  Layers, 
  Menu, 
  X,
  ExternalLink,
  Flame,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [defaultEnquiryType, setDefaultEnquiryType] = useState("sample");
  
  // Form states
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

  const handleOpenEnquiry = (type = "sample", product = "") => {
    setDefaultEnquiryType(type);
    setFormData(prev => ({
      ...prev,
      enquiry_type: type,
      product_interest: product || prev.product_interest
    }));
    setEnquiryModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company_name || !formData.contact_person || !formData.business_email || !formData.phone_whatsapp) {
      toast.error("Please fill in all mandatory contact fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API}/enquiries`, formData);
      toast.success("Enquiry submitted successfully! Our export desk will respond within 24 hours.", {
        description: `Reference ID: ${res.data.id.substring(0,8)}`
      });
      setEnquiryModalOpen(false);
      setFormData({
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit enquiry. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#22201D] overflow-x-hidden">
      <Toaster position="top-right" richColors />

      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#4A5D4E] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#C5A059]" />
        <span>India-based B2B export partner from Vrindavan &bull; Built for importers, wholesalers & private-label brands</span>
      </div>

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F9F8F5]/90 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" data-testid="brand-logo-link">
            <div className="w-10 h-10 rounded-full bg-[#4A5D4E] flex items-center justify-center text-white font-serif text-xl tracking-widest shadow-md group-hover:bg-[#3C4C3F] transition-colors">
              M
            </div>
            <div>
              <span className="font-serif text-2xl tracking-wide font-bold text-[#22201D]">MORVAN ESSENCE</span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-[#767169] font-sans">Vrindavan &bull; Global Export</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#22201D]/80">
            <a href="#story" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-story">Our Story</a>
            <a href="#products" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-products">Products</a>
            <a href="#fragrances" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-fragrances">Fragrance Library</a>
            <a href="#private-label" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-private-label">Private Label / OEM</a>
            <a href="#export" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-export">Global Supply</a>
            <a href="#quality" className="hover:text-[#4A5D4E] transition-colors" data-testid="nav-quality">Quality</a>
          </nav>

          {/* B2B CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-[#4A5D4E] text-[#4A5D4E] hover:bg-[#4A5D4E] hover:text-white rounded-full px-5 text-sm font-medium transition-all"
              onClick={() => handleOpenEnquiry("sample")}
              data-testid="header-sample-btn"
            >
              Request Sample
            </Button>
            <Button 
              className="bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full px-6 text-sm font-medium shadow-md shadow-[#4A5D4E]/20 transition-all"
              onClick={() => handleOpenEnquiry("quote")}
              data-testid="header-quote-btn"
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 text-[#22201D]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#F9F8F5] border-b border-[#E8E2D5] px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 font-medium text-lg">
                <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">Our Story</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">Products</a>
                <a href="#fragrances" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">Fragrance Library</a>
                <a href="#private-label" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">Private Label / OEM</a>
                <a href="#export" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">Global Supply</a>
                <a href="#quality" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#4A5D4E]">Quality</a>
              </div>
              <div className="pt-4 border-t border-[#E8E2D5] flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full border-[#4A5D4E] text-[#4A5D4E] rounded-full"
                  onClick={() => { setMobileMenuOpen(false); handleOpenEnquiry("sample"); }}
                >
                  Request Sample
                </Button>
                <Button 
                  className="w-full bg-[#4A5D4E] text-white rounded-full"
                  onClick={() => { setMobileMenuOpen(false); handleOpenEnquiry("quote"); }}
                >
                  Request a Quote
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
              <span>Vrindavan Heritage &bull; Global B2B Export</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-tight text-white leading-[1.1]">
              Authentic Indian Incense, Inspired by Vrindavan &mdash; Crafted for the World.
            </h1>

            <p className="text-lg sm:text-xl text-[#E8E2D5]/90 font-light max-w-2xl leading-relaxed">
              We partner with international importers, wholesalers, distributors, retailers, and private-label brands seeking thoughtfully made incense and dhoop products from India.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-[#C5A059] hover:bg-[#b08d48] text-[#22201D] font-semibold rounded-full px-8 h-14 shadow-lg transition-all"
                onClick={() => handleOpenEnquiry("sample")}
                data-testid="hero-sample-btn"
              >
                Request an Export Sample Kit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 backdrop-blur-sm transition-all"
                onClick={() => handleOpenEnquiry("distributor")}
                data-testid="hero-distributor-btn"
              >
                Become a Distributor
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/15">
              <div>
                <p className="font-serif text-3xl font-light text-[#C5A059]">India</p>
                <p className="text-xs text-[#E8E2D5]/70 uppercase tracking-wider mt-1">Source & export base</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-light text-[#C5A059]">3.5&quot; &ndash; 9&quot;</p>
                <p className="text-xs text-[#E8E2D5]/70 uppercase tracking-wider mt-1">Precision Formats</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-light text-[#C5A059]">Natural</p>
                <p className="text-xs text-[#E8E2D5]/70 uppercase tracking-wider mt-1">Ingredient direction</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-light text-[#C5A059]">OEM / ODM</p>
                <p className="text-xs text-[#E8E2D5]/70 uppercase tracking-wider mt-1">Private Label Ready</p>
              </div>
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
                <span>Roots in Vrindavan &bull; Wings to the World</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D] leading-tight">
                Rooted in the Sacred Heritage of Vrindavan
              </h2>

              <p className="text-[#22201D]/80 leading-relaxed text-base sm:text-lg">
                Vrindavan has for centuries been the spiritual cradle of divine fragrances, sacred herbs, and pure botanical resin art. Morvan Essence was born from this timeless tradition &mdash; translating ancient artisanal wisdom into pristine, export-grade wellness products for global markets.
              </p>

              <p className="text-[#22201D]/70 leading-relaxed text-sm sm:text-base">
                We pair Indian craft knowledge with documented specifications, considered packaging, and an export conversation shaped around the needs of international retailers and wellness brands.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-2">Artisanal Craftsmanship</h3>
                  <p className="text-sm text-[#767169]">Developed around selected wood powders, fragrant roots, resins, and botanical-inspired fragrance profiles.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#E8E2D5] shadow-sm">
                  <h3 className="font-serif text-xl font-medium text-[#22201D] mb-2">Global Export Standards</h3>
                  <p className="text-sm text-[#767169]">Packaging and documentation can be discussed around your market, product format, and shipment requirements.</p>
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
                    <p className="font-serif text-2xl font-light italic">&ldquo;A sacred fragrance is a bridge between the earthly and the divine.&rdquo;</p>
                    <p className="text-xs uppercase tracking-widest text-[#C5A059] mt-2">&mdash; Morvan Essence Heritage Note</p>
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
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">Export Catalogue</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">
              Our Premium Product Lineup
            </h2>
            <p className="text-[#767169] text-base">
              Available in precision sizes (3.5-inch, 6-inch, and 9-inch) customized for retail shelves, wellness studios, and sacred rituals worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Product 1: Incense Sticks */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-sm flex flex-col justify-between transition-all hover:shadow-md" data-testid="product-card-1">
              <div>
                <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85" 
                    alt="Organic Incense Sticks" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#4A5D4E]">
                    B2B Best Seller
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-2">Organic Incense Sticks</h3>
                <p className="text-[#767169] text-sm mb-6">
                  Clean-burning, low-smoke bamboo-core incense crafted with pure essential oils and natural botanical resin binders.
                </p>

                <div className="space-y-3 mb-6 text-xs text-[#22201D]">
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Available Sizes:</span>
                    <span className="font-semibold">3.5&Prime;, 6&Prime;, 9&Prime;</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Burn Time:</span>
                    <span>30 &ndash; 60 Mins</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Packaging:</span>
                    <span>Hexagonal tubes, pillow packs, bulk carton</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full h-12"
                onClick={() => handleOpenEnquiry("sample", "Organic Incense Sticks (3.5/6/9-inch)")}
                data-testid="product-1-sample-btn"
              >
                Request Sample &amp; Pricing
              </Button>
            </div>

            {/* Product 2: Dhoop Sticks */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-sm flex flex-col justify-between transition-all hover:shadow-md" data-testid="product-card-2">
              <div>
                <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1628709353367-35f0bb07413d?crop=entropy&cs=srgb&fm=jpg&q=85" 
                    alt="Organic Dhoop Sticks" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#4A5D4E]">
                    Coreless Luxury
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-2">Organic Dhoop Sticks</h3>
                <p className="text-[#767169] text-sm mb-6">
                  Coreless, solid botanical incense molded from fragrant herbs, natural resins, and aromatic wood powders for intense fragrance purity.
                </p>

                <div className="space-y-3 mb-6 text-xs text-[#22201D]">
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Available Sizes:</span>
                    <span className="font-semibold">3.5&Prime;, 6&Prime;, 9&Prime;</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Burn Time:</span>
                    <span>45 &ndash; 75 Mins</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Packaging:</span>
                    <span>Eco-kraft boxes with ceramic holder included</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full h-12"
                onClick={() => handleOpenEnquiry("sample", "Organic Dhoop Sticks (3.5/6/9-inch)")}
                data-testid="product-2-sample-btn"
              >
                Request Sample &amp; Pricing
              </Button>
            </div>

            {/* Product 3: Cow-Dung Incense & Dhoop */}
            <div className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-sm flex flex-col justify-between transition-all hover:shadow-md" data-testid="product-card-3">
              <div>
                <div className="h-60 rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1640775670963-7d5d67de6bcc?crop=entropy&cs=srgb&fm=jpg&q=85" 
                    alt="Cow-Dung Incense and Dhoop" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#4A5D4E]">
                    Vedic Tradition
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-2">Cow-Dung Incense &amp; Dhoop</h3>
                <p className="text-[#767169] text-sm mb-6">
                  Traditional purifying formulation combining Panchagavya elements, medicinal herbs, and natural camphor for air purification and spiritual cleansing.
                </p>

                <div className="space-y-3 mb-6 text-xs text-[#22201D]">
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Available Sizes:</span>
                    <span className="font-semibold">3.5&Prime;, 6&Prime; &amp; Cones</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Purifying Action:</span>
                    <span>Product-specific use guidance available</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E8E2D5]">
                    <span className="font-medium text-[#767169]">Packaging:</span>
                    <span>Export master cartons (100 units / box)</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full h-12"
                onClick={() => handleOpenEnquiry("sample", "Cow-Dung Incense & Dhoop (3.5/6-inch)")}
                data-testid="product-3-sample-btn"
              >
                Request Sample &amp; Pricing
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* FRAGRANCE COLLECTION EXPLORER */}
      <section id="fragrances" className="py-24 md:py-32 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">Sensory Spectrum</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">
              Exquisite Fragrance Collection
            </h2>
            <p className="text-[#767169] text-base">
              Custom-blended by master perfumers for global wellness, meditation, spa, and aromatherapy markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Royal Sandalwood", note: "Deep, woody, creamy, meditative", profile: "Best for luxury meditation & yoga studios" },
              { name: "Vrindavan Rose", note: "Velvety damask rose & morning dew", profile: "Best for boutique retail & home fragrance" },
              { name: "Mogra & White Jasmine", note: "Intoxicating nocturnal floral blossom", profile: "Best for spa relaxation & ambiance" },
              { name: "Oud & Amber Resin", note: "Rich, smoky, resinous, opulent", profile: "Best for premium gift sets & high-end hotels" },
              { name: "Sacred Guggal & Loban", note: "Balsamic, purifying, grounding", profile: "Best for ritual cleansing & wellness centers" },
              { name: "White Sage & Lavender", note: "Herbaceous, calming, purifying", profile: "Best for modern holistic & lifestyle stores" },
              { name: "Lemongrass & Citronella", note: "Zesty, refreshing, invigorating", profile: "Best for outdoor living & natural freshness" },
              { name: "Nag Champa Heritage", note: "Traditional champaka floral & honey", profile: "Best for classic export distribution" },
            ].map((frag, idx) => (
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
                  onClick={() => handleOpenEnquiry("sample", `Sample Request: ${frag.name} Fragrance`)}
                >
                  Request this Fragrance Sample <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">OEM &amp; Private Label Partnership</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                Build Your Own Global Incense Brand with Morvan Essence
              </h2>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">
                We empower international wholesalers, retail chains, and wellness entrepreneurs to launch bespoke incense and dhoop product lines under their own brand identity. From custom formulations and length (3.5&Prime; to 9&Prime;) to luxury branded packaging &amp; barcode integration.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Custom box design, embossing, foil stamping & multi-lingual labeling",
                  "Low minimum order quantities (MOQs) tailored for emerging and established brands",
                  "Exclusive fragrance creation by master perfumers",
                  "Strict quality assurance, batch testing, and secure export logistics"
                ].map((item, i) => (
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
                  Start Private Label Enquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/20">
              <h3 className="font-serif text-2xl font-light text-white mb-6">Private Label Inquiry Fast-Track</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleOpenEnquiry("private_label"); }} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2">Company / Brand Name</label>
                  <Input placeholder="e.g. Lotus Wellness Co., USA" className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl h-12" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2">Business Email</label>
                  <Input type="email" placeholder="contact@brand.com" className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl h-12" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/80 mb-2">Estimated Annual Volume</label>
                  <Input placeholder="e.g. 50,000 units / year" className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-xl h-12" />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-white text-[#22201D] hover:bg-[#E8E2D5] rounded-xl h-12 font-semibold"
                  data-testid="private-label-form-submit"
                >
                  Request OEM Consultation
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
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">Global Logistics</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">
              Seamless International Export Supply Chain
            </h2>
            <p className="text-[#767169] text-base">
              From our manufacturing hub in India to your warehouses across North America, Europe, the Middle East, and Asia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Inquiry & Sample Kit", desc: "Receive tailored sample assortments across 3.5\", 6\", and 9\" sizes with custom fragrance strips." },
              { step: "02", title: "Custom Formulation", desc: "Finalize fragrance notes, packaging substrates, private label branding, and carton specifications." },
              { step: "03", title: "Compliance & Production", desc: "Strict quality checks, moisture-resistant master carton sealing, and full export documentation." },
              { step: "04", title: "Global Freight Delivery", desc: "FOB / CIF shipments via sea or air freight with reliable tracking to your port of destination." },
            ].map((st, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm relative flex flex-col justify-between">
                <div>
                  <span className="font-serif text-4xl text-[#C5A059] font-light block mb-4">{st.step}</span>
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
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">Uncompromising Standards</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">
                Quality Assurance &amp; Export Compliance
              </h2>
              <p className="text-[#767169] leading-relaxed">
                Product specifications, fragrance details, packaging requirements, and available documentation can be reviewed with buyers during sampling and quotation.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Button 
                  className="bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white rounded-full px-6 h-12"
                  onClick={() => handleOpenEnquiry("quote", "Request Quality Dossier & MSDS")}
                  data-testid="quality-dossier-btn"
                >
                  Request Quality Dossier / MSDS
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Product Specifications", desc: "Discuss formats, fragrance profiles, burn characteristics, and packaging before sampling." },
                { title: "Documentation Review", desc: "Available product and shipment documentation can be reviewed for your market requirements." },
                { title: "Packaging Options", desc: "Explore retail, bulk, and private-label packaging formats suited to your channel." },
                { title: "Quality Conversation", desc: "Align on your quality expectations, specifications, and approval process before production." },
              ].map((q, idx) => (
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
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">The B2B Advantage</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#22201D]">
              Why Global Importers Choose Morvan Essence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm">
              <Building2 className="w-10 h-10 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-3">Direct Manufacturer Pricing</h3>
              <p className="text-[#767169] text-sm leading-relaxed">
                Work directly with an India-based export partner to discuss product fit, packaging, order planning, and commercial requirements.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm">
              <Package className="w-10 h-10 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-3">Flexible MOQ &amp; Scale</h3>
              <p className="text-[#767169] text-sm leading-relaxed">
                Whether you are a boutique wellness brand needing pilot batches or a nationwide retailer requiring container loads, our production lines adapt seamlessly.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-sm">
              <Globe className="w-10 h-10 text-[#C5A059] mb-4" />
              <h3 className="font-serif text-2xl font-medium text-[#22201D] mb-3">Dedicated Export Desk</h3>
              <p className="text-[#767169] text-sm leading-relaxed">
                Build a clear export workflow around sampling, approvals, documentation, production planning, and shipment coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / REQUEST A QUOTE SECTION */}
      <section id="contact" className="py-24 md:py-32 bg-[#22201D] text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C5A059]">Direct Partnership Desk</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                  Connect with Our International Export Team
                </h2>
                <p className="text-white/80 leading-relaxed text-base">
                  Ready to expand your wellness catalog with authentic Vrindavan incense and dhoop? Submit your enquiry below or reach out directly to our export directors.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15" data-testid="contact-details-note">
                <p className="text-sm text-white/65 leading-relaxed">Submit the form with your market, product interest, and expected volume. Official export contact links will be added here once provided by the Morvan Essence team.</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 text-[#22201D] shadow-2xl">
              <h3 className="font-serif text-2xl font-light text-[#22201D] mb-6">B2B Enquiry &amp; Sample Request Form</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4" data-testid="b2b-enquiry-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Enquiry Type</label>
                    <select 
                      className="w-full h-12 rounded-xl border border-[#E8E2D5] bg-[#F9F8F5] px-3 text-sm font-medium"
                      value={formData.enquiry_type}
                      onChange={(e) => setFormData({...formData, enquiry_type: e.target.value})}
                      data-testid="form-enquiry-type"
                    >
                      <option value="sample">Request Sample Kit</option>
                      <option value="quote">Request Price Quote</option>
                      <option value="distributor">Become a Distributor</option>
                      <option value="private_label">Private Label / OEM Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Business Type</label>
                    <select 
                      className="w-full h-12 rounded-xl border border-[#E8E2D5] bg-[#F9F8F5] px-3 text-sm font-medium"
                      value={formData.business_type}
                      onChange={(e) => setFormData({...formData, business_type: e.target.value})}
                      data-testid="form-business-type"
                    >
                      <option value="importer">Importer</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="distributor">Distributor</option>
                      <option value="retailer">Retailer / Chain</option>
                      <option value="private_label">Private Label Brand</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Company Name *</label>
                    <Input 
                      placeholder="Your Company Name" 
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                      className="h-12 rounded-xl bg-[#F9F8F5]"
                      required
                      data-testid="form-company-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Contact Person *</label>
                    <Input 
                      placeholder="Full Name & Title" 
                      value={formData.contact_person}
                      onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                      className="h-12 rounded-xl bg-[#F9F8F5]"
                      required
                      data-testid="form-contact-person"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Business Email *</label>
                    <Input 
                      type="email" 
                      placeholder="name@company.com" 
                      value={formData.business_email}
                      onChange={(e) => setFormData({...formData, business_email: e.target.value})}
                      className="h-12 rounded-xl bg-[#F9F8F5]"
                      required
                      data-testid="form-business-email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Phone / WhatsApp *</label>
                    <Input 
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone_whatsapp}
                      onChange={(e) => setFormData({...formData, phone_whatsapp: e.target.value})}
                      className="h-12 rounded-xl bg-[#F9F8F5]"
                      required
                      data-testid="form-phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Country / Destination *</label>
                    <Input 
                      placeholder="e.g. United States, Germany, UAE" 
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      className="h-12 rounded-xl bg-[#F9F8F5]"
                      required
                      data-testid="form-country"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Product / Fragrance Interest</label>
                    <Input 
                      placeholder="e.g. Sandalwood 9-inch sticks" 
                      value={formData.product_interest}
                      onChange={(e) => setFormData({...formData, product_interest: e.target.value})}
                      className="h-12 rounded-xl bg-[#F9F8F5]"
                      data-testid="form-product-interest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1.5 font-medium">Message / Specific Requirements</label>
                  <Textarea 
                    placeholder="Mention expected volume, packaging preferences, or delivery port..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="rounded-xl bg-[#F9F8F5] min-h-[100px]"
                    data-testid="form-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white h-14 rounded-xl font-semibold shadow-md"
                  disabled={isSubmitting}
                  data-testid="form-submit-btn"
                >
                  {isSubmitting ? "Transmitting Enquiry..." : "Submit B2B Enquiry — Fast Response"}
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
                <div className="w-10 h-10 rounded-full bg-[#4A5D4E] flex items-center justify-center text-white font-serif text-xl tracking-widest">
                  M
                </div>
                <span className="font-serif text-2xl tracking-wide font-bold text-white">MORVAN ESSENCE</span>
              </div>
              <p className="text-sm text-[#E8E2D5]/60 max-w-sm leading-relaxed">
                Authentic Indian incense and dhoop export brand inspired by the spiritual heritage of Vrindavan. Crafted for international importers, wholesalers, and private-label brands worldwide.
              </p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white">Catalogue</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#products" className="hover:text-white transition-colors">Incense Sticks (3.5&Prime;-9&Prime;)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Dhoop Sticks (Coreless)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Cow-Dung Incense</a></li>
                <li><a href="#fragrances" className="hover:text-white transition-colors">Fragrance Library</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white">B2B Services</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#private-label" className="hover:text-white transition-colors">Private Label &amp; OEM</a></li>
                <li><a href="#export" className="hover:text-white transition-colors">Global Supply Logistics</a></li>
                <li><a href="#quality" className="hover:text-white transition-colors">Quality Dossier &amp; MSDS</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Request Sample Kit</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white">Export Headquarters</p>
              <p className="text-sm text-[#E8E2D5]/60">India-based export partner, rooted in Vrindavan.</p>
              <p className="text-sm text-[#E8E2D5]/60">Use the enquiry form to begin a buyer conversation.</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8E2D5]/50 gap-4">
            <p>&copy; {new Date().getFullYear()} Morvan Essence Export Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Export Terms &amp; Conditions</a>
              <a href="#" className="hover:text-white transition-colors">MSDS &amp; Compliance Policy</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DIALOG FOR ENQUIRY (WHEN CLICKED FROM ANYWHERE) */}
      <Dialog open={enquiryModalOpen} onOpenChange={setEnquiryModalOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#F9F8F5] border-[#E8E2D5] text-[#22201D] p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-[#22201D]">
              {defaultEnquiryType === 'sample' ? 'Request Export Sample Kit' : 
               defaultEnquiryType === 'quote' ? 'Request B2B Price Quote' : 
               defaultEnquiryType === 'distributor' ? 'Distributor Partnership Enquiry' : 'Private Label / OEM Consultation'}
            </DialogTitle>
            <DialogDescription className="text-sm text-[#767169]">
              Please fill in your business details. Our Vrindavan export desk will review and dispatch details within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-4" data-testid="modal-enquiry-form">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Company Name *</label>
                <Input 
                  placeholder="Company Name" 
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  className="bg-white rounded-xl h-11"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Contact Person *</label>
                <Input 
                  placeholder="Your Name & Title" 
                  value={formData.contact_person}
                  onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                  className="bg-white rounded-xl h-11"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Business Email *</label>
                <Input 
                  type="email"
                  placeholder="name@company.com" 
                  value={formData.business_email}
                  onChange={(e) => setFormData({...formData, business_email: e.target.value})}
                  className="bg-white rounded-xl h-11"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Phone / WhatsApp *</label>
                <Input 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone_whatsapp}
                  onChange={(e) => setFormData({...formData, phone_whatsapp: e.target.value})}
                  className="bg-white rounded-xl h-11"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Country *</label>
                <Input 
                  placeholder="Country" 
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="bg-white rounded-xl h-11"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Product / Fragrance</label>
                <Input 
                  placeholder="Product Interest" 
                  value={formData.product_interest}
                  onChange={(e) => setFormData({...formData, product_interest: e.target.value})}
                  className="bg-white rounded-xl h-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#767169] mb-1 font-medium">Message / Notes</label>
              <Textarea 
                placeholder="Volume requirements, shipping port, or custom labeling requests..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="bg-white rounded-xl min-h-[90px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#4A5D4E] hover:bg-[#3C4C3F] text-white h-12 rounded-xl font-semibold"
              disabled={isSubmitting}
              data-testid="modal-submit-btn"
            >
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
