import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  currentPath?: string;
  showPostButton?: boolean;
  userAvatar?: string;
}

export default function Header({ currentPath, showPostButton = false, userAvatar }: HeaderProps) {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/opportunities', label: 'Opportunities' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 flex justify-center bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border dark:border-border-dark">
      <div className="flex w-full max-w-7xl items-center justify-between whitespace-nowrap px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-foreground dark:text-foreground-dark">
          <div className="size-8 text-primary">
            <svg fill="none" height="32" viewBox="0 0 34 32" width="34" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.9208 0.464111L7.96575 18.1008H16.8929L13.8425 31.5359L25.7975 13.8992H16.8703L19.9208 0.464111Z" fill="#0052FF"></path>
              <path d="M16.9298 13.8347L13.8794 31.3965L25.7975 13.8347H16.9298Z" fill="#003ECC"></path>
              <path d="M25.7951 13.8992H16.8679L19.9184 0.464111L7.96338 18.1008H16.8905L13.8401 31.5359" stroke="#0052FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75"></path>
              <path d="M30.4132 5.01172C32.0945 5.01172 33.4688 3.88916 33.4688 2.50586C33.4688 1.12256 32.0945 0 30.4132 0C28.7319 0 27.3575 1.12256 27.3575 2.50586C27.3575 3.88916 28.7319 5.01172 30.4132 5.01172Z" fill="#CBB384"></path>
              <path d="M22.5693 7.85938C24.2505 7.85938 25.6249 6.73682 25.6249 5.35352C25.6249 3.97021 24.2505 2.84766 22.5693 2.84766C20.888 2.84766 19.5137 3.97021 19.5137 5.35352C19.5137 6.73682 20.888 7.85938 22.5693 7.85938Z" fill="#CBB384"></path>
              <path d="M3.58679 26.9883C5.26807 26.9883 6.64246 25.8657 6.64246 24.4824C6.64246 23.0991 5.26807 21.9766 3.58679 21.9766C1.90552 21.9766 0.531128 23.0991 0.531128 24.4824C0.531128 25.8657 1.90552 26.9883 3.58679 26.9883Z" fill="#CBB384"></path>
              <path d="M11.4307 24.1406C13.1119 24.1406 14.4863 23.0181 14.4863 21.6348C14.4863 20.2515 13.1119 19.1289 11.4307 19.1289C9.74939 19.1289 8.375 20.2515 8.375 21.6348C8.375 23.0181 9.74939 24.1406 11.4307 24.1406Z" fill="#CBB384"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">ImpactHub</h2>
        </Link>
        <div className="flex flex-1 justify-end items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  currentPath === item.href
                    ? 'text-foreground dark:text-foreground-dark font-bold'
                    : 'text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-secondary dark:bg-border-dark text-foreground dark:text-foreground-dark">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          {userAvatar ? (
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: `url("${userAvatar}")` }}
            />
          ) : (
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-primary/20" />
          )}
        </div>
      </div>
    </header>
  );
}

