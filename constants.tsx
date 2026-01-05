
import { Skill, SkillCategory, Guild, WarRoomMission, UserRank, DailyMission, CodeChallenge } from './types';

export const SKILLS: Skill[] = [
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    category: SkillCategory.LANGUAGES,
    difficulty: 'Intermediate',
    description: 'The foundation of high-performance systems and game engines.',
    progress: 45,
    concepts: [
      { title: 'Arrays & Vectors', description: 'Master contiguous memory blocks and dynamic resizing for efficient data storage.' },
      { title: 'Two Pointers Technique', description: 'Optimize search patterns from O(n²) to O(n) using symmetric pointers.' },
      { title: 'Dynamic Memory (DMA)', description: 'Handle heap allocation manually using new/delete for absolute control.' },
      { title: 'STL Mastery', description: 'Unlock the power of generic programming with maps, sets, and algorithms.' },
      { title: 'OOP & Polymorphism', description: 'Build reusable architectures using classes, inheritance, and virtual functions.' }
    ]
  },
  {
    id: 'development',
    name: 'Software Dev',
    icon: '🏗️',
    category: SkillCategory.DEVELOPMENT,
    difficulty: 'Advanced',
    description: 'Comprehensive mastery of modern web architectures, backend systems, and deployment pipelines.',
    progress: 20,
    concepts: [
      { title: 'Frontend Architecture', description: 'Designing modular, stateful interfaces using modern frameworks and component patterns.' },
      { title: 'Backend & APIs', description: 'Building robust, scalable server-side logic and designing efficient REST/GraphQL endpoints.' },
      { title: 'DevOps & CI/CD', description: 'Automating the lifecycle of software through continuous integration and deployment pipelines.' },
      { title: 'Containerization', description: 'Packaging applications with all dependencies into isolated units using Docker and K8s.' },
      { title: 'System Design', description: 'Mastering high-level architecture: load balancing, horizontal scaling, and microservices.' }
    ]
  },
  {
    id: 'datascience',
    name: 'Data Science',
    icon: '📊',
    category: SkillCategory.DATA_SCIENCE,
    difficulty: 'Intermediate',
    description: 'The art of uncovering insights from raw data to drive intelligent decision-making.',
    progress: 30,
    concepts: [
      { title: 'Data Wrangling', description: 'The essential process of cleaning, transforming, and mapping raw data into a usable format.' },
      { title: 'Exploratory Analysis (EDA)', description: 'Discover patterns, spot anomalies, and check assumptions with statistical graphics.' },
      { title: 'Statistical Inference', description: 'Applying probability theory to make deductions about a population from a sample.' },
      { title: 'Predictive Modeling', description: 'Building mathematical models to forecast outcomes based on historical patterns.' },
      { title: 'Big Data Ecosystem', description: 'Managing massive datasets using distributed systems like Spark and NoSQL architectures.' }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    category: SkillCategory.LANGUAGES,
    difficulty: 'Beginner',
    description: 'The most versatile language for web, data, and automation.',
    progress: 80,
    concepts: [
      { title: 'List Comprehensions', description: 'Write elegant, readable one-liners for data transformation.' },
      { title: 'Automation Scripting', description: 'Automate boring tasks using OS interactions and web scraping.' },
      { title: 'AsyncIO & Concurrency', description: 'Handle thousands of requests simultaneously with non-blocking code.' },
      { title: 'Web Frameworks', description: 'Build robust backends using Django or lightweight APIs with FastAPI.' },
      { title: 'Decorators', description: 'Master functional programming to wrap behavior around existing functions.' }
    ]
  },
  {
    id: 'aiml',
    name: 'AI & ML',
    icon: '🤖',
    category: SkillCategory.AI_ML,
    difficulty: 'Advanced',
    description: 'Creating the brains of tomorrow through data and neural networks.',
    progress: 15,
    concepts: [
      { title: 'Neural Networks', description: 'Understand backpropagation and how layers of weights simulate biological brains.' },
      { title: 'Generative AI', description: 'Explore Transformers and Diffusion models that create art and text.' },
      { title: 'IoT Integration', description: 'Connect smart sensors to cloud AI for real-time edge computing.' },
      { title: 'Robotics Control', description: 'Program movement and computer vision in autonomous hardware.' },
      { title: 'NLP Patterns', description: 'Master sentiment analysis, translation, and tokenization techniques.' }
    ]
  }
];

export const CHALLENGES: CodeChallenge[] = [
  // BASICS (1-10)
  { id: 'c1', title: '1. Hello Guild', description: 'Print "Hello, Guild!" to the console.', difficulty: 'BASIC', starterCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, Guild!" << std::endl;\n    return 0;\n}' },
  { id: 'c2', title: '2. Basic Input', description: 'Take an integer input and print its square.', difficulty: 'BASIC', starterCode: '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    // Print n*n\n    return 0;\n}' },
  { id: 'c3', title: '3. Max of Two', description: 'Write a function maxOfTwo(int a, int b) returning the larger value.', difficulty: 'BASIC', starterCode: 'int maxOfTwo(int a, int b) {\n    return (a > b) ? a : b;\n}' },
  { id: 'c4', title: '4. Even or Odd', description: 'Function that returns true if a number is even.', difficulty: 'BASIC', starterCode: 'bool isEven(int n) {\n    return n % 2 == 0;\n}' },
  { id: 'c5', title: '5. For Loop Sum', description: 'Calculate sum of first N integers.', difficulty: 'BASIC', starterCode: 'int sumToN(int n) {\n    int sum = 0;\n    for(int i=1; i<=n; ++i) sum += i;\n    return sum;\n}' },
  { id: 'c6', title: '6. While Loop Countdown', description: 'Print numbers from 10 down to 1.', difficulty: 'BASIC', starterCode: '#include <iostream>\n\nvoid countdown() {\n    int i = 10;\n    while(i > 0) std::cout << i-- << " ";\n}' },
  { id: 'c7', title: '7. Simple Calculator', description: 'Switch statement for +, -, *, / operators.', difficulty: 'BASIC', starterCode: 'float calc(float a, float b, char op) {\n    switch(op) {\n        case \'+\': return a + b;\n        default: return 0;\n    }\n}' },
  { id: 'c8', title: '8. Constant Variables', description: 'Define a const double PI and use it for circle area.', difficulty: 'BASIC', starterCode: 'double circleArea(double r) {\n    const double PI = 3.14159;\n    return PI * r * r;\n}' },
  { id: 'c9', title: '9. Leap Year Check', description: 'Determine if a year is a leap year.', difficulty: 'BASIC', starterCode: 'bool isLeap(int y) {\n    return (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);\n}' },
  { id: 'c10', title: '10. Character check', description: 'Check if a char is a vowel.', difficulty: 'BASIC', starterCode: 'bool isVowel(char c) {\n    c = tolower(c);\n    return (c==\'a\'||c==\'e\'||c==\'i\'||c==\'o\'||c==\'u\');\n}' },

  // ARRAYS & VECTORS (11-20)
  { id: 'c11', title: '11. Array Reverse', description: 'Reverse elements of an integer array.', difficulty: 'BASIC', starterCode: 'void reverse(int arr[], int n) {\n    for(int i=0; i < n/2; ++i) {\n        int temp = arr[i];\n        arr[i] = arr[n-i-1];\n        arr[n-i-1] = temp;\n    }\n}' },
  { id: 'c12', title: '12. Find Minimum', description: 'Find the smallest element in an array.', difficulty: 'BASIC', starterCode: 'int findMin(int arr[], int n) {\n    int min = arr[0];\n    for(int i=1; i<n; i++) if(arr[i] < min) min = arr[i];\n    return min;\n}' },
  { id: 'c13', title: '13. Vector Push', description: 'Push 1 to 10 into a std::vector.', difficulty: 'BASIC', starterCode: '#include <vector>\n\nstd::vector<int> fill() {\n    std::vector<int> v;\n    for(int i=1; i<=10; i++) v.push_back(i);\n    return v;\n}' },
  { id: 'c14', title: '14. Array Average', description: 'Return the average of array elements.', difficulty: 'BASIC', starterCode: 'double avg(int arr[], int n) {\n    double s = 0;\n    for(int i=0; i<n; i++) s += arr[i];\n    return s/n;\n}' },
  { id: 'c15', title: '15. Count Occurrences', description: 'Count how many times X appears in array.', difficulty: 'BASIC', starterCode: 'int count(int arr[], int n, int x) {\n    int c = 0;\n    for(int i=0; i<n; i++) if(arr[i] == x) c++;\n    return c;\n}' },
  { id: 'c16', title: '16. Check Sorted', description: 'Return true if array is sorted ascending.', difficulty: 'BASIC', starterCode: 'bool isSorted(int arr[], int n) {\n    for(int i=0; i<n-1; i++) if(arr[i] > arr[i+1]) return false;\n    return true;\n}' },
  { id: 'c17', title: '17. Remove Duplicate', description: 'Logic to identify duplicates in a sorted array.', difficulty: 'INTERMEDIATE', starterCode: 'int uniqueCount(int arr[], int n) {\n    // Implementation\n}' },
  { id: 'c18', title: '18. Vector Sum', description: 'Sum elements of a vector using an iterator.', difficulty: 'BASIC', starterCode: '#include <vector>\n\nint sumVec(std::vector<int>& v) {\n    int s = 0;\n    for(auto it = v.begin(); it != v.end(); ++it) s += *it;\n    return s;\n}' },
  { id: 'c19', title: '19. Matrix Addition', description: 'Add two 2D arrays.', difficulty: 'INTERMEDIATE', starterCode: 'void addMatrices(int a[2][2], int b[2][2], int res[2][2]) {\n    // logic\n}' },
  { id: 'c20', title: '20. String Length', description: 'Manual count of char array length (without strlen).', difficulty: 'BASIC', starterCode: 'int length(char s[]) {\n    int i=0; while(s[i] != \'\\0\') i++; return i;\n}' },

  // POINTERS & MEMORY (21-30)
  { id: 'c21', title: '21. Pointer Swap', description: 'Swap two values using pointers.', difficulty: 'BASIC', starterCode: 'void swap(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}' },
  { id: 'c22', title: '22. Null Pointer', description: 'Declare and check a nullptr.', difficulty: 'BASIC', starterCode: 'bool isNull(int* p) {\n    return p == nullptr;\n}' },
  { id: 'c23', title: '23. Heap Allocation', description: 'Allocate int on heap, set it, and delete.', difficulty: 'BASIC', starterCode: 'void heapLife() {\n    int* p = new int(5);\n    delete p;\n}' },
  { id: 'c24', title: '24. Pointer Arithmetic', description: 'Access 3rd element of array using pointer math.', difficulty: 'BASIC', starterCode: 'int getThird(int* arr) {\n    return *(arr + 2);\n}' },
  { id: 'c25', title: '25. Ref Variables', description: 'Increment an integer passed by reference.', difficulty: 'BASIC', starterCode: 'void inc(int& n) {\n    n++;\n}' },
  { id: 'c26', title: '26. Const Pointers', description: 'Create a pointer to a constant integer.', difficulty: 'BASIC', starterCode: 'const int* getPtr(const int& n) {\n    return &n;\n}' },
  { id: 'c27', title: '27. Dynamic Array', description: 'Create an array of size N on heap.', difficulty: 'INTERMEDIATE', starterCode: 'int* createArr(int n) {\n    return new int[n];\n}' },
  { id: 'c28', title: '28. Array of Pointers', description: 'Initialize an array of 3 integer pointers.', difficulty: 'INTERMEDIATE', starterCode: 'void ptrArr() {\n    int* arr[3];\n}' },
  { id: 'c29', title: '29. Function Pointers', description: 'Pass a function as an argument.', difficulty: 'INTERMEDIATE', starterCode: 'void exec(void (*f)()) {\n    f();\n}' },
  { id: 'c30', title: '30. Memory Cleanup', description: 'Properly delete a dynamically allocated 2D array.', difficulty: 'INTERMEDIATE', starterCode: 'void clean2D(int** m, int rows) {\n    // delete each row\n    // delete outer\n}' },

  // OOP & LOGIC (31-40)
  { id: 'c31', title: '31. Class Creation', description: 'Create a Class "Hero" with a name string.', difficulty: 'BASIC', starterCode: '#include <string>\n\nclass Hero {\npublic:\n    std::string name;\n};' },
  { id: 'c32', title: '32. Constructor', description: 'Add a constructor to Class Hero.', difficulty: 'BASIC', starterCode: 'class Hero {\npublic:\n    Hero(std::string n) : name(n) {}\n    std::string name;\n};' },
  { id: 'c33', title: '33. Encapsulation', description: 'Use private members and public getters.', difficulty: 'BASIC', starterCode: 'class Account {\nprivate:\n    double bal;\npublic:\n    double getBal() { return bal; }\n};' },
  { id: 'c34', title: '34. Inheritance', description: 'Derived class "Knight" from "Hero".', difficulty: 'BASIC', starterCode: 'class Hero {};\nclass Knight : public Hero {};' },
  { id: 'c35', title: '35. Polymorphism', description: 'Implement a virtual function "attack()".', difficulty: 'INTERMEDIATE', starterCode: 'class Hero {\n    virtual void attack() = 0;\n};' },
  { id: 'c36', title: '36. Operator Overload', description: 'Overload "+" for a complex number class.', difficulty: 'INTERMEDIATE', starterCode: 'class Complex {\n    // logic\n};' },
  { id: 'c37', title: '37. Binary Search', description: 'Iterative implementation of binary search.', difficulty: 'INTERMEDIATE', starterCode: 'int binarySearch(int arr[], int n, int x) {\n    // low, high, mid logic\n}' },
  { id: 'c38', title: '38. Bubble Sort', description: 'Sort array using Bubble Sort algorithm.', difficulty: 'INTERMEDIATE', starterCode: 'void bubble(int arr[], int n) {\n    // nested loops\n}' },
  { id: 'c39', title: '39. Recursive Factorial', description: 'Calculate factorial using recursion.', difficulty: 'INTERMEDIATE', starterCode: 'int fact(int n) {\n    if(n <= 1) return 1;\n    return n * fact(n-1);\n}' },
  { id: 'c40', title: '40. Linked List Node', description: 'Define a basic struct for a Singly Linked List Node.', difficulty: 'INTERMEDIATE', starterCode: 'struct Node {\n    int data;\n    Node* next;\n};' },
];

export const GUILDS: Guild[] = [
  { id: '1', name: 'Binary Kings', rank: 1, members: 120, exp: 98400, tag: 'BK' },
  { id: '2', name: 'Neural Knights', rank: 2, members: 85, exp: 82100, tag: 'NK' },
  { id: '3', name: 'Stack Overlords', rank: 3, members: 150, exp: 75000, tag: 'SO' }
];

export const MISSIONS: WarRoomMission[] = [
  { 
    id: 'm1', 
    title: 'Quad-Sync Coding: C++ Optimizers', 
    description: 'Group of 4 operatives optimizing heap allocations and memory leaks in a legacy module.', 
    reward: 1200, 
    difficulty: 'Hard', 
    progress: 0, 
    type: 'CODING',
    squadCapacity: 4,
    currentSquad: 2
  },
  { 
    id: 'm2', 
    title: 'Logic Hive: Pointers Strike', 
    description: 'Study group of 5 mastering double pointers and pointer arithmetic for high-speed sorting.', 
    reward: 800, 
    difficulty: 'Expert', 
    progress: 0, 
    type: 'LEARNING',
    squadCapacity: 5,
    currentSquad: 3
  }
];

export const DAILY_MISSIONS: DailyMission[] = [
  { id: 'd1', title: 'Neural Consultation', description: 'Ask the AI Mentor a technical question.', rewardXp: 50, isCompleted: false, icon: '🧠' },
  { id: 'd2', title: 'C++ Logic Check', description: 'Validate a C++ snippet in the Guild Logic Core.', rewardXp: 30, isCompleted: false, icon: '⚡' },
  { id: 'd3', title: 'War Room Drill', description: 'Participate in a Guild Mission Strike.', rewardXp: 100, isCompleted: false, icon: '⚔️' }
];

export const MOCK_USER_STATS = {
  level: 1,
  streak: 5,
  points: 1200,
  xp: 1450,
  rank: UserRank.BRONZE,
  enrolledSkillIds: ['python']
};
