import { notFound } from 'next/navigation';
import { posts } from '@/lib/posts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <nav className="py-8">
        <Link 
          href="/writing" 
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-medium mb-2">{post.title}</h1>
          <p className="text-muted-foreground">
            {post.date} · {post.readingTime}
          </p>
        </header>

        {post.content && (
          <div className="prose prose-neutral max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <ul key={index} className="list-disc pl-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        )}
      </article>
    </div>
  );
}