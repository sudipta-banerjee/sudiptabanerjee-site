import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client"; // This connects to your database

// --- 1. Define the Shape of our Data (TypeScript Interface) ---
interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  category: string;
}

// --- 2. The Query to Fetch Data (GROQ) ---
// This tells Sanity: "Give me all documents where type is 'post', sorted by date"
const query = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  category
}`;

// --- 3. Static Profile Data (We keep this hardcoded for now) ---
const profile = {
  name: "Sudipta Banerjee",
  bio: "Bridging the gap between complex technology and strategic leadership. I specialize in leading hybrid teams in the AI-augmented era.",
  research: "Leading the Hybrid Future: Leadership Adaptation in AI-Augmented Indian IT Services",
};
const skills = ["Technical Project Management", "AWS Architecture", "Adobe Experience Manager", "AI & Machine Learning", "Financial Analysis"];

// --- 4. The Main Page Component ---
export default async function Home() {
  // FETCH THE REAL DATA
  const posts: BlogPost[] = await client.fetch(query);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">

      <Header />

      <main className="max-w-3xl mx-auto px-6">

        {/* Hero Section */}
        <section className="py-20">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight font-bold mb-6 text-slate-900">
            Hello, I'm Sudipta.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl font-light">
            {profile.bio}
          </p>
          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-700 transition-all">View My Research</button>
            <button className="px-6 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-full hover:border-slate-400 transition-all">Contact Me</button>
          </div>
        </section>

        {/* MBA Research */}
        <section id="research" className="py-16 border-t border-slate-100">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4 block">Current Focus</span>
          <h2 className="font-serif text-3xl font-bold mb-4">MBA Research</h2>
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h3 className="text-xl font-semibold mb-2">{profile.research}</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              I am currently investigating how leadership styles must adapt in the Indian IT services sector as we transition to AI-augmented hybrid work environments.
            </p>
            <Link href="/leading-the-hybrid-future" data-gtm="research_abstract" className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">Read Abstract &rarr;</Link>
          </div>
        </section>

        {/* Skills */}
        <section className="py-10">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6 block">Technical Expertise</span>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-md">{skill}</span>
            ))}
          </div>
        </section>

        {/* DYNAMIC BLOG SECTION */}
        <section id="blog" className="py-16 border-t border-slate-100">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-8 block">Recent Writing</span>

          {/* If no posts exist yet */}
          {posts.length === 0 && (
            <p className="text-slate-500 italic">No articles published yet. Check back soon!</p>
          )}

          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post._id} className="group flex flex-col items-start">
                <div className="flex justify-between items-baseline mb-2 w-full">
                  <span className="text-sm text-slate-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full text-slate-600">{post.category}</span>
                </div>

                {/* Make the Title a Link */}
                <Link href={`/blog/${post.slug.current}`} data-gtm={`post_title_${post._id}`}>
                  <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-blue-700 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-slate-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Make the Button a Link */}
                <Link
                  href={`/blog/${post.slug.current}`}
                  data-gtm={`post_read_${post._id}`}
                  className="text-sm font-medium text-slate-900 group-hover:underline cursor-pointer"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Footer />

      </main>
    </div>
  );
}