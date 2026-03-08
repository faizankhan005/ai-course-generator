import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import CourseList from "./_components/CourseList";

export default function Home() {
  return (
    <div >
     <Header/>
     <Hero/>
     <CourseList/>
     <div className="absolute bottom-40 left-40 h-[500px] w-[500px] blur-[120px] bg-purple-400/20 rounded-full " />
     <div className="absolute top-20 left-1/3 bottom-[-200px] h-[500px] w-[500px] blur-[120px] bg-pink-400/20 rounded-full " />
     <div className="absolute  left-1/3 bottom-[-200px] h-[500px] w-[500px] blur-[120px] bg-blue-400/20 rounded-full " />
     <div className="absolute top-[200px] bottom-40 left-1/2 h-[500px] w-[500px] blur-[200px] bg-sky-400/20 rounded-full " />
    </div>
  );
}