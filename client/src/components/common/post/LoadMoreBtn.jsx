import React from "react";

const LoadMoreBtn = ({ result, page, load, handleLoadMore}) => {
    return (
        <>
            {result < 9 * (page -1) ? "" : !load && (
                <button
                onClick={handleLoadMore}>
                    Load more.
                </button>
            )}
        </>
    )
}

export default LoadMoreBtn