import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <nav className="max-w-3xl mx-auto px-6 py-10 flex justify-between items-center">
            <div className="w-32 md:w-40">
                <Link href="/">
                    <Image
                        src="/sudipta-banerjee-logo.png"
                        alt="Sudipta Banerjee Logo"
                        width={160}
                        height={40}
                        className="w-full h-auto object-contain cursor-pointer"
                        priority
                    />
                </Link>
            </div>
            <div className="space-x-6 text-sm font-medium text-slate-500">
                <Link href="/#research" data-gtm="nav_research" className="hover:text-slate-900 transition-colors">Research</Link>
                <Link href="/#blog" data-gtm="nav_writing" className="hover:text-slate-900 transition-colors">Writing</Link>
                <Link href="/#contact" data-gtm="nav_connect" className="hover:text-slate-900 transition-colors">Connect</Link>
            </div>
        </nav>
    );
}
