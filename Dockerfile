ARG SYS_PLATFORM
FROM --platform=$SYS_PLATFORM node:20.4.0-slim

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

RUN npm i
# RUN cd server/
# RUN npm i --legacy-peer-deps
# RUN cd ../

# Create a limited access user and change ownership of the application directory
RUN useradd -m appuser && \
    chown -R appuser:appuser /home/ubuntu/apps/$SERVICE_NAME

# Switch to limited access user
USER appuser

# Start the FE service
CMD ["npm", "start"]

# Start the server
# RUN cd server/
# CMD ["npm", "start"]
