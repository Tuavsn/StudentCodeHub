import React from "react";
import { Navigate } from "react-router-dom";
import PageRender from "./PageRender";

const PrivateRouter = ({ path }) => {
    const firstLogin = localStorage.getItem('firstLogin');

    return firstLogin ? <PageRender /> : <Navigate to="/" />;
};

export default PrivateRouter;
