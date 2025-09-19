import { auth, signIn, signOut } from "@/auth";
import { LogIn } from "lucide-react";
import Image from "next/image";

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <LogIn className="w-16 h-16 text-gray-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800">You’re not signed in</h2>
                <p className="text-gray-600 mt-2">Sign in with Google to access your profile.</p>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google");
                    }}
                >
                    <button
                        type="submit"
                        className="cursor-pointer mt-6 px-4 py-2 bg-red-900 text-white rounded hover:scale-105 transition-all duration-100"
                    >
                        Sign in with Google
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {session.user?.image && (
                <Image
                    src={session.user.image}
                    alt="User Avatar"
                    height={150}
                    width={150}
                    className="rounded-full"
                />
            )}
            <h1 className="text-3xl font-bold mt-2 text-center">Welcome, {session.user?.name} 👋</h1>
            <p className="text-gray-600">{session.user?.email}</p>

            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button
                    type="submit"
                    className="mt-3 px-4 py-2 bg-gray-700 text-white rounded cursor-pointer"
                >
                    Sign out
                </button>
            </form>
        </div>
    );
}
