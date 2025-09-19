'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UsersTableSkeleton } from '@/components/skeletons/Skeletons';
import useFetch from '@/hooks/useFetch';
import { TUser } from '@/utils/types';


export default function UsersPage() {
    const { data, loading } = useFetch<TUser[]>('https://jsonplaceholder.typicode.com/users');
    const users = Array.isArray(data) ? data : [];
    const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

    const handleRowClick = (user: TUser) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="p-6 pt-20 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>

            {loading ? (
                <UsersTableSkeleton />
            ) : (
                <>
                    <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    {
                                        ['Name', 'Email', 'Company'].map((el) => (
                                            <th key={el} className="table-header">Name</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => handleRowClick(user)}
                                        className="cursor-pointer transition-colors duration-200 hover:bg-gray-50"
                                    >
                                        <td className="table-cell">{user.name}</td>
                                        <td className="table-cell">{user.email}</td>
                                        <td className="table-cell">{user?.company?.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <motion.div
                        className="sm:hidden space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        {users.map((user) => (
                            <motion.div
                                key={user.id}
                                whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
                                variants={{
                                    hidden: { opacity: 0, },
                                    visible: { opacity: 1, },
                                }}
                                onClick={() => handleRowClick(user)}
                                className="p-4 bg-white rounded-xl shadow-md cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg text-gray-800">{user.name}</h2>
                                        <p className="text-gray-600 text-sm">{user.email}</p>
                                        <p className="text-gray-500 text-sm mt-1">{user?.company?.name}</p>
                                        <p className="text-gray-400 text-xs mt-1">{user.website}</p>
                                    </div>
                                    <div className=" uppercase w-20 h-20 rounded-full bg-gradient-to-r from-red-700 to-black flex items-center justify-center text-white font-bold text-4xl">
                                        {user.name.charAt(0)} {user.name.charAt(1)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </>
            )}

            {/* Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: .3 }}
                            className="bg-white rounded-xl p-6 w-11/12 sm:w-1/2 lg:w-1/3 shadow-lg relative"
                        >
                            <button
                                onClick={handleCloseModal}
                                className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
                            <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
                            <p><span className="font-semibold">Phone:</span> {selectedUser.phone}</p>
                            <p><span className="font-semibold">Website:</span> {selectedUser.website}</p>
                            <p className="mt-2 font-semibold">Company:</p>
                            <p>{selectedUser?.company?.name}</p>
                            <p className="italic text-gray-500">{selectedUser?.company?.catchPhrase}</p>
                            <p className="mt-2 font-semibold">Address:</p>
                            <p>
                                {selectedUser?.address?.suite}, {selectedUser?.address?.street}, {selectedUser?.address?.city}, {selectedUser?.address?.zipcode}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
