# Personalized report setup

The site currently displays free quiz results and a free PDF. An optional ten-page AI PDF is priced at $6.99. Before checkout the customer completes the 15-question deep dive in each of their two lowest-scoring areas and an eight-question intake (five required, three optional). The report analyzes all thirty main quiz answers, thirty deep dive answers, six area scores, subarea scores, and intake responses after payment. The $6.99 report is hidden until it is ready to sell. Google Analytics ID `G-SNRPFRYZHF` is already built into the site's layout; it starts collecting only after deployment.

## Accounts and keys to supply

1. **Stripe account**: Create API keys in Stripe Developers > API keys. Set `STRIPE_SECRET_KEY` in Vercel. Start with a Stripe test secret, then replace with the live secret only after checking a real test purchase. Stripe handles card details. The report uses a one-time Checkout payment, fixed at 699 cents USD.
2. **OpenAI API account**: Add billing and create an API key at the OpenAI developer platform. Set `OPENAI_API_KEY` in Vercel. This is billed separately from ChatGPT. `OPENAI_REPORT_MODEL` defaults to `gpt-5.4-mini`; confirm model availability for the account before enabling sales. The model sees quiz, deep dive, intake answers and results only after the customer buys. No model is called during the free quiz or intake.
3. **Upstash Redis**: Create a database and copy its REST URL/token into `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. This stores purchased quiz answers and generated report text for 30 days and stores anonymous event totals for the owner dashboard. The site remains usable without Redis, but report sales should not be enabled.
4. **Site URL**: Set `NEXT_PUBLIC_SITE_URL=https://radiantlifebalance.com`. When all services are tested, set `NEXT_PUBLIC_REPORTS_ENABLED=true` in Vercel and redeploy. Until then the offer stays hidden.
5. **Dashboard token**: Set `METRICS_ADMIN_TOKEN` to a new random string of at least 20 characters. Open `/metrics?token=YOUR_TOKEN` privately to see the past 30 days of browser-day visitors, quiz starts and completions, shares, and affiliate clicks. You can add `&ref=campaign_name` to filter a tracked creator campaign. Keep the token private and do not share dashboard URLs.

## Test before launching

- Deploy to a protected Vercel preview with Stripe **test** key and `NEXT_PUBLIC_REPORTS_ENABLED=true`. Never use a live secret in a preview that anyone can access.
- Take the whole quiz; confirm free results and free PDF still work. Verify checkout stays disabled before both priority deep dives and required intake questions are complete. Retake the quiz and confirm old deep dives are cleared. Buy a test report using a Stripe test card, then confirm the report uses specific deep dive answers and stated goals, downloads and has ten pages, recommendations link to existing articles/products, and a second download does not create an extra payment or AI call.
- Verify unpaid or cancelled checkout cannot generate a report. Open the confirmation link on a different device within 30 days and check download again.
- Check Google Analytics Realtime after deployment. Use the browser's network tab or Google's Tag Assistant if no events appear.
- Set live Stripe key, check OpenAI account spending limits, deploy with reports enabled, make a small real purchase, and refund it using Stripe if desired.

There is no automatic email delivery: purchasers download on the return page and should save the link. Reports expire in storage after 30 days. In case AI generation fails after payment, the same confirmation link retries without a second charge. Customer support should be ready to assist if it remains unavailable. Affiliate recommendations come from the site's existing resource list; the AI does not invent products or URLs. The dashboard is an estimate rather than a replacement for Google Analytics.
