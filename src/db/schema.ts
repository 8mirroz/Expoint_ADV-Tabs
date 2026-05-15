import { pgTable, uuid, text, timestamp, varchar, jsonb, integer } from 'drizzle-orm/pg-core';

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
  sourcePage: text('source_page'),
});

export const uploadedFiles = pgTable('uploaded_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  leadId: uuid('lead_id'), 
  fileName: text('file_name').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  s3Url: text('s3_url').notNull(),
  status: varchar('status', { length: 20 }).default('pending_scan'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  source: text('source'),
  context: text('context'),
  segment: text('segment'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  status: varchar('status', { length: 30 }).default('new'),
});
