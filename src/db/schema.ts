import { pgTable, uuid, text, timestamp, varchar, jsonb } from 'drizzle-orm/pg-core';

export const consentLogs = pgTable('consent_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: text('session_id'),
  purpose: varchar('purpose', { length: 50 }).notNull(), // e.g., 'personal_data', 'marketing'
  status: varchar('status', { length: 20 }).notNull(),  // 'GRANTED', 'WITHDRAWN'
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  formId: text('form_id').notNull(),
  policyVersion: varchar('policy_version', { length: 20 }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});

export const behavioralSignals = pgTable('behavioral_signals', {
  signalId: uuid('signal_id').primaryKey(),
  timestamp: timestamp('timestamp').notNull(),
  source: varchar('source', { length: 50 }).notNull(),
  topic: varchar('topic', { length: 50 }).notNull(),
  priority: varchar('priority', { length: 20 }).notNull(),
  payload: jsonb('payload').notNull(),
  metadata: jsonb('metadata').notNull(),
  signature: text('signature'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
