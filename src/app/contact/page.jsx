"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// export const metadata = {
//   title: 'Contact Us',
//   description: 'Get in touch with us. We\'d love to hear from you and answer any questions you might have.',
// };

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitStatus("success");
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setSubmitStatus(null);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      description: "123 Innovation Street, Tech City, TC 12345",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20 hover:from-blue-500/40 hover:via-indigo-500/40 hover:to-purple-500/40",
      iconColor: "text-blue-500",
      borderGradient: "from-blue-500/30 via-indigo-500/30 to-purple-500/30"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "hello@acme.com",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20 hover:from-green-500/40 hover:via-emerald-500/40 hover:to-teal-500/40",
      iconColor: "text-green-500",
      borderGradient: "from-green-500/30 via-emerald-500/30 to-teal-500/30"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20 hover:from-purple-500/40 hover:via-pink-500/40 hover:to-rose-500/40",
      iconColor: "text-purple-500",
      borderGradient: "from-purple-500/30 via-pink-500/30 to-rose-500/30"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "Mon - Fri: 9AM - 6PM EST",
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20 hover:from-orange-500/40 hover:via-amber-500/40 hover:to-yellow-500/40",
      iconColor: "text-orange-500",
      borderGradient: "from-orange-500/30 via-amber-500/30 to-yellow-500/30"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22),transparent_60%)] blur-2xl" />
          <div className="absolute right-[-10%] bottom-0 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.22),transparent_60%)] blur-2xl" />
        </div>
        
        <div className="relative mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 py-16 xsm:py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl xsm:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 xsm:mb-6">
              Get in Touch
            </h1>
            <p className="text-lg xsm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Have a question or want to work together? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 py-12 xsm:py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xsm:gap-16 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl xsm:text-3xl font-bold text-foreground mb-4">
                Send us a Message
              </h2>
              <p className="text-foreground/70">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 xsm:grid-cols-2 gap-4 xsm:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-border bg-background text-foreground placeholder:text-foreground/40 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-foreground/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-border bg-background text-foreground placeholder:text-foreground/40 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-foreground/20"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone Number{" "}
                  <span className="text-foreground/50">(optional)</span>
                </label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-border bg-background text-foreground placeholder:text-foreground/40 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-foreground/20"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message *
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border border-border bg-background text-foreground placeholder:text-foreground/40 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none hover:border-foreground/20"
                    placeholder="Tell us about your project or question..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full xsm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium rounded-lg hover:from-primary/90 hover:to-primary/70 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>
                    Message sent successfully! We'll get back to you soon.
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Image */}
            <div className="relative xsm:h-80 lg:w-full lg:h-full overflow-hidden ">
              <Image
                src="/contact.png"
                alt="Contact us illustration"
                fill
                className="object-fill"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
        
        {/* Contact Info Cards with Enhanced Gradients */}
        <div className="space-y-6 mt-16">
          <h3 className="text-xl xsm:text-2xl font-semibold text-foreground text-center">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 xsm:grid-cols-2 gap-6 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${info.gradient} transition-all duration-300 group-hover:scale-105`} />
                <div className="relative p-6 bg-card border border-border rounded-xl hover:border-transparent transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-background/80 group-hover:scale-110 transition-transform duration-300 ${info.iconColor}`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2 text-lg">
                        {info.title}
                      </h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="mx-auto max-w-screen-2xl px-4 xsm:px-6 sm:px-8 py-12 xsm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <div className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-r from-card/50 via-background to-card/50 p-8 xsm:p-12">
              <h2 className="text-2xl xsm:text-3xl font-bold text-foreground mb-6">
                Ready to Start a Project?
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
                Let's discuss how we can help bring your ideas to life. Whether it's
                a small project or a large-scale application, we're here to help you
                succeed.
              </p>
              <div className="flex flex-col xsm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium rounded-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  Start a Project
                </button>
                <button className="px-8 py-3 border border-border bg-card text-foreground font-medium rounded-lg hover:bg-card/80 hover:border-foreground/20 transition-all duration-200">
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;
