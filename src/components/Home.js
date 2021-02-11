import CreateWorkspace from "./CreateWorkspace.js";

function Home() {
  return (
    <div class="h-screen overflow-hidden flex items-center justify-center">
      <div className="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500">
        <div className="space-y-8 container mx-auto flex flex-col items-center">
          <div>
            <h1 className="text-5xl text-white font-bold">Legendary Eagle</h1>
          </div>
          <div className="shadow-lg w-1/3 p-8 flex flex-col bg-white rounded-xl">
            <CreateWorkspace />
          </div>
          <p className="text-center text-sm my-4">
            <span className="font-semibold text-white text-center w-full">
              &copy; Trio
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
