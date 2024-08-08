"use client";
import axios from "axios";
import React, { useState } from "react";
import { NavBar } from "../components/navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FacebookPreview from "./components/facebook-preview";
import TwitterPreview from "./components/twitter-preview";
import LinkedinPreview from "./components/linkedin-preview";
import PintrestPreview from "./components/pintrest-preview";

const Page = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const get_metadata = async (url) => {
    try {
      const metadat_res = await axios.request({
        method: "GET",
        url: "/api/get-meta-tags",
        params: {
          url,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      const metadata = metadat_res.data;
      return [metadata, null];
    } catch (error) {
      return [null, error];
    }
  };
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  return (
    <main
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"
      }min-w-80 `}
    >
      <NavBar
        title={"Check your social media share previews"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <section className="flex flex-col gap-10 items-center justify-center h-screen">
        <h1 className="relative p-2 z-10 font-sans text-xl sm:text-4xl font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
          Check your social media share previews
        </h1>

        <div
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-400"
              : "bg-slate-100 text-gray-500"
          } p-10 w-full max-w-5xl rounded-lg shadow-md overflow-y-scroll max-h-96`}
        >
          <label htmlFor="cupcakes">Website Url:</label>
       
          <div className="flex gap-2 ">
            <input
              type="text"
              id="cupcakes"
      
              
              className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
             <div className="inline-flex rounded-md shadow-sm" role="group">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:outline-none">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Generate
              </span>
            </button>
          </div>
          </div>
          
         
        </div>

        <Tabs
          className={`${
            isDarkMode
              ? "bg-gray-700 text-gray-400"
              : "bg-slate-100 text-gray-500"
          } p-10 w-full max-w-5xl rounded-lg shadow-md overflow-y-scroll max-h-96`}
        >
          <TabList>
            <Tab>Facebook</Tab>
            <Tab>Twitter/X</Tab>
            <Tab>LinkedIn</Tab>
            <Tab>Pinterest</Tab>
          </TabList>

          <TabPanel>
            <FacebookPreview />
          </TabPanel>
          <TabPanel>
            <TwitterPreview />
          </TabPanel>
          <TabPanel>
            <LinkedinPreview />
          </TabPanel>
          <TabPanel>
            <PintrestPreview />
          </TabPanel>
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
