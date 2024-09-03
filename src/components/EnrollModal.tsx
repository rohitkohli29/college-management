import { useState, ChangeEvent, FormEvent } from 'react';
import { useEnroll } from '../context/EnrollModalProvider';
import { addStudentDetails, Course, setEnrollCourse } from '../redux/slices/studentReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface UserDetails {
    id: number;
    name: string;
    email: string;
    username: string
}

const EnrollModal = () => {
    const { isModalVisible, hideModal, selectedCourse } = useEnroll();
    const dispatch = useDispatch();
    const student = useSelector((state: RootState) => state.student.student)
    const [localUserDetails, setLocalUserDetails] = useState({ name: '', email: '', username: '' });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data: UserDetails = {
            id: Date.now(),
            ...localUserDetails,
        }

        localStorage.setItem('student', JSON.stringify(data));
        dispatch(addStudentDetails(data));
    };

    const doEnrollInCourse = () => {
        const enroll_courses: Course[] = JSON.parse(localStorage.getItem('enroll_courses')!);

        if(!enroll_courses){
            localStorage.setItem('enroll_courses',JSON.stringify([selectedCourse!]))
        }else{
            const course = enroll_courses.filter((course) => course.courseId == selectedCourse?.courseId);
            if(course.length != 0){
                alert('Already Enrolled !');
                hideModal();
                return;
            }
            localStorage.setItem('enroll_courses',JSON.stringify([...enroll_courses,selectedCourse!]));
        }

        dispatch(setEnrollCourse(selectedCourse!));
        hideModal();
    }

    if (!isModalVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            {
                !student ? (
                    <div className="w-96 h-auto bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Enroll in Course</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={localUserDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={localUserDetails.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="username"
                                    name="username"
                                    value={localUserDetails.username}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Enroll
                            </button>
                            <button
                                type="button"
                                onClick={hideModal}
                                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="w-96 h-auto bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            {selectedCourse?.courseImage && (
                                <img
                                    src={selectedCourse?.courseImage}
                                    alt={selectedCourse?.courseName}
                                    className="w-full h-40 object-cover rounded"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <p><strong>Course ID:</strong> {selectedCourse?.courseId}</p>
                            <p><strong>Course Name:</strong> {selectedCourse?.courseName}</p>
                            <p><strong>Course Mentor:</strong> {selectedCourse?.courseMentor}</p>
                            <p><strong>Enrollment Date:</strong> {selectedCourse?.enrollmentDate}</p>
                        </div>
                        <button onClick={doEnrollInCourse} className="px-4 py-2 bg-blue-500 text-white rounded">
                            Click To Enroll
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default EnrollModal;
