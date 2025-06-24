import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="mb-6">
          You do not have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>
        <Button asChild>
          <Link href="/login">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}