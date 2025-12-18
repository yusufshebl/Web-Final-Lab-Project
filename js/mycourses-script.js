// Course data
const courses = [
     {
          id: 1,
          title: "Learn HTML & CSS",
          category: "Development",
          image: "/images/courses/1.png",
          videos: 5,
          students: "1400+",
          rating: 3.7,
          price: "Free"
     },
     {
          id: 2,
          title: "Learn Javascript",
          category: "Development",
          image: "/images/courses/2.png",
          videos: 4,
          students: "1200+",
          rating: 4.1,
          price: "Free"
     },
     {
          id: 3,
          title: "Modern JavaScript: ES6 and beyond",
          category: "Development",
          image: "/images/courses/4.png",
          videos: 4,
          students: "1650+",
          rating: 4.2,
          price: "Free"
     },
     {
          id: 4,
          title: "Introduction to the Internet of Things",
          category: "IOT",
          image: "/images/courses/3.png",
          videos: 4,
          students: "1100+",
          rating: 3.6,
          price: "Free"
     },
     {
          id: 5,
          title: "Developing Mobile IoT application",
          category: "IOT & Development",
          image: "/images/courses/5.png",
          videos: 4,
          students: "2200+",
          rating: 4.6,
          price: "Free"
     },
     {
          id: 6,
          title: "IoT Applications Development using MasterOfThings",
          category: "Development",
          image: "/images/courses/6.png",
          videos: 4,
          students: "2250+",
          rating: 4.8,
          price: "Free"
     }
];

let userData = null;
let enrolledCourseIds = [];

// Check if user is logged in
window.addEventListener('DOMContentLoaded', function () {
     const savedUserData = localStorage.getItem('userData');

     if (!savedUserData) {
          document.getElementById('loginPrompt').style.display = 'block';
          return;
     }

     userData = JSON.parse(savedUserData);
     document.getElementById('mainContent').style.display = 'block';

     // Load user info
     document.getElementById('userName').textContent = `Welcome, ${userData.firstName} ${userData.lastName}`;
     document.getElementById('userEmail').textContent = userData.email;
     if (userData.image) {
          document.getElementById('userAvatar').src = userData.image;
     }

     // Load enrolled courses from localStorage
     const saved = localStorage.getItem(`enrolledCourses_${userData.id}`);
     enrolledCourseIds = saved ? JSON.parse(saved) : [];

     renderCourses();
});

function renderCourses() {
     const enrolledContainer = document.getElementById('enrolledCourses');
     const availableContainer = document.getElementById('availableCourses');

     enrolledContainer.innerHTML = '';
     availableContainer.innerHTML = '';

     const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
     const availableCourses = courses.filter(c => !enrolledCourseIds.includes(c.id));

     // Update count
     document.getElementById('enrolledCount').textContent = enrolledCourses.length;

     // Render enrolled courses
     if (enrolledCourses.length === 0) {
          enrolledContainer.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <i class="fas fa-book-open"></i>
                        <h3>No Enrolled Courses Yet</h3>
                        <p>Start learning by enrolling in courses below!</p>
                    </div>
                `;
     } else {
          enrolledCourses.forEach(course => {
               enrolledContainer.innerHTML += createCourseCard(course, true);
          });
     }

     // Render available courses
     if (availableCourses.length === 0) {
          availableContainer.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <i class="fas fa-check-circle"></i>
                        <h3>All Courses Enrolled!</h3>
                        <p>You've enrolled in all available courses.</p>
                    </div>
                `;
     } else {
          availableCourses.forEach(course => {
               availableContainer.innerHTML += createCourseCard(course, false);
          });
     }
}

function createCourseCard(course, isEnrolled) {
     return `
                <div class="course-card">
                    <img src="${course.image}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Course+Image'">
                    <span class="course-category">${course.category}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-info">
                        <span><i class="fas fa-video"></i> ${course.videos} Videos</span>
                        <span><i class="fas fa-users"></i> ${course.students} Students</span>
                    </div>
                    <div class="course-footer">
                        <span class="course-rating">${course.rating} <i class="fas fa-star"></i></span>
                        <span class="course-price">${course.price}</span>
                    </div>
                    ${isEnrolled ?
               `<button class="btn enroll-btn enrolled" onclick="window.location.href='course-viewer.html?id=${course.id}'" style="background: #28a745;">
        <i class="fas fa-play"></i> Start Learning
    </button>
    <button class="btn enroll-btn" onclick="unenrollCourse(${course.id})" style="background: #dc3545; margin-top: 8px;">
        <i class="fas fa-times"></i> Remove Course
    </button>` :
               `<button class="btn enroll-btn" onclick="enrollCourse(${course.id})">
        <i class="fas fa-plus"></i> Enroll Now
    </button>`
          }
                </div>
            `;
}

function enrollCourse(courseId) {
     enrolledCourseIds.push(courseId);
     localStorage.setItem(`enrolledCourses_${userData.id}`, JSON.stringify(enrolledCourseIds));

     const course = courses.find(c => c.id === courseId);
     showMessage(`Successfully enrolled in "${course.title}"!`, 'success');
     renderCourses();
}

function unenrollCourse(courseId) {
     enrolledCourseIds = enrolledCourseIds.filter(id => id !== courseId);
     localStorage.setItem(`enrolledCourses_${userData.id}`, JSON.stringify(enrolledCourseIds));

     const course = courses.find(c => c.id === courseId);
     showMessage(`Removed "${course.title}" from your courses.`, 'info');
     renderCourses();
}

function showMessage(text, type) {
     const container = document.getElementById('messageContainer');
     container.innerHTML = `<div class="message ${type}">${text}</div>`;
     setTimeout(() => {
          container.innerHTML = '';
     }, 3000);
}

function logout() {
     localStorage.removeItem('userData');
     localStorage.removeItem('authToken');
     window.location.href = 'login.html';
}
