# Getting This Onto GitHub and Live on the Web

You don't need to use the command line for any of this — everything below
can be done by clicking, either in your browser or in GitHub Desktop.

## Step 1 — Create a GitHub account (if you don't have one)

Go to github.com and sign up. It's free.

## Step 2 — Create a new, empty repository

1. Click the "+" in the top-right corner → "New repository"
2. Name it something like `pricing-leak-finder`
3. Leave it set to "Public" or "Private," your choice — either works fine
   with Vercel
4. Don't check any of the "initialize with" boxes (README, .gitignore,
   etc.) — this project already has those files
5. Click "Create repository"

## Step 3 — Get the project files onto GitHub

Pick whichever of these feels easier:

### Option A — No software needed (drag and drop)

On the new repository's page, GitHub shows a line that says "uploading an
existing file" — click that link. Drag the entire project folder (everything
inside the folder you downloaded, not the folder itself) into the browser
window, then scroll down and click "Commit changes."

### Option B — GitHub Desktop (better if you'll update this later)

1. Download GitHub Desktop (free) from desktop.github.com and sign in with
   your GitHub account
2. In GitHub Desktop, choose "Add" → "Add Existing Repository," and point it
   at the project folder on your computer
3. If it says the folder isn't a Git repository yet, click "create a
   repository" — GitHub Desktop will do this for you
4. Click "Publish repository" in the top bar, and pick the repository name
   you already created in Step 2 (or let it create a new one)

Either way, you should now see all the project files listed on your
repository's GitHub page.

## Step 4 — Connect Vercel

1. Go to vercel.com and sign in (you can sign in directly with your GitHub
   account — easiest option)
2. Click "Add New" → "Project"
3. Find and select the `pricing-leak-finder` repository you just created
4. Vercel will detect this is a Vite project automatically. You don't need
   to change any build settings.
5. Before clicking "Deploy," open the "Environment Variables" section and
   add these (the values come from your Supabase project and your Gumroad
   product):

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | from Supabase → Project Settings → API |
   | `VITE_SUPABASE_ANON_KEY` | from Supabase → Project Settings → API |
   | `VITE_GUMROAD_PRODUCT_URL` | your Gumroad product's page URL |
   | `SUPABASE_URL` | same value as `VITE_SUPABASE_URL` |
   | `SUPABASE_SERVICE_ROLE_KEY` | from Supabase → Project Settings → API (the *service_role* key, not the anon key) |
   | `GUMROAD_PRODUCT_PERMALINK` | the slug at the end of your Gumroad product's URL |

6. Click "Deploy." After a minute or two, Vercel gives you a live URL —
   something like `pricing-leak-finder.vercel.app`.

## Step 5 — Point Gumroad at your live app

In your Gumroad product's settings:

- Set the **Ping / webhook URL** to `https://your-app.vercel.app/api/gumroad-webhook`
- Set the **redirect URL after purchase** to `https://your-app.vercel.app/#/report?unlocked=1`

## Making updates later

Any time you want to change something — wording, a new question, a design
tweak — edit the files (through GitHub's web editor, or on your computer if
you're using GitHub Desktop), then either commit the change directly on
GitHub's website or click "Commit" and "Push" in GitHub Desktop. Vercel
automatically notices the update and rebuilds your live site within a minute
or two — no separate deploy step needed.
