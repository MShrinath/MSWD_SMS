import React from "react";
import { Link, Outlet } from "react-router-dom";

function Faculty() {
    return (
        <>
            <div>
                <h2 align='center'>Faculty Module</h2>
                <nav style={{textAlign:"center"}}>
                    <Link to='addfaculty'>Add Faculty</Link>
                    <Link to='viewfaculty'>View Faculty</Link>
                    <Link to='updatefaculty'>Update Faculty</Link>
                    <Link to='deletefaculty'>Delete Faculty</Link>
                </nav>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Faculty;