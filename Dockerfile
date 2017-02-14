FROM centos:centos6

RUN yum install -y epel-release
RUN yum install -y nodejs npm
RUN yum install -y cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel

RUN mkdir -p /usr/local/dnd-buddy
WORKDIR /usr/local/dnd-buddy
COPY . .
RUN npm install
RUN ./node_modules/gulp/bin/gulp.js

EXPOSE 8080
CMD ["npm", "start"]
