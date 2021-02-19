import React from "react";
import ReactDOM from "react-dom";

function HomePageContent() {
  const features = [
    {
      icon: "fa-magic",
      heading: "Instant",
      content: "Get started in seconds. No acccount needed.",
    },
    {
      icon: "fa-share",
      heading: "Shareable",
      content:
        "Share your workspace across multiple devices. Just pass the easy to remember name and passphrase.",
    },
    {
      icon: "fa-shield",
      heading: "Secure",
      content: "Your data is end-to-end encrypted and only you can see it.",
    },
    {
      icon: "fa-trash-o",
      heading: "Disposable",
      content: "Free, without limits. Make as many workspaces as you like.",
    },
  ];
  return (
    <div>
      <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div class="lg:space-y-12  text-left ">
          <h1 class="text-4xl text-center md:text-left mb-4 tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-6xl">
            <span class="block xl:inline">Create&nbsp;</span>
            <span class="block text-indigo-600 xl:inline">Workspaces </span>
            <span class="block xl:inline">in seconds!</span>
          </h1>
          <div class="lg:px-5 px-3 space-y-5 mt-3 text-base text-gray-700 sm:mt-5 sm:text-md sm:max-w-xl md:mt-5 md:text-xl lg:mx-0">
            {features.map((feature) => {
              return (
                <div class="flex flex-row space-x-1">
                  <div>
                    <i class={"fa " + feature.icon}></i>
                  </div>
                  <div class="space-y-1">
                    <p class="font-bold text-2xl text-gray-700">
                      {feature.heading}.
                    </p>
                    <p class="text-gray-500 text-sm">{feature.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
export default HomePageContent;
