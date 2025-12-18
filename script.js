// Script File

// Home Section Starts
var menuBtn = document.querySelector('.main-navbar .menu-btn');
var menuList = document.querySelector('.main-navbar .nav-list');
var menuListItems = document.querySelectorAll('.nav-list li a');

menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menuList.classList.toggle('active');
});

for (var i = 0; i < menuListItems.length; i++) {
    menuListItems[i].addEventListener('click', menuItemClicked);
}
function menuItemClicked() {
    menuBtn.classList.remove('active');
    menuList.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', pageScrollFunction);
window.addEventListener('load', pageScrollFunction);

function pageScrollFunction() {
    if (window.scrollY > 120) {
        homeSection.classList.add('active');
    }
    else {
        homeSection.classList.remove('active');
    }
}
// Home Section Ends

// Partners Section Starts 
$('.partners-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 10,
    nav: true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>"],
    responsive: {
        0: {
            items: 1
        },
        500: {
            items: 2
        },
        700: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})
// Partners Section Ends 


// Testimonials Section Starts
$('.testimonials-slider').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    margin: 10,
    nav: true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>",
        "<i class='fa-solid fa-arrow-right'></i>"],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
})
// Testimonials Section Ends


// Enroll Button Functionality Starts
document.addEventListener('DOMContentLoaded', function () {
    const courseCards = document.querySelectorAll('.course-card');
    const courseIds = [1, 2, 3, 4, 5, 6];
    const userData = localStorage.getItem('userData');

    courseCards.forEach((card, index) => {
        const courseId = courseIds[index];
        let isEnrolled = false;

        if (userData) {
            const user = JSON.parse(userData);
            const enrolled = JSON.parse(localStorage.getItem(`enrolledCourses_${user.id}`) || '[]');
            isEnrolled = enrolled.includes(courseId);
        }

        const btnContainer = document.createElement('div');
        btnContainer.style.width = '100%';
        btnContainer.style.marginTop = '10px';

        if (isEnrolled) {
            // Start Learning Button
            const startBtn = document.createElement('button');
            startBtn.className = 'btn enroll-btn-custom';
            startBtn.style.width = '100%';
            startBtn.style.padding = '12px';
            startBtn.style.fontSize = '16px';
            startBtn.style.background = '#28a745';
            startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Learning';
            startBtn.onclick = function () {
                window.location.href = `/html/course-viewer.html?id=${courseId}`;
            };

            // Remove Button
            const removeBtn = document.createElement('button');
            removeBtn.className = 'btn enroll-btn-custom';
            removeBtn.style.width = '100%';
            removeBtn.style.padding = '12px';
            removeBtn.style.fontSize = '16px';
            removeBtn.style.marginTop = '8px';
            removeBtn.style.background = '#dc3545';
            removeBtn.innerHTML = '<i class="fa-solid fa-times"></i> Remove Course';
            removeBtn.onclick = function () {
                const user = JSON.parse(userData);
                let enrolled = JSON.parse(localStorage.getItem(`enrolledCourses_${user.id}`) || '[]');
                enrolled = enrolled.filter(id => id !== courseId);
                localStorage.setItem(`enrolledCourses_${user.id}`, JSON.stringify(enrolled));
                alert('ℹ️ Course removed from your list!');
                location.reload();
            };

            btnContainer.appendChild(startBtn);
            btnContainer.appendChild(removeBtn);
        } else {
            // Enroll Button
            const enrollBtn = document.createElement('button');
            enrollBtn.className = 'btn enroll-btn-custom';
            enrollBtn.style.width = '100%';
            enrollBtn.style.padding = '12px';
            enrollBtn.style.fontSize = '16px';
            enrollBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Enroll Now';

            enrollBtn.onclick = function () {
                if (!userData) {
                    alert('⚠️ Please login first to enroll in courses!');
                    window.location.href = '/html/login.html';
                    return;
                }

                const user = JSON.parse(userData);
                let enrolled = JSON.parse(localStorage.getItem(`enrolledCourses_${user.id}`) || '[]');

                if (!enrolled.includes(courseId)) {
                    enrolled.push(courseId);
                    localStorage.setItem(`enrolledCourses_${user.id}`, JSON.stringify(enrolled));
                    alert('✅ Successfully enrolled in this course!');
                    location.reload();
                }
            };

            btnContainer.appendChild(enrollBtn);
        }

        card.querySelector('.course-ratings').insertAdjacentElement('afterend', btnContainer);
    });
});
// Enroll Button Functionality Ends