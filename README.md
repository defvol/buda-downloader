# buda-client

API client for datos.gob.mx

Examples:

Download a whole database in batches of 10k waiting 20s between calls.

```bash
% buda-client --download profeco.precios --delay 20 --batch 10000
```

See the API documentation in [mxabierto/buda](https://github.com/mxabierto/buda).
