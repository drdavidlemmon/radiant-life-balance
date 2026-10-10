# Launch improvements and remaining setup

## Implemented

1. One immediate affiliate recommendation after the main quiz. Main-question matching chooses the lowest answer within the first priority area, with honest tie handling and a free-article/library alternative.
2. Downloaded PNG now leads with a strength, with the rainbow flower and area graphics, generous whitespace, and Inter typography.
3. Sharing defaults to the strongest area only. Growth is an explicit checkbox. No public share URL includes answers, scores, email addresses, or a paid report link.
4. The compact sharing invitation appears before the paid report intake; less-used sharing options sit in a disclosure.
5. Kit signup now checks subscriber creation, tag application, and optional sequence enrollment instead of silently accepting failed tags. The live signup validation endpoint confirms an API key is configured; that does not verify credentials, delivery, or account automations.
6. Canonical addresses identify the actual quiz, area, category, and article. A sitemap and robots route are provided. Results and deep dives carry noindex so private/local results are not search landing pages.
7. Quiet photograph placements are ready on area pages and the creator biography. They remain invisible until approved real images are supplied.
8. Added directly relevant educational books for stress, forgiveness, kindness/service, and sexual intimacy. New entries have no invented ratings or fixed prices. Faith reading remains explicitly non-faith-specific until approved resources are provided.
9. Google Analytics receives quiz, share, resource, and checkout events. Internal campaign counts persist a referral through quiz completion. Server-side report counts deduplicate verified live purchases and completed reports. Test orders are excluded. No checkout click is labeled a purchase.

## Your input

- Supply a portrait of Dr. David Lemmon and, if available, one suitable real photo per life area. Images should be owned or licensed for site use, with permission from identifiable people. Suggested quiet scenes: reading/studying, walking/movement, contemplation, conversation, household planning, purposeful work. No visual placeholders will appear meanwhile.
- Choose the faith traditions and books you want represented. The quiz does not currently ask a person's faith tradition, so do not automatically assume one. We can offer faith-neutral reflection until the person chooses a tradition.
- In Kit, review the six complete drafts below, create/publish a sequence, and provide its numerical sequence ID (not an API key). Add `KIT_WELCOME_SEQUENCE_ID` to Vercel Production and redeploy. For Preview, use an intentional test sequence. Use either this direct sequence enrollment or tag-based visual automations, avoiding two paths that send the same series twice. Keep marketing opt-in voluntary.
- Use an email address you own to sign up through the site. Confirm the subscriber, selected area tags, sequence enrollment, and first email delivery in Kit. Check spam and verify sender identity. A successful API response means enrollment, not delivery.
- Confirm live traffic in the Google Analytics property's Realtime screen. The installed measurement ID is `G-SNRPFRYZHF`. Review enhanced measurement so sensitive free-text form contents are never collected; the site does not send answers or intake text as event parameters and strips query strings from its page locations.
- To read the private site metrics, set a long random `METRICS_ADMIN_TOKEN` in Production if not already present; open `/metrics?token=YOUR_TOKEN`. Append `&ref=friend` for friend referrals or a chosen creator campaign. Do not share that admin URL.
- Review actual commission reports in Amazon/other merchant dashboards. Site clicks cannot prove a sale or commission. Stripe is the source for all purchases, fees, refunds, and net report income; the site's gross revenue count records verified payments when the customer returns, not a full ledger/webhook reconciliation.
- A live paid report download still needs confirmation after the prior timeout fix. Retry an existing paid order's private return link rather than buying again just to test.

## Six-email welcome sequence — complete drafts

Suggested timing is relative to enrollment: immediately, day 2, day 5, day 9, day 16, day 30. Link tracking uses a campaign name only. Kit must add its standard unsubscribe link and mailing address. These drafts have not been sent or scheduled.

### Email 1 — One small step is enough

Welcome to Radiant Life Balance,

Your quiz is a snapshot for reflection, not a verdict about who you are. You have strengths to build on, and you get to choose where to focus next.

For today, choose one area you would like to strengthen. Name an action small enough to try in five minutes: read a page, take a short walk, write down one expense, or reach out to someone you care about.

Keep it simple. One useful step matters more than trying to change everything at once.

Explore the six free resource areas: https://radiantlifebalance.com/?ref=welcome

Dr. David Lemmon

### Email 2 — Borrow from a strength

Hello,

Think about the area that felt strongest in your quiz. What makes it work? Perhaps you have a routine, a supportive person, or a clear reason to keep showing up.

Try borrowing that same support for the area you want to strengthen. If a walking partner helps you stay active, a regular check-in might help with another habit too. If a calendar keeps work organized, you might use it to protect time for rest or relationships.

Your strengths can become tools for your next step.

Explore a life area: https://radiantlifebalance.com/?ref=welcome

Dr. David Lemmon

### Email 3 — Make starting easier

Hello,

A goal becomes more manageable when the next action is clear.

Try this sentence: After I finish [an existing routine], I will [one small action]. Keep the action short enough to try on a busy day. Then make it easier to begin: set out a book, put a reminder where you will see it, or prepare what you need the night before.

The free 30-day challenge offers a simple prompt each day. Use what helps and adapt the rest to your life.

Start the challenge: https://radiantlifebalance.com/challenge?ref=welcome

Dr. David Lemmon

### Email 4 — A conversation can help

Hello,

You do not have to share your scores to share something useful.

Consider asking a friend, partner, or family member: Which part of life feels strongest for you right now? What is one area you would like to give more attention?

If the quiz helped you, invite them to try it. Each of you can choose what to keep private. The sharing tools celebrate a strength by default; growth scores are optional.

Share the free quiz: https://radiantlifebalance.com/quiz?ref=welcome_friend

Dr. David Lemmon

### Email 5 — Go deeper in one area

Hello,

A broad score can point toward a life area, but an individual answer may reveal a more useful next step.

Radiant Life Balance offers free deep dives for each of the six areas. You can explore the priorities from your results and decide what fits your circumstances.

Your results also suggest one optional book to begin with. Read why it was selected, check whether it fits, and consider your library or the free articles before purchasing. We may earn a commission through affiliate links, at no additional cost to you.

Explore the free resources and deep dives: https://radiantlifebalance.com/?ref=welcome

Dr. David Lemmon

### Email 6 — Keep what helped

Hello,

What has been useful over the past month?

Notice one small win, one obstacle, and one practice you would like to continue. You can adapt your next step without treating a difficult week as a failure.

If you want a fresh snapshot, retake the free quiz. If you want a deeper written reflection connecting your quiz, two priority deep dives, and your report questions, the optional personalized AI report is available from your results. The free tools remain available either way.

Take the free quiz: https://radiantlifebalance.com/quiz?ref=welcome_review

Dr. David Lemmon

## Resource source notes

- The Upside of Stress: https://www.penguinrandomhouse.com/books/316675/the-upside-of-stress-by-kelly-mcgonigal/ (paperback ISBN 9781101982938).
- The Power of Kindness: https://www.penguinrandomhouse.com/books/296363/the-power-of-kindness-by-piero-ferrucci/ (ISBN 9780143129271).
- The Book of Forgiving: https://www.harpercollins.com/products/the-book-of-forgiving-desmond-tutumpho-tutu.
- Sexual Intelligence: https://www.martyklein.com/books/sexual-intelligence-really-want-sex-get/.
- Optional sequence enrollment follows Kit's current documented `POST /v4/sequences/{sequence_id}/subscribers/{id}` endpoint: https://developers.kit.com/api-reference/sequences/add-subscriber-to-sequence.
