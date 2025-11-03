import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileCheck, 
  Truck, 
  ShoppingCart, 
  Lightbulb, 
  FileText,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import ServiceCard from "../components/ServiceCard";
import ContactForm from "../components/ContactForm";

const services = [
  {
    icon: FileCheck,
    title: "Notary Services",
    description: "Professional notary public services for all your document authentication needs. Fast, reliable, and compliant with all legal requirements.",
    features: ["Document Notarization", "Remote Online Notarization", "Mobile Notary Services", "Loan Signings"]
  },
  {
    icon: Truck,
    title: "Logistics Solutions",
    description: "Comprehensive logistics management to streamline your supply chain. From warehousing to last-mile delivery.",
    features: ["Supply Chain Management", "Transportation Services", "Warehousing Solutions", "Distribution Planning"]
  },
  {
    icon: ShoppingCart,
    title: "Procurement Services",
    description: "Strategic procurement solutions that optimize costs and ensure quality. We handle vendor management and negotiations.",
    features: ["Vendor Sourcing", "Contract Negotiation", "Quality Assurance", "Cost Optimization"]
  },
  {
    icon: Lightbulb,
    title: "Business Consultation",
    description: "Expert business strategy and consultation to help your company grow. Data-driven insights and actionable plans.",
    features: ["Strategic Planning", "Market Analysis", "Process Optimization", "Growth Strategies"]
  },
  {
    icon: FileText,
    title: "Document Drafting",
    description: "Professional document preparation and drafting services. Accurate, legally sound, and tailored to your needs.",
    features: ["Contract Drafting", "Legal Documents", "Business Agreements", "Custom Templates"]
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Navigation */}
      <motion.nav 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6907f0b8130628cdd59135c9/8b85e86c2_Logo.png"
                alt="AA Multichoice LLC"
                className="h-16 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {["home", "services", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium transition-colors capitalize ${
                    activeSection === item ? "text-blue-900" : "text-gray-600 hover:text-blue-900"
                  }`}
                >
                  {item}
                </button>
              ))}
              <Button onClick={() => scrollToSection("contact")} className="bg-blue-900 hover:bg-blue-800">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {["home", "services", "about", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        id="home"
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6907f0b8130628cdd59135c9/8b85e86c2_Logo.png"
                alt="AA Multichoice LLC"
                className="h-48 w-auto mx-auto mb-6"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Your Trusted Business
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Partner for Success
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-blue-100 mb-4 italic">
              "Driven by Discipline. Powered by Precision."
            </p>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              From notary services to logistics, procurement, and business strategy — 
              we provide comprehensive solutions to help your business thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection("services")}
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold text-lg px-8 py-6"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection("contact")}
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "5+", label: "Service Areas" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
              { number: "Fast", label: "Turnaround Time" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive business solutions tailored to meet your unique needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About AA Multichoice LLC
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                AA Multichoice LLC is your comprehensive business solutions partner. As a veteran-owned business,
                we bring military precision, discipline, and unwavering commitment to excellence in everything we do.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our team of experienced professionals brings expertise across multiple domains — from legal 
                notarization to strategic business consultation. We understand that modern businesses need 
                diverse, reliable services to succeed in today's competitive landscape.
              </p>

              <div className="space-y-4">
                {[
                  "Professional and certified service providers",
                  "Customized solutions for your business needs",
                  "Fast turnaround times without compromising quality",
                  "Transparent pricing with no hidden fees"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" 
                  alt="Team collaboration"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-blue-950 p-8 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold mb-2">Your Success</div>
                <div className="text-lg">Is Our Mission</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to elevate your business? Contact us today for a consultation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">info@aamultichoice.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">Available upon request</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                      <p className="text-gray-600">Serving clients nationwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-none text-white">
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6907f0b8130628cdd59135c9/8b85e86c2_Logo.png"
                  alt="AA Multichoice LLC"
                  className="h-24 w-auto mb-3 brightness-0 invert"
                />
              </div>
              <p className="text-gray-400">
                Your trusted partner for notary, logistics, procurement, business consultation, and document drafting services.
              </p>
              <p className="text-sm text-gray-500 mt-4 italic">
                "Driven by Discipline. Powered by Precision."
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Services", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Our Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Notary Services</li>
                <li>Logistics Solutions</li>
                <li>Procurement Services</li>
                <li>Business Consultation</li>
                <li>Document Drafting</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AA Multichoice LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}