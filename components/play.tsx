
// import React, { FC, useEffect, useRef } from "react"
// import {
//   AdjustmentsHorizontalIcon,
//   PlusIcon,
//   TrashIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/solid"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

// interface Model {
//   name: string
//   provider: string
//   description: string
//   settings: Record<string, any>
//   modelChoices: {
//     name: string
//     provider: string
//     description: string
//     defaultSettings: Record<string, any>
//   }[]
// }

// interface PlayProps {
//   models: Model[]
//   onAddModel: () => void
//   onDeleteModel: (index: number) => void
// }

// const Header: FC = () => (
//   <div className="flex h-16 w-full items-center justify-between bg-white px-10 text-gray-700 shadow">
//     <h1 className="text-2xl font-bold">AI Model Comparison</h1>
//     <div className="flex items-center space-x-4">
//       <div className="text-sm">User: John Doe</div>
//       <Button variant="outline">Logout</Button>
//     </div>
//   </div>
// )

// const ModelCard: FC<{
//   model: {
//     name: string
//     provider: string
//     description: string
//     settings: Record<string, any>
//     modelChoices: Record<string, any>
//   }
//   onDelete: () => void
// }> = ({ model, onDelete }) => (
//   <div className="flex flex-col h-full">
//     <div className="flex flex-col h-full bg-white rounded shadow-md">
//       <div className="flex items-center justify-between border-b bg-gray-200 px-4 py-2 text-gray-700 sticky top-0 z-10">
//         <div className="flex items-center space-x-2">
//           {/* <span className="font-semibold">Model: {model.name}</span> */}
//           <div className="mb-2">
//             <Select>
//               <SelectTrigger className="rounded-md border border-gray-300 px-2 py-1 w-[180px]">
//                 <SelectValue placeholder={model.name} />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.entries(model.modelChoices).map(([key, value]) => (
//                   <SelectItem
//                     key={key}
//                     value={key}
//                     className="hover:bg-gray-100"
//                   >
//                     {value.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="border border-gray-500 text-gray-500 hover:text-indigo-600 rounded px-2 py-1 hover:border-indigo-600">
//             <AdjustmentsHorizontalIcon className="h-5 w-5" />
//           </button>
//           <button
//             onClick={onDelete}
//             className="text-red-500 hover:text-red-600"
//           >
//             <TrashIcon className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//       <div className="overflow-auto p-4 flex-grow">
//         {/* Model results go here */}
//         {model.description}
//       </div>
//       <div className="flex items-center justify-between px-4 py-2">
//         {/* Settings Button */}

//         {/* Full View Button */}
//         <button className="border border-gray-300 text-gray-700 hover:text-gray-800 rounded px-2 py-1 hover:border-gray-800 hover:bg-gray-500 hover:text-white">
//           View Full
//         </button>
//       </div>
//     </div>
//   </div>
// )

// // const Footer: FC = () => {
// //   const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

// //   useEffect(() => {
// //     textAreaRef.current?.focus()
// //   }, [])

// //   return (
// //     <div className="flex flex-col items-stretch justify-between bg-white shadow-lg sticky bottom-0 z-50 relative h-1/3 backdrop-blur outline-none border-t border-gray-200">
// //       <Textarea
// //         className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none h-full p-6 !outline-none"
// //         placeholder="Type your proompt here..."
// //         ref={textAreaRef}
// //         style={{ fontFamily: "Monaco, monospace" }}
// //       />
// //   <div className="flex justify-end p-4 space-x-2">
// //     <Button variant="ghost" className="mr-2">
// //       Clear
// //     </Button>
// //     <Button variant="default">Run</Button>
// //   </div>
// //     </div>
// //   )
// // }

// const Footer: FC = () => {
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

//   useEffect(() => {
//     textAreaRef.current?.focus()
//   }, [])

