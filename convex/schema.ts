import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    endsOn: v.optional(v.number()),
    subscriptionId: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_subscriptionId", ["subscriptionId"]),

  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    ownerId: v.string(),
    createdAt: v.number(),
    content: v.string(),
    completionStatus: v.number(),
  }).index("by_owner", ["ownerId"]),

  messages: defineTable({
    content: v.string(),
    senderId: v.string(),
    projectId: v.id("projects"),
    createdAt: v.number(),
  }).index("by_project", ["projectId"]),

  activities: defineTable({
    activityType: v.string(),
    userId: v.string(),
    projectId: v.id("projects"),
    timestamp: v.number(),
    text: v.string(),
  }).index("by_project", ["projectId"]),
});
