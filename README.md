# Math Video Library
0. `js/data.js` is topics > sections > videos. Order in the file = order on the page (nothing is sorted automatically).
1. Set `ready: "Y"` on videos to publish them. Use `ready: "N"` while preparing videos; only `"Y"` videos appear on the site, in search results, and in counts.
2. Add YouTube links directly in `js/data.js`; no local `videos/` folder is needed.
3. Push to GitHub, then Settings > Pages > Deploy from branch `main` / root.
4. Test locally with `python serve.py` then open http://localhost:8000.
Notes: If a video uses local files instead of YouTube, keep the path in the same `data.js` entry and open the page from a local server, not by double-clicking the HTML file.
Avoid `#` and spaces in file names.
