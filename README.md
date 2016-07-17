# buda-downloader

Download manager for api.datos.gob.mx

Usage:

Download a whole database in batches of 10k waiting 20s between calls.

```bash
% buda-downloader --download profeco.precios --delay 20 --batch 10000
```

See the API documentation in [mxabierto/buda](https://github.com/mxabierto/buda).
