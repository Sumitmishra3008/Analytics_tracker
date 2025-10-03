# Swagger UI Integration

This document explains how to use the integrated Swagger UI for the Analytics Tracker API.

## 🚀 Quick Start

1. **Start the server:**

   ```bash
   npm run dev
   # or
   npm start
   ```

2. **Access Swagger UI:**
   Open your browser and navigate to: `http://localhost:5000/api-docs`

## 📚 Available Documentation URLs

| URL                                   | Description                           |
| ------------------------------------- | ------------------------------------- |
| `http://localhost:5000/`              | Landing page with documentation links |
| `http://localhost:5000/api-docs`      | Interactive Swagger UI documentation  |
| `http://localhost:5000/api-docs.json` | Raw OpenAPI specification (JSON)      |

## ✨ Swagger UI Features

### **Interactive Testing**

- **Try It Out**: Test API endpoints directly from the documentation
- **Request/Response Examples**: See real request and response data
- **Parameter Validation**: Get immediate feedback on invalid inputs
- **Authentication**: Test with different authentication methods (when implemented)

### **Enhanced Documentation**

- **Searchable Interface**: Find endpoints and schemas quickly
- **Expandable Sections**: Drill down into specific endpoint details
- **Schema Visualization**: Understand data structures at a glance
- **Multiple Examples**: See various use cases for each endpoint

### **Developer Tools**

- **Code Generation**: Generate client code in multiple languages
- **Export Options**: Download the OpenAPI specification
- **Custom Styling**: Clean, professional interface
- **Mobile Responsive**: Works on all device sizes

## 🎯 How to Use Swagger UI

### **1. Explore Endpoints**

- Browse available endpoints in the left sidebar
- Click on any endpoint to see detailed information
- View request/response schemas and examples

### **2. Test API Calls**

1. Click on an endpoint (e.g., `POST /api/events/createevent`)
2. Click the **"Try it out"** button
3. Fill in the required parameters
4. Click **"Execute"** to make the API call
5. View the response below

### **3. Understanding Responses**

- **200**: Successful operation
- **422**: Validation errors (check your input data)
- **500**: Server errors (check server logs)

## 📋 Example Usage Workflow

### **Creating an Event**

1. Navigate to `POST /api/events/createevent`
2. Click "Try it out"
3. Use this example payload:
   ```json
   {
     "user_id": "test_user_123",
     "event_name": "button_click",
     "event_data": {
       "button_name": "signup",
       "page": "homepage"
     }
   }
   ```
4. Click "Execute"
5. Check the response - should return `{"message": "Event created successfully"}`

### **Retrieving Events**

1. Navigate to `GET /api/events/getevents`
2. Click "Try it out"
3. Optionally add query parameters:
   - `start`: `2024-01-01`
   - `end`: `2024-12-31`
   - `event_name`: `button_click`
4. Click "Execute"
5. View the aggregated event data in the response

## 🔧 Configuration

The Swagger UI configuration is located in `src/config/swagger.js`:

```javascript
// Key configuration options
const swaggerOptions = {
  explorer: true, // Enable endpoint explorer
  swaggerOptions: {
    docExpansion: "none", // Start with collapsed sections
    filter: true, // Enable search filter
    showRequestDuration: true, // Show API response times
    tryItOutEnabled: true, // Enable "try it out" functionality
  },
};
```

## 🎨 Customization

### **Custom Styling**

The Swagger UI includes custom CSS for:

- Hidden top bar for cleaner look
- Custom color scheme matching your brand
- Enhanced readability and spacing

### **Adding More Examples**

To add more examples to your endpoints:

1. Edit the `openapi.json` or `openapi.yaml` file
2. Add examples under the `examples` section of each endpoint
3. Restart the server to see changes

## 🚀 Production Deployment

### **Environment-Specific URLs**

The Swagger UI automatically detects the environment:

- **Development**: `http://localhost:5000`
- **Production**: `https://api.analytics-tracker.com` (update as needed)

### **Security Considerations**

For production deployment:

- Consider adding authentication to `/api-docs` endpoint
- Review CORS settings
- Implement rate limiting
- Use HTTPS only

## 📱 Alternative Documentation Access

### **Export OpenAPI Spec**

```bash
# Download the specification
curl http://localhost:5000/api-docs.json > analytics-api-spec.json
```

### **Use with External Tools**

- **Postman**: Import the OpenAPI spec directly
- **Insomnia**: Load the specification for testing
- **VS Code**: Use OpenAPI extensions for development

## 🛠️ Troubleshooting

### **Common Issues**

**Swagger UI not loading:**

- Check that the server is running on port 5000
- Verify the OpenAPI specification is valid
- Check browser console for JavaScript errors

**"Try it out" not working:**

- Ensure CORS is properly configured
- Check that the API endpoints are actually running
- Verify network connectivity

**Outdated documentation:**

- Restart the server after changing OpenAPI files
- Clear browser cache
- Check that the OpenAPI spec is properly formatted

### **Development Tips**

- Use browser developer tools to debug API calls
- Check the server logs for detailed error information
- Test endpoints with both Swagger UI and external tools like Postman

## 📚 Additional Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)
- [Express.js Integration Guide](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/)

Happy API documenting! 🎉
