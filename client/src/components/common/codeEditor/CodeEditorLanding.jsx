import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { languageOptions } from "../../../constants/languageOptions";
import { classnames } from "../../../utils/general";
import CodeEditorWindow from "./CodeEditorWindow";
import { defineTheme } from "../../../lib/defineTheme";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import { ExerciseDetail } from "../exerciseDetail/ExerciseDetail";
import { useSelector } from "react-redux";
import { postDataAPI } from "../../../utils/fetchData";

const javascriptDefault = `console.log('Hello, World!')
`;

const template_result = `
additional_files: null
callback_url: null
command_line_arguments: null
compile_output: null
compiler_options: null
cpu_extra_time: "1.0"
cpu_time_limit: "5.0"
created_at: "2024-05-13T09:00:38.967Z"
enable_network: false
enable_per_process_and_thread_memory_limit: false
enable_per_process_and_thread_time_limit: false
exit_code: 0
exit_signal: null
expected_output: "5"
finished_at: "2024-05-13T09:00:39.201Z"
language: 
{id: 71, name: 'Python (3.8.1)'}
language_id: 71
max_file_size: 1024
max_processes_and_or_threads: 60
memory: 3164
memory_limit: 128000
message: null
number_of_runs: 1
redirect_stderr_to_stdout: false
source_code: "a = int(input())\nb = int(input())\n\nprint(a+b)"
stack_limit: 64000
status: {id: 3, description: 'Accepted'}
status_id: 3
stderr: null
stdin: "2\n3"
stdout: "5\n"
time: "0.007"
token: "5458eb8d-d658-4c45-987c-879baae6a82d"
wall_time: "0.007"
wall_time_limit: "10.0
`;

const CodeEditorLanding = ({ exercise }) => {
  const { auth } = useSelector(state => state);
  const [code, setCode] = useState(javascriptDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const user = auth.user;
  const token = auth.token;

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };


  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
      }
    }
  };
  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      code: code,
      user: user,
      exercise: exercise
    }
    const response = await postDataAPI('code-exercises/compile', formData, token)
    setOutputDetails(response.data.codeSubmission)
    showSuccessToast('score: ' + response.data.codeSubmission.score)
    setProcessing(false);
  }
  function handleThemeChange(th) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh] justify-start">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row w-[98%] h-[90%] pt-4 pl-3">

        <div className="left-editor flex flex-row flex-grow flex-shrink-0 items-start">
          <div className="flex flex-col w-full h-full justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>
        </div>
        <div className="right-container w-[400px] flex flex-shrink-0 flex-col ml-4">
          <div className="flex pb-1 flex-row justify-center w-full">
            <div className="pr-4">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div>
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
          </div>
          <div className="w-full h-[60%] py-3 overflow-y-auto overflow-hidden">
            <ExerciseDetail exercise={exercise} />
          </div>
          <div className="flex flex-col overflow-y-auto h-[40%]">
            <div className="h-[70%]">
              <OutputWindow outputDetails={outputDetails} />
            </div>
            <div className="flex flex-col items-end">
              <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "mt-4 mb-1 border-2 border-black z-10 rounded-md shadow-[0px_3px_3px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                {processing ? "Processing..." : "Compile and Execute"}
              </button>
            </div>
            {outputDetails && <OutputDetails outputDetails={outputDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodeEditorLanding;