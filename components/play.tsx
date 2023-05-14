// import React, { FC, useEffect, useRef, useState } from "react"
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

// function ModelCard({
//   model,
//   onDelete,
//   inputText,
// }: {
//   model: {
//     name: string
//     provider: string
//     description: string
//     settings: Record<string, any>
//     modelChoices: Record<string, any>
//   }
//   onDelete: () => void
//   inputText: string
// }) {
//   const [loading, setLoading] = useState(false)
//   const [modelResults, setModelResults] = useState<string[]>([])
//   const [selectedModel, setSelectedModel] = useState(model.name)

//   useEffect(() => {
//     if (inputText === "") return
//     const fetchModelResults = async () => {
//       try {
//         const response = await fetch("/api/inference2", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             text: inputText,
//             model: selectedModel,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error(response.statusText)
//         }

//         const result = await response.json()
//         setModelResults(result.inference)
//       } catch (error) {
//         console.error(error)
//       }
//     }

//     fetchModelResults()
//   }, [loading])

//   return (
//     <div className="flex flex-col h-full">
//       <div className="flex flex-col h-full bg-white rounded shadow-md">
//         <div className="flex items-center justify-between border-b bg-gray-200 px-4 py-2 text-gray-700 sticky top-0 z-10">
//           <div className="flex items-center space-x-2">
//             {/* <span className="font-semibold">Model: {model.name}</span> */}
//             <div className="mb-2">
//               <Select value={selectedModel} onValueChange={setSelectedModel}>
//                 <SelectTrigger className="rounded-md border border-gray-300 px-2 py-1 w-[180px]">
//                   <SelectValue>{selectedModel}</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {model.modelChoices.map((choice: any, index: any) => (
//                     <SelectItem
//                       key={index}
//                       value={choice.name}
//                       className="hover:bg-gray-100"
//                     >
//                       {choice.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="border border-gray-500 text-gray-500 hover:text-indigo-600 rounded px-2 py-1 hover:border-indigo-600">
//               <AdjustmentsHorizontalIcon className="h-5 w-5" />
//             </button>
//             <button
//               onClick={onDelete}
//               className="text-red-500 hover:text-red-600"
//             >
//               <TrashIcon className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//         <div className="overflow-auto p-4 flex-grow">
//           {/* Model results go here */}
//           {model.description}
//         </div>
//         <div className="flex items-center justify-between px-4 py-2">
//           {/* Settings Button */}

//           {/* Full View Button */}
//           <button className="border border-gray-300 text-gray-700 hover:text-gray-800 rounded px-2 py-1 hover:border-gray-800 hover:bg-gray-500 hover:text-white">
//             View Full
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// interface FooterProps {
//   onRun: () => void
// }

// const Footer: FC<FooterProps> = ({ onRun }) => {
//   const [inputText, setInputText] = useState("")
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

//   const handleRunClick = () => {
//     onRun();
//     setInputText("");
//   }

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
//         <Button variant="default" onClick={handleRunClick}>
//           Run
//         </Button>
//         {/* <Button variant="default" onClick={() => runModels(textAreaRef.current?.value || "")}>Run Prompt</Button> */}
//       </div>
//     </div>
//   )
// }

// const Play: FC<PlayProps> = ({ models, onAddModel, onDeleteModel }) => {
//   const [inputText, setInputText] = useState("")

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
//               inputText={inputText}
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
//       <Footer onRun={() => {}} />
//     </div>
//   )
// }

// export default Play

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
import { v4 as uuidv4 } from 'uuid';


interface Model {
  name: string
  provider: string
  description: string
  settings: Record<string, any>
  result: string
  modelChoices: {
    name: string
    provider: string
    description: string
    defaultSettings: Record<string, any>
  }[]
}

// interface PlayProps {
//   models: Model[]
//   onAddModel: () => void
//   onDeleteModel: (index: number) => void
// }

const Header: FC = () => (
  <div className="flex h-16 w-full items-center justify-between bg-white px-10 text-gray-700 shadow">
    <h1 className="text-2xl font-bold">AI Model Comparison</h1>
    <div className="flex items-center space-x-4">
      <div className="text-sm">User: John Doe</div>
      <Button variant="outline">Logout</Button>
    </div>
  </div>
)

