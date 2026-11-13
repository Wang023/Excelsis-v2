# Excelsis Acquisition website update

The home page uses the supplied Invisalign revival draft, with seven content sections including the hero. The original navy, teal, warm cream, Manrope, and DM Sans branding is retained. The five What We Do cards are intentional.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For the static production export, run `npm run build`; the finished files are in `out/`. The existing GitHub Pages workflow is retained.

## Content still needed

- Josh and Carson headshots.
- Carson's role and bio.
- LinkedIn URL and legal entity name. Neither is present in the project; the footer omits LinkedIn and uses the existing public brand in its copyright line, without claiming a legal entity name.
- The footer uses the contact address documented in README.md, `ganasehaki@gmail.com`, with `NEXT_PUBLIC_CONTACT_EMAIL` as an override.
- Complete business-specific privacy details before connecting a submission service.

The bracketed placeholders are deliberately visible. The supplied guarantee and qualification language are included as drafted.

## Report form

The form shows three steps: practice details, contact details, and monthly inquiry volume. Continue validates the current step; Back preserves entered values. Only the final step prepares the complete request locally. Without `NEXT_PUBLIC_CONTACT_EMAIL`, visitors can download a text draft; no request is sent or stored. To open requests in a visitor's email app, set `NEXT_PUBLIC_CONTACT_EMAIL` to the approved business email and rebuild. The visitor still needs to send the message from their email app. No CRM or delivery backend is connected.

## Main files

- `app/content.ts`: draft copy for cards, process, program, guarantee, and team.
- `app/page.tsx`: home page sections.
- `app/revival.css`: new responsive layout.
- `components/sections/ContactForm.tsx`: report form.
- `components/ui/Navbar.tsx` and `Footer.tsx`: navigation and footer.

The About, Services, Contact, and Privacy URLs are retained and updated. Existing Insights pages remain accessible at their original URLs.

