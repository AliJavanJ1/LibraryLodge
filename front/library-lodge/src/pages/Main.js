import {Fragment} from "react";
import Header from "./Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";


export default function Main() {
    const isLoggedIn = useSelector((state) => state.profile || true); // TODO: remove " || true"
    return isLoggedIn
        ? (<Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<div> Home </div>}/>
            </Routes>
        </Fragment>)
        : <Navigate to="/login"/>;
}