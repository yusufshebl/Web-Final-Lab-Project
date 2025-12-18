
// Course data with lessons
const coursesData = {
    1: {
        title: "Learn HTML & CSS",
        instructor: "John Smith",
        lessons: [
            { id: 1, title: "Introduction to HTML", duration: "15:30", video: "https://www.youtube.com/embed/qz0aGYrrlhU", description: "Learn the basics of HTML and how to structure web pages." },
            { id: 2, title: "HTML Elements and Tags", duration: "20:45", video: "https://www.youtube.com/embed/salY_Sm6mv4", description: "Explore different HTML elements and how to use them effectively." },
            { id: 3, title: "CSS Basics", duration: "18:20", video: "https://www.youtube.com/embed/1PnVor36_40", description: "Introduction to CSS styling and selectors." },
            { id: 4, title: "CSS Box Model", duration: "22:15", video: "https://www.youtube.com/embed/rIO5326FgPE", description: "Understanding margins, padding, borders, and content." },
            { id: 5, title: "Flexbox Layout", duration: "25:40", video: "https://www.youtube.com/embed/JJSoEo8JSnc", description: "Master flexbox for responsive layouts." }
        ]
    },
    2: {
        title: "Learn Javascript",
        instructor: "Sarah Johnson",
        lessons: [
            { id: 1, title: "JavaScript Introduction", duration: "12:30", video: "https://www.youtube.com/embed/W6NZfCO5SIk", description: "Get started with JavaScript programming." },
            { id: 2, title: "Variables and Data Types", duration: "18:45", video: "https://www.youtube.com/embed/edlFjlzxkSI", description: "Learn about variables, strings, numbers, and more." },
            { id: 3, title: "Functions in JavaScript", duration: "20:30", video: "https://www.youtube.com/embed/N8ap4k_1QEQ", description: "Understanding functions and their importance." },
            { id: 4, title: "DOM Manipulation", duration: "25:15", video: "https://www.youtube.com/embed/0ik6X4DJKCc", description: "Learn how to interact with web pages using JavaScript." }
        ]
    },
    3: {
        title: "Modern JavaScript: ES6 and beyond",
        instructor: "Mike Davis",
        lessons: [
            { id: 1, title: "ES6 Features Overview", duration: "16:40", video: "https://www.youtube.com/embed/NCwa_xi0Uuc", description: "Overview of modern JavaScript features." },
            { id: 2, title: "Arrow Functions", duration: "14:20", video: "https://www.youtube.com/embed/h33Srr5J9nY", description: "Learn the new arrow function syntax." },
            { id: 3, title: "Promises and Async/Await", duration: "28:30", video: "https://www.youtube.com/embed/V_Kr9OSfDeU", description: "Master asynchronous JavaScript programming." },
            { id: 4, title: "Modules and Imports", duration: "19:45", video: "https://www.youtube.com/embed/cRHQNNcYf6s", description: "Understanding ES6 modules system." }
        ]
    },
    4: {
        title: "Introduction to the Internet of Things",
        instructor: "Dr. Emily Brown",
        lessons: [
            { id: 1, title: "What is IoT?", duration: "10:30", video: "https://www.youtube.com/embed/LlhmzVL5bm8", description: "Introduction to Internet of Things concepts." },
            { id: 2, title: "IoT Architecture", duration: "15:45", video: "https://www.youtube.com/embed/h0gWfVCSGQQ", description: "Understanding IoT system architecture." },
            { id: 3, title: "IoT Sensors and Devices", duration: "18:20", video: "https://www.youtube.com/embed/PVSJWXGHzzY", description: "Learn about different IoT sensors and devices." },
            { id: 4, title: "IoT Applications", duration: "20:15", video: "https://www.youtube.com/embed/RGiyIXwgWYw", description: "Real-world IoT applications and use cases." }
        ]
    },
    5: {
        title: "Developing Mobile IoT application",
        instructor: "Alex Turner",
        lessons: [
            { id: 1, title: "Mobile IoT Overview", duration: "14:30", video: "https://www.youtube.com/embed/LlhmzVL5bm8", description: "Introduction to mobile IoT development." },
            { id: 2, title: "Setting Up Development Environment", duration: "22:45", video: "https://www.youtube.com/embed/0fYi8SGA20k", description: "Configure your development tools." },
            { id: 3, title: "Bluetooth Integration", duration: "26:30", video: "https://www.youtube.com/embed/JLc-hWsPTUY", description: "Connect mobile apps to IoT devices via Bluetooth." },
            { id: 4, title: "GPS and Location Services", duration: "24:15", video: "https://www.youtube.com/embed/ZZZd0c_J58c", description: "Implement location-based IoT features." }
        ]
    },
    6: {
        title: "IoT Applications Development using MasterOfThings",
        instructor: "Dr. Robert Lee",
        lessons: [
            { id: 1, title: "MasterOfThings Platform Introduction", duration: "12:30", video: "https://www.youtube.com/embed/LlhmzVL5bm8", description: "Get started with MasterOfThings platform." },
            { id: 2, title: "Creating Your First IoT Project", duration: "25:45", video: "https://www.youtube.com/embed/h0gWfVCSGQQ", description: "Build your first IoT application." },
            { id: 3, title: "Device Communication", duration: "28:30", video: "https://www.youtube.com/embed/PVSJWXGHzzY", description: "Learn device-to-device communication." },
            { id: 4, title: "Data Analytics and Visualization", duration: "30:15", video: "https://www.youtube.com/embed/RGiyIXwgWYw", description: "Analyze and visualize IoT data." }
        ]
    }
};

