import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- ADD THIS SECTION ---
const ptComponents = {
  marks: {
    link: ({ children, value }: any) => {
      // Robust check for href to prevent crashes
      if (!value?.href) {
        return <span className="text-slate-900">{children}</span>;
      }

      // Check if the link is external (starts with http or https)
      const isExternal = value.href.startsWith('http');
      const target = isExternal ? '_blank' : undefined;

      // Security best practice for new tabs
      const rel = isExternal ? 'noreferrer noopener' : undefined;

      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
// ------------------------

interface BlogPost {
  title: string;
  publishedAt: string;
  body: any;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const post: BlogPost = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        publishedAt,
        body
      }`,
      { slug }
    );

    if (!post) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 mb-8 block">
            &larr; Back to Home
          </Link>

          <header className="mb-10">
            <span className="text-sm text-slate-500 block mb-2">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
          </header>

          <article className="prose prose-slate prose-lg lg:prose-xl">
            {/* --- UPDATE THIS LINE --- */}
            <PortableText value={post.body} components={ptComponents} />
          </article>

        </div>
      </div>
    );
  } catch (error: any) {
    // Re-throw notFound() error
    if (error?.digest === 'NEXT_NOT_FOUND') {
      throw error;
    }

    return (
      <div className="min-h-screen bg-white text-red-600 font-sans p-12">
        <h1 className="text-2xl font-bold mb-4">Error Loading Blog Post</h1>
        <pre className="bg-slate-100 p-4 rounded overflow-auto text-sm text-slate-900">
          {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
}