function ModelCard({
  modelName,
  modelInference,
  onDelete,
  model,
}: {
  modelName: string
  modelInference: string
  onDelete: () => void
    model: {
    name: string
    provider: string
    description: string
    settings: Record<string, any>
    result: string
    modelChoices: Record<string, any>
    }

}) {
  const [loading, setLoading] = useState(false)
  const [modelResults, setModelResults] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState(modelName)

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full bg-white rounded shadow-md">
        <div className="flex items-center justify-between border-b bg-gray-200 px-4 py-2 text-gray-700 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            {/* <span className="font-semibold">Model: {modelName}</span> */}
            <div className="w-1/2">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="rounded-md border border-gray-300 px-2 py-1 w-[180px]">
                    <SelectValue>{selectedModel}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {model.modelChoices.map((choice: any, index: any) => (
                      <SelectItem
                        key={index}
                        value={choice.name}
                        className="hover:bg-gray-100"
                      >
                        {choice.name}
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
          {modelInference}
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
  )
}

interface FooterProps {
  onRun: (inputText: string) => void
  inputText: string
  setInputText: (inputText: string) => void
}

const Footer: FC<FooterProps> = ({ onRun, inputText, setInputText }) => {
  const handleRunClick = () => {
    onRun(inputText)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  return (
    <div className="flex flex-col items-stretch justify-between bg-white shadow-lg sticky bottom-0 z-50 relative h-1/4 backdrop-blur outline-none border-t border-gray-200">
      <textarea
        className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none h-full p-6 !outline-none"
        placeholder="Type your question or command here..."
        onChange={handleChange}
        value={inputText}
        style={{ fontFamily: "Monaco, monospace" }}
      ></textarea>
      <div className="flex justify-end p-4 space-x-2">
        <Button variant="ghost">
          <span className="text-gray-500 flex items-center">
            <PlusIcon className="h-3 w-4 mr-2" />
            Add Model
          </span>
        </Button>
        <Button variant="ghost" className="mr-12">
          Clear
        </Button>
        <Button variant="default" onClick={handleRunClick}>
          Run
        </Button>
      </div>
    </div>
  )
}

const Play = () => {
  const [models, setModels] = useState([
    {
      name: 'GPT-3',
      //random uuid
      id: '1234',
      provider: 'OpenAI',
      description: 'OpenAI\'s third-generation language prediction model.',
      settings: { temperature: 0.7, topP: 1 },
      result: '',
      modelChoices: [
        { 
          name: 'GPT-3', 
          provider: 'OpenAI', 
          description: 'OpenAI\'s third-generation language prediction model.',
          defaultSettings: { temperature: 0.7, topP: 1 }
        },
        { 
          name: 'GPT-2', 
          provider: 'OpenAI', 
          description: 'OpenAI\'s second-generation language prediction model.',
          defaultSettings: { temperature: 0.6, topP: 0.9 }
        },
        // More model choices...
      ],
    },
    // More models...
  ]);
  
  //   const [inputText, setInputText] = useState('this is a test');
  const [inputText, setInputText] = useState("this is a test")

  const clearModels = () => {
    setModels((prevModels) =>
      prevModels.map((prevModel) => ({ ...prevModel, result: "" }))
    )
  }

  const fetchModelResults = async (model: any, inputText: string) => {
    const response = await fetch("/api/inference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_model: model.name, query: inputText }),
    })
    if (!response.ok) throw new Error(response.statusText)

    const data = await response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder("utf-8")
    let result = ""
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setModels((prevModels) => {
        const updatedModels = prevModels.map((prevModel) => {
            if (prevModel.id === model.id) {
                return { ...prevModel, result: prevModel.result + chunkValue }
            }
          return prevModel
        })
        return updatedModels
      })
    }

    return result
  }

  const handleRun = async (inputText: string) => {
    clearModels()
    const updatedModels = await Promise.all(
      models.map(async (model) => {
        const result = await fetchModelResults(model, inputText)
        // default to an empty string if the result is undefined
        return { ...model, result: result || "" }
      })
    )
  }

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


  const addModel = () => {
    const randomId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const newModel = {
      name: 'GPT-3',
      id: randomId,
      provider: 'OpenAI',
      description: 'OpenAI\'s third-generation language prediction model.',
      settings: { temperature: 0.7, topP: 1 },
      result: '',
      modelChoices: [
        { 
          name: 'GPT-3', 
          provider: 'OpenAI', 
          description: 'OpenAI\'s third-generation language prediction model.',
          defaultSettings: { temperature: 0.7, topP: 1 }
        },
        { 
          name: 'GPT-2', 
          provider: 'OpenAI', 
          description: 'OpenAI\'s second-generation language prediction model.',
          defaultSettings: { temperature: 0.6, topP: 0.9 }
        },
        // More model choices...
      ],      
    };
    setModels(models.concat(newModel));
  };

  const deleteModel = (modelIndex: number) => {
    setModels(models.filter((_, index) => index !== modelIndex));
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow overflow-auto p-4">
        <div className={`grid gap-4 ${getGridColumns(models.length)}`}>
          {models.map((model, index) => (
            <ModelCard
              key={index}
              model={model}
              onDelete={() => deleteModel(index)}
              modelName={model.name}
              modelInference={model.result}
            />
          ))}
          <div
            className="border-dashed border-2 rounded-md flex items-center justify-center cursor-pointer p-4"
            onClick={addModel}
          >
            <span className="text-gray-500">Add Model</span>
          </div>
        </div>
      </main>
      <Footer
        onRun={handleRun}
        inputText={inputText}
        setInputText={setInputText}
      />
    </div>
    //   )
    // }
  )
}

export default Play
