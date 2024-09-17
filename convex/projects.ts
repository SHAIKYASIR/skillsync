import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { name: v.string(), content: v.string(), ownerId: v.string() },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      content: args.content,
      ownerId: args.ownerId,
      createdAt: Date.now(),
      completionStatus: 0,
    });
    return projectId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

export const update = mutation({
  args: { id: v.id("projects"), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { content: args.content });
  },
});