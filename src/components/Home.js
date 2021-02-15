import CreateWorkspace from "./CreateWorkspace.js";
import { useHistory } from "react-router-dom";
import HomeDesign from "./HomeDesign";

function Home(props) {
  const history = useHistory();
  return (
    <div class="h-screen overflow-hidden bg-indigo-300 items-center justify-center">
      <div class="grid grid-cols-5">
        <div class="col-span-3">
          <HomeDesign />
        </div>
        <div className="py-20 px-20 md:px-10 lg:px-16 w-3/4 mt-20 col-span-2 xl:px-2   items-center justify-center ">
          <div className="space-y-8 container items-center">
            <div>
              {/* <h1 className="text-5xl text-white font-bold">Legendary Eagle</h1> */}
            </div>
            <div className="shadow-lg  w-full p-8  bg-white rounded-xl">
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
    </div>
  );
}

export default Home;
