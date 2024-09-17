import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { projectId: v.id("projects"), text: v.string(), userId: v.string(), activityType: v.string() },
  handler: async (ctx, args) => {
    const activityId = await ctx.db.insert("activities", {
      projectId: args.projectId,
      text: args.text,
      userId: args.userId,
      activityType: args.activityType,
      timestamp: Date.now(),
    });
    return activityId;
  },
});

export const list = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("activities")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .order("desc")
      .take(50);
  },
});