"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Heart,
  Coffee,
  Star,
  Download,
  Eye,
  MessageCircle,
  Sun,
  Moon,
  Sparkles,
  Code,
  Palette,
  Zap,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [likedProjects, setLikedProjects] = useState([])
  const [currentTime, setCurrentTime] = useState("")
  const [theme, setTheme] = useState("dark")
  const [snowflakes, setSnowflakes] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date().toLocaleTimeString())

    // Initialize snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }))
    setSnowflakes(initialSnowflakes)

    // Set initial theme from localStorage or system preference
    const savedTheme =
      localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  useEffect(() => {
    if (!mounted) return

    const animateSnowflakes = () => {
      setSnowflakes((prev) =>
        prev.map((flake) => ({
          ...flake,
          y: flake.y > 100 ? -5 : flake.y + flake.speed * 0.1,
          x: flake.x + Math.sin(flake.y * 0.01) * 0.1,
        })),
      )
    }

    const interval = setInterval(animateSnowflakes, 50)
    return () => clearInterval(interval)
  }, [mounted])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "portfolio", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timer)
    }
  }, [mounted])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleLike = (projectIndex) => {
    setLikedProjects((prev) =>
      prev.includes(projectIndex) ? prev.filter((i) => i !== projectIndex) : [...prev, projectIndex],
    )
  }

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A cozy shopping experience with warm animations and intuitive design.",
      image: "/modern-ecommerce-dark.png",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
      views: "2.3k",
      likes: 45 + (likedProjects.includes(0) ? 1 : 0),
    },
    {
      title: "Task Management App",
      description: "Collaborative workspace that feels like home with gentle interactions.",
      image: "/placeholder-n99c4.png",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      link: "#",
      views: "1.8k",
      likes: 32 + (likedProjects.includes(1) ? 1 : 0),
    },
    {
      title: "Portfolio Website",
      description: "A warm, inviting showcase with smooth micro-interactions.",
      image: "/placeholder-s3un5.png",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
      link: "#",
      views: "3.1k",
      likes: 67 + (likedProjects.includes(2) ? 1 : 0),
    },
    {
      title: "Mobile Banking App",
      description: "Secure yet friendly banking with comforting design patterns.",
      image: "/mobile-banking-dark-ui.png",
      tags: ["React Native", "Node.js", "PostgreSQL"],
      link: "#",
      views: "1.5k",
      likes: 28 + (likedProjects.includes(3) ? 1 : 0),
    },
  ]

  const skills = [
    { name: "React/Next.js", level: 95, icon: <Code className="h-4 w-4" /> },
    { name: "TypeScript", level: 90, icon: <Zap className="h-4 w-4" /> },
    { name: "Node.js", level: 85, icon: <Sparkles className="h-4 w-4" /> },
    { name: "UI/UX Design", level: 80, icon: <Palette className="h-4 w-4" /> },
    { name: "Python", level: 75, icon: <Code className="h-4 w-4" /> },
    { name: "AWS/Cloud", level: 70, icon: <Zap className="h-4 w-4" /> },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Working with this developer was an absolute pleasure. The attention to detail and cozy user experience they created exceeded our expectations.",
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "Startup Founder",
      content:
        "The portfolio speaks for itself - beautiful, functional, and with that special touch that makes users feel at home.",
      avatar: "👨‍💻",
    },
  ]

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute rounded-full bg-gradient-to-br from-primary/30 to-accent/20 animate-pulse backdrop-blur-sm"
            style={{
              left: `${flake.x}%`,
              top: `${flake.y}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none z-0 transition-all duration-1000 hover:from-primary/10 hover:to-accent/10 backdrop-blur-[0.5px]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/80 border-b border-border/30 shadow-lg shadow-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif font-bold text-lg bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/20">
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              Portfolio
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="text-xs text-muted-foreground font-mono px-3 py-1 rounded-full bg-background/50 backdrop-blur-xl border border-border/30">
                {currentTime}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                {["home", "about", "skills", "portfolio", "testimonials", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-sm transition-all duration-300 hover:text-primary hover:scale-105 px-3 py-1 rounded-full ${
                      activeSection === section
                        ? "text-primary font-medium bg-primary/10 backdrop-blur-xl border border-primary/20"
                        : "text-muted-foreground hover:bg-background/50 backdrop-blur-xl"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-2xl bg-background/90 border-t border-border/30 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "skills", "portfolio", "testimonials", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium capitalize transition-all duration-300 rounded-xl ${
                    activeSection === section
                      ? "text-primary bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl border border-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-background/50 backdrop-blur-xl"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50"></div>
        <div className="absolute top-32 left-10 w-3 h-3 bg-gradient-to-br from-primary/40 to-accent/30 rounded-full animate-pulse backdrop-blur-sm"></div>
        <div className="absolute top-48 right-20 w-4 h-4 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full animate-bounce delay-1000 backdrop-blur-sm"></div>
        <div className="absolute bottom-48 left-20 w-2 h-2 bg-gradient-to-br from-primary/50 to-accent/40 rounded-full animate-ping delay-500 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-lg shadow-primary/10">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-sm text-muted-foreground font-medium">Available for projects</span>
            </div>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Creating Liquid
            <br />
            <span className="text-3xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              Digital Magic ✨
            </span>
          </h1>
          <p className="font-sans text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            I craft iPhone-inspired liquid glass experiences that feel magical and intuitive. Every interaction flows
            like silk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("portfolio")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 backdrop-blur-xl border border-primary/20 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 group"
            >
              <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 hover:border-primary/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Let's Chat
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="p-2 rounded-full bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-xl border border-border/30">
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-3xl"></div>
        <div className="max-w-5xl mx-auto relative">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="font-sans text-muted-foreground leading-relaxed text-lg">
                Hi there! 👋 I'm a passionate developer who believes that great software should feel like liquid magic.
                With 5+ years of crafting digital experiences, I specialize in creating iPhone-inspired interfaces that
                flow beautifully.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed text-lg">
                When I'm not coding, you'll find me with a cup of coffee ☕, sketching new ideas, or exploring the
                latest design trends. I believe the best work comes from a place of joy and curiosity.
              </p>

              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Projects</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    5+
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Years</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Love</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative group">
                <img
                  src="/professional-developer-portrait-dark-theme.png"
                  alt="Profile"
                  className="rounded-3xl shadow-2xl shadow-primary/20 w-full transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-2xl border border-primary/20 shadow-lg shadow-primary/25">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/20">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-lg">{skill.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-3 backdrop-blur-xl border border-border/20">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-primary/30"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-accent/5 backdrop-blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-3xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 group"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 text-xs flex items-center gap-1 shadow-lg">
                        <Eye className="h-3 w-3" />
                        {project.views}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <p className="font-sans text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl border border-primary/20 hover:border-primary/40 transition-all duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="p-0 h-auto font-medium group/btn">
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleLike(index)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all duration-300 backdrop-blur-xl border ${
                            likedProjects.includes(index)
                              ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-lg shadow-primary/25"
                              : "bg-gradient-to-r from-background/80 to-background/60 text-muted-foreground hover:text-primary border-border/30 hover:border-primary/30"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${likedProjects.includes(index) ? "fill-current" : ""}`} />
                          {project.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Kind Words
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="rounded-3xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-3xl p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/20">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-lg">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic mb-4">"{testimonial.content}"</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Create Liquid Magic Together! ✨
          </h2>
          <p className="font-sans text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-lg">
            Have a project in mind? I'd love to hear about it! Whether it's a complete redesign or just a friendly chat
            about your ideas, I'm here to help bring your vision to life.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 hover:border-primary/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group"
            >
              <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 hover:border-primary/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group"
            >
              <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              LinkedIn
            </Button>
            <Button
              size="lg"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 group"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Email Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 hover:border-primary/30 shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group"
            >
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Resume
            </Button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-2xl border border-border/30 shadow-lg">
              <span className="text-sm text-muted-foreground">Usually responds within 24 hours ⚡</span>
            </div>
          </div>

          <p className="font-sans text-xs text-muted-foreground">© 2024 Portfolio. Made with lots of ☕ and ❤️</p>
        </div>
      </section>
    </div>
  )
}
