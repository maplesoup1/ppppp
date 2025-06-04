import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishDate: string
  author: string
}

const posts: BlogPost[] = [
  {
    id: 'unitycoming',
    title: 'Coming soon',
    excerpt: 'Hello world',
    publishDate: '2025-01-15',
    author: 'timmy'
  },
  {
    id: '2',
    title: 'Coming soon',
    excerpt: 'Hello world',
    publishDate: '2025-01-10',
    author: 'timmy'
  },
  {
    id: '3',
    title: 'Coming soon',
    excerpt: 'Hello world',
    publishDate: '2025-01-05',
    author: 'timmy'
  }
]

export default function BlogsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">My Blogs</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link 
                href={`/Blogs/${post.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <div className="text-sm text-gray-500">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.publishDate}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}