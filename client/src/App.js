import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from './Components/Home';
import Student from './Components/Student';
import Courses from './Components/Courses';
import Faculty from './Components/Faculty';

import AddFaculty from './Components/AddFaculty';
import ViewFaculty from './Components/ViewFaculty';
import UpdateFaculty from './Components/UpdateFaculty';
import DeleteFaculty from './Components/DeleteFaculty';


function App() {	
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/courses" element={<Courses />} />
				<Route path="/faculty" element={<Faculty />} >
					<Route path="addfaculty" element={<AddFaculty/>} />
					<Route path="viewfaculty" element={<ViewFaculty/>} />
					<Route path="updatefaculty" element={<UpdateFaculty/>} />
					<Route path="deletefaculty" element={<DeleteFaculty/>} />
				</Route>
				<Route path="/student" element={<Student />} />
			</Routes>
		</div>
	);
}

export default App;
