import React from "react";

const Ranking = ({ submissions }) => {
    // Mô phỏng dữ liệu ranking
    // let rankings = [
    //     { user: { userName: "User1" }, score: 100 },
    //     { user: { userName: "User2" }, score: 90 },
    //     { user: { userName: "User3" }, score: 80 },
    //     { user: { userName: "User4" }, score: 70 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 },
    //     { user: { userName: "User5" }, score: 60 }
    // ];

    let rankings = submissions;
    rankings = rankings.sort((a, b) => b.score - a.score).slice(0, 8);
    return (
        <div className="w-full h-auto bg-sky-500/10 px-4 py-2 rounded-lg shadow-md" >
            <h2 className="text-xl font-bold mb-4" > Ranking </h2>
            < ul className="w-full" >
                {
                    rankings && rankings.map((item, index) => (
                        <li key={index} className="flex justify-between mb-2" >
                            <div className="w-full h-auto border shadow-md px-4 flex flex-row">
                                <div className="flex h-auto py-2 w-[70%] justify-start">{index + 1}. {item.user.fullName} </div>
                                < div className="flex h-auto py-2 w-[30%] border-l-2 justify-center"> {item.score} </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Ranking;
