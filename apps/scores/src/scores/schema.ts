import { relations } from 'drizzle-orm';
import {
  date,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from 'src/users/schema';

export const scores = pgTable('scores', {
  id: serial('id').primaryKey(),
  title: text('title'),
  composer: text('composer'),
  lyricist: text('lyricist'),
  location: text('location'),
  description: text('description'),
  genre: text('genre'),
  category: text('category'),
  key: text('key'),
  color: text('color'),
  lyrics: text('lyrics'),
  createDate: date('create_date'),
  timestamp: timestamp('creation_date').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  price: numeric('price', { precision: 10, scale: 2 }),
  paymentId: text('payment_id'),
  userId: integer('user_id').references(() => users.id),
});

export const scoresRelations = relations(scores, ({ one }) => ({
  user: one(users, {
    fields: [scores.userId],
    references: [users.id],
  }),
}));
