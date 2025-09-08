#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

class MyHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stdout.write(f"{self.log_date_time_string()} - {format%args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    # Change to the webapp directory
    os.chdir('/home/user/webapp')
    
    server = HTTPServer(('0.0.0.0', 8000), MyHandler)
    print("Soulsgold Website Server running on port 8000")
    print(f"Serving from: {os.getcwd()}")
    sys.stdout.flush()
    server.serve_forever()