# InterviewHub: MongoDB Database Architecture & Storage Design

This document outlines the scalable, optimized, and production-ready MongoDB architecture for **InterviewHub**.

---

## 1. Core Architecture Strategy

### Normalized vs. Denormalized
*   **Normalized:** Users, Companies, and Experiences are separate collections linked by `ObjectId` to ensure data integrity and reduce redundancy for heavy objects.
*   **Denormalized:** Basic fields like `companyName` and `companyLogo` are duplicated inside the `Experiences` collection. This allows for ultra-fast "card view" rendering without complex `$lookup` aggregations or multiple API calls.

### Scalable Storage
*   **Embedded Arrays:** Interview Rounds and Topics are embedded within the `Experience` document. Since interview rounds rarely exceed 10-15, this stays well within MongoDB's 16MB document limit and optimizes read performance.
*   **Bucket Pattern (Optional):** For analytics (views/likes over time), a bucket pattern could be used, though simple counters are currently implemented for performance.

---

## 2. Recommended Indexing Strategy

### Filtering & Sorting Indexes
*   **Single Field:** `companyId`, `role`, `experienceLevel`, `verdict`, `status`.
*   **Compound Index:** `{ status: 1, createdAt: -1 }` for the main feed.
*   **Multi-key Index:** `tags: 1` and `topics.name: 1` for filtering by technical domains.

### Search Optimization
*   **Text Index:** A weighted text index on `companyName (10)`, `role (8)`, `tags (5)`, and `summary (3)`.
    ```javascript
    ExperienceSchema.index({ companyName: 'text', role: 'text', ... }, { weights: { ... } });
    ```

### Uniqueness & Integrity
*   **Unique Compound:** `{ userId: 1, storyId: 1 }` on `Likes` and `Bookmarks` collections to prevent duplicate interactions.

---

## 3. Example JSON Documents

### Experience Document
```json
{
  "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
  "user": "65f1a2b3c4d5e6f7a8b9c0a1",
  "companyId": "65f1a2b3c4d5e6f7a8b9c0b1",
  "companyName": "Google",
  "companyLogo": "https://logo.clearbit.com/google.com",
  "role": "Senior Software Engineer",
  "experienceLevel": "Senior Level",
  "candidateExperience": 5,
  "location": "Mountain View, CA",
  "salary": "$180k - $220k",
  "interviewMode": "Online",
  "verdict": "Selected",
  "applicationMethod": "Referral",
  "summary": "A 5-round intensive process focusing on distributed systems and problem solving.",
  "processOverview": "The process started with a recruiter call, followed by a technical phone screen...",
  "topics": [
    { "name": "DSA", "importance": 5 },
    { "name": "System Design", "importance": 5 }
  ],
  "rounds": [
    {
      "number": 1,
      "title": "Technical Phone Screen",
      "desc": "Focus on array manipulation and complexity analysis.",
      "details": "Questions about sliding window and hash maps.",
      "solution": "https://github.com/user/solutions/1"
    }
  ],
  "difficulty": "Hard",
  "tags": ["BigTech", "DistributedSystems", "Python"],
  "likesCount": 142,
  "viewsCount": 1205,
  "status": "Approved",
  "isVerified": true,
  "createdAt": "2024-03-12T10:00:00Z"
}
```

---

## 4. MongoDB Atlas Best Practices

1.  **Connection Pooling:** Use `maxPoolSize` in your connection string to handle high concurrent traffic.
2.  **RBAC (Role-Based Access Control):** Ensure the backend uses a dedicated database user with `readWrite` permissions limited to the `InterviewHub` database.
3.  **VPC Peering:** If hosted on AWS/Azure, use VPC peering for lower latency and enhanced security.
4.  **Auto-Scaling:** Enable Tier Auto-scaling in Atlas to handle traffic spikes during hiring seasons.
5.  **Performance Advisor:** Regularly check the Atlas Performance Advisor for slow-running queries and missing indexes.

---

## 5. API-Ready Design Considerations

*   **Pagination:** Use `limit()` and `skip()` or cursor-based pagination for the Explore page.
*   **Selective Projection:** Use `.select('companyName role summary likesCount')` for list views to reduce network payload.
*   **Lean Queries:** Use `.lean()` in Mongoose for read-only operations to bypass the overhead of full Mongoose documents.
*   **Aggregation Framework:** Use `$lookup` sparingly for Admin Dashboards where real-time de-normalized data isn't available.

---

## 6. Schema Scalability
The architecture is designed to handle:
*   **Horizontal Scaling:** Using MongoDB Sharding (sharding by `companyId` or `userId`).
*   **Read Scaling:** Using Replica Sets for distributed read operations.
*   **Search Scaling:** Atlas Search (Lucene) can be integrated easily as it maps directly to this schema structure.
