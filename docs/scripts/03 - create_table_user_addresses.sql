use users_db;

CREATE TABLE user_addresses (
	id INT UNSIGNED auto_increment PRIMARY KEY NOT NULL,
	street varchar(100) NOT NULL,
	number varchar(50) NOT NULL,
	complement varchar(100) NOT NULL,
	neighborhood varchar(50) NOT NULL,
	city varchar(50) NOT NULL,
	state varchar(50) NOT NULL,
	zip_code varchar(50) NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	active BOOL NOT NULL DEFAULT true,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT UNSIGNED NOT NULL,
	updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
	updated_by INT UNSIGNED,
	deleted_at DATETIME NULL,
	deleted_by INT UNSIGNED,
    FOREIGN KEY (user_id) references users(id),
    FOREIGN KEY (created_by) references sys_users(id),
    FOREIGN KEY (updated_by) references sys_users(id),
    FOREIGN KEY (deleted_by) references sys_users(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
