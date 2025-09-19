'use client';

import PostCard from '@/components/PostCard';
import { PostsPageSkeleton } from '@/components/skeletons/Skeletons';
import useFetch from '@/hooks/useFetch';
import { Post } from '@/utils/types';
import { AlertCircle } from 'lucide-react';
import { motion } from "motion/react"
import { useState } from 'react';

export default function PostsPage() {
    const { data: posts, loading } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const [error, setError] = useState<string | null>(null);

    const handleThrowError = () => {
        if (error) {
            setError(null)
        } else {
            setError("Failed to fetch Posts!");
        }
    };

    if (loading) return <PostsPageSkeleton />

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen bg-gray-50">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Posts</h2>
                <motion.button onClick={handleThrowError} whileTap={{ scale: .04, transition: { duration: .5 } }} whileHover={{ scale: 1.04 }} className='cursor-pointer bg-red-900 p-2 px-3 rounded text-white'> {error ? 'Try Again' : 'Throw Error'}</motion.button>
            </div>

            {
                error ?
                    <div className="flex flex-col items-center justify-center bg-gray-50 px-4 text-center mt-30">
                        <AlertCircle className="w-30 h-30 text-red-900 mb-6" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops!</h1>
                        <p className="text-lg text-gray-600">{error}</p>
                    </div> :
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
            }
        </div>
    );
}
