CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY,
	"tasksName" varchar (100) NOT NULL,
	"taskStatus" boolean
	);
	
INSERT INTO "tasks"
	("tasksName", "taskStatus")
VALUES 
	('Clean the kids bedroom', false),
	('Complete homework', false),
	('Make Dinner', false),
	('Buy colorful lightbulb', false);