let currentCourseId = null;
let currentLessonIndex = 0;
let completedLessons = [];

// Initialize
window.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    currentCourseId = urlParams.get('id');

    if (!currentCourseId || !coursesData[currentCourseId]) {
        alert('Course not found!');
        window.location.href = 'my-courses.html';
        return;
    }

    loadCourse();
    loadProgress();
});

function loadCourse() {
    const course = coursesData[currentCourseId];
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('totalLessons').textContent = course.lessons.length;

    renderLessons();
    updateProgress();
}

function renderLessons() {
    const course = coursesData[currentCourseId];
    const lessonsList = document.getElementById('lessonsList');

    lessonsList.innerHTML = course.lessons.map((lesson, index) => `
                <div class="lesson-item ${index === currentLessonIndex ? 'active' : ''} ${completedLessons.includes(lesson.id) ? 'completed' : ''}" 
                     onclick="selectLesson(${index})">
                    <div class="lesson-number">${index + 1}</div>
                    <div class="lesson-info">
                        <div class="lesson-title">${lesson.title}</div>
                        <div class="lesson-duration">
                            <i class="fas fa-clock"></i> ${lesson.duration}
                        </div>
                    </div>
                    ${completedLessons.includes(lesson.id) ? '<i class="fas fa-check-circle lesson-status"></i>' : ''}
                </div>
            `).join('');
}

function selectLesson(index) {
    currentLessonIndex = index;
    renderLessons();
    displayLesson();
}

function displayLesson() {
    const course = coursesData[currentCourseId];
    const lesson = course.lessons[currentLessonIndex];

    // Update video
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.innerHTML = `
                <iframe width="100%" height="100%" 
                    src="${lesson.video}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;

    // Update lesson details
    const lessonDetails = document.getElementById('lessonDetails');
    const isCompleted = completedLessons.includes(lesson.id);

    lessonDetails.innerHTML = `
                <h1>${lesson.title}</h1>
                ${isCompleted ? '<span class="completion-badge"><i class="fas fa-check"></i> Completed</span>' : ''}
                
                <div class="lesson-meta">
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>Instructor: ${course.instructor}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${lesson.duration}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-list"></i>
                        <span>Lesson ${currentLessonIndex + 1} of ${course.lessons.length}</span>
                    </div>
                </div>

                <div class="lesson-description">
                    <h3 style="color: #208245; margin-bottom: 10px;">About this lesson</h3>
                    <p>${lesson.description}</p>
                </div>

                <div class="lesson-resources">
                    <h3><i class="fas fa-download"></i> Resources</h3>
                    <div class="resource-item">
                        <i class="fas fa-file-pdf"></i>
                        <span>Lesson Notes.pdf</span>
                    </div>
                    <div class="resource-item">
                        <i class="fas fa-code"></i>
                        <span>Code Examples.zip</span>
                    </div>
                </div>

                <div class="navigation-buttons">
                    <button class="btn btn-secondary" onclick="previousLesson()" ${currentLessonIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i> Previous Lesson
                    </button>
                    
                    ${!isCompleted ? `
                        <button class="btn btn-success" onclick="markComplete()">
                            <i class="fas fa-check"></i> Mark as Complete
                        </button>
                    ` : ''}
                    
                    <button class="btn btn-primary" onclick="nextLesson()" ${currentLessonIndex === course.lessons.length - 1 ? 'disabled' : ''}>
                        Next Lesson <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
}

function previousLesson() {
    if (currentLessonIndex > 0) {
        currentLessonIndex--;
        renderLessons();
        displayLesson();
        window.scrollTo(0, 0);
    }
}

function nextLesson() {
    const course = coursesData[currentCourseId];
    if (currentLessonIndex < course.lessons.length - 1) {
        currentLessonIndex++;
        renderLessons();
        displayLesson();
        window.scrollTo(0, 0);
    }
}

function markComplete() {
    const course = coursesData[currentCourseId];
    const lesson = course.lessons[currentLessonIndex];

    if (!completedLessons.includes(lesson.id)) {
        completedLessons.push(lesson.id);
        saveProgress();
        updateProgress();
        renderLessons();
        displayLesson();
    }
}

function updateProgress() {
    const course = coursesData[currentCourseId];
    const completed = completedLessons.length;
    const total = course.lessons.length;
    const percentage = Math.round((completed / total) * 100);

    document.getElementById('completedCount').textContent = completed;
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = percentage + '% Complete';
}

function saveProgress() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        localStorage.setItem(`courseProgress_${userData.id}_${currentCourseId}`, JSON.stringify(completedLessons));
    }
}

function loadProgress() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const saved = localStorage.getItem(`courseProgress_${userData.id}_${currentCourseId}`);
        completedLessons = saved ? JSON.parse(saved) : [];
    }
}

// Toggle sidebar
document.getElementById('toggleSidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
});
