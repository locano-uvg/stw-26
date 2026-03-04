from http.server import HTTPServer, BaseHTTPRequestHandler
import os

ARCHIVO_HTML = "02_pagina.html"
PUERTO = 8000


class MiServidor(BaseHTTPRequestHandler):

    def do_GET(self):
        if not os.path.exists(ARCHIVO_HTML):
            self.send_response(404)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write("Archivo no encontrado".encode("utf-8"))
            return

        with open(ARCHIVO_HTML, "r", encoding="utf-8") as archivo:
            contenido = archivo.read()

        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(contenido.encode("utf-8"))


servidor = HTTPServer(("localhost", PUERTO), MiServidor)
print(f"Servidor corriendo en http://localhost:{PUERTO}")
print(f"Archivo: {ARCHIVO_HTML}")
print("Ctrl+C para detener")
servidor.serve_forever()



    # self.send_header("Content-Type", "text/html; charset=utf-8")
        # self.end_headers()