# Victor: three steps

1. Put this whole folder (`victor-site-handoff`) at the root of the alegriamusic.net repo.
2. Open Claude Code in that repo and paste the entire contents of `PROMPT.txt` as your first message.
3. When it asks for environment variable values, they are in `ENV-VALUES.txt`. Generate the one
   missing value, your Calendly personal access token, in Calendly under Integrations & apps >
   API & webhooks, and add it to Vercel as `CALENDLY_TOKEN`.

It will port the seven pages, wire ActiveCampaign and Calendly, deploy, and run a checklist.
Send Tim the report table it prints at the end. The last check needs you: book one test slot on
alegriamusic.net/apply, confirm you land on /booked and see yourself on the "Booked Call" list,
then cancel the booking.

The pages, exactly as they will look, are live now at https://webinar-registration-steel.vercel.app
(/masterclass-live is at the root there).
