import { useEnroll } from '../../context/EnrollModalProvider';
import { useAppSelector } from '../../redux/hooks';
import { Course } from '../../redux/slices/studentReducer';

const Dashboard = () => {
    const student = useAppSelector(state => state.student.student);
    const { showModal } = useEnroll();

    if (!student) {
        return (
            <div className='flex items-center flex-col gap-y-3 justify-center w-full h-screen text-base'>
                <p>Student's data not found.</p>
                <button onClick={showModal} className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300">Register</button>
            </div>
        )
    }

    const {
        name,
        email,
        username,
        enrolledCourses
    } = student;

    return (
        <div className='w-full h-full bg-slate-50 p-3'>
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
                <h1 className="text-2xl font-bold mb-4">{name}'s Dashboard</h1>
                <p className="text-gray-600 mb-2">Email: {email}</p>
                <p className="text-gray-600 mb-4">Username: {username}</p>

                <h2 className="text-xl font-semibold mb-2">Enrolled Courses:</h2>
                {enrolledCourses ? (
                    <div className="space-y-4">
                        {enrolledCourses.map((course: Course) => (
                            <div key={course.courseId} className="p-4 border rounded-lg bg-gray-50">
                                <div className="flex items-center space-x-4 mb-4">
                                    {course.courseImage && (
                                        <img
                                            className="w-24 h-24 object-fill rounded-lg"
                                            src={course.courseImage}
                                            alt={course.courseName}
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold">{course.courseName}</h3>
                                        <p className="text-gray-600">Mentor: {course.courseMentor}</p>
                                        <p className="text-gray-600">Enrollment Date: {course.enrollmentDate}</p>
                                    </div>
                                </div>
                                <div className='flex gap-x-2 items-center'>
                                    <h4 className="text-md font-semibold">Completion Status:</h4>
                                    <select className="form-select border rounded-md">
                                        <option value="in-progress" selected>In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                    <div className='flex items-center justify-center w-full h-screen text-base'><span className='underline font-medium'>{student.name}</span>, You did't enroll in any course.</div>
                }
            </div>
        </div>
    )
};

export default Dashboard;