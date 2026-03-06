import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-10">
      <h1>faizan khan</h1>

      <Button>faizan khan</Button>

      <UserButton />
    </div>
  );
}