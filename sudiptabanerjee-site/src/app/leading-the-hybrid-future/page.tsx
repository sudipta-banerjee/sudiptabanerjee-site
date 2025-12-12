import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
    title: 'Leading the Hybrid Future | Sudipta Banerjee',
    description: 'Leadership Adoption in AI-Augmented Indian IT Services - Research by Sudipta Banerjee',
};

export default function ResearchPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
            <Header />
            <main className="max-w-3xl mx-auto px-6 py-20">
                {/* Header Section */}
                <header className="mb-16">
                    <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-4 block">MBA Research</span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6 text-slate-900">
                        LEADING THE HYBRID FUTURE: LEADERSHIP ADOPTION IN AI-AUGMENTED INDIAN IT SERVICES
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Sudipta Banerjee</span>
                        <span>&bull;</span>
                        <span>2024</span>
                    </div>
                </header>

                {/* Content Section */}
                <article className="prose prose-slate prose-lg lg:prose-xl">
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-10">
                        <h2 className="font-serif text-2xl font-bold mb-4 mt-0">Abstract</h2>
                        <p className="text-slate-600 italic">
                            [The abstract content for this research paper is currently being updated. Please check back soon.]
                        </p>
                    </div>

                    <p>
                        As the Indian IT services sector rapidly evolves with the integration of Artificial Intelligence, the traditional models of leadership are being challenged. This research explores the necessary adaptations for leaders managing hybrid teams where human intelligence collaborates with AI agents.
                    </p>
                    <p>
                        Key areas of focus include:
                    </p>
                    <ul>
                        <li>Shift from command-and-control to adaptive leadership.</li>
                        <li>Managing the human-AI interface in service delivery.</li>
                        <li>Upskilling strategies for the AI-augmented workforce.</li>
                        <li>Ethical considerations in AI-driven decision making.</li>
                    </ul>

                </article>

            </main>
            <Footer />
        </div>
    );
}
