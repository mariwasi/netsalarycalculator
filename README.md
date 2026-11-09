# StipendioNetto

Italian net-salary estimate from a gross annual salary (RAL). The calculator runs in the browser.

Production domain (not purchased yet): https://calcolostipendionettoitalia.com

## Deploy

Production host is **Hostinger**. Current staging is **Vercel**, for review only: https://netsalarycalculator-nine.vercel.app. Production will move to Hostinger. Do not treat the Vercel project as production.

### Production path A — Hostinger Connector

In Cursor chat, install the Hostinger plugin:

```text
/add-plugin hostinger-cursor-plugin
```

Sign in with the browser OAuth flow. The connector is free with Hostinger plans. This repository does not run that deploy automatically.

### Production path B — GitHub to Hostinger Web Apps

Connect the GitHub repository to a Hostinger Web App. A push installs dependencies and restarts the app. This repository does not enable that connection automatically.

hPanel Git is PHP/HTML only and is not suitable for this Next.js app. Uploading a build by hand into `public_html` is a fallback only.

No DNS changes are part of the app setup in this repository.
