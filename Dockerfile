# Use the official Nginx image from Docker Hub
FROM nginx:latest

# Expose port 80 for HTTP traffic
EXPOSE 80

# The default Nginx command will start the server
# No need for an explicit CMD as it's included in the base image