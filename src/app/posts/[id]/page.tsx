import { Post } from '@/utils/types';

async function getPost(id: string): Promise<Post> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
}

export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await res.json();

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const post = await getPost(id);

    return (
        <div className="min-h-full bg-gray-50 p-4 sm:p-6 mt-16 flex justify-center">
            <article className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full">
                <header className="mb-4">
                    <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <span>Post ID: {post.id}</span>
                        <span>•</span>
                        <span>Author: User {post.userId}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
                </header>

                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{post.body}</p>

                <footer className="mt-6 flex justify-end">
                    <span className="text-sm text-gray-400">Fetched from JSONPlaceholder</span>
                </footer>
            </article>
        </div>
    );
}
