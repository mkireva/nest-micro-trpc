import { relations } from 'drizzle-orm';
import { index } from 'drizzle-orm/pg-core';
import {
  date,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { uploads } from 'src/upload/schema';
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
  lyricsBG: text('lyrics_bg'),
  lyricsDE: text('lyrics_de'),
  lyricsEN: text('lyrics_en'),
  lyricsFR: text('lyrics_fr'),
  createDate: date('create_date'),
  timestamp: timestamp('creation_date').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  price: numeric('price', { precision: 10, scale: 2 }),
  paymentId: text('payment_id'),
  userId: integer('user_id').references(() => users.id),
},
  (table) => [index('test').on(table.title)]
);

export const scoresRelations = relations(scores, ({ one, many }) => ({
  user: one(users, {
    fields: [scores.userId],
    references: [users.id],
  }),
  uploads: many(uploads),
}));
