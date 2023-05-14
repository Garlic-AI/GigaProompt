// // import { NextRequest } from "next/server"
// // import { OpenAI } from "langchain/llms/openai";
// // import { ChatOpenAI } from "langchain/chat_models/openai";
// // import { HumanChatMessage } from "langchain/schema";
// // import { Streaming } from "langchain/streaming";




// // if (process.env.OPENAI_API_KEY === undefined) {
// //     throw new Error("OPENAI_API_KEY is not defined")
// // }

// // // export async function GET() {
// // //     console.log("GET /api/route")
// // //     const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY })
// // //     const res = await model.call(
// // //         "What would be a good company name a company that makes colorful socks?"
// // //       );
// // //     console.log(res);
// // //     // return {
// // //     //     status: 200,
// // //     //     headers: {
// // //     //         "content-type": "application/json; charset=utf8",
// // //     //     },
// // //     //     body: JSON.stringify(res),
// // //     // }
// // //     return new Response(JSON.stringify(res), {
// // //         headers: {
// // //             "content-type": "application/json; charset=utf8",
// // //         },
// // //         status: 200,
// // //     })
// // // }

// // // export async function GET() {
// // //     const chat = new ChatOpenAI({
// // //         streaming: true,
// // //         callbacks: [
// // //             {
// // //                 handleLLMNewToken(token: string) {
// // //                     process.stdout.write(token);
// // //                 }
// // //             },
// // //         ],
// // //     });
// // //     // await chat.call([
// // //     //     new HumanChatMessage("Write me a song about sparkling water."),
// // //     // ]);
// // //     // return new Response(JSON.stringify({}), {
// // //     //     headers: {
// // //     //         "content-type": "application/json; charset=utf8",
// // //     //     },
// // //     //     status: 200,
// // //     // })
// // //     const res = await chat.call([
// // //         new HumanChatMessage("Write me a song about sparkling water."),
// // //     ]);
// // //     return new Response(JSON.stringify(res), {
// // //         headers: {
// // //             "content-type": "application/json; charset=utf8",
// // //         },
// // //         status: 200,
// // //     })


// // // }




// // // const chat = new ChatOpenAI({
// // //   streaming: true,
// // //   callbacks: [
// // //     {
// // //       handleLLMNewToken(token: string) {
// // //         process.stdout.write(token);
// // //       },
// // //     },
// // //   ],
// // // });

// // // await chat.call([
// // //   new HumanChatMessage("Write me a song about sparkling water."),
// // // ]);

// // export async function GET() {
// //     const model = new OpenAI({});
// //     const streaming = new Streaming(model);

// //     streaming.on("data", (data: any) => {
// //     console.log(data.text);
// //     });

// //     streaming.on("error", (error: any) => {
// //     console.error(error);
// //     });

// //     streaming.on("end", () => {
// //     console.log("Stream ended.");
// //     });

// //     streaming.start({ prompt: "Hello, how are you?" });
// // }


// // import { NextRequest, NextResponse } from "next/server";
// // import { OpenAI } from "langchain/llms/openai";
// // import { Streaming } from "langchain/streaming";

// // if (process.env.OPENAI_API_KEY === undefined) {
// //   throw new Error("OPENAI_API_KEY is not defined");
// // }

// // //
// // const OpenAIRequest = 

// // export async function GET(request: Request, response: Response) {
// //   const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
// //   const streaming = new Streaming(model);

// //   streaming.on("data", (data: any) => {
// //     console.log(data.text);
// //     // Here you can send the streaming data to the client
// //     // For example, you can use the Next.js `sendStream` method
// //     // to send the data as a stream response
// //   });

// //   streaming.on("error", (error: any) => {
// //     console.error(error);
// //     // If there's an error, you can send an error response to the client
// //     request.send(new NextResponse(JSON.stringify({ error: error.message }), { status: 500 }));
// //   });

// //   streaming.on("end", () => {
// //     console.log("Stream ended.");
// //     // When the stream ends, you can send a response indicating completion
// //     request.send(new NextResponse(JSON.stringify({ message: "Stream ended" }), { status: 200 }));
// //   });

// //   // Start the streaming with the desired prompt
// //   streaming.start({ prompt: "Hello, how are you?" });

// //   // Return a temporary response while the stream is ongoing
// //   return new NextResponse("Streaming in progress...");
// // }



// // import { NextRequest, NextResponse } from "next/server";
// // import { geolocation } from "@vercel/edge";
// // import { getWeatherData } from "@/app/lib/utils";

// // export const runtime = "edge";

// // export async function GET(req: NextRequest) {
// //   let location = req.nextUrl.searchParams.get("location");
// //   if (!location) {
// //     const { city } = geolocation(req);
// //     location = city || "San Francisco";
// //   }

// //   const response = await getWeatherData(location);

// //   return NextResponse.json({
// //     ...response,
// //     infoLink: `https://weathergpt.vercel.app/${encodeURIComponent(location)}`,
// //   });
// // }

import { NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
} from "langchain/prompts";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { NextRequest } from "next/server";


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//     runtime: "edge",
// };

type Query = {
    query: string
}

export async function POST(req: Request) {
    // const body = await req.json();  
    // console.log(body)   
    // console.log(req)
    try {
    console.log("trying to get query")
    // const body = await req.json();
    const body = await req.json();
    console.log("body", body)
    return new NextResponse(JSON.stringify({ inference: "test" }), { status: 200 });


    try {
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not defined.");
        }

        const encoder = new TextEncoder();
        const stream = new TransformStream();
        const writer = stream.writable.getWriter();

        const llm = new ChatOpenAI({
            openAIApiKey: OPENAI_API_KEY,
            temperature: 0.9,
            streaming: true,
            callbackManager: CallbackManager.fromHandlers({
                handleLLMNewToken: async (token) => {
                    await writer.ready;
                    await writer.write(encoder.encode(`${token}`));
                },
                handleLLMEnd: async () => {
                    await writer.ready;
                    await writer.close();
                },
                handleLLMError: async (e) => {
                    await writer.ready;
                    await writer.abort(e);
                },
            }),
        });

        // const chain = new LLMChain({ prompt, llm });
        // chain.call({ query: query }).catch(console.error);

        // We can also construct an LLMChain from a ChatPromptTemplate and a chat model.
        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                "You are a helpful assistant that answers questions as best you can."
            ),
            HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);
        const chain = new LLMChain({
            prompt: chatPrompt,
            llm: llm,
        });
        chain
            .call({input: body.query})
            .catch(console.error);

        return new NextResponse(stream.readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
            },
        });
    } catch (error) {
        // console.error(error);
        // res.status(500).send("Internal Server Error");
        return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
    }
    } catch (error) {
        // console.error(error);
        // res.status(500).send("Internal Server Error");
        return new NextResponse(JSON.stringify({ error: 'could not read json'}), { status: 500 });
    }
}



// import { NextResponse } from 'next/server';
 
// export async function POST(request: Request) {
//   const res = await request.json();
//   return NextResponse.json({ success: true, data: res });
//   }