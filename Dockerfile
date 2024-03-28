FROM --platform=linux/amd64 node:20.4.0-slim

# Args passed in the build command
ARG SERVICE_NAME

RUN apt-get update && \
    apt-get install -y \
        git \
        gcc \
        openssh-server \
        curl

RUN echo "Y" | apt-get install procps

#RUN pip install --user pipenv
#RUN pip install --upgrade pip

# Create home ubuntu service
RUN mkdir -p /home/ubuntu/apps/$SERVICE_NAME/logs

# switch to code folder
WORKDIR /home/ubuntu/apps/$SERVICE_NAME

# Copy and install requirements
#COPY Pipfile Pipfile.lock /home/ubuntu/apps/$SERVICE_NAME/
#RUN /root/.local/bin/pipenv sync --system

# Copy code folder
COPY . .

RUN npm i --legacy-peer-deps
RUN cd src/server/
RUN npm i --legacy-peer-deps
RUN cd ../../

# Start the FE service
CMD ["npm", "run", "dev"]

# Start the server
RUN cd src/server/
CMD ["npm", "start"]