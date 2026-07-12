import { useEffect, useRef } from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import image_software from "../assets/img/Software engineer.png";
export function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const roles = [
      "Software Engineer",
      "Full Stack Developer",
      "IA Integrator",
      "Problem Solver",
      "Devops Enthusiast",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (textRef.current) {
        if (isDeleting) {
          textRef.current.textContent = currentRole.substring(0, charIndex - 1);
          charIndex--;
        } else {
          textRef.current.textContent = currentRole.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const speed = isDeleting ? 50 : 100;
      setTimeout(type, speed);
    };

    type();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/30 rounded-full blur-[128px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
         

          <div className="text-center md:text-left flex-1">
            <p
              className="text-muted-foreground text-lg mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              Hello, I&apos;m
            </p>

            <h6
              className="text-2xl md:text-2xl lg:text-8xl font-bold mb-3 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="gradient-text">Hana Romdhani</span>
            </h6>

            <div
              className="h-12 md:h-16 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="text-2xl md:text-4xl font-light text-foreground/80">
                <span ref={textRef} className="border-r-2 border-primary pr-1">
                  Software Engineer
                </span>
              </p>
            </div>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-12 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              Building digital experiences where engineering precision meets
              beautiful design for humans and AI.
            </p>
            <p
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground max-w-2xl mx-auto md:mx-0 mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-start animate-pulse" />{" "}
              AVAILABLE FOR FREELANCE & CONTRACT
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8 animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg glow-primary transition-all duration-300"
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg transition-all duration-300"
              >
                <a href="#contact">Contact Me</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent/50 hover:bg-accent/10 px-8 py-6 text-lg transition-all duration-300 gap-2"
              >
                <a href="/cv.pdf" download>
                  <Download size={20} />
                  Get My Resume
                </a>
              </Button>
            </div>

            <div
              className="flex items-center justify-center md:justify-start gap-6 animate-fade-in-up"
              style={{ animationDelay: "1.2s" }}
            >
              <a
                href="https://github.com/Hana-Romdhani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:hanaromdhani98@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="tel:+21692340405"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Phone"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="Scroll to about section">
            <ArrowDown className="text-muted-foreground" size={28} />
          </a>
        </div>
      </div>
    </section>
  );
}

