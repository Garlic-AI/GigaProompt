"use client";
import Link from "next/link"
import { Fragment, useState } from 'react'

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog,Menu, Transition } from '@headlessui/react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Google,LoadingDots } from "@/components/shared/icons";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";

export function SiteHeader() {
  const { data: session,status } = useSession()
  let [isOpen, setIsOpen] = useState(false)
  let [signinBtnClicked,setSigninBtnClicked]=useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
 
  }
  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 top-0 left-0" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                
              <button onClick={() => {
                signIn('google') ;  
                setSigninBtnClicked(true);
                }} className="text-black flex items-center justify-center border px-4 w-full border-gray-200 bg-white hover:bg-gray-50 ">
                    {
                    signinBtnClicked ?   <div className="py-2"><LoadingDots color="#808080" /></div> :  <><p className="text-lg font-semibold py-2">Sign in with</p> <Google className="h-5 w-5 ml-2" /></>
                    }
                    
              </button>        
              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/* {
              session && session.user&&   
              <>  
               Signed in as {session.user.email} <br/>
               <button onClick={() => signOut()}>Sign out</button>
              </> 
            }
            {
              JSON.stringify(session?.user?.image)
            } */}
            {
              session?.user && status ==='authenticated'&&
              <>
              <div className="z-10000 w-56 text-right">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          {/* <img src={session?.user?.image} className="rounded-full w-[32px] h-[32px]"/> */}
                          <Image
                            alt={session?.user?.email}
                            src={session?.user?.image || `https://avatars.dicebear.com/api/micah/${session?.user?.email}.svg`}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  onClick={() => signOut()}
                                >
                                  <LogOut className="h-4 w-4 mr-1" />
                                  <p>
                                      Logout
                                  </p>
                                </button>
                              )}
                            </Menu.Item>
                          
                          </div>
                      
                        </Menu.Items>
                      </Transition>
                    </Menu>
                </div>
              </>
            }
            {!session?.user && status!=='loading'&&  
            <>
                <button
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-cyan-100 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
               
                  Log In
                </button>

            </>
            }
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
    </>
  )
}
