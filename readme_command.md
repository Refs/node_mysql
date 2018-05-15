# Mysql tutorial from command

## important terms 

1. Database : is a collection of tables where the data is stored in a systematic format 

2. Tables : is just a matrix(母体) or rows and columns 

3. columns : is a long stack of cells that has data of the same type 

4. Row : is just a record 

5. primary key is usually a unique and that could not coour twice in the table 

6. foreign key : is just something that links two tables together 

7. compound key : is acturally a key that consists of multiple columns . Sometimes one column is not enough to give us acquired uniqueness in our table 

8. index: 

9. redundancy :


## connecting to Mysql Server

```bash
# Ubuntu 环境中

# 查看mysql 版本信息
mysqladmin --version 

# 初始化root密码
mysqladmin -u root password "123456"

# connect to the server
mysql
# login by root user 
mysql -u root -p 

# show all database
show databases;
SHOW DATABASES;

# unlink the server
quit;

```

## Adding && Deleting Users

> 输入命令的时候一定要加上 ; 负责 mysql 会认为 命令没有输入完毕；
> 所有的这些命令 都可以在 navicat 上面去运行，主要是会有智能提示（按tab 键 快速选择提示）；
> 真正写代码的时候，所有的命令都应该先在 navicat 中测试一遍；

```bash
# login by root user 
mysql -u root -p

# show all database
SHOW DATABASES;

# 指定某个数据库
USE databaseName;

# 展示collection 中的所有 table
SHOW TABLES;

# 展示table 中的 所有 columns; 等于是 在navicat 中点击了 '设计表'
SHOW COLUMNS FROM tableName;

# insert a new record
INSERT INTO tableName ;
# .e.g
INSERT INTO user
(host, user, password,select_priv, insert_priv, update_priv)
VALUES ('localhost', 'chris', PASSWORD('chris2014'), 'Y', 'Y', 'Y');

# 查找 某一个record 中的某几个字段
SELECT host, user, password(fields) FROM user(tableName) WHERE user = 'chris';



```

1. ALL PRIVILEGES 

* CREATE allows them to create new tabels or databases
* DROP allows them to them to delete tables or databases
* DELETE allows them to delete rows from tables
* INSERT allows them to insert rows into tables
* SELECT allows them to use the Select command to read through databases
* UPDATE allows them to update table rows 
* GRANT OPTION allows them to grant or remove other user's privileges  
