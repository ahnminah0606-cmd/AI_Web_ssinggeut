CREATE TABLE `allocations` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`topic_id` text NOT NULL,
	`assignments` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `allocation_group` ON `allocations` (`group_id`);--> statement-breakpoint
CREATE TABLE `attendance` (
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	PRIMARY KEY(`user_id`, `day`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `groups_code_unique` ON `groups` (`code`);--> statement-breakpoint
CREATE TABLE `limits` (
	`user_id` text NOT NULL,
	`day` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`user_id`, `day`)
);
--> statement-breakpoint
CREATE TABLE `members` (
	`group_id` text NOT NULL,
	`user_id` text NOT NULL,
	`joined` text NOT NULL,
	PRIMARY KEY(`group_id`, `user_id`)
);
--> statement-breakpoint
CREATE INDEX `member_user` ON `members` (`user_id`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `message_session` ON `messages` (`session_id`,`created`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`nickname` text NOT NULL,
	`role` text DEFAULT 'student' NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`topic_id` text,
	`title` text NOT NULL,
	`question` text DEFAULT '' NOT NULL,
	`opinion` text DEFAULT '' NOT NULL,
	`evidence` text DEFAULT '' NOT NULL,
	`next_question` text DEFAULT '' NOT NULL,
	`stance` text DEFAULT 'undecided' NOT NULL,
	`complete` integer DEFAULT 0 NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `session_owner` ON `sessions` (`owner`);--> statement-breakpoint
CREATE INDEX `session_topic` ON `sessions` (`topic_id`);--> statement-breakpoint
CREATE TABLE `teacher_requests` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`institution` text NOT NULL,
	`evidence` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`title` text NOT NULL,
	`context` text NOT NULL,
	`due` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `topic_group` ON `topics` (`group_id`);