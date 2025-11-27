import Link from "next/link";
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
      
      {/* Navigation */}
      <nav className="max-w-3xl mx-auto px-6 py-10 flex justify-between items-center">
        <div className="font-serif text-xl font-bold tracking-tight text-slate-900">SB.</div>
        <div className="space-x-6 text-sm font-medium text-slate-500">
          <Link href="#research" data-gtm="nav_research" className="hover:text-slate-900 transition-colors">Research</Link>
          <Link href="#blog" data-gtm="nav_writing" className="hover:text-slate-900 transition-colors">Writing</Link>
          <Link href="#contact" data-gtm="nav_connect" className="hover:text-slate-900 transition-colors">Connect</Link>
        </div>
      </nav>

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
            <a href="#" data-gtm="research_abstract" className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">Read Abstract &rarr;</a>
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

        {/* Footer */}
        <footer id="contact" className="py-20 mt-10 border-t border-slate-100 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">Let's Connect</h2>
        
          <a href="mailto:hello@sudiptabanerjee.com" data-gtm="nav_email" className="text-lg font-medium text-blue-600 hover:underline"><img className="inline-icon" alt="" src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22128%22%20height%3D%22128%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22m18.964%2039.486%203.114%202.537L6.355%2061.317%203.242%2058.78zM108.846%2039.248l15.915%2019.53-3.114%202.538-15.915-19.53z%22%2F%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22M124.772%20127.782H3.228V58.583h4.016v65.183h113.512V58.583h4.016z%22%2F%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22m39.474%2093.194%202.697%202.974-35.106%2031.831-2.697-2.974zM88.522%2093.197l35.11%2031.826-2.697%202.975-35.11-31.826z%22%2F%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22M87.802%2095.657H40.199L19.11%2074.101V0h89.782v74.101l-21.09%2021.556zm-45.913-4.015h44.225l18.764-19.179V4.017H23.126v68.446l18.763%2019.179z%22%2F%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22M64.548%2072.013c-13.063%200-23.688-10.549-23.688-23.516%200-12.964%2010.626-23.512%2023.688-23.512%207.128%200%2013.807%203.139%2018.324%208.612l-3.097%202.558c-3.753-4.547-9.303-7.153-15.228-7.153-10.848%200-19.673%208.745-19.673%2019.495%200%2010.752%208.825%2019.5%2019.673%2019.5%204.328%200%208.431-1.364%2011.864-3.944l2.412%203.212c-4.134%203.105-9.07%204.748-14.275%204.748z%22%2F%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22M60.633%2060.049c-.001%200%200%200%200%200-.929%200-1.912-.146-2.922-.434-3.041-.869-5.34-3.394-6.148-6.754-1.09-4.524.594-9.536%204.392-13.079%203.325-3.098%207.857-3.748%2011.076-3.748%202.697%200%204.714.449%204.798.469l2.114.478-.636%202.071c-.161.52-3.928%2012.771-4.598%2014.684-1.388%203.952-4.407%206.313-8.076%206.313zm6.397-19.998c-2.497%200-5.97.463-8.338%202.669-3.275%203.056-3.814%206.757-3.226%209.201.473%201.963%201.692%203.36%203.347%203.832.65.186%201.263.28%201.819.28%202.49%200%203.705-1.973%204.285-3.628.477-1.356%202.703-8.549%203.855-12.282a21.628%2021.628%200%200%200-1.742-.072z%22%2F%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22M73.686%2059.837c-2.044%200-3.935-.698-5.44-2.057-3.11-2.806-.969-12.295.584-17.701l3.859%201.108c-1.72%205.996-2.536%2012.504-1.713%2013.653%201.489%201.338%203.39%201.078%204.712.617%203.032-1.055%206.506-4.528%207.283-9.13.561-3.326-.098-8.342-6.423-13.344l2.49-3.15c8.282%206.55%208.5%2013.564%207.893%2017.163-.93%205.506-5.01%2010.545-9.923%2012.255a10.099%2010.099%200%200%201-3.322.586z%22%2F%3E%3Cg%3E%3Cpath%20fill%3D%22%23282D33%22%20d%3D%22M86.428%2095.657H41.573L4.743%2060.165l2.786-2.892%2035.664%2034.369h41.615l35.664-34.369%202.787%202.892z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E" /> hello@sudiptabanerjee.com</a> 
          <a href="https://www.linkedin.com/in/sudipta27/" data-gtm="nav_linkedin" target="_blank" className="ml-2 text-lg font-medium text-blue-600 hover:underline"><img className="inline-icon" alt="" src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22512%22%20height%3D%22512%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23469EC8%22%20d%3D%22M472%20480h-79.991c-19.375%200-35.523-13.758-39.211-32.04-.273%200-.523.039-.797.039V303.205c0-17.242-14.328-31.196-31.999-31.196-17.672%200-32%2013.954-32%2031.196v136.81c0%209.758-3.648%2018.547-9.438%2025.508-3.18%204.813-8.609%207.985-14.805%207.985-9.812%200-17.758-7.946-17.758-17.759%200-5.188%202.258-9.812%205.828-13.062%202.586-2.852%204.18-6.547%204.18-10.673V301.713c0-34.079%2028.648-61.713%2063.992-61.713%2035.343%200%2064.007%2027.634%2064.007%2061.713v107.426c0%201.148-.109%202.141-.18%203.195.055-.016.125-.016.18-.039v19.719c0%208.829%207.156%2015.985%2016%2015.985H464c8.844%200%2016-7.156%2016-15.985V288.01c0-1.203-.141-2.352-.391-3.478-4.109-69.486-59.592-124.542-127.608-124.542-28.234%200-54.233%209.578-75.358%2025.657-.078-.039-.164-.023-.328.102a12.409%2012.409%200%200%201-7.812%202.75c-6.914%200-12.492-5.602-12.492-12.508%200-.859-.051-1.305-.141-1.43-.738-8.149-7.52-14.571-15.859-14.571h-48.007c-17.668%200-32.003%2014.336-32.003%2032.009v240.015c0%201.438.254%202.821.609%204.142a12.3%2012.3%200%200%200-.609%203.859c0%2022.086-17.902%2039.985-40.004%2039.985H40.003C17.922%20480%200%20462.101%200%20440.015V167.99c0-22.086%2017.922-39.985%2040.003-39.985h40.004c26.496%200%2047.988-21.493%2047.988-48.01%200-26.516-21.492-48.009-47.988-48.009-26.512%200-48.003%2021.493-48.003%2048.009%200%208.844-7.156%2016-16.004%2016-8.824%200-16-7.156-16-16C0%2035.806%2035.824%200%2080.007%200c44.187%200%2079.992%2035.806%2079.992%2079.995%200%204.055-.395%208-.984%2011.899-.129.75-.199%201.523-.344%202.273-.699%203.891-1.648%207.719-2.906%2011.391-.051.18-.141.344-.195.523a80.061%2080.061%200%200%201-11.66%2021.907c-14.586%2019.391-37.746%2032.001-63.902%2032.001H48.003c-8.844%200-16%207.18-16%2016v256.023c0%208.829%207.156%2015.985%2016%2015.985h80.8a40.365%2040.365%200%200%201-.809-7.984V191.999c0-35.345%2028.668-63.994%2064.007-63.994h56.007c9.883%200%2018.867%203.641%2025.836%209.617.086.055.172-.039.266.031a15.859%2015.859%200%200%200%2010.391%203.844c2.188%200%204.266-.43%206.148-1.227.57-.25.914-.211%201.242-.172%2018.578-7.609%2038.78-12.094%2060.108-12.094%2082.938%200%20151.124%2063.111%20159.194%20143.911a40.01%2040.01%200%200%201%20.805%208.094v160.006C512%20462.101%20494.102%20480%20472%20480zm-263.994-32.001c8.824%200%2016%207.172%2016%2016%200%208.845-7.175%2016.001-16%2016.001-8.844%200-16.004-7.156-16.004-16.001%200-8.828%207.161-16%2016.004-16z%22%2F%3E%3C%2Fsvg%3E" /> linkedin.com/in/sudipta27/</a>
        </footer>

      </main>
    </div>
  );
}