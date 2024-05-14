import React from "react";

const OutputWindow = ({ outputDetails }) => {

  let submission = outputDetails;
  if (submission) {
    submission.result = JSON.parse(submission.result);
  }

  return (
    <div className="w-full h-full">
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-[80%] bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {submission?.score ?
          <p className="text-sm">
            Score: {submission?.score}
          </p>
          : <></>}
        {submission?.result ? (
          <p className="text-sm">
            {console.log(submission.result)}
            Result: <br />
            {submission.result.map((result, index) => {
              return (
                <>
                  <div key={index} className="flex flex-row font-semibold px-2 py-1">
                    <div className="w-[50%] text-left">{"Testcase " + index + ":"}</div>
                    <div className="w-[50%] text-right">{result.status.description}</div>
                  </div >
                  <br />
                </>
              );
            })
            }
          </p>
        ) : <></>
        }
      </div>
    </div >
  );
};

export default OutputWindow;
