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

## Adding && Deleting Users 新建于删除用户（用户操作）

> https://blog.csdn.net/u013216667/article/details/70158452

> 输入命令的时候一定要加上 ; 负责 mysql 会认为 命令没有输入完毕；
> 所有的这些命令 都可以在 navicat 上面去运行，主要是会有智能提示（按tab 键 快速选择提示）；
> 真正写代码的时候，所有的命令都应该先在 navicat 中测试一遍；

```bash
# login by root user 
mysql -u root -p

# show all database
SHOW DATABASES;

# spec mysql database
USE mysql;

# show all the tables from mysql database
SHOW TABLES;

# 主要是通过控制 mysql.user 来控制用户'
SHOW COLUMNS FROM user;

# insert a new user
INSERT INTO user
(host, user, password,select_priv, insert_priv, update_priv)
VALUES ('localhost', 'chris', PASSWORD('chris2014'), 'Y', 'Y', 'Y');
# localhost means you will only to be able to connect from the local computer ; we can allow remote connections using the percentage sign(%);  
# 在Ubuntu服务器下，MySQL默认是只允许本地登录，因此需要修改配置文件将地址绑定给注释掉：#bind-address = 127.0.0.1     #注释掉这一行就可以远程登录了 

# 赋予某个用户权力
# 给某个用户的权限 第一个* 指的是数据库 第二个 *  指的是 表； *.* 表示赋予用户操作服务器上所有数据库所有表的权限
GRANT ALL PROVILEGES ON *.* TO 'chris'@'localhost';
# e.g. 给来自10.163.225.87的用户joe分配可对数据库vtdc的employee表进行select,insert,update,delete,create,drop等操作的权限，并设定口令为123。
# https://blog.csdn.net/wengyupeng/article/details/3290415
grant select,insert,update,delete,create,drop on vtdc.employee to joe@10.163.225.87 identified by ‘123′;

# mysql 新设置用户或更改密码后需用flush privileges刷新MySQL的系统权限相关表，否则会出现拒绝访问，还有一种方法，就是重新启动mysql服务器，来使新设置生效。­
FLUSH PRIVILEGES;

# 删除用户
DROP USER 'chris'@'localhost';

```

1. ALL PRIVILEGES 

* CREATE allows them to create new tabels or databases
* DROP allows them to them to delete tables or databases
* DELETE allows them to delete rows from tables
* INSERT allows them to insert rows into tables
* SELECT allows them to use the Select command to read through databases
* UPDATE allows them to update table rows 
* GRANT OPTION allows them to grant or remove other user's privileges  

2. navicat 快捷键

![](./img-md/navicat_query.png)

## Creating & Seleting & Deleting Databases

```bash
# Create 
CREATE DATABASE my_database;

# SELECTE
USE mydata_base;

# DROP
DROP DATABASE my_database


```
