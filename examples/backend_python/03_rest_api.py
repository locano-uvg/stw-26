import json
from http.server import HTTPServer, BaseHTTPRequestHandler

PUERTO = 8000
ARCHIVO_HTML = "02_pagina.html"


class MiServidor(BaseHTTPRequestHandler):

    def responder(self, status, texto, content_type="text/plain; charset=utf-8"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.end_headers()
        self.wfile.write(texto.encode("utf-8") if isinstance(texto, str) else texto)

    def leer_body(self):
        largo = int(self.headers.get("Content-Length", 0))
        if largo == 0:
            return ""
        return self.rfile.read(largo).decode("utf-8")

    def do_GET(self):
        if self.path == "/":
            self.responder(200, "Respuesta del server: servidor activo")
            return

        if self.path == "/html":
            with open(ARCHIVO_HTML, "r", encoding="utf-8") as archivo:
                html_como_texto = archivo.read()
            self.responder(200, html_como_texto, "text/html; charset=utf-8")
            return

        if self.path == "/json":
            json_data = {"estado": "ok", "curso": "STW", "tipo": "ejemplo"}
            json_como_texto = json.dumps(json_data, ensure_ascii=False)
            self.responder(200, json_como_texto, "application/json; charset=utf-8")
            return

        if self.path == "/simular":
            self.responder(200, "Simulación GET: leer información")
            return

        self.responder(404, "Ruta no encontrada")

    def do_POST(self):
        if self.path == "/simular":
            body = self.leer_body()
            self.responder(200, f"Simulación POST: crear información | body={body}")
            return
        self.responder(404, "Ruta no encontrada")

    def do_PUT(self):
        if self.path == "/simular":
            body = self.leer_body()
            self.responder(200, f"Simulación PUT: actualizar información | body={body}")
            return
        self.responder(404, "Ruta no encontrada")


servidor = HTTPServer(("localhost", PUERTO), MiServidor)

print(f"Servidor de ejemplo en http://localhost:{PUERTO}")
print("Rutas:")
print("  GET  /        -> respuesta simple del server")
print("  GET  /html    -> devuelve HTML como texto")
print("  GET  /json    -> devuelve JSON como texto")
print("  GET  /simular -> simulación GET")
print("  POST /simular -> simulación POST")
print("  PUT  /simular -> simulación PUT")
print("Ctrl+C para detener")

servidor.serve_forever()
