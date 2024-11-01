import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className="bar">
          <Link href="/">Sick fits</Link>
      </div>
      <div className="sub-bar">
      </div>
    </header>
  );
}