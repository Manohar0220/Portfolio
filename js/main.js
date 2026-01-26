// // ===== DOM ELEMENTS =====
// const header = document.querySelector('.header');
// const menuToggle = document.querySelector('.menu-toggle');
// const navMenu = document.querySelector('.nav-menu');
// const themeToggle = document.querySelector('.theme-toggle');
// const backToTop = document.querySelector('.back-to-top');
// const navLinks = document.querySelectorAll('.nav-link');
// const skillsCategories = document.querySelectorAll('.skills-category');
// const skillItems = document.querySelectorAll('.skill-item');
// const skillBars = document.querySelectorAll('.skill-bar');
// const filterBtns = document.querySelectorAll('.filter-btn');
// const projectCards = document.querySelectorAll('.project-card');
// const viewMoreBtn = document.querySelector('.view-more-btn');
// const hiddenProjects = document.querySelectorAll('.hidden-project');
// const statNumbers = document.querySelectorAll('.stat-number');
// const contactForm = document.querySelector('.contact-form');
// const newsletterForm = document.querySelector('.newsletter-form');


// // ===== FUNCTIONS =====

// // Header scroll effect
// function headerScroll() {
//     if (window.scrollY > 50) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }
// }

// // Back to top button visibility
// function scrollToTop() {
//     if (window.scrollY > 500) {
//         backToTop.classList.add('show');
//     } else {
//         backToTop.classList.remove('show');
//     }
// }

// // Mobile menu toggle
// function toggleMenu() {
//     menuToggle.classList.toggle('active');
//     navMenu.classList.toggle('active');
    
//     // Animate menu icon
//     const bars = menuToggle.querySelectorAll('.bar');
//     if (menuToggle.classList.contains('active')) {
//         bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
//         bars[1].style.opacity = '0';
//         bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
//     } else {
//         bars.forEach(bar => {
//             bar.style.transform = 'none';
//             bar.style.opacity = '1';
//         });
//     }
// }

// // Close menu when clicking a link
// function closeMenu() {
//     menuToggle.classList.remove('active');
//     navMenu.classList.remove('active');
    
//     const bars = menuToggle.querySelectorAll('.bar');
//     bars.forEach(bar => {
//         bar.style.transform = 'none';
//         bar.style.opacity = '1';
//     });
// }

// // Toggle dark/light theme
// function toggleTheme() {
//     document.body.classList.toggle('dark-mode');
    
//     const icon = themeToggle.querySelector('i');
//     if (document.body.classList.contains('dark-mode')) {
//         icon.classList.remove('fa-moon');
//         icon.classList.add('fa-sun');
//         localStorage.setItem('theme', 'dark');
//     } else {
//         icon.classList.remove('fa-sun');
//         icon.classList.add('fa-moon');
//         localStorage.setItem('theme', 'light');
//     }
// }

// // Check for saved theme preference
// function checkTheme() {
//     const savedTheme = localStorage.getItem('theme');
//     const icon = themeToggle.querySelector('i');
    
//     if (savedTheme === 'dark') {
//         document.body.classList.add('dark-mode');
//         icon.classList.remove('fa-moon');
//         icon.classList.add('fa-sun');
//     }
// }

// // Filter skills by category
// function filterSkills() {
//     const category = this.getAttribute('data-category');
    
//     skillsCategories.forEach(cat => {
//         cat.classList.remove('active');
//     });
    
//     this.classList.add('active');
    
//     skillItems.forEach(item => {
//         const categories = item.getAttribute('data-categories').split(',');
        
//         if (category === 'all' || categories.includes(category)) {
//             item.style.display = 'block';
//             setTimeout(() => {
//                 item.style.opacity = '1';
//                 item.style.transform = 'scale(1)';
//             }, 50);
//         } else {
//             item.style.opacity = '0';
//             item.style.transform = 'scale(0.8)';
//             setTimeout(() => {
//                 item.style.display = 'none';
//             }, 300);
//         }
//     });
// }


// // Filter projects by category
// function filterProjects() {
//     const filter = this.getAttribute('data-filter');
    
//     filterBtns.forEach(btn => {
//         btn.classList.remove('active');
//     });
    
//     this.classList.add('active');
    
//     projectCards.forEach(card => {
//         const category = card.getAttribute('data-category');
        
//         if (filter === 'all' || category === filter) {
//             card.style.display = 'block';
//             setTimeout(() => {
//                 card.style.opacity = '1';
//                 card.style.transform = 'translateY(0)';
//             }, 50);
//         } else {
//             card.style.opacity = '0';
//             card.style.transform = 'translateY(20px)';
//             setTimeout(() => {
//                 card.style.display = 'none';
//             }, 300);
//         }
//     });
// }

// // Count up animation for stats


// // Handle contact form submission
// function handleContactSubmit(e) {
//     e.preventDefault();
    
//     // Simulate form submission
//     const submitBtn = contactForm.querySelector('button');
//     const originalText = submitBtn.textContent;
    
//     submitBtn.disabled = true;
//     submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
//     setTimeout(() => {
//         // Reset form
//         contactForm.reset();
        
//         // Show success message
//         submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        
//         setTimeout(() => {
//             submitBtn.disabled = false;
//             submitBtn.textContent = originalText;
//         }, 3000);
//     }, 2000);
// }

// // Handle newsletter form submission
// function handleNewsletterSubmit(e) {
//     e.preventDefault();
    
//     // Simulate form submission
//     const submitBtn = newsletterForm.querySelector('button');
//     const originalHTML = submitBtn.innerHTML;
    
//     submitBtn.disabled = true;
//     submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
//     setTimeout(() => {
//         // Reset form
//         newsletterForm.reset();
        
//         // Show success message
//         submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        
//         setTimeout(() => {
//             submitBtn.disabled = false;
//             submitBtn.innerHTML = originalHTML;
//         }, 3000);
//     }, 2000);
// }

// // Intersection Observer for animations
// function setupIntersectionObserver() {
//     const options = {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.1
//     };
    
//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // About section stats
//                 if (entry.target.id === 'about') {
//                     statNumbers.forEach(stat => {
//                         countUp(stat);
//                     });
//                 }
                
//                 // Skills section bars
//                 if (entry.target.id === 'skills') {
//                     animateSkillBars();
//                 }
                
//                 // Add animation class to sections
//                 entry.target.classList.add('animate');
                
//                 // Stop observing after animation
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, options);
    
//     // Observe sections
//     document.querySelectorAll('section').forEach(section => {
//         observer.observe(section);
//     });
// }

// // Smooth scrolling for navigation links
// function smoothScroll(e) {
//     e.preventDefault();
    
//     const targetId = this.getAttribute('href');
//     const targetElement = document.querySelector(targetId);
//     const targetPosition = targetElement.offsetTop - 70;
    
//     window.scrollTo({
//         top: targetPosition,
//         behavior: 'smooth'
//     });
    
//     closeMenu();
// }

// function setupViewMoreProjects() {
//     if (!viewMoreBtn || hiddenProjects.length === 0) return;

//     viewMoreBtn.addEventListener('click', () => {
//         hiddenProjects.forEach(project => {
//             project.classList.add('show-project');
//         });

//         viewMoreBtn.style.display = 'none';
//     });
// }


// // ===== EVENT LISTENERS =====
// window.addEventListener('load', () => {
//     checkTheme();
//     setupIntersectionObserver();
// });

// window.addEventListener('scroll', () => {
//     headerScroll();
//     scrollToTop();
// });

// menuToggle.addEventListener('click', toggleMenu);
// themeToggle.addEventListener('click', toggleTheme);
// backToTop.addEventListener('click', (e) => {
//     e.preventDefault();
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });

// navLinks.forEach(link => {
//     link.addEventListener('click', smoothScroll);
// });

// skillsCategories.forEach(category => {
//     category.addEventListener('click', filterSkills);
// });

// filterBtns.forEach(btn => {
//     btn.addEventListener('click', filterProjects);
// });

// contactForm.addEventListener('submit', handleContactSubmit);
// newsletterForm.addEventListener('submit', handleNewsletterSubmit);

// // Typed.js effect for hero section (optional)
// document.addEventListener('DOMContentLoaded', () => {
//     // Add your typed.js effect here if you want to include the library
//     // This is a placeholder for where you could add more interactive elements
    
//     // Add active class on section scroll
//     setupViewMoreProjects();

//     const sections = document.querySelectorAll('section');

    
//     window.addEventListener('scroll', () => {
//         let current = '';
        
//         sections.forEach(section => {
//             const sectionTop = section.offsetTop;
//             const sectionHeight = section.clientHeight;
            
//             if (window.pageYOffset >= sectionTop - 100) {
//                 current = section.getAttribute('id');
//             }
//         });
        
//         navLinks.forEach(link => {
//             link.classList.remove('active');
//             if (link.getAttribute('href') === `#${current}`) {
//                 link.classList.add('active');
//             }
//         });


//     });
    
//     // Project card hover effect enhancement
//     projectCards.forEach(card => {
//         const image = card.querySelector('img');
//         const overlay = card.querySelector('.project-overlay');
        
//         card.addEventListener('mouseenter', () => {
//             overlay.style.opacity = '1';
//             image.style.transform = 'scale(1.1)';
//         });
        
//         card.addEventListener('mouseleave', () => {
//             overlay.style.opacity = '0';
//             image.style.transform = 'scale(1)';
//         });
//     });
// });


// ==============================
// DOM ELEMENTS
// ==============================
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('.nav-link');
const skillsCategories = document.querySelectorAll('.skills-category');
const skillItems = document.querySelectorAll('.skill-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const statNumbers = document.querySelectorAll('.stat-number');
const navClose = document.querySelector('.nav-close');

// ==============================
// HEADER SCROLL EFFECT
// ==============================
function headerScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
}

// ==============================
// BACK TO TOP VISIBILITY
// ==============================
function scrollToTopVisibility() {
    if (!backToTop) return;
    backToTop.classList.toggle('show', window.scrollY > 500);
}

// ==============================
// MOBILE MENU
// ==============================
function toggleMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    const bars = menuToggle.querySelectorAll('.bar');
    if (menuToggle.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
}

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');

    const bars = menuToggle.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.transform = 'none';
        bar.style.opacity = '1';
    });
}

// ==============================
// THEME TOGGLE
// ==============================
function toggleTheme() {
    if (!themeToggle) return;

    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = themeToggle?.querySelector('i');
        icon?.classList.replace('fa-moon', 'fa-sun');
    }
}

// ==============================
// SKILLS FILTER
// ==============================
function filterSkills() {
    const category = this.dataset.category;

    skillsCategories.forEach(cat => cat.classList.remove('active'));
    this.classList.add('active');

    skillItems.forEach(item => {
        const categories = item.dataset.categories.split(',');
        const show = category === 'all' || categories.includes(category);

        item.style.display = show ? 'block' : 'none';
        item.style.opacity = show ? '1' : '0';
        item.style.transform = show ? 'scale(1)' : 'scale(0.9)';
    });
}

// ==============================
// PROJECT FILTER
// ==============================
function filterProjects() {
    const filter = this.dataset.filter;

    filterBtns.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    projectCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        card.style.display = show ? 'block' : 'none';
        card.style.opacity = show ? '1' : '0';
        card.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
    });
}

// ==============================
// SMOOTH SCROLL
// ==============================
function smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offset = target.offsetTop - 70;
    window.scrollTo({ top: offset, behavior: 'smooth' });
    closeMenu();
}

// ==============================
// VIEW MORE PROJECTS (MAIN FIX)
// ==============================
function setupViewMoreProjects() {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');

    if (!viewMoreBtn || hiddenProjects.length === 0) return;

    viewMoreBtn.addEventListener('click', () => {
        hiddenProjects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('show-project');
            }, index * 100);
        });

        viewMoreBtn.style.display = 'none';
    });
}

// ==============================
// INTERSECTION OBSERVER (ANIMATIONS)
// ==============================
function setupIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ==============================
// EVENT LISTENERS
// ==============================



document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    setupIntersectionObserver();
    setupViewMoreProjects();

    menuToggle?.addEventListener('click', toggleMenu);
    themeToggle?.addEventListener('click', toggleTheme);

    backToTop?.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
    });

    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    skillsCategories.forEach(cat => cat.addEventListener('click', filterSkills));
    filterBtns.forEach(btn => btn.addEventListener('click', filterProjects));
});

window.addEventListener('scroll', () => {
    headerScroll();
    scrollToTopVisibility();
});

