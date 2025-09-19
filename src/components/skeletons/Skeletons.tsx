export const UsersTableSkeleton = ({rows = 10}) => {
    return (
        <div className="space-y-4">
            {/* Desktop table skeleton */}
            <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Name', 'Email', 'Company'].map((el, idx) => (
                                <th key={idx} className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Array.from({ length: rows }).map((_, idx) => (
                            <tr key={idx} className="animate-pulse">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <td key={i} className="px-6 py-4">
                                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile card skeleton */}
            <div className="sm:hidden space-y-4">
                {Array.from({ length: rows }).map((_, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-white rounded-xl shadow-md flex items-center space-x-4 animate-pulse"
                    >
                        <div className="flex-1 space-y-2">
                            <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}