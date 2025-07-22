import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { scores } from '../scores/schema';

export const uploads = pgTable('uploads', {
  id: serial('id').primaryKey(),
  fileName: varchar('file_name', { length: 255 }).notNull().unique(), // Unique, unguessable filename
  originalFileName: varchar('original_file_name', { length: 255 }).notNull(), // Original filename for display
  interpretName: varchar('interpret_name', { length: 255 }).notNull(),
  arrangementName: varchar('arrangement_name', { length: 255 }).notNull(),
  albumName: varchar('album_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  category: text('category'),
  fileSize: integer('file_size').notNull(), // in bytes
  s3Key: text('s3_key').notNull().unique(), // S3 object key
  s3Bucket: varchar('s3_bucket', { length: 100 }).notNull(),
  s3Url: text('s3_url').notNull(), // Full S3 URL
  uploadedBy: integer('uploaded_by').references(() => users.id),
  scoreId: integer('score_id').references(() => scores.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

});

export const uploadsRelations = relations(uploads, ({ one }) => ({
  user: one(users, {
    fields: [uploads.uploadedBy],
    references: [users.id],
  }),
  score: one(scores, {
    fields: [uploads.scoreId],
    references: [scores.id],
  }),
}));