//   return (
//     <div className="flex flex-col items-stretch justify-between bg-white shadow-lg sticky bottom-0 z-50 relative h-1/4 backdrop-blur outline-none border-t border-gray-200">
//       <Textarea
//         className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none h-full p-6 !outline-none"
//         placeholder="Type your question or command here..."
//         ref={textAreaRef}
//         style={{ fontFamily: "Monaco, monospace" }}
//       />
//       <div className="flex justify-end p-4 space-x-2">
//         {/* <div
//           className="border-dashed border-2 rounded-md flex items-center justify-center cursor-pointer px-2 py-2"
//           onClick={() => {}}
//         > */}
//         <Button variant="ghost">
//           <span className="text-gray-500 flex items-center">
//             <PlusIcon className="h-3 w-4 mr-2" />
//             Add Model
//           </span>
//         </Button>
//         <Button variant="ghost" className="mr-12">
//           Clear
//         </Button>
//         <Button variant="default">Run Prompt</Button>
//       </div>
//     </div>
//   )
// }

// const Play: FC<PlayProps> = ({ models, onAddModel, onDeleteModel }) => {
//   const getGridColumns = (numModels: number): string => {
//     if (numModels <= 1) {
//       return "grid-cols-1"
//     } else if (numModels <= 2) {
//       return "md:grid-cols-2"
//     } else if (numModels <= 3) {
//       return "lg:grid-cols-3"
//     } else {
//       return "xl:grid-cols-4"
//     }
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <main className="flex-grow overflow-auto p-4">
//         <div className={`grid gap-4 ${getGridColumns(models.length)}`}>
//           {models.map((model, index) => (
//             <ModelCard
//               key={index}
//               model={model}
//               onDelete={() => onDeleteModel(index)}
//             />
//           ))}
//           <div
//             className="border-dashed border-2 rounded-md flex items-center justify-center cursor-pointer p-4"
//             onClick={onAddModel}
//           >
//             <span className="text-gray-500">Add Model</span>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default Play


// import React, { FC, useEffect, useRef, useState } from "react";
// import {
//   AdjustmentsHorizontalIcon,
//   PlusIcon,
//   TrashIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/solid";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// interface Model {
//   name: string;
//   provider: string;
//   description: string;
//   settings: Record<string, any>;
//   modelChoices: {
//     name: string;
//     provider: string;
//     description: string;
//     defaultSettings: Record<string, any>;
//   }[];
// }

// interface PlayProps {
//   models: Model[];
//   onAddModel: () => void;
//   onDeleteModel: (index: number) => void;
// }

// const Header: FC = () => (
//   <div className="flex h-16 w-full items-center justify-between bg-white px-10 text-gray-700 shadow">
//     <h1 className="text-2xl font-bold">AI Model Comparison</h1>
//     <div className="flex items-center space-x-4">
//       <div className="text-sm">User: John Doe</div>
//       <Button variant="outline">Logout</Button>
//     </div>
//   </div>
// );

// const ModelCard: FC<{
//   model: {
//     name: string;
//     provider: string;
//     description: string;
//     settings: Record<string, any>;
//     modelChoices: Record<string, any>;
//   };
//   onDelete: () => void;
// }> = ({ model, onDelete }) => {
//   const [modelResults, setModelResults] = useState<string>("");

//   useEffect(() => {
//     const fetchModelResults = async () => {
//       const response = await fetch("/api/model", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: model.name,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }

//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder();
//       let done = false;

//       while (!done) {
//         const { value, done: doneReading } = await reader?.read();
//         done = doneReading;
//         const chunkValue = decoder.decode(value || new Uint8Array());
//         setModelResults((prev) => prev + chunkValue);
//       }
//     };

//     fetchModelResults();
//   }, [model.name]);

//   // Rest of the component code...
// };

// // Rest of your components and the main Play component



import React, { FC, useEffect, useRef, useState } from "react"
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Model {
  name: string
  provider: string
  description: string
  settings: Record<string, any>
  modelChoices: {
    name: string
    provider: string
    description: string
    defaultSettings: Record<string, any>
  }[]
}

interface PlayProps {
  models: Model[]
  onAddModel: () => void
  onDeleteModel: (index: number) => void
}

const Header: FC = () => (
  <div className="flex h-16 w-full items-center justify-between bg-white px-10 text-gray-700 shadow">
    <h1 className="text-2xl font-bold">AI Model Comparison</h1>
    <div className="flex items-center space-x-4">
      <div className="text-sm">User: John Doe</div>
      <Button variant="outline">Logout</Button>
    </div>
  </div>
)

// function ModelCard({
//     model, 
//     onDelete
//   }: {
//     model: {
//       name: string
//       provider: string
//       description: string
//       settings: Record<string, any>
//       modelChoices: Record<string, any>
//     }
//     onDelete: () => void
//   }) {

