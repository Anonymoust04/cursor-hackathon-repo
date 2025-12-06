import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary dark:bg-border-dark/30 mt-16 border-t border-border dark:border-border-dark">
      <div className="w-full max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-muted dark:text-muted-dark">© 2024 ImpactHub. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="text-sm font-medium text-foreground dark:text-foreground-dark hover:underline" href="#">
            About Us
          </Link>
          <Link className="text-sm font-medium text-foreground dark:text-foreground-dark hover:underline" href="#">
            FAQ
          </Link>
          <Link className="text-sm font-medium text-foreground dark:text-foreground-dark hover:underline" href="#">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

