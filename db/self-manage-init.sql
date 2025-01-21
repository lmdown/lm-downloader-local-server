CREATE TABLE "t_installed_instance" (
	"id"	                    INTEGER UNIQUE,
    "app_id"                    INTEGER,
	"name"	                    TEXT,
	"icon"	                    TEXT,
	"install_method"            TEXT, -- 安装方式，通过本软件安装的就是 default，而被导入的就是 import
	"version"                   TEXT,
    "file_storage_total_size"   INTEGER, -- 总存储大小，单位为字节
    "total_size_calc_time"      DATETIME, -- 总存储大小计算完成最近一次的时间
	"create_time"	            INTEGER DATETIME NOT NULL,
	"update_time"   	        INTEGER DATETIME NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

-- storage info
CREATE TABLE t_file_storage_info (
    "id"	                INTEGER UNIQUE,
    "installed_instance_id" INTEGER,
    "type"                  TEXT, 
    "icon"                  TEXT, -- 文件类型对应的图标，大部分能根据字典来匹配。但可执行文件的图标，每个都不一样，有可能需要专门提取和存储。
    location                TEXT,
    size                    INTEGER, -- 大小，单位为字节，如27464512，就是27MB
    device_type             TEXT,   -- portable
    storage_media_type      TEXT, --ssd, hdd, usb-flash
	"create_time"	        INTEGER DATETIME NOT NULL,
	"update_time"	        INTEGER DATETIME NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT)
);

