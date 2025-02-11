'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ProtectedRoute({children} : {children : React.ReactNode}){
  const router = useRouter()

  useEffect(() => {
    const isLogedIn = localStorage.getItem("isLogedIn")
      if(!isLogedIn){
        router.push("/admin")
      }
  }, [router])

  return <>
    {children}
  </>
}
