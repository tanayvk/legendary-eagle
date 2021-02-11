import React from "react";
import ReactDOM from "react-dom";


function App() {
  return (
    <div class ="h-screen overflow-hidden flex items-center justify-center">
    <div class="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500">
    
    <div class="space-y-8 container mx-auto flex flex-col items-center">
      <div class="">
        <h1 class="text-5xl text-white font-bold">Legendary Eagle</h1>
      </div>
      <form class="shadow-lg w-1/3 p-8 flex flex-col bg-white rounded-xl">
        
        <button class="w-full text-white p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-semibold text-lg focus:border focus:border-2">Create New
          Workspace</button>
          <div class="m-6 border-t-2">
          </div>
          <input type="text" placeholder="Workspace Handle"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
        <input type="text" placeholder="Shh.. Top secret!"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
         
        <button class="w-full bg-blue-500 text-white p-3 rounded-full font-semibold bg-gradient-to-r from-blue-400 to-green-500 hover:from-yellow-500 hover:to-pink-500 text-lg">Access Workspace</button>
        
          
      </form>
      <p class="text-center text-sm my-4">
        <span class="font-semibold text-white text-center w-full">&copy; Trio</span> 
      </p>
    </div>
  </div>
  </div>
  );
}

export default App;
