import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className=" border-red-500 border-2 p-4 bg-orange-300 text-black font-bold">hello there</h1>
      <Input placeholder='ldfsdf'></Input>
      
      <Link href='signin'>
      <Button variant='destructive'>click me</Button>
      </Link>
    </main>
  );
}
