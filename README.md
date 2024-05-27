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

# Install dependencies
npm install

# Start the development server
npm start

```
## Starting the backend server
Remember, before running the dashboard, make sure that the backend is running. To run the backend, checkout the readme of the [NotifyOne](https://github.com/tata1mg/notifyone) repository.

## Configuration File Explanation
This section provides an overview of the configuration settings used in our application. The configuration is divided into three main parts: common, communication, and server. Each part has specific settings that control various aspects of the application.

### Common Configuration
The common section includes settings that are shared across different parts of the application.

```bash
- **sentry.dns**: This setting is used to configure the DNS for Sentry, a tool for real-time error tracking.
- **serverDomain**: The base domain for the server, used for constructing URLs.
- **gumletS3BaseUrl**: Base URL for Gumlet S3, likely used for media storage and retrieval.

```

### Communication Configuration
The `communication` section handles settings related to various communication services, including email, push notifications, SMS, and WhatsApp.

```bash
- **appUrl**: The base URL for the communication application (currently empty).
- **communicationAppUrlPort**: The port number for the communication application, defaulting to 8000.
- **emailEvents**: API endpoint for retrieving email templates.
- **emailEventsUpdate**: API endpoint for updating email templates.
- **passPhrase**: Placeholder for a passphrase (currently empty).
- **platformLogin**: Placeholder for platform login details (currently empty).
- **previewEmailEvent**: API endpoint for previewing email templates.
- **pushNotificationEvents**: API endpoint for retrieving push notification templates.
- **pushNotificationEventsUpdate**: API endpoint for updating push notification templates.
- **sentry.dns**: This setting is repeated here for Sentry configuration.
- **serverDomain**: The base domain for communication services, used for constructing URLs.
- **smsEvents**: API endpoint for retrieving SMS templates.
- **smsEventsUpdate**: API endpoint for updating SMS templates.
- **tata1mgLogo**: Placeholder for the Tata 1mg logo (currently empty).
- **useMockAPI**: Boolean flag to determine if a mock API should be used, set to `false`.
- **whatsAppEvents**: API endpoint for retrieving WhatsApp templates.
- **whatsAppEventsUpdate**: API endpoint for updating WhatsApp templates.
- **ravenAppEndpoint**: API endpoint for Raven, likely related to logging or monitoring.

```

### Server configuration
The `server` section includes settings specific to the server environment.

```bash
- **env**: Specifies the environment, set to `prod` (production).
- **is_secure**: Boolean flag indicating whether the server is running in a secure mode, set to `false`.
- **port**: The port number on which the server is running, defaulting to 3000.
- **base_notification_url**: Base URL for notification services.
- **base_site_url**: Base URL for the site, set to `0.0.0.0` indicating it listens on all interfaces.
- **google_client_id**: Client ID for Google authentication.
- **jwt_secret**: Secret key used for signing JSON Web Tokens (JWTs).

```


