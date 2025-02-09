import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import Login from "../components/Login";
import HomePage from "../components/HomePage";
import CourseForm from "../components/CourseForm";
import AdminPanel from "../components/AdminPanel";
import CourseDetails from "../components/CourseDetails";
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Container maxW={"container.lg"} py={10}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-course" element={<CourseForm />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/edit-course/:id" element={<CourseForm />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
