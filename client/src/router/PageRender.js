import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import NotFound from "../components/common/NotFound"

const generatePage = (pageName) => {
    try {
        let component;
        const pageNames = pageName.split('/')
        const len = pageNames.length
        if (len === 1) {
            component = () => require(`../pages/${pageNames[0]}`).default
            return React.createElement(component())
        }
        if (len === 2) {
            component = () => require(`../pages/${pageNames[0]}`).default
            return React.createElement(component(), { id: pageNames[1] })
        }
        if (len === 3) {
            component = () => require(`../pages/${pageNames[0]}`).default
            return React.createElement(component(), { id: pageNames[1], action: pageNames[2] })
        }
    } catch (err) {
        return <NotFound />
    }
    return <NotFound />
}

const PageRender = () => {
    const { page, id, action } = useParams()
    const { auth } = useSelector((state) => state)

    let pageName = ""
    if (auth.token) {
        if (action) pageName = `${page}/${id}/${action}`
        else if (id) pageName = `${page}/${id}`
        else pageName = `${page}`
    }
    return generatePage(pageName)
}

export default PageRender