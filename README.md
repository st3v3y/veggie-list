# Veggie List with Sveltekit and NestJs

## What's inside?

This repo contains an implementation of a test app based on sveltekit and nestjs. Both, the sveltekit app and the nestjs API are apps of a turborepo monorepo.
To communicate with a MySQL database, I use prisma.

## Why?

We live in a small village at the coast of Ecuador. Every Wednesday our "Veggie Truck" comes to our house to deliver a box of fresh vegetables (and fruits). Because we are very modern here «*cough*», the veggie truck driver receives our order via WhatsApp. So we send him every week a list of all vegetables and fruits we would like to order including their amounts in units, kilograms/grams, libras or dollars. To make the process of creating this list easier and more exciting for us (and of course to play around with some cool frameworks like Sveltekit and NestJs) I decided to create this app. 

I hope you like it and enjoy it. 

### Build

To build the app, run the following command:

```
cd veggie-list
npm run build
```

### Develop

To join the development, run the following command:

```
cd veggie-list
npm run dev
```

## Useful Links
- https://turborepo.org
- https://kit.svelte.dev/
- https://nestjs.com/
- https://www.prisma.io/ (used to communicate with my MySQL database)
- https://chainlist.github.io/svelte-forms/ (used for form validation)
- https://github.com/kaisermann/svelte-i18n (used for translations)
- https://github.com/flekschas/svelte-simple-modal (used for "Really-want-to-delete-this?" modal)
- https://github.com/keenethics/svelte-notifications (used for showing "Copied!" notification)
- https://feathericons.com/ (used for all the icons)
