"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/discover");
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>Welcome to the App</h1>

        <div className='flex items-center mt-6'>
          <Link href='/login'>
            <Button>Login</Button>
          </Link>
          <Link href='/signup' className='ml-4'>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
