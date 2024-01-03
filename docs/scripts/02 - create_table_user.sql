use users_db;

CREATE TABLE users (
	id INT UNSIGNED auto_increment PRIMARY KEY NOT NULL,
	document varchar(14) NOT NULL,
	name varchar(100) NOT NULL,
	birth_date DATETIME NOT NULL,
	active BOOL NOT NULL DEFAULT true,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT UNSIGNED NOT NULL,
	updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
	updated_by INT UNSIGNED,
	deleted_at DATETIME NULL,
	deleted_by INT UNSIGNED,
    FOREIGN KEY (created_by) references sys_users(id),
    FOREIGN KEY (updated_by) references sys_users(id),
    FOREIGN KEY (deleted_by) references sys_users(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
