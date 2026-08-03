# Infotrek Level 2 - Verification Portal

Context:

This is a React + Vite + Tailwind project.

Level 2 should be inspired by the feeling of User Inyerface, but NOT copied.

Goal:

Create a verification portal where the interface itself becomes the puzzle.

The experience should be frustrating in a funny way, but always fair.

The player should feel:

"Why is this website behaving like this?"

rather than:

"This puzzle is impossible."

---

STORY

Display:

SIGNAL ACCEPTED

Participant identity could not be verified.

To continue, complete the Verification Request Form.

Button:

BEGIN VERIFICATION

---

MAIN FORM

The form should look official and professional.

Fields:

* Name
* Department
* Access Code
* Security Phrase

The placeholders contain important clues.

Observant players should realize that the placeholders themselves contain answers.

---

TERMS AND CONDITIONS

A mandatory Terms & Conditions modal exists.

Requirements:

* Extremely long content
* Internal scrolling area
* Close button only at bottom
* X button does NOT close modal
* User must reach bottom and press CLOSE

Bonus discovery:

Hidden clickable section number inside terms.

Reward discovery points.

---

ANNOYING BUT FAIR INTERACTIONS

Implement several behaviors:

1. Progress bar lies.

Example:
50% -> 43% -> 61%

2. One field label slightly changes wording every few seconds.

3. A checkbox occasionally moves a small distance.

4. One validation message is intentionally misleading.

5. A disabled-looking button may actually work.

6. One field appears required but is not.

7. One field is actually required but visually subtle.

---

TIME SCORING

Track completion time.

Score:

Under 60 sec = 100 points

Under 90 sec = 80 points

Under 120 sec = 60 points

Under 180 sec = 40 points

Else = 20 points

Display earned score after submission.

---

DISCOVERIES

Hidden discoveries should exist.

Examples:

* Double-click form title
* Click company logo
* Hidden section in terms
* Hover progress bar

Each discovery awards points.

Use existing Zustand score/discovery system.

---

DESIGN

Theme:

* Dark blue
* Cyan accents
* Clean modern UI
* Professional looking

Do NOT use meme styling.

Do NOT use ugly colors.

The interface should appear trustworthy while behaving suspiciously.

---

CODE REQUIREMENTS

Create clean React components.

Keep all Level 2 code inside:

src/pages/level2

Suggested structure:

level2/
├── VerificationPortal.jsx
├── components/
│   ├── VerificationForm.jsx
│   ├── TermsModal.jsx
│   ├── FakeProgressBar.jsx
│   ├── DiscoveryToast.jsx
│   └── ScoreSummary.jsx

Use hooks where appropriate.

Do not create one giant component.


