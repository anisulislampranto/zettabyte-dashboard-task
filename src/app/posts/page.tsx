'use client';

import PostCard from '@/components/PostCard';
import { PostsPageSkeleton } from '@/components/skeletons/Skeletons';
import useFetch from '@/hooks/useFetch';
import { Post } from '@/utils/types';
import { motion } from "motion/react"

export default function PostsPage() {
    const { data: posts, loading } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <PostsPageSkeleton />

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen bg-gray-50">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Posts</h2>
            </div>
            <motion.section
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } }
                }}
                className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {posts?.slice(0, 30).map((post: Post, idx: number) => (
                    <PostCard key={post.id} post={post} index={idx} />
                ))}
            </motion.section>
        </div>
    );
}
