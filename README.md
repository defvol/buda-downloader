# buda-downloader

Download manager for api.datos.gob.mx

Usage:

Download a whole database in batches of 10k waiting 20s between calls.

```bash
% npm install -g buda-downloader
% buda-downloader --dataset profeco.precios --delay 20 --batch 5000 | tee profeco.precios.json
```

See the API documentation in [mxabierto/buda](https://github.com/mxabierto/buda).
