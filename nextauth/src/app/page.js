import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className=" border-red-500 border-2 p-4 text-white font-bold">Created an authentication in Nextjs using libraries like Formik and Yup</h1>

      <div className=" flex border-white h-20 justify-between">
        <Link href='signin'>
          <Button className=" mr-4" variant='default'>Register</Button>
        </Link>
        <Link href='login'>
          <Button variant='default'>Login</Button>
        </Link>
      </div>

    </main>
  );
}
