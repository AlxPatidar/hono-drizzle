import { relations } from "drizzle-orm/relations";
import { posts, comments, users, likes } from "./schema";

export const commentsRelations = relations(comments, ({one}) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	comments: many(comments),
	likes: many(likes),
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	comments: many(comments),
	likes: many(likes),
	posts: many(posts),
}));

export const likesRelations = relations(likes, ({one}) => ({
	post: one(posts, {
		fields: [likes.postId],
		references: [posts.id]
	}),
	user: one(users, {
		fields: [likes.userId],
		references: [users.id]
	}),
}));