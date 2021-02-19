import CreateWorkspace from "./CreateWorkspace.js";
import { useHistory } from "react-router-dom";
import HomePageContent from "./HomePageContent";

function Home(props) {
  const history = useHistory();
  return (
    <div class="h-screen overflow-auto bg-gray-100 items-center justify-center">
      <div class="lg:grid lg:grid-cols-5">
        <div class="lg:col-span-3 text-center">
          <HomePageContent />
        </div>
        <div className="lg:py-20 lg:px-20 md:px-10 lg:px-16 lg:w-3/4 lg:mt-20 lg:col-span-2 xl:px-2 items-center justify-center ">
          <div className="lg:space-y-8 container text-center items-center">
            <div className="shadow-lg m-4 p-6 lg:w-full  lg:p-8 p-4 bg-white rounded-xl">
              <CreateWorkspace history={history} />
            </div>
            <p className="lg:text-center sm:px-4 sm:text-xs text-sm my-4">
              <span className="font-semibold text-black text-center w-full">
                Made with{" "}
                <span className="text-red-500 sm:text-xs   lg:text-xl">♥</span>
                &nbsp;by @tanayvk, @amritj7 and @aryansj.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
