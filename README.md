<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlashMaster Pro - Spaced Repetition System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .card-flip {
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        .card-flip.flipped {
            transform: rotateY(180deg);
        }
        .card-face {
            backface-visibility: hidden;
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .card-back {
            transform: rotateY(180deg);
        }
        .progress-ring__circle {
            transition: stroke-dashoffset 0.35s;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
        }
        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .theme-light {
            --bg-primary: #ffffff;
            --bg-secondary: #f9fafb;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --accent: #4f46e5;
        }
        .theme-dark {
            --bg-primary: #1f2937;
            --bg-secondary: #111827;
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --accent: #818cf8;
        }
        .theme-nature {
            --bg-primary: #f0fdf4;
            --bg-secondary: #dcfce7;
            --text-primary: #052e16;
            --text-secondary: #166534;
            --accent: #16a34a;
        }
        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
        }
    </style>
</head>
<body class="theme-light">
    <!-- Navigation -->
    <nav class="bg-indigo-600 text-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center">
                    <i class="fas fa-brain text-2xl mr-2"></i>
                    <span class="text-xl font-bold">FlashMaster Pro</span>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium bg-indigo-700">Dashboard</a>
                        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Flashcards</a>
                        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Review</a>
                        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Statistics</a>
                        <a href="#" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Settings</a>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <button id="theme-toggle" class="text-white">
                            <i class="fas fa-palette"></i>
                        </button>
                    </div>
                    <div class="relative">
                        <button id="user-menu" class="flex items-center text-sm rounded-full focus:outline-none">
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Flashcard Interface -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold">Active Review Session</h2>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-500">Biology - Cell Structure</span>
                            <span class="text-sm font-medium bg-gray-100 px-2 py-1 rounded">12 cards</span>
                        </div>
                    </div>
                    <div class="relative h-96 mb-6">
                        <div id="flashcard" class="card-flip w-full h-full cursor-pointer">
                            <div class="card-face bg-indigo-50 rounded-xl p-6 flex items-center justify-center shadow-inner">
                                <div class="text-center px-4">
                                    <div class="text-sm text-indigo-500 mb-2">Question</div>
                                    <div class="text-2xl font-bold">What is the powerhouse of the cell?</div>
                                </div>
                            </div>
                            <div class="card-face card-back bg-green-50 rounded-xl p-6 flex items-center justify-center shadow-inner">
                                <div class="text-center px-4">
                                    <div class="text-sm text-green-500 mb-2">Answer</div>
                                    <div class="text-2xl font-bold">Mitochondria</div>
                                    <div class="mt-4 text-sm text-gray-600">Additional context: Mitochondria generate most of the cell's supply of ATP, used as a source of chemical energy.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="difficultyButtons" class="grid grid-cols-3 gap-4 mb-6">
                        <button class="difficulty-btn bg-red-100 text-red-700 py-3 rounded-xl hover:bg-red-200 transition flex flex-col items-center" data-difficulty="again">
                            <i class="fas fa-redo text-xl mb-1"></i>
                            <span>Again</span>
                            <span class="text-xs mt-1">Review soon</span>
                        </button>
                        <button class="difficulty-btn bg-yellow-100 text-yellow-700 py-3 rounded-xl hover:bg-yellow-200 transition flex flex-col items-center" data-difficulty="good">
                            <i class="fas fa-check-circle text-xl mb-1"></i>
                            <span>Good</span>
                            <span class="text-xs mt-1">Review in 3 days</span>
                        </button>
                        <button class="difficulty-btn bg-green-100 text-green-700 py-3 rounded-xl hover:bg-green-200 transition flex flex-col items-center" data-difficulty="easy">
                            <i class="fas fa-smile-beam text-xl mb-1"></i>
                            <span>Easy</span>
                            <span class="text-xs mt-1">Review in 1 week</span>
                        </button>
                   </div>
                    <!-- Session Progress -->
                    <div class="flex justify-between items-center">
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-500">Card 5 of 12</span>
                            <div class="w-24 bg-gray-200 rounded-full h-2">
                                <div class="bg-indigo-600 h-2 rounded-full" style="width: 42%"></div>
                            </div>
                        </div>
                        <button id="flipCardBtn" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                            Flip Card
                        </button>
                    </div>
                </div>
           <!-- Review Statistics Panel -->
                <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
                    <h2 class="text-xl font-bold mb-4">Session Statistics</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 class="font-medium mb-2">Card Ratings</h3>
                            <div class="h-48">
                                <canvas id="ratingsChart"></canvas>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-medium mb-2">Progress</h3>
                            <div class="space-y-3">
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span>Again</span>
                                        <span>2 (17%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-red-500 h-2 rounded-full" style="width: 17%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span>Good</span>
                                        <span>7 (58%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 58%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span>Easy</span>
                                        <span>3 (25%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 25%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-medium mb-2">Upcoming Reviews</h3>
                            <div class="space-y-2">
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div class="text-sm">Today</div>
                                    <div class="text-sm font-medium">2 cards</div>
                                </div>
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div class="text-sm">Tomorrow</div>
                                    <div class="text-sm font-medium">5 cards</div>
                                </div>
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div class="text-sm">In 3 days</div>
                                    <div class="text-sm font-medium">3 cards</div>
                                </div>
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div class="text-sm">In 1 week</div>
                                    <div class="text-sm font-medium">2 cards</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Right Column - Dashboard -->
            <div class="space-y-6">
                <!-- Performance Summary -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4">Learning Overview</h2>
                    <div class="flex items-center justify-center mb-4">
                        <div class="relative w-32 h-32">
                            <svg class="w-full h-full" viewBox="0 0 100 100">
                                <circle class="text-gray-200" stroke-width="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                <circle class="text-indigo-600 progress-ring__circle" stroke-width="8" stroke-linecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" stroke-dasharray="251.2" stroke-dashoffset="80.384" />
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-2xl font-bold">68%</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-indigo-50 p-3 rounded-lg">
                            <div class="text-indigo-600 text-sm font-medium">Total Cards</div>
                            <div class="text-xl font-bold">143</div>
                        </div>
                        <div class="bg-green-50 p-3 rounded-lg">
                            <div class="text-green-600 text-sm font-medium">Mastered</div>
                            <div class="text-xl font-bold">97</div>
                        </div>
                        <div class="bg-blue-50 p-3 rounded-lg">
                            <div class="text-blue-600 text-sm font-medium">Learning</div>
                            <div class="text-xl font-bold">32</div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded-lg">
                            <div class="text-purple-600 text-sm font-medium">New</div>
                            <div class="text-xl font-bold">14</div>
                        </div>
                    </div>
                </div>  
                <!-- Streak and Activity -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4">Activity</h2>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="bg-yellow-50 p-3 rounded-lg">
                            <div class="text-yellow-600 text-sm font-medium">Current Streak</div>
                            <div class="text-xl font-bold">7 days</div>
                        </div>
                        <div class="bg-red-50 p-3 rounded-lg">
                            <div class="text-red-600 text-sm font-medium">Longest Streak</div>
                            <div class="text-xl font-bold">21 days</div>
                        </div>
                    </div>
                    <div class="h-40">
                        <canvas id="activityChart"></canvas>
                    </div>
                </div>
                        <!-- Flashcard Sets -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Your Sets</h2>
                        <button class="text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div class="font-medium">Biology - Cell Structure</div>
                                <div class="text-sm text-gray-500">32 cards • 68% mastered</div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <i class="fas fa-flask text-indigo-600"></i>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div class="font-medium">Spanish - Common Verbs</div>
                                <div class="text-sm text-gray-500">28 cards • 52% mastered</div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <i class="fas fa-language text-green-600"></i>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div class="font-medium">History - World War II</div>
                                <div class="text-sm text-gray-500">45 cards • 71% mastered</div>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <i class="fas fa-landmark text-purple-600"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Quick Actions -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
                    <div class="grid grid-cols-2 gap-3">
                        <button class="flex flex-col items-center justify-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition">
                            <i class="fas fa-plus-circle text-indigo-600 text-xl mb-2"></i>
                            <span class="text-sm font-medium">New Card</span>
                        </button>
                        <button class="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
                            <i class="fas fa-layer-group text-green-600 text-xl mb-2"></i>
                            <span class="text-sm font-medium">New Set</span>
                        </button>
                        <button class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                            <i class="fas fa-chart-pie text-blue-600 text-xl mb-2"></i>
                            <span class="text-sm font-medium">Stats</span>
                        </button>
                        <button class="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                            <i class="fas fa-cog text-purple-600 text-xl mb-2"></i>
                            <span class="text-sm font-medium">Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
 <!-- Create Flashcard Modal -->
    <div id="createModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Create New Flashcard</h3>
                    <button id="closeCreateModal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Flashcard Set</label>
                            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Select a set</option>
                                <option>Biology - Cell Structure</option>
                                <option>Spanish - Common Verbs</option>
                                <option>History - World War II</option>
                                <option>+ Create new set</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Biology, Spanish, etc.">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tags (optional)</label>
                        <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Separate tags with commas">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Question</label>
                        <textarea class="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your question here..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                        <textarea class="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter the answer here..."></textarea>
                    </div>
                    <div class="flex justify-end space-x-3 pt-4">
                        <button class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
                        <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Create Flashcard</button>
                    </div>
                </div>
            </div>
        </div>
    </div
    <script>
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
        });       // Flashcard Interaction
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
                console.log(`Card marked as ${difficulty}`)      
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
    </script>
</body>
</html>
