# Local test server with HTTP Range support (Python's built-in one lacks it, which breaks video in some browsers).
# Usage: python serve.py   then open http://localhost:8000
import http.server, os, re, sys

class H(http.server.SimpleHTTPRequestHandler):
    _left = None
    def end_headers(self):
        self.send_header("Accept-Ranges", "bytes")
        super().end_headers()
    def send_head(self):
        path = self.translate_path(self.path)
        m = re.match(r"bytes=(\d*)-(\d*)$", self.headers.get("Range", ""))
        if not m or not os.path.isfile(path) or not (m.group(1) or m.group(2)):
            return super().send_head()
        size = os.path.getsize(path)
        if m.group(1):
            start = int(m.group(1)); end = int(m.group(2)) if m.group(2) else size - 1
        else:
            start = max(size - int(m.group(2)), 0); end = size - 1
        end = min(end, size - 1)
        if start > end:
            self.send_error(416); return None
        f = open(path, "rb"); f.seek(start); self._left = end - start + 1
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(self._left))
        self.end_headers()
        return f
    def copyfile(self, src, dst):
        try:
            if self._left is None: return super().copyfile(src, dst)
            n, self._left = self._left, None
            while n > 0:
                b = src.read(min(65536, n))
                if not b: break
                dst.write(b); n -= len(b)
        except ConnectionError:
            pass

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
print(f"Open http://localhost:{port}  (Ctrl+C to stop)")
http.server.ThreadingHTTPServer(("", port), H).serve_forever()
