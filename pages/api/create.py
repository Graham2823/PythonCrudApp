from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from pymongo import MongoClient
import os
import sys

# Add the project root directory to the Python path
current_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(current_dir, '..', '..'))
sys.path.append(project_root)

from models.transfer import Transfer

mongoConnectionString = os.environ.get('MONGODB_CONNECTION_STRING')  # Use os.environ.get to access environment variables
client = MongoClient(mongoConnectionString)
db = client.PythonCrudApp  # Replace 'test_database' with your actual database name
collection = db.Transfers  # Replace 'test_collection' with your actual collection name

class RequestHandler(BaseHTTPRequestHandler):
    def _set_response(self, status_code=200, content_type='text/plain', headers=None):
        self.send_response(status_code)
        self.send_header('Content-type', content_type)
        if headers:
            for header, value in headers.items():
                self.send_header(header, value)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/create':
            # Print a message indicating that the route was hit
            print("Route '/api/create' was successfully accessed")

            # Get the length of the request body
            content_length = int(self.headers['Content-Length'])

            # Read the request body
            request_body = self.rfile.read(content_length)

            # Convert the request body from bytes to string (assuming it's JSON)
            request_body_str = request_body.decode('utf-8')

            # Print the request body
            print("Request Body:", request_body_str)

            # Convert JSON string to Python dictionary
            data = json.loads(request_body_str)

            # Create a new Transfer instance using data from the request body
            new_transfer = Transfer(
                name=data.get('playerName'),
                position=data.get('playerPosition'),
                old_team=data.get('prevSchool'),
                new_team=data.get('newSchool')
            )

            # Save the new transfer to MongoDB
            inserted_id = new_transfer.save()

            # # Insert data into MongoDB
            # result = collection.insert_one(data)

            # Set response headers
            self._set_response(status_code=200, content_type='application/json', headers={
                'Access-Control-Allow-Origin': '*',  # Allow requests from all origins
                'Access-Control-Allow-Methods': 'POST',  # Allow POST requests
                'Access-Control-Allow-Headers': 'Content-Type',  # Allow Content-Type header
            })

            # Send response
            response_data = {'message': 'Data inserted successfully', 'inserted_id': str(inserted_id)}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        else:
            # Handle invalid endpoints
            self._set_response(status_code=404)
            self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))

    def do_OPTIONS(self):
        # Handle OPTIONS requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
