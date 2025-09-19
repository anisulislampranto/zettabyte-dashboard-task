'use client';
import Link from 'next/link';
import { motion } from "motion/react"
import { Post } from '@/utils/types';

export default function PostCard({ post, index }: { post: Post; index?: number }) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index ?? 0) * 0.06 }}
            className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md"
        >
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
            <div className="mt-3">
                <Link href={`/posts/${post.id}`} className="text-sm text-gray-600 hover:text-indigo-600">
                    Read more →
                </Link>
            </div>
        </motion.article>
    );
}
