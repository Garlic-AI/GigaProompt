"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Play from "@/components/play"
import React, { useState } from "react";
// import Exp from "@/app/experiment"

export default function IndexPage() {

const [models, setModels] = useState([
  {
    name: 'GPT-3',
    provider: 'OpenAI',
    description: 'OpenAI\'s third-generation language prediction model.',
    settings: { temperature: 0.7, topP: 1 },
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

  

  const addModel = () => {
    const newModel = {
      name: 'GPT-3',
      provider: 'OpenAI',
      description: 'OpenAI\'s third-generation language prediction model.',
      settings: { temperature: 0.7, topP: 1 },
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

    <div className="bg-gray-100">
        <Play 
          // models={models}
          // onAddModel={addModel}
          // onDeleteModel={deleteModel}
        />
    </div>

  );
};