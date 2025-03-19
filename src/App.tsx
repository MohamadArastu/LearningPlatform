import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import Login from "../src/components/Login";
import HomePage from "../src/components/HomePage";
import CourseForm from "../src/components/CourseForm";
import AdminPanel from "../src/components/AdminPanel";
import CourseDetails from "../src/components/CourseDetails";
import ProtectedRoute from "../src/components/ProtectedRoute";

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
