# Fruit Optimization - Linear Programming Visualization

A step-by-step interactive visualization of a linear programming problem using the graphical method. This React application demonstrates how to solve an optimization problem for minimizing the cost of fruit servings while meeting vitamin C requirements.

## 🌐 Live Demo

**View the live application:** [https://graphical-jet.vercel.app](https://graphical-jet.vercel.app)

## 📋 Problem Statement

A health-conscious family wants to have a very well-controlled vitamin C-rich mixed fruit breakfast which is a good source of dietary fiber as well; in the form of **5 fruit servings per day**. They choose apples and bananas as their target fruits, which can be purchased from an online vendor in bulk at a reasonable price.

### Given Information:
- 🍌 **Bananas:** Cost 30 rupees per dozen (6 servings) = **5 rupees per serving**
- 🍎 **Apples:** Cost 80 rupees per kg (8 servings) = **10 rupees per serving**
- 🍌 **Vitamin C in Banana:** 8.8 mg per serving
- 🍎 **Vitamin C in Apple:** 5.2 mg per serving (100-125g)
- 💊 **Vitamin C Requirements:** At least 20 mg but under 60 mg daily

### Question:
How many fruit servings would the family have to consume on a daily basis per person to **minimize their cost** while meeting all the vitamin C and serving requirements?

## 🔧 Mathematical Setup

### Decision Variables:
- Let **x₁** = number of banana servings per person per day
- Let **x₂** = number of apple servings per person per day

### Objective Function:
**Minimize:** Z = 5x₁ + 10x₂

### Constraints:
1. **8.8x₁ + 5.2x₂ ≥ 20** (Minimum Vitamin C)
2. **8.8x₁ + 5.2x₂ ≤ 60** (Maximum Vitamin C)
3. **x₁ + x₂ = 5** (Exactly 5 servings)
4. **x₁, x₂ ≥ 0** (Non-negativity)

## ✅ Solution

### Optimal Solution:
- **Point B: (5, 0)**
- **Daily Servings:** 5 Bananas, 0 Apples
- **Cost:** Rs.25/day
- **Vitamin C:** 44 mg (within 20-60 mg range)

### Why This Solution?
- ✓ Bananas are cheaper: Rs.5 vs Rs.10 per serving
- ✓ Bananas have more Vitamin C: 8.8 mg vs 5.2 mg per serving
- ✓ Satisfies all constraints
- ✓ Gives absolute minimum cost

## 🚀 Features

- **Interactive Step-by-Step Visualization:** Navigate through 6 steps to understand the graphical method
- **Dynamic Charts:** Real-time visualization of constraints and feasible region using Recharts
- **Educational Content:** Detailed explanations at each step
- **Responsive Design:** Beautiful UI built with Tailwind CSS
- **Mathematical Accuracy:** All calculations verified and correct

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Chart library for data visualization
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript/JSX** - Programming language

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/angeli-sliit/graphical.git
cd graphical
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📊 Step-by-Step Process

1. **Plot the Equality Constraint** - Visualize x₁ + x₂ = 5
2. **Check Minimum Vitamin C** - Verify 8.8x₁ + 5.2x₂ ≥ 20
3. **Check Maximum Vitamin C** - Verify 8.8x₁ + 5.2x₂ ≤ 60
4. **Identify Feasible Region** - Determine the feasible line segment
5. **Evaluate Corner Points** - Compare costs at endpoints
6. **Optimal Solution** - Find the minimum cost solution

## 🎯 Key Learnings

This project demonstrates:
- Linear programming problem formulation
- Graphical method for solving LP problems
- Constraint visualization
- Feasible region identification
- Corner point evaluation
- Cost minimization

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Angeli SLIIT**
- GitHub: [@angeli-sliit](https://github.com/angeli-sliit)

## 🙏 Acknowledgments

- Built as an educational tool for understanding linear programming
- Uses the graphical method to solve optimization problems
- Designed for clarity and learning

---

**Live Application:** [https://graphical-jet.vercel.app](https://graphical-jet.vercel.app)

