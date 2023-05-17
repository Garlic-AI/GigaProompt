import React, { FC, useEffect, useRef, useState, useMemo, useCallback } from "react"
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
import TextareaAutosize from 'react-textarea-autosize';



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

// const Header: FC = () => (
//     <div className="flex h-16 w-full items-center justify-between px-10 text-gray-700 shadow-lg rounded-md bg-gradient-to-r from-blue-100 to-white">
//       <h1 className="text-2xl font-bold text-gray-800">AI Model Comparison</h1>
//       <div className="flex items-center space-x-4">
//         <div className="text-sm text-gray-800">User: John Doe</div>
//         <Button variant="outline" className="neumorphic">Logout</Button>
//       </div>
//     </div>
//   )

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
{/* 
      <div className="flex flex-col h-full bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg overflow-hidden shadow-lg">
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-300 to-gray-200 px-4 py-2 sticky top-0 z-10"> */}
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
  addModel: () => void
}

const Footer: FC<FooterProps> = ({ onRun, inputText, setInputText, addModel }) => {
  const handleRunClick = () => {
    onRun(inputText)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  return (
    <div className="flex flex-col items-stretch justify-between bg-white shadow-lg sticky bottom-0 z-1 relative h-1/4 backdrop-blur outline-none border-t border-gray-200">

<div className=" top-2 left-2 text-sm text-gray-400 p-3">
    ✨ proompt here ✨
  </div>
      {/* <textarea
        className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none h-full p-6 !outline-none pt-3"
        placeholder="Type your question or command here..."
        onChange={handleChange}
        value={inputText}
        style={{ fontFamily: "Monaco, monospace" }}
      ></textarea> */}
      <TextareaAutosize
        minRows={5}
        // maxRows={40}
        className="flex-grow border-0 overflow-auto focus:outline-none shadow-none resize-none rounded-none p-6 !outline-none pt-3"
        placeholder="Type your question or command here..."
        onChange={handleChange}
        value={inputText}
        style={{ fontFamily: "Monaco, monospace" }}
/>

      <div className="flex justify-end p-4 space-x-2">
        <Button variant="ghost" onClick={addModel}>
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
  const [footerPosition, setFooterPosition] = useState('bottom'); // default to 'bottom'

  const handleFooterPositionChange = (position: string) => {
    setFooterPosition(position);
  };
  

  const clearModels = () => {
    setModels((prevModels) =>
      prevModels.map((prevModel) => ({ ...prevModel, result: "" }))
    )
  }

//   {
//     "query": "What is the weather like today?",
//     "llmConfig": {
//         "type": "openai",
//         "apiKey": "YOUR-API-KEY"
//     }
// }


  const fetchModelResults = async (model: any, inputText: string) => {
    const response = await fetch("/api/inference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },


      body: JSON.stringify({
        query: inputText,
        llmConfig: {
            type: "openai",
        },
        }),
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

//     const getGridColumns = (numModels: number): string => {
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

// const getGridColumns = (numModels: number): string => {
//     if (numModels <= 1) {
//       return "justify-center"
//     } else if (numModels <= 2) {
//       return "md:grid-cols-2 justify-items-center"
//     } else if (numModels <= 3) {
//       return "lg:grid-cols-3"
//     } else {
//       return "xl:grid-cols-4"
//     }
//   }

// const getGridColumns = (numModels: number): string => {
//     if (numModels === 1) {
//       return "grid-cols-1 grid-rows-1";
//     } else if (numModels === 2) {
//       return "grid-cols-2 grid-rows-1";
//     } else if (numModels <= 4) {
//       return "grid-cols-2 grid-rows-2";
//     } else if (numModels <= 6) {
//       return "grid-cols-3 grid-rows-2";
//     } else {
//       return "grid-cols-4 grid-rows-2";
//     }
//   };

const getGridColumns = (numModels: number): string => {
    if (numModels === 1) {
        //neomorphic glassmorphism background
      return "sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 sm:min-h-[600px] md:min-h-[800px] lg:min-h-[800px]";
    } else if (numModels === 2) {
      return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:min-h-[600px] md:min-h-[800px] lg:min-h-[800px]";
    } else if (numModels <= 4) {
      return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:min-h-[200px] md:min-h-[500px] lg:min-h-[500px]";
    } else if (numModels <= 6) {
      return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:min-h-[200px] md:min-h-[500px] lg:min-h-[500px]";
    } else {
      return "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };
  

  const gridColumns = useMemo(() => getGridColumns(models.length), [models.length]);



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

//   const deleteModel = (modelIndex: number) => {
//     setModels(models.filter((_, index) => index !== modelIndex));
//   };
    const deleteModel = useCallback((modelIndex: number) => {
    setModels(models => models.filter((_, index) => index !== modelIndex));
  }, []);
  

  return (

    // <div className="flex flex-col h-screen">
    //   <div>
    //     <label>Footer Position: </label>
    //     <select value={footerPosition} onChange={(e) => handleFooterPositionChange(e.target.value)}>
    //       <option value="top">Top</option>
    //       <option value="bottom">Bottom</option>
    //       <option value="left">Left</option>
    //     </select>
    //   </div>

    //   {footerPosition === 'top' && (
    //     <Footer
    //       onRun={handleRun}
    //       inputText={inputText}
    //       setInputText={setInputText}
    //       addModel={addModel}
    //     />
    //   )}

    //   <main className="flex-grow p-4" style={{
    //     backgroundImage: `radial-gradient(circle, #ccc 1px, transparent 1px), radial-gradient(circle, #ccc 1px, transparent 1px)`,
    //     backgroundSize: `20px 20px`,
    //     backgroundPosition: `0 0, 10px 10px`
    //   }}>
    //   {footerPosition === 'left' ? (
    //     <div className="grid grid-cols-4 gap-4">
    //       <div className="col-span-1">
    //         <Footer
    //           onRun={handleRun}
    //           inputText={inputText}
    //           setInputText={setInputText}
    //           addModel={addModel}
    //         />
    //       </div>
    //       <div className="col-span-3">
    //         {/* ... Rest of your content ... */}
    //         <div className={`grid gap-4 ${gridColumns}`}>
    //           {models.map((model, index) => (
    //             <ModelCard
    //               key={model.id}
    //               model={model}
    //               onDelete={() => deleteModel(index)}
    //               modelName={model.name}
    //               modelInference={model.result}
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div>
    //       {/* ... Rest of your content ... */}
    //       <div className={`grid gap-4 ${gridColumns}`}>
    //         {models.map((model, index) => (
    //           <ModelCard
    //             key={model.id}
    //             model={model}
    //             onDelete={() => deleteModel(index)}
    //             modelName={model.name}
    //             modelInference={model.result}
    //           />
    //         ))}
    //       </div>

          


    //       {footerPosition === 'bottom' && (
    //         <Footer
    //           onRun={handleRun}
    //           inputText={inputText}
    //           setInputText={setInputText}
    //           addModel={addModel}
    //         />
    //       )}
    //     </div>
    //   )}
    //   </main>
    // </div>
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <main className="flex-grow p-4" style={{
    backgroundImage: `radial-gradient(circle, #ccc 1px, transparent 1px), radial-gradient(circle, #ccc 1px, transparent 1px)`,
    backgroundSize: `20px 20px`, /* size of the grid */
    backgroundPosition: `0 0, 10px 10px` /* position of the grid */
}}>
    <div className="mb-8">
     <Footer
        onRun={handleRun}
        inputText={inputText}
        setInputText={setInputText}
        addModel={addModel}
      />
      </div>
        <div className={`grid gap-4 ${gridColumns}`}>
          {models.map((model, index) => (
            <ModelCard
              key={model.id}
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
<div
  className="border-solid border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer p-4 text-base bg-white hover:bg-gray-b transition-all duration-300 ease-in-out"
  onClick={addModel}
>
  <PlusIcon className="h-6 w-6 mr-2 text-gray-500" />
  <span className="text-gray-700 font-semibold">Add Model</span>
</div>


          </div>
        </div>
      </main>
    </div>
    
  )
}

export default Play
