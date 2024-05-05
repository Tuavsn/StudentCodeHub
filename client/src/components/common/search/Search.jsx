import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataAPI } from "../../../utils/fetchData";

const Search = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [userSearchResult, setUserSearchResult] = useState([])
    const [suggestionUsers, setSuggestionUsers] = useState([])

    const handleInputChange = (e) => {
        const input = e.target.value
        setSearch(input)
    }

    const handleSearch = () => {
        if(search !== '') {
            handleSearchUser(search)
        } else {
            setUserSearchResult([])
        }
    }

    const handleSearchUser = async(userFullName) => {
        const res = await getDataAPI(`user/search/${userFullName}`, auth.token)
        setUserSearchResult(res.data)
    }

    const getSuggestionUsers = async() => {
        if(suggestionUsers.length > 0) return
        const res = await getDataAPI(`user/suggestion`, auth.token)
        setSuggestionUsers(res.data)
    }

    useEffect(() => {
        getSuggestionUsers()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [search])

    return (
        <div style={{flexGrow: 1, overflowY: 'scroll', scrollbarWidth: 'thin', msOverflowStyle: 'thin'}}>
            <div className="d-flex gap-2" style={{width: "60%", margin: "1rem auto"}}>
                <div className="form-outline flex-grow-1" data-mdb-input-init>
                    <input type="search" id="form1" className="form-control" placeholder="Tìm kiếm tài khoản" onChange={(e) => handleInputChange(e)}/>
                </div>
            </div>

            <div className="p-4 d-flex flex-column gap-5" style={{width: "100%"}}>
                <div className="">
                    <h5><i className="fa-solid fa-magnifying-glass"></i> Tài khoản</h5>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Avatar</th>
                            <th scope="col">Tên người dùng</th>
                            <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userSearchResult.length > 0 && userSearchResult.map((user, index) => (
                                <tr key={index} style={{cursor: "pointer"}} onClick={() => navigate(`user/${user.id}`)}>
                                    <td><img src={user.avatar} style={{width: "3rem", height: "3rem", borderRadius: "10%", objectFit: "cover"}} /></td>
                                    <td>{user.fullName}</td>
                                    <td>{user.role.toLowerCase()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-4 d-flex flex-column gap-5" style={{width: "100%"}}>
                <div className="">
                    <h5><i className="fa-solid fa-user-plus"></i> Gợi ý</h5>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Avatar</th>
                            <th scope="col">Tên người dùng</th>
                            <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestionUsers.length > 0 && suggestionUsers.map((user, index) => (
                                <tr key={index} style={{cursor: "pointer"}} onClick={() => navigate(`user/${user.id}`)}>
                                    <td><img src={user.avatar} style={{width: "3rem", height: "3rem", borderRadius: "10%", objectFit: "cover"}} /></td>
                                    <td>{user.fullName}</td>
                                    <td>{user.role.toLowerCase()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Search