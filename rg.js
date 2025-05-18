   // Initialize Charts
        // Ratings Chart (Pie)
        const ratingsCtx = document.getElementById('ratingsChart').getContext('2d');
        const ratingsChart = new Chart(ratingsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Again', 'Good', 'Easy'],
                datasets: [{
                    data: [2, 7, 3],
                    backgroundColor: [
                        '#ef4444',
                        '#eab308',
                        '#22c55e'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
                cutout: '70%'
            }
        });

        // Activity Chart (Bar)
        const activityCtx = document.getElementById('activityChart').getContext('2d');
        const activityChart = new Chart(activityCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Cards Reviewed',
                    data: [12, 19, 15, 8, 14, 9, 10],
                    backgroundColor: '#4f46e5',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Flashcard Interaction
        const flashcard = document.getElementById('flashcard');
        const flipCardBtn = document.getElementById('flipCardBtn');
        const difficultyButtons = document.querySelectorAll('.difficulty-btn');
        const createModal = document.getElementById('createModal');
        const closeCreateModal = document.getElementById('closeCreateModal');

        // Flip card on button click
        flipCardBtn.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
            flipCardBtn.textContent = flashcard.classList.contains('flipped') ? 'Show Question' : 'Flip Card';
        });

        // Flip card on card click
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
            flipCardBtn.textContent = flashcard.classList.contains('flipped') ? 'Show Question' : 'Flip Card';
        });

        // Difficulty button click handler
        difficultyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const difficulty = this.getAttribute('data-difficulty');
                
                // Visual feedback
                this.classList.add('scale-95');
                setTimeout(() => {
                    this.classList.remove('scale-95');
                }, 150);
                
                // In a real app, this would update the Leitner system
                console.log(`Card marked as ${difficulty}`);
                
                // Simulate moving to next card
                setTimeout(() => {
                    flashcard.classList.remove('flipped');
                    flipCardBtn.textContent = 'Flip Card';
                    
                    // Update card content (simulated)
                    const question = document.querySelector('.card-face:not(.card-back) .text-2xl');
                    const answer = document.querySelector('.card-back .text-2xl');
                    
                    // Sample questions for demo
                    const questions = [
                        "What is the function of ribosomes?",
                        "What does the Golgi apparatus do?",
                        "What is the nuclear envelope?",
                        "What are lysosomes responsible for?",
                        "What is the endoplasmic reticulum?"
                    ];
                    
                    const answers = [
                        "Protein synthesis",
                        "Modifies, sorts, and packages proteins",
                        "Double membrane that encloses the nucleus",
                        "Breaking down waste materials",
                        "Network of membranes for protein and lipid synthesis"
                    ];
                    
                    const randomIndex = Math.floor(Math.random() * questions.length);
                    question.textContent = questions[randomIndex];
                    answer.textContent = answers[randomIndex];
                }, 300);
            });
        });

        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themes = ['light', 'dark', 'nature'];
        let currentTheme = 0;
        
        themeToggle.addEventListener('click', () => {
            currentTheme = (currentTheme + 1) % themes.length;
            document.body.className = `theme-${themes[currentTheme]}`;
            
            // Update nav color based on theme
            const nav = document.querySelector('nav');
            if (themes[currentTheme] === 'dark') {
                nav.className = 'bg-gray-800 text-white shadow-lg';
            } else if (themes[currentTheme] === 'nature') {
                nav.className = 'bg-green-600 text-white shadow-lg';
            } else {
                nav.className = 'bg-indigo-600 text-white shadow-lg';
            }
        });

        // Create flashcard modal
        document.querySelectorAll('.quick-actions button').forEach(btn => {
            if (btn.textContent.includes('New Card')) {
                btn.addEventListener('click', () => {
                    createModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                });
            }
        });

        // Close create modal
        closeCreateModal.addEventListener('click', () => {
            createModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        // Progress ring animation
        function updateProgressRing(percent) {
            const circle = document.querySelector('.progress-ring__circle');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDasharray = circumference + ' ' + circumference;
            circle.style.strokeDashoffset = offset;
        }

        // Initialize progress ring
        updateProgressRing(68);
