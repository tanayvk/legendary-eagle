import CreateWorkspace from "./CreateWorkspace.js";
import { useHistory } from "react-router-dom";

function Home(props) {
  const history = useHistory();
  return (
    <div class="h-screen overflow-hidden flex items-center justify-center">
      <div className="py-20 px-8 md:px-10 lg:px-16 xl:px-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center ">
        <div className="space-y-8 container mx-auto flex flex-col items-center">
          <div>
            {/* <h1 className="text-5xl text-white font-bold">Legendary Eagle</h1> */}
          </div>
          <div className="shadow-lg xl:w-1/3 w-full p-8 flex flex-col bg-white rounded-xl">
            <CreateWorkspace history={history} />
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
