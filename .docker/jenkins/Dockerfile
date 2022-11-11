FROM jenkins/jenkins:lts

USER root

RUN curl -L \  
    "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" \  
    -o /usr/local/bin/docker-compose \  
    && chmod +x /usr/local/bin/docker-compose  

#Update the username and password
ENV JENKINS_USER andre
ENV JENKINS_PASS melinski

EXPOSE 8080
EXPOSE 50000

USER jenkins