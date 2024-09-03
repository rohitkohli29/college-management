import { useEffect, useState } from 'react'
import { courseType } from '../redux/slices/coursesReducer'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEnroll } from '../context/EnrollModalProvider';

const CourseDetails = () => {
  const [course, setCourse] = useState<courseType | null>(null);
  const { courses } = useSelector((state: RootState) => state.courses);
  const { name, id } = useParams();
  const navigate = useNavigate();
  const { showModal ,changeSelectedCourse} = useEnroll();

  useEffect(() => {
    if (!name || !id) {
      navigate('/');
      return;
    }

    if (courses) {
      const newCourse = courses.filter((course: courseType) => course.id == parseInt(id));
      setCourse(newCourse[0]);
    }

  }, [name, id, courses])

  return course && (
    <div className="sm:p-6 p-3 bg-gray-100 min-h-screen  w-auto ">
      <div className="sm:w-4/5 w-full mx-auto bg-white overflow-hidden shadow-lg rounded-lg">
        <img
          className="w-full h-96 object-fill"
          src={course.thumbnail}
          alt={course.name}
        />
      </div>
      <div className="sm:w-4/5 w-full h-full mx-auto shadow-lg rounded-lg">
        <div className='flex w-full justify-between p-2'>
          <div className='flex-1'>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 capitalize">{course.name}</h1>
            <p className="text-gray-600 text-base mb-4">{course.description}</p>
            <div className="mb-4 flex gap-x-4">
              <span className="font-semibold text-base text-gray-700">Instructor:</span>
              <p className="text-red-500 text-base">{course.instructor}</p>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Duration:</span>
              <p className="text-gray-800">{course.duration}</p>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Schedule:</span>
              <p className="text-gray-800">{course.schedule}</p>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-700">Location:</span>
              <p className="text-gray-800">{course.location}</p>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Prerequisites:</span>
              <ul className="list-disc ml-5 text-gray-800">
                {course.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Syllabus:</span>
              <div className="mt-2">
                {course.syllabus.map((item, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">Week {item.week}: {item.topic}</h3>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Students:</span>
              <ul className="list-disc ml-5 text-gray-800">
                {course.students.map((student, index) => (
                  <li key={index} className="mb-2">
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-gray-700">{student.email}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* enroll button */}
          <div className='sticky shrink-0 top-3 flex-1 h-96 border rounded flex border-gray-500 items-center justify-center'>
            <button onClick={() => {
              changeSelectedCourse({
                courseName: course.name,
                courseMentor: course.instructor,
                courseId: course.id,
                courseImage: course.thumbnail,
                enrollmentDate: Date.now(),
                completionStatus: {}
              })

              showModal();
            }} className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors duration-300">Enroll now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails