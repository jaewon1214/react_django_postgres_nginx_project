docker compose up -d --build jenkins
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
ca03ae4c72094044aeaa6a5ed3860c01

jaewon
jk12191427*


docker build --no-cache -t my-jenkins .
docker exec -it jenkins docker ps
  docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v //var/run/docker.sock:/var/run/docker.sock my-jenkins

docker rm -f frontend
docker rm -f postgres-db
docker rm -f django-backend
docker rm -f nginx