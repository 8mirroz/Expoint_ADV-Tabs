CREATE TABLE "behavioral_signals" (
	"signal_id" uuid PRIMARY KEY NOT NULL,
	"timestamp" timestamp NOT NULL,
	"source" varchar(50) NOT NULL,
	"topic" varchar(50) NOT NULL,
	"priority" varchar(20) NOT NULL,
	"payload" jsonb NOT NULL,
	"metadata" jsonb NOT NULL,
	"signature" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consent_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" text,
	"purpose" varchar(50) NOT NULL,
	"status" varchar(20) NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"form_id" text NOT NULL,
	"policy_version" varchar(20) NOT NULL,
	"ip_address" text,
	"user_agent" text
);
