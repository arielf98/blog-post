# My Blogs

## Stack

- Typescript
- Next js
- Material UI v5
- Tanstack Query

## How to run

pastikan pnpm sudah terinstall pada di komputer

cara install :
[pnpm installation](https://pnpm.io/installation)

setelah pnpm terinstall run :

untuk menjalan dev pada lokal

```bash
pnpm run dev
```

## Env Variable

agar fungsi create, update dan delete bisa berjalan dengan baik. pastikan sudah menambahkan file `env.local` pada direktori root.
didalam file `env.local` isi variable :

```bash
NEXT_PUBLIC_TOKEN = secret token anda
```
isi secret token adalah secret token dari go-rest [go rest](https://gorest.co.in/)

untuk hasil yang lebih maksimal next js bisa dibuild dengan menggunakan perintah :

```bash
pnpm run build
```

untuk run hasil build bisa dengan cara:

```bash
pnpm run start -- -p 3001
```

## feature

- menampilkan user sedang aktif atau tidak
- pagination
