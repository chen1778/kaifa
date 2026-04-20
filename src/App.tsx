import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import LessonDetail from './pages/LessonDetail';
import Practice from './pages/Practice';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import ResourceShare from './pages/ResourceShare';
import PythonEditor from './pages/PythonEditor';
import TestEditor from './pages/TestEditor';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const App: React.FC = () => {
  const { loadUser } = useStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/lessons/:lessonId" element={<LessonDetail />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/resources" element={<ResourceShare />} />
            <Route path="/python-editor" element={<PythonEditor />} />
            <Route path="/test-editor" element={<TestEditor />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;