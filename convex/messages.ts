import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const send = mutation({
  args: { projectId: v.id("projects"), content: v.string(), senderId: v.string() },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      projectId: args.projectId,
      content: args.content,
      senderId: args.senderId,
      createdAt: Date.now(),
    });
    return messageId;
  },
});

export const list = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .order("desc")  // Change this to "desc" or "asc"
      .take(100);
  },
});