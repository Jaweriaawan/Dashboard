'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Admin(){
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const router = useRouter()

  const handleLogedIn = (e : React.FormEvent) => {
    e.preventDefault()

    if( email === "ahmmadali@gmail.com" && password === "admmad2010"){
       localStorage.setItem("isLogedIn" , "true")
       router.push("/dashboard")
    }
    else {
      alert("Invalid email or password")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-4">
      <form onSubmit={handleLogedIn} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <p className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</p>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" 
          value={email} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" 
          value={password} 
        />

        <button 
          type="submit" 
          className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-900 transition-all">
          Login 
        </button>
      </form>
    </div>
  )
}
