# Use Node.js LTS version - more stable base image
FROM node:18-slim

# Install security updates and create non-root user
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y dumb-init && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    groupadd -r nodejs --gid=1001 && \
    useradd -r -g nodejs --uid=1001 nodejs

# Set working directory
WORKDIR /usr/src/app

# Copy package files for better layer caching
COPY src/package*.json ./

# Install dependencies
RUN npm install --only=production && npm cache clean --force

# Copy application source code
COPY src/ ./

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]