//     const [loading, setLoading] = useState(false);
//     const [modelResults, setModelResults] = useState<string[]>([]);


//     useEffect(() => {
//         const fetchModelResults = async () => {
//           const response = await fetch("/api/inference", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               model: model.name,
//             }),
//           });
    
//           if (!response.ok) {
//             throw new Error(response.statusText);
//           }
    
//           const result = await response.text();
//           setModelResults((prev) => [...prev, result]);
//         };
    
//         fetchModelResults();
//       }, [model.name]);

function ModelCard({
    model, 
    onDelete,
    inputText
  }: {
    model: {
      name: string
      provider: string
      description: string
      settings: Record<string, any>
      modelChoices: Record<string, any>
    }
    onDelete: () => void
    inputText: string
  }) {

    const [loading, setLoading] = useState(false);
    const [modelResults, setModelResults] = useState<string[]>([]);

    useEffect(() => {
      if (inputText === "") return;
      const fetchModelResults = async () => {
        const response = await fetch("/api/inference2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: inputText,
            model: model.name,
          }),
        });
  
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        const result = await response.json();
        setModelResults(result.inference);
      };
  
      fetchModelResults();
    }, [inputText, model.name]);

    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full bg-white rounded shadow-md">
          <div className="flex items-center justify-between border-b bg-gray-200 px-4 py-2 text-gray-700 sticky top-0 z-10">
            <div className="flex items-center space-x-2">
              {/* <span className="font-semibold">Model: {model.name}</span> */}
              <div className="mb-2">
                <Select>
                  <SelectTrigger className="rounded-md border border-gray-300 px-2 py-1 w-[180px]">
                    <SelectValue placeholder={model.name} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(model.modelChoices).map(([key, value]) => (
                      <SelectItem
                        key={key}
                        value={key}
                        className="hover:bg-gray-100"
                      >
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="border border-gray-500 text-gray-500 hover:text-indigo-600 rounded px-2 py-1 hover:border-indigo-600">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </button>
              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="overflow-auto p-4 flex-grow">
            {/* Model results go here */}
            {model.description}
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            {/* Settings Button */}
  
            {/* Full View Button */}
            <button className="border border-gray-300 text-gray-700 hover:text-gray-800 rounded px-2 py-1 hover:border-gray-800 hover:bg-gray-500 hover:text-white">
              View Full
            </button>
          </div>
        </div>
      </div>
    );
  }
  

// const ModelCard: FC<{
//   model: {
//     name: string
//     provider: string
//     description: string
//     settings: Record<string, any>
//     modelChoices: Record<string, any>
//   }
//   onDelete: () => void
// }> = ({ model, onDelete }) => (
//   <div className="flex flex-col h-full">
//     <div className="flex flex-col h-full bg-white rounded shadow-md">
//       <div className="flex items-center justify-between border-b bg-gray-200 px-4 py-2 text-gray-700 sticky top-0 z-10">
//         <div className="flex items-center space-x-2">
//           {/* <span className="font-semibold">Model: {model.name}</span> */}
//           <div className="mb-2">
//             <Select>
//               <SelectTrigger className="rounded-md border border-gray-300 px-2 py-1 w-[180px]">
//                 <SelectValue placeholder={model.name} />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.entries(model.modelChoices).map(([key, value]) => (
//                   <SelectItem
//                     key={key}
//                     value={key}
//                     className="hover:bg-gray-100"
//                   >
//                     {value.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="border border-gray-500 text-gray-500 hover:text-indigo-600 rounded px-2 py-1 hover:border-indigo-600">
//             <AdjustmentsHorizontalIcon className="h-5 w-5" />
//           </button>
//           <button
//             onClick={onDelete}
//             className="text-red-500 hover:text-red-600"
//           >
//             <TrashIcon className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//       <div className="overflow-auto p-4 flex-grow">
//         {/* Model results go here */}
//         {model.description}
//       </div>
//       <div className="flex items-center justify-between px-4 py-2">
//         {/* Settings Button */}

//         {/* Full View Button */}
//         <button className="border border-gray-300 text-gray-700 hover:text-gray-800 rounded px-2 py-1 hover:border-gray-800 hover:bg-gray-500 hover:text-white">
//           View Full
//         </button>
//       </div>
//     </div>
//   </div>
// )

// const Footer: FC = () => {
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

//   useEffect(() => {
//     textAreaRef.current?.focus()
//   }, [])

//   return (
//     <div className="flex flex-col items-stretch justify-between bg-white shadow-lg sticky bottom-0 z-50 relative h-1/3 backdrop-blur outline-none border-t border-gray-200">
//       <Textarea
//         className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none h-full p-6 !outline-none"
//         placeholder="Type your proompt here..."
//         ref={textAreaRef}
//         style={{ fontFamily: "Monaco, monospace" }}
//       />
//   <div className="flex justify-end p-4 space-x-2">
//     <Button variant="ghost" className="mr-2">
//       Clear
//     </Button>
//     <Button variant="default">Run</Button>
//   </div>
//     </div>
//   )
// }

// const Footer: FC = () => {
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

//   useEffect(() => {
//     textAreaRef.current?.focus()
//   }, [])


const Footer: FC<{ onRun: (text: string) => void }> = ({ onRun }) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  
    const handleRun = () => {
      if (textAreaRef.current) {
        onRun(textAreaRef.current.value);
      }
    }

  return (
    <div className="flex flex-col items-stretch justify-between bg-white shadow-lg sticky bottom-0 z-50 relative h-1/4 backdrop-blur outline-none border-t border-gray-200">
      <Textarea
        className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none h-full p-6 !outline-none"
        placeholder="Type your question or command here..."
        ref={textAreaRef}
        style={{ fontFamily: "Monaco, monospace" }}
      />
      <div className="flex justify-end p-4 space-x-2">
        {/* <div
          className="border-dashed border-2 rounded-md flex items-center justify-center cursor-pointer px-2 py-2"
          onClick={() => {}}
        > */}
        <Button variant="ghost">
          <span className="text-gray-500 flex items-center">
            <PlusIcon className="h-3 w-4 mr-2" />
            Add Model
          </span>
        </Button>
        <Button variant="ghost" className="mr-12">
          Clear
        </Button>
        <Button variant="default" onClick={handleRun}>Run</Button>
        {/* <Button variant="default" onClick={() => runModels(textAreaRef.current?.value || "")}>Run Prompt</Button> */}
      </div>
    </div>
  )
}

// const Play: FC<PlayProps> = ({ models, onAddModel, onDeleteModel }) => {
//   const getGridColumns = (numModels: number): string => {
//     if (numModels <= 1) {
//       return "grid-cols-1"
//     } else if (numModels <= 2) {
//       return "md:grid-cols-2"
//     } else if (numModels <= 3) {
//       return "lg:grid-cols-3"
//     } else {
//       return "xl:grid-cols-4"
//     }
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <main className="flex-grow overflow-auto p-4">
//         <div className={`grid gap-4 ${getGridColumns(models.length)}`}>
//           {models.map((model, index) => (
//             <ModelCard
//               key={index}
//               model={model}
//               onDelete={() => onDeleteModel(index)}
//             />
//           ))}
//           <div
//             className="border-dashed border-2 rounded-md flex items-center justify-center cursor-pointer p-4"
//             onClick={onAddModel}
//           >
//             <span className="text-gray-500">Add Model</span>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }


const Play: FC<PlayProps> = ({ models, onAddModel, onDeleteModel }) => {
    const [inputText, setInputText] = useState("");
    
    const getGridColumns = (numModels: number): string => {
      if (numModels <= 1) {
        return "grid-cols-1"
      } else if (numModels <= 2) {
        return "md:grid-cols-2"
      } else if (numModels <= 3) {
        return "lg:grid-cols-3"
      } else {
        return "xl:grid-cols-4"
      }
    }
  
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow overflow-auto p-4">
          <div className={`grid gap-4 ${getGridColumns(models.length)}`}>
            {models.map((model, index) => (
              <ModelCard
                key={index}
                model={model}
                onDelete={() => onDeleteModel(index)}
                inputText={inputText}
              />
            ))}
            <div
              className="border-dashed border-2 rounded-md flex items-center justify-center cursor-pointer p-4"
              onClick={onAddModel}
            >
              <span className="text-gray-500">Add Model</span>
            </div>
          </div>
        </main>
        <Footer onRun={setInputText} />
      </div>
    )
  }
  

export default Play