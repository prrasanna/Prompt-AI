import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="mt-24 py-12 border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-muted-foreground hover:text-foreground transition-colors">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog-generator" className="hover:text-primary transition-colors">
                  Blog Generator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Legal</h3>
            <ul className="space-y-3 text-muted-foreground hover:text-foreground transition-colors">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-6 border-t border-white/5 text-sm text-white/40">
          <p>© 2024 StudentPrompt AI. All rights reserved. Powered by OpenAI.</p>
        </div>
      </div>
    </footer>
  );
}
