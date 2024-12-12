# NotifyOne Dashboard

NotifyOne Frontend is the client-side application for [NotifyOne](https://github.com/tata1mg/notifyone), an open-source, event-based notification system designed to provide a scalable, multi-channel notification solution.

## Why NotifyOne Dashboard?

NotifyOne Frontend offers a user-friendly interface to interact with the NotifyOne backend, empowering users to configure events, define notification channels, and manage notification priorities seamlessly.

## Features

- **Intuitive Interface**: User-friendly interface for configuring events and notification channels.
- **Real-time Updates**: Instant updates on notification statuses and event configurations.
- **Customizable Templates**: Easily create and manage notification templates using Jinja2 templating engine.
- **Flexible Integration**: Ideal for standalone setups or container-based deployments.
- **Scalable**: Designed to handle large volumes of notifications and users effectively.
- **Fault-tolerant**: Utilizes queuing mechanisms for a robust and fault-tolerant architecture.
- **Responsive Design**: Mobile-friendly design for accessibility across devices.

## Getting Started

### Installation

```bash
# Clone the repository
git clone [NotifyOne Dashboard](https://github.com/tata1mg/notifyone-dashboard.git)

# Navigate to the project directory
cd notifyone-dashboard

# Check node version
node --version
# Install node 20.4.0 if not installed (nvm must be installed before hand)
nvm install 20.4.0

# Install dependencies (strictly use --legacy-peer-deps)
npm install --legacy-peer-deps

# Create the config json file taking reference from config template in src folder
# Update the base api url in config
cd src
cp config.template.json config.json
cd ..

# Start the development server
npm start

```

## Starting the backend server

Remember, before running the dashboard, make sure that the backend is running. To run the backend, checkout the readme of the [NotifyOne](https://github.com/tata1mg/notifyone) repository.
