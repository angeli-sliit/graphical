import React, { useState } from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';

const FruitOptimization = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Step 1: Plot the Equality Constraint",
      description: "x₁ + x₂ = 5 forms a line from (0,5) to (5,0)"
    },
    {
      title: "Step 2: Check Minimum Vitamin C",
      description: "8.8x₁ + 5.2x₂ ≥ 20 (region above/right of red line)"
    },
    {
      title: "Step 3: Check Maximum Vitamin C",
      description: "8.8x₁ + 5.2x₂ ≤ 60 (region below/left of blue line)"
    },
    {
      title: "Step 4: Identify Feasible Region",
      description: "The green line segment from (0,5) to (5,0) is entirely feasible!"
    },
    {
      title: "Step 5: Evaluate Corner Points",
      description: "Compare costs at both endpoints"
    },
    {
      title: "Step 6: Optimal Solution",
      description: "Point B gives minimum cost!"
    }
  ];

  const generateData = () => {
    const points = [];
    for (let x1 = 0; x1 <= 7; x1 += 0.5) {
      points.push({
        x1: x1,
        equalityLine: 5 - x1,
        minVitC: (20 - 8.8 * x1) / 5.2,
        maxVitC: (60 - 8.8 * x1) / 5.2,
      });
    }
    return points;
  };

  const cornerPoints = [
    { x1: 0, x2: 5, name: 'A(0,5)', cost: 50, vitC: 26 },
    { x1: 5, x2: 0, name: 'B(5,0)', cost: 25, vitC: 44 }
  ];

  const chartData = generateData();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-2 text-green-800">
        Step-by-Step Graphical Method
      </h1>
      <h2 className="text-xl text-center mb-6 text-gray-700">
        Linear Programming Solution
      </h2>

      {/* Problem Statement */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold mb-4 text-green-800">📋 Problem Statement</h3>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg leading-relaxed">
            A health-conscious family wants to have a very well-controlled vitamin C-rich mixed fruit 
            breakfast which is a good source of dietary fiber as well; in the form of <strong>5 fruit servings 
            per day</strong>. They choose apples and bananas as their target fruits, which can be purchased 
            from an online vendor in bulk at a reasonable price.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">Given Information:</h4>
            <ul className="space-y-2">
              <li>🍌 <strong>Bananas:</strong> Cost 30 rupees per dozen (6 servings) = <strong>5 rupees per serving</strong></li>
              <li>🍎 <strong>Apples:</strong> Cost 80 rupees per kg (8 servings) = <strong>10 rupees per serving</strong></li>
              <li>🍌 <strong>Vitamin C in Banana:</strong> 8.8 mg per serving</li>
              <li>🍎 <strong>Vitamin C in Apple:</strong> 5.2 mg per serving (100-125g)</li>
              <li>💊 <strong>Vitamin C Requirements:</strong> At least 20 mg but under 60 mg daily</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
            <h4 className="font-bold text-yellow-800 mb-2">❓ Question:</h4>
            <p className="text-lg">
              How many fruit servings would the family have to consume on a daily basis per person 
              to <strong>minimize their cost</strong> while meeting all the vitamin C and serving requirements?
            </p>
          </div>
        </div>
      </div>

      {/* Initial Setup */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-l-4 border-purple-600">
        <h3 className="text-2xl font-bold mb-4 text-purple-800">🔧 Initial Setup</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg text-purple-700 mb-2">Decision Variables:</h4>
            <div className="bg-purple-50 p-4 rounded">
              <p>Let x₁ = number of banana servings per person per day</p>
              <p>Let x₂ = number of apple servings per person per day</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-purple-700 mb-2">Objective Function:</h4>
            <div className="bg-red-50 p-4 rounded">
              <p className="font-mono text-xl font-bold text-red-700">Minimize: Z = 5x₁ + 10x₂</p>
              <p className="text-sm text-gray-600 mt-2">
                (Where 5 = cost per banana serving, 10 = cost per apple serving)
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-purple-700 mb-2">Constraints:</h4>
            <div className="bg-purple-50 p-4 rounded space-y-2 font-mono">
              <p><strong>1.</strong> 8.8x₁ + 5.2x₂ ≥ 20  <span className="text-gray-600">(Minimum Vitamin C)</span></p>
              <p><strong>2.</strong> 8.8x₁ + 5.2x₂ ≤ 60  <span className="text-gray-600">(Maximum Vitamin C)</span></p>
              <p><strong>3.</strong> x₁ + x₂ = 5  <span className="text-gray-600">(Exactly 5 servings)</span></p>
              <p><strong>4.</strong> x₁, x₂ ≥ 0  <span className="text-gray-600">(Non-negativity)</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              step === idx
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-white text-green-600 hover:bg-green-100'
            }`}
          >
            Step {idx + 1}
          </button>
        ))}
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg mb-6 border-l-4 border-green-600">
        <h3 className="text-2xl font-bold mb-2 text-green-700">{steps[step].title}</h3>
        <p className="text-lg text-gray-700">{steps[step].description}</p>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg mb-6">
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x1" 
              label={{ value: 'Banana Servings (x1)', position: 'insideBottom', offset: -10 }}
              domain={[0, 7]}
            />
            <YAxis 
              label={{ value: 'Apple Servings (x2)', angle: -90, position: 'insideLeft' }}
              domain={[0, 7]}
            />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            {step >= 1 && (
              <Line 
                type="monotone" 
                dataKey="minVitC" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Min Vit C: 8.8x1 + 5.2x2 = 20"
                dot={false}
              />
            )}
            
            {step >= 2 && (
              <Line 
                type="monotone" 
                dataKey="maxVitC" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Max Vit C: 8.8x1 + 5.2x2 = 60"
                dot={false}
              />
            )}
            
            {step >= 0 && (
              <Line 
                type="monotone" 
                dataKey="equalityLine" 
                stroke="#10b981" 
                strokeWidth={4}
                name="Equality: x1 + x2 = 5 (FEASIBLE REGION)"
                dot={false}
              />
            )}
            
            {step >= 4 && (
              <>
                <Scatter
                  data={[cornerPoints[0]]}
                  fill="#ff6b6b"
                  shape="circle"
                  dataKey="x2"
                  name="Point A(0,5): Cost=Rs.50"
                />
                <Scatter
                  data={[cornerPoints[1]]}
                  fill={step >= 5 ? "#ffd700" : "#ff6b6b"}
                  shape="star"
                  dataKey="x2"
                  name="Point B(5,0): Cost=Rs.25"
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg mb-6">
        {step === 0 && (
          <div>
            <h4 className="font-bold text-lg mb-3 text-green-700">Understanding the Equality Constraint</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>Given:</strong> x1 + x2 = 5 (exactly 5 servings)</p>
              <p>This means x2 = 5 - x1</p>
              <p className="bg-yellow-50 p-3 rounded">
                <strong>Key Point:</strong> Unlike typical LP problems with inequality constraints that create areas, 
                this equality constraint creates a <strong>LINE</strong>, not an area. The green line shows all combinations 
                where servings total exactly 5.
              </p>
              <div className="bg-blue-50 p-3 rounded">
                <p><strong>Endpoints:</strong></p>
                <p>• When x1 = 0: x2 = 5 → Point A(0, 5)</p>
                <p>• When x1 = 5: x2 = 0 → Point B(5, 0)</p>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h4 className="font-bold text-lg mb-3 text-green-700">Checking Minimum Vitamin C Constraint</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>Constraint:</strong> 8.8x1 + 5.2x2 ≥ 20</p>
              <p><strong>Boundary line:</strong> 8.8x1 + 5.2x2 = 20 (red dashed line)</p>
              <p className="bg-yellow-50 p-3 rounded">
                <strong>Question:</strong> Does our green line (x1 + x2 = 5) satisfy this constraint?
              </p>
              <div className="bg-blue-50 p-3 rounded">
                <p><strong>Test the endpoints:</strong></p>
                <p>• Point A(0, 5): Vit C = 8.8(0) + 5.2(5) = 26 mg ≥ 20 ✓</p>
                <p>• Point B(5, 0): Vit C = 8.8(5) + 5.2(0) = 44 mg ≥ 20 ✓</p>
                <p className="font-bold text-green-600 mt-2">Both endpoints satisfy the minimum! The entire green line is above the minimum.</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="font-bold text-lg mb-3 text-green-700">Checking Maximum Vitamin C Constraint</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>Constraint:</strong> 8.8x1 + 5.2x2 ≤ 60</p>
              <p><strong>Boundary line:</strong> 8.8x1 + 5.2x2 = 60 (blue dashed line)</p>
              <p className="bg-yellow-50 p-3 rounded">
                <strong>Question:</strong> Does our green line stay below this maximum?
              </p>
              <div className="bg-blue-50 p-3 rounded">
                <p><strong>Test the endpoints:</strong></p>
                <p>• Point A(0, 5): Vit C = 26 mg ≤ 60 ✓</p>
                <p>• Point B(5, 0): Vit C = 44 mg ≤ 60 ✓</p>
                <p className="font-bold text-green-600 mt-2">Both endpoints satisfy the maximum! The entire green line is below the maximum.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="font-bold text-lg mb-3 text-green-700">Identifying the Feasible Region</h4>
            <div className="space-y-3 text-gray-700">
              <p className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                <strong className="text-xl">✓ FEASIBLE REGION IDENTIFIED!</strong><br/>
                The entire green line segment from (0,5) to (5,0) is feasible because:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>It satisfies x1 + x2 = 5 (by definition)</li>
                <li>It satisfies 8.8x1 + 5.2x2 ≥ 20 (above red line)</li>
                <li>It satisfies 8.8x1 + 5.2x2 ≤ 60 (below blue line)</li>
                <li>It satisfies x1, x2 ≥ 0 (in first quadrant)</li>
              </ul>
              <div className="bg-yellow-50 p-3 rounded mt-4">
                <p><strong>Important:</strong> For a line segment, the optimal solution must be at one of the two endpoints (corner points). We do not need to check points in the middle!</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h4 className="font-bold text-lg mb-3 text-green-700">Evaluating Corner Points</h4>
            <div className="space-y-3">
              <p className="text-gray-700"><strong>Objective Function:</strong> Minimize Z = 5x1 + 10x2</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                  <h5 className="font-bold text-red-700 mb-2">Point A (0, 5)</h5>
                  <p><strong>Servings:</strong> 0 bananas, 5 apples</p>
                  <p><strong>Vitamin C:</strong> 8.8(0) + 5.2(5) = 26 mg ✓</p>
                  <p><strong>Cost:</strong> Z = 5(0) + 10(5) = <span className="text-2xl font-bold">Rs.50</span></p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                  <h5 className="font-bold text-yellow-700 mb-2">Point B (5, 0)</h5>
                  <p><strong>Servings:</strong> 5 bananas, 0 apples</p>
                  <p><strong>Vitamin C:</strong> 8.8(5) + 5.2(0) = 44 mg ✓</p>
                  <p><strong>Cost:</strong> Z = 5(5) + 10(0) = <span className="text-2xl font-bold">Rs.25</span></p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded mt-4">
                <p className="font-bold">Comparison: Rs.25 is less than Rs.50</p>
                <p>Point B has the lower cost!</p>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h4 className="font-bold text-2xl mb-3 text-green-700 text-center">OPTIMAL SOLUTION</h4>
            <div className="bg-gradient-to-r from-yellow-100 to-green-100 p-6 rounded-lg border-4 border-green-500">
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-green-600">Point B: (5, 0)</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-lg mb-2">Daily Servings:</h5>
                  <p className="text-3xl">5 Bananas</p>
                  <p className="text-3xl">0 Apples</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-bold text-lg mb-2">Results:</h5>
                  <p className="text-2xl font-bold text-green-600">Cost: Rs.25/day</p>
                  <p className="text-xl">Vitamin C: 44 mg</p>
                  <p className="text-sm text-gray-600">(Within 20-60 mg range)</p>
                </div>
              </div>
              <div className="mt-6 bg-white p-4 rounded-lg">
                <h5 className="font-bold text-lg mb-2">Why This Solution?</h5>
                <ul className="space-y-2">
                  <li>✓ Bananas are cheaper: Rs.5 vs Rs.10 per serving</li>
                  <li>✓ Bananas have more Vitamin C: 8.8 mg vs 5.2 mg per serving</li>
                  <li>✓ Satisfies all constraints</li>
                  <li>✓ Gives absolute minimum cost</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h4 className="font-bold text-lg mb-3 text-green-700">Quick Reference: Solution Steps</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-300 px-3 py-2">Step</th>
                <th className="border border-green-300 px-3 py-2">Action</th>
                <th className="border border-green-300 px-3 py-2">Formula/Calculation</th>
                <th className="border border-green-300 px-3 py-2">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-green-300 px-3 py-2">1</td>
                <td className="border border-green-300 px-3 py-2">Plot equality</td>
                <td className="border border-green-300 px-3 py-2">x1 + x2 = 5</td>
                <td className="border border-green-300 px-3 py-2">Line from (0,5) to (5,0)</td>
              </tr>
              <tr>
                <td className="border border-green-300 px-3 py-2">2</td>
                <td className="border border-green-300 px-3 py-2">Check min Vit C</td>
                <td className="border border-green-300 px-3 py-2">8.8x1 + 5.2x2 ≥ 20</td>
                <td className="border border-green-300 px-3 py-2">Entire line satisfies</td>
              </tr>
              <tr>
                <td className="border border-green-300 px-3 py-2">3</td>
                <td className="border border-green-300 px-3 py-2">Check max Vit C</td>
                <td className="border border-green-300 px-3 py-2">8.8x1 + 5.2x2 ≤ 60</td>
                <td className="border border-green-300 px-3 py-2">Entire line satisfies</td>
              </tr>
              <tr>
                <td className="border border-green-300 px-3 py-2">4</td>
                <td className="border border-green-300 px-3 py-2">Identify corners</td>
                <td className="border border-green-300 px-3 py-2">-</td>
                <td className="border border-green-300 px-3 py-2">A(0,5) and B(5,0)</td>
              </tr>
              <tr>
                <td className="border border-green-300 px-3 py-2">5</td>
                <td className="border border-green-300 px-3 py-2">Evaluate A</td>
                <td className="border border-green-300 px-3 py-2">Z = 5(0) + 10(5)</td>
                <td className="border border-green-300 px-3 py-2">Z = Rs.50</td>
              </tr>
              <tr>
                <td className="border border-green-300 px-3 py-2">5</td>
                <td className="border border-green-300 px-3 py-2">Evaluate B</td>
                <td className="border border-green-300 px-3 py-2">Z = 5(5) + 10(0)</td>
                <td className="border border-green-300 px-3 py-2">Z = Rs.25</td>
              </tr>
              <tr className="bg-yellow-100 font-bold">
                <td className="border border-green-300 px-3 py-2">6</td>
                <td className="border border-green-300 px-3 py-2">Select minimum</td>
                <td className="border border-green-300 px-3 py-2">min(50, 25)</td>
                <td className="border border-green-300 px-3 py-2">B(5,0): Rs.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FruitOptimization;

