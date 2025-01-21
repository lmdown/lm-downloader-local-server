CREATE TABLE "t_ai_app" (
	"id"	            INTEGER UNIQUE,
	"name"	            VARCHAR(255),
	"install_name"	    VARCHAR(255) NOT NULL UNIQUE, -- 安装名，在脚本和安装目录的 apps 目录下，用此名称可一一对应。整个商店中，此名称不能重复。
	"license_info"	    TEXT,
	"is_runtime_update_allowed"	INTEGER DEFAULT 1,
	"ref_links"	    	TEXT,
	"download_info"	    TEXT,
	"install_limit"	    TEXT,
	"current_version"   TEXT,
	"tags"	            TEXT,
	"snapshots"         TEXT,
    "create_time"	    INTEGER,
	"update_time"	    INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT)
);

-- App描述信息
CREATE TABLE "t_ai_app_desc" (
	"id"	        INTEGER UNIQUE,
    "app_id"	    INTEGER,
    "name"	        TEXT, -- 被翻译为特定语言的名称
    "short_desc"    TEXT, -- 被翻译为特定语言的简短描述信息，可以是一个短语，一句话
    "desc"	        TEXT, -- 被翻译为特定语言的描述信息
    "create_time"	INTEGER DATETIME NOT NULL,
	"update_time"	INTEGER DATETIME NOT NULL,
    "locale"        TEXT  DEFAULT "en",
    PRIMARY KEY("id" AUTOINCREMENT)
);

-- App Versions
CREATE TABLE "t_ai_app_version" (
	"id"	        INTEGER UNIQUE,
	"app_id"	    INTEGER,
	"version"	    INTEGER,
	"icon"	        INTEGER,
    "release_notes" TEXT,
	"release_time"	DATETIME, -- 程序发布时间。尽量用官方发布时间。如果没有，就用此记录创建时间。
    "locale"        TEXT  DEFAULT "en",
	"create_time"	INTEGER DATETIME NOT NULL,
	"update_time"	INTEGER DATETIME NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

-- 介绍AI应用的文章
CREATE TABLE t_app_story (
    id 					INTEGER UNIQUE,
    title 				TEXT NOT NULL,
    slug 				TEXT NOT NULL,
	short_desc	    	TEXT,
    content 			TEXT NOT NULL,
    cover_image_url 	TEXT NOT NULL,
    tags 				TEXT,
    published 			BOOLEAN DEFAULT FALSE,
	"locale"        	TEXT  DEFAULT "en",
	"related_app_ids" 	TEXT,
	"create_time"		INTEGER DATETIME NOT NULL,
	"update_time"		INTEGER DATETIME NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

