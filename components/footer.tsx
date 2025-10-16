export function Footer() {
  return (
    <footer className="py-12 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-logo text-3xl md:text-4xl font-bold uppercase text-secondary-foreground mb-2 tracking-wider">
              DAZE-MEDIA
            </h3>
            <p className="text-secondary-foreground/70 text-sm">{"A network of independent publishers"}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6 text-sm text-secondary-foreground/70">
              <a href="mailto:contact@daze-media.com" className="hover:text-secondary-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-secondary-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-secondary-foreground transition-colors">
                Careers
              </a>
            </div>
            <p className="text-xs text-secondary-foreground/50">
              © {new Date().getFullYear()} DAZE-MEDIA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
