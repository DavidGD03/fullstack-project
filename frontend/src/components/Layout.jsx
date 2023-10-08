import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout () {
    return <>
        <header></header>
        <main className="d-flex flex-nowrap vh-100">
            <SideBar></SideBar>
            <Outlet></Outlet>
        </main>
        <footer></footer>
    </>
};