/**
 * --- PENDING SUBMISSIONS: DATA REPOSITORY ---
 * Centralized store for mock moderation intelligence nodes.
 * Each round contains detailed submission telemetry including solved code blocks.
 */
export const pendingSubmissionsData = [
  { 
      id: 'IQ-1042', 
      company: 'Google', 
      role: 'SDE-I', 
      type: 'Full-time',
      location: 'Bangalore, IN',  
      user: 'saikriz898', 
      date: 'March 28, 2026', 
      status: 'Pending',
      experience: '4 years',
      overview: 'Comprehensive DSA protocol covering Graph theory, Dynamic Programming, and Behavioral synopses for SDE-I role.',
      topics: ['Graphs', 'DP', 'System Design', 'Behavioral'],
      rounds: [
          { 
            title: 'Technical Assessment', 
            desc: 'High-density focus on core DSA node traversals.', 
            duration: '60m', 
            problems: [
                { 
                  question: 'Find the shortest path in a weighted DAG.', 
                  solution: 'Implemented Dijkstra’s using a priority queue. Optimized for O(E log V).', 
                  difficulty: 'Hard',
                  code: `
function dijkstra(adj, startNode) {
  let distances = {};
  let pq = new PriorityQueue();
  
  distances[startNode] = 0;
  pq.enqueue(startNode, 0);
  
  while(!pq.isEmpty()) {
    let { node: currNode } = pq.dequeue();
    
    for(let neighbor in adj[currNode]) {
      let distance = distances[currNode] + adj[currNode][neighbor];
      if(!distances[neighbor] || distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enqueue(neighbor, distance);
      }
    }
  }
  return distances;
}`
                },
                { 
                  question: 'Detect cycle in an undirected graph.', 
                  solution: 'Used Union-Find with path compression and union by rank.', 
                  difficulty: 'Medium',
                  code: `
class DSU {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(i) {
    if (this.parent[i] == i) return i;
    return this.parent[i] = this.find(this.parent[i]);
  }
  
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    if (rootI != rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) [rootI, rootJ] = [rootJ, rootI];
      this.parent[rootJ] = rootI;
      if (this.rank[rootI] == this.rank[rootJ]) this.rank[rootI]++;
      return true;
    }
    return false;
  }
}`
                }
            ],
            feedback: 'Candidate displayed deep knowledge of graph theory but initially missed the edge case of disconnected components.'
          },
          { 
            title: 'System Design Hub', 
            desc: 'Architecture review for a scalable news feed system.', 
            duration: '90m', 
            problems: [
                { 
                  question: 'Design a global news feed service.', 
                  solution: 'Proposed a push-based model with Redis caching and Kafka for event streaming.', 
                  difficulty: 'High' 
                }
            ],
            feedback: 'Strong understanding of load balancing and database sharding.'
          },
      ],
      advice: 'Focus heavily on Dijkstra’s and BFS variations for this node.'
  },
  { 
      id: 'IQ-1038', 
      company: 'Flipkart', 
      role: 'Data Scientist', 
      type: 'Full-time',
      location: 'Remote',
      user: 'sneha_s', 
      date: 'March 08, 2026',
      status: 'Pending',
      experience: '2 years',
      overview: 'Detailed ML pipeline discussion, statistical modeling nodes, and large-scale data engineering challenges.',
      topics: ['Machine Learning', 'SQL', 'NLP', 'Statistics'],
      rounds: [
          { 
            title: 'ML Foundations', 
            desc: 'Discussion on bias-variance tradeoff and gradient descent optimization.', 
            duration: '60m',
            problems: [
                { 
                  question: 'Explain the difference between L1 and L2 regularization.', 
                  solution: 'Detailed explanation about sparsity vs weight shrinkage.', 
                  difficulty: 'Medium' 
                }
            ]
          },
          { 
            title: 'Live Coding', 
            desc: 'Implementing a random forest model from scratch.', 
            duration: '75m',
            problems: [
                { 
                  question: 'Write a SQL query to find the 3rd highest spending customer per month.', 
                  solution: 'Used window function DENSE_RANK() with PARTITION BY.', 
                  difficulty: 'Hard',
                  code: `
SELECT customer_id, total_spent
FROM (
  SELECT customer_id, SUM(amount) as total_spent,
         DENSE_RANK() OVER (PARTITION BY month ORDER BY SUM(amount) DESC) as rnk
  FROM transactions
  GROUP BY customer_id, month
) t
WHERE rnk = 3;`
                }
            ]
          },
      ],
      advice: 'Master window functions and deep dive into tree-based model architectures.'
  }
];
