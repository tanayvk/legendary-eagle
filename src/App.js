import React from "react";
import ReactDOM from "react-dom";


function App() {
  return (
    <div class ="h-screen overflow-hidden flex items-center justify-center" >
    <div class="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
    
    <div class="space-y-8 container mx-auto flex flex-col items-center">
      <div class="">
        <h1 class="text-5xl text-purple-500 font-bold">Legendary Eagle</h1>
      </div>
      <form class="shadow-lg w-1/3 p-8 flex flex-col bg-white rounded-xl ">
        
        <button class="w-full bg-green-400 text-white p-3 rounded-lg font-semibold text-lg">Create New
          Workspace</button>
          <div class="m-6 border-t-2">
          </div>
          <input type="text" placeholder="Workspace Handle"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none  rounded-md focus:ring-1 ring-cyan-500" />
        <input type="text" placeholder="Shh.. Top secret!"
          class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
         
        <button class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg">Let's Go</button>
        
          
      </form>
      <p class="text-center text-sm my-4">
        <span class="font-semibold text-center w-full">&copy; Trio</span> 
      </p>
    </div>
  </div>
  </div>
  );
}

export default App;
