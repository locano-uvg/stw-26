from http.server import HTTPServer, BaseHTTPRequestHandler
PUERTO = 8000
class MiServidor(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write("Hola mundo desde Python".encode("utf-8"))

servidor = HTTPServer(("localhost", PUERTO), MiServidor)
print(f"Servidor corriendo en http://localhost:{PUERTO}")
print("Ctrl+C para detener")
servidor.serve_forever()
