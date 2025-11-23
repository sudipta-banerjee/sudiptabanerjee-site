import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define what a full post looks like
interface BlogPost {
  title: string;
  publishedAt: string;
  body: any; // This is the rich text content
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for Next.js 15 compatibility
  const { slug } = await params;

  // Query Sanity for the specific post by slug
  const post: BlogPost = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      body
    }`,
    { slug }
  );

  // If the post doesn't exist, show a 404 page
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 mb-8 block">
          &larr; Back to Home
        </Link>

        {/* Header */}
        <header className="mb-10">
          <span className="text-sm text-slate-500 block mb-2">
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
        </header>

        {/* The Main Content (Rich Text) */}
        <article className="prose prose-slate prose-lg lg:prose-xl">
          <PortableText value={post.body} />
        </article>
        
      </div>
    </div>
  );
}