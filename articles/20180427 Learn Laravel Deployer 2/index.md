---
permalink: learn-laravel-deployer-2
image: /covers/learn-laravel-deployer-2.jpg
description: It's set up time! Let's see how to create and configure a server that can host your Laravel application.
tags: ['Laravel', 'DevOps']
date: 2018-04-27T08:58:00Z
disqus: ghost-5ae2d21eb70f970868cfdb18
---

# Setting up a Laravel server

<YouTube url="https://www.youtube.com/embed/HQD4yLv-SCQ?rel=0" />

## Checklist

#### Create droplet and link domain
β &nbsp;Create a droplet via [Digital Ocean (**$10 discount link** π₯)](https://m.do.co/c/c6ce8db48f10). \
β &nbsp;Add your SSH key when creating your droplet. \
β &nbsp;Add your domain name in the βNetworkingβ section. \
β &nbsp;Points `@` to the newly created droplet.

#### Make bash more friendly
β &nbsp;`ssh root@IPADDRESS` \
β &nbsp;`vim ~/.bashrc` β search `/force_color_prompt` β uncomment \
β &nbsp;`vim ~/.bashrc` β search `/PS1` β remove `@\h` and `\w` becomes `\W`  \
β &nbsp;Reload shell `exec bash -l`

#### Add locales
β &nbsp;`echo "LC_ALL=en_US.UTF-8" >> /etc/default/locale` \
`locale-gen en_US.UTF-8` \
β &nbsp;`exit` and reconnect `ssh root@IPADDRESS`

#### Install php 7.2
β &nbsp;`apt-get update -y && apt-get upgrade -y` \
β &nbsp;`apt-get -y install python-software-properties` \
β &nbsp;`add-apt-repository -y ppa:ondrej/php` \
β &nbsp;`apt-get update -y` \
β &nbsp;`apt-get -y install php7.2 php7.2-common php7.2-gd php7.2-intl php7.2-zip php7.2-sqlite3 php7.2-mysql php7.2-fpm php7.2-mbstring php7.2-xml php7.2-curl php7.2-memcached unzip zip composer`

#### Configure your ngnix server

```bash
server {
    listen 80;
    listen [::]:80 ipv6only=on;
    server_name mydomain.com;
    root /var/www/mydomain.com/current/public;
    index index.html index.htm index.php;

    charset utf-8;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/laraveldeployer.com-error.log error;

    error_page 404 /index.php;

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
        fastcgi_pass unix:/run/php/php7.2-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

β &nbsp;`service nginx restart && service php7.2-fpm reload`

#### Set up mysql and create a database
β &nbsp;`cat /root/.digitalocean_password` \
β &nbsp;`mysql_secure_installation` \
β &nbsp;`mysql -uroot -p -e "create database laravel;"`