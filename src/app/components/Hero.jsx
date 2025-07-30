import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="flex justify-around items-center flex-wrap gap-3 py-4 ">
        <div>
          <img src="/hero.png" alt="mian-image" width={400} height={400} />
        </div>
        <div className="w-[40%] max-md:w-[80%]">
          <p className="text-2xl font-normal">
            Share your study notes, summaries, flashcards, study guides, and
            other learning resources with fellow students. Our platform makes it
            easy for learners to find and download helpful materials to support
            their studies — completely free.
          </p>
          <Link href="/auth/signup">
            <Button className=" cursor-pointer my-4">Sign Up</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
