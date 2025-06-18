CREATE TABLE `customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`gender` text NOT NULL,
	`contact` text NOT NULL,
	`id_card` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_contact_unique` ON `customers` (`contact`);--> statement-breakpoint
CREATE UNIQUE INDEX `customers_id_card_unique` ON `customers` (`id_card`);--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` integer NOT NULL,
	`room_id` integer NOT NULL,
	`check_in_time` integer NOT NULL,
	`stay_days` integer NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `room_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type_name` text NOT NULL,
	`star_rating` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type_id` integer NOT NULL,
	`price` real NOT NULL,
	`feature` text,
	`available_count` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `room_types`(`id`) ON UPDATE no action ON DELETE no action
);
