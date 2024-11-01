import Link from 'next/link'

export const Header = () => (
    <header>
        <div className="bar">
            <Link href="/">Sick fits</Link>
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
    </header>
)
