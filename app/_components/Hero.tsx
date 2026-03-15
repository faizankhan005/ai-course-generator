
"use client"
import React from 'react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import axios from 'axios'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, Send } from 'lucide-react'
import { QUICK_VIDEO_SUGGESTIONS } from '@/data/constant'
import { toast } from 'sonner'
import { SignInButton, useUser } from '@clerk/nextjs'

const Hero = () => {

    const [userInput, setUserInput] = React.useState("");
    const [type, setType] = React.useState("Full-Course");
    const [loading, setLoading] = React.useState(false);
    const { user } = useUser();

    const GenerateCourselayout = async () => {

        if (!userInput.trim()) {
            toast.error("Please enter a topic");
            return;
        }

        const toastId = toast.loading("Generating course layout...");
        const courseId = crypto.randomUUID();

        try {
            setLoading(true);

            const result = await axios.post("/api/generate-course", {
                topic: userInput,
                type,
                courseId
            });

            const data = result.data;

            if (data.success) {
                console.log("Generated Course Layout:", data.data);

                toast.success("Course layout generated successfully!", {
                    id: toastId
                });

            } else {
                toast.error(data.error || "Failed to generate course", {
                    id: toastId
                });
            }

        } catch (error: any) {

            console.error("Generate course error:", error);

            toast.error(
                error?.response?.data?.error || "Server error while generating course",
                { id: toastId }
            );

        } finally {
            setLoading(false);
        }
    };

return (
    <div className='flex items-center flex-col mt-20'>
        <div >
            <h2 className='text-4xl font-bold'>Learn Smarter With <span className='text-primary'> AI Video courses</span></h2>
            <p className='text-center text-gray-500 mt-3 text-xl'>Turn Any Topic into a Complete Course</p>
        </div>
        <div className="grid w-full max-w-xl mt-5 rounded-2xl gap-6 bg-white z-10">
            <InputGroup>
                <InputGroupTextarea
                    data-slot="input-group-control"
                    className="flex field-sizing-content min-h-24 w-full resize-none rounded-xl bg-white px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                    placeholder="Autoresize textarea..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <InputGroupAddon align="block-end">
                    <Select onValueChange={(value) => setType(value)}>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Full Course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Full-Course">Full Course</SelectItem>
                                <SelectItem value="Quick-Explain-Video">Quick Explain Video</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {user ?
                        <InputGroupButton className="ml-auto" size="icon-sm" variant="default"
                            onClick={GenerateCourselayout}
                            disabled={loading}>
                            {loading ? <Loader2 className='animate-spin' /> : <Send />}

                        </InputGroupButton>
                        : <SignInButton mode="modal">
                            <InputGroupButton className="ml-auto" size="icon-sm" variant="default">
                                <Send />
                            </InputGroupButton>
                        </SignInButton>}
                </InputGroupAddon>
            </InputGroup>
        </div>
        <div className='flex gap-5 mt-5 max-w-3xl flex-wrap justify-center z-10'>
            {QUICK_VIDEO_SUGGESTIONS.map((suggestion, index) => (
                <h2 key={index} onClick={() => setUserInput(suggestion?.prompt)} className='border rounded-2xl cursor-pointer px-2 p-1 text-sm bg-white' >{suggestion.text}</h2>
            ))}
        </div>
    </div>
)
}


export default Hero



































// "use client"
// import React from 'react'
// import {
//     InputGroup,
//     InputGroupAddon,
//     InputGroupButton,
//     InputGroupTextarea,
// } from "@/components/ui/input-group"
// import axios from 'axios'
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// // import TextareaAutosize from "react-textarea-autosize"
// import { Loader2, Send } from 'lucide-react'
// import { QUICK_VIDEO_SUGGESTIONS } from '@/data/constant'
// import { toast } from 'sonner'
// import { SignInButton, useUser } from '@clerk/nextjs'

// const Hero = () => {

//     const [userInput, setUserInput] = React.useState("");
//     const [type, setType] = React.useState("Full-Course");
//     const [loading, setLoading] = React.useState(false);
//     const { user } = useUser();
//     const GenerateCourselayout = async () => {
//         const toastId = toast.loading("Generating course layout...");
//         const courseId = crypto.randomUUID();

//         try {
//             setLoading(true);

//             const result = await axios.post("/api/generate-course", {
//                 topic: userInput,
//                 type,
//                 courseId
//             });

//             const data = result.data;

//             if (data.success) {
//                 console.log("Generated Course Layout:", data.data);

//                 toast.success("Course layout generated successfully!", {
//                     id: toastId
//                 });

//             } else {
//                 toast.error(data.error || "Failed to generate course", {
//                     id: toastId
//                 });
//             }

//         } catch (error: any) {

//             console.error("Generate course error:", error);

//             toast.error(
//                 error?.response?.data?.error || "Server error while generating course",
//                 { id: toastId }
//             );

//         } finally {
//             setLoading(false);
//         }
//     };

// }


// return (
//     <div className='flex items-center flex-col mt-20'>
//         <div >
//             <h2 className='text-4xl font-bold'>Learn Smarter With <span className='text-primary'> AI Video courses</span></h2>
//             <p className='text-center text-gray-500 mt-3 text-xl'>Turn Any Topic into a Complete Course</p>
//         </div>
//         <div className="grid w-full max-w-xl mt-5 rounded-2xl gap-6 bg-white z-10">
//             <InputGroup>
//                 <InputGroupTextarea
//                     data-slot="input-group-control"
//                     className="flex field-sizing-content min-h-24 w-full resize-none rounded-xl bg-white px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
//                     placeholder="Autoresize textarea..."
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                 />
//                 <InputGroupAddon align="block-end">
//                     <Select onValueChange={(value) => setType(value)}>
//                         <SelectTrigger className="w-45">
//                             <SelectValue placeholder="Full Course" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectItem value="Full-Course">Full Course</SelectItem>
//                                 <SelectItem value="Quick-Explain-Video">Quick Explain Video</SelectItem>
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                     {user ?
//                         <InputGroupButton className="ml-auto" size="icon-sm" variant="default"
//                             onClick={GenerateCourselayout}
//                             disabled={loading}>
//                             {loading ? <Loader2 className='animate-spin' /> : <Send />}

//                         </InputGroupButton>
//                         : <SignInButton mode="modal">
//                             <InputGroupButton className="ml-auto" size="icon-sm" variant="default">
//                                 <Send />
//                             </InputGroupButton>
//                         </SignInButton>}
//                 </InputGroupAddon>
//             </InputGroup>
//         </div>
//         <div className='flex gap-5 mt-5 max-w-3xl flex-wrap justify-center z-10'>
//             {QUICK_VIDEO_SUGGESTIONS.map((suggestion, index) => (
//                 <h2 key={index} onClick={() => setUserInput(suggestion?.prompt)} className='border rounded-2xl cursor-pointer px-2 p-1 text-sm bg-white' >{suggestion.text}</h2>
//             ))}
//         </div>
//     </div>
// )
// }

// export default Hero 