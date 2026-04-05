# The Design System: Architectural Intelligence

## 1. Overview & Creative North Star: "The Architectural Intelligence"
This design system rejects the cluttered, frantic aesthetic of typical "AI tech startups." Instead, it adopts the persona of **The Architectural Intelligence**—a digital environment that feels built, not just coded. 

The Creative North Star is a fusion of high-end editorial clarity and mechanical precision. We move beyond the "template" look by utilizing intentional asymmetry, expansive whitespace, and a "Tonal Layering" philosophy. Every interface should feel like a custom-built physical space where the weight of information is handled with grace. We prioritize the "invisible" over the "decorated," ensuring that Seeker Solutions' expertise in AI feels like a foundational, structural force rather than a superficial add-on.

---

## 2. Colors & Surface Philosophy

The color logic is rooted in a deep, authoritative navy (`primary`) contrasted against a spectrum of intelligent greys and off-whites. 

### The "No-Line" Rule
Standard UI relies on lines to define space. This design system prohibits the use of 1px solid borders for sectioning. Boundaries are created through:
- **Tonal Shifts:** Transitioning from `surface` (#f8f9fd) to `surface-container-low` (#f2f3f8).
- **Negative Space:** Using generous margins to define the "edge" of a concept.

### Surface Hierarchy & Nesting
Think of the UI as a series of nested physical planes. To create depth without shadows:
- **Level 0 (Base):** `surface` or `background` (#f8f9fd).
- **Level 1 (Sections):** `surface-container-low` (#f2f3f8) for secondary information.
- **Level 2 (Active Elements):** `surface-container-lowest` (#ffffff) for high-priority interactive cards sitting on top of Level 1.
- **Level 3 (Emphasis):** Use `primary_container` (#0a2540) to anchor the eye in hero sections or deep-footer environments.

### The "Glass & Gradient" Rule
To evoke a premium "mechanical" feel:
- **Floating Navigation:** Use `surface_container_lowest` with 80% opacity and a 20px `backdrop-blur` to create a frosted glass effect.
- **Signature Gradients:** Main CTAs and high-impact containers should utilize a subtle linear gradient: `primary` (#000f22) to `primary_container` (#0a2540) at a 135-degree angle. This adds a "soul" to the dark surfaces that flat colors lack.

---

## 3. Typography: Editorial Authority

We use **Inter** as our typographic backbone. The goal is high-contrast hierarchy—the "Stripe" effect—where headlines feel monumental and body text feels like precision-engineered metadata.

- **Display (Large/Medium):** Use `display-lg` (3.5rem) with a negative letter-spacing of `-0.02em`. This is for bold, authoritative claims.
- **Headlines:** `headline-lg` (2rem) serves as the primary entry point for sections. It should always have ample "breathing room" (at least 48px of top margin).
- **Body:** Use `body-lg` (1rem) for long-form consultancy insights. Maintain a line-height of 1.6 to ensure the "Editorial" feel.
- **Labels:** `label-sm` (0.6875rem) should be used in ALL CAPS with `+0.05em` letter spacing for technical metadata or category tags, reinforcing the mechanical aesthetic.

---

## 4. Elevation & Depth

We eschew traditional "Drop Shadows" in favor of **Ambient Light Physics.**

- **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card placed on a `surface-container-high` background creates a natural visual lift.
- **Ambient Shadows:** Only use shadows for floating modals or primary navigation.
    - **Value:** `0px 12px 32px rgba(25, 28, 31, 0.06)`. Note the low opacity (6%) and high blur.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use the `outline_variant` (#c4c6ce) at **20% opacity**. Never use 100% opaque borders.
- **Mechanical Accents:** Use 1px "dividers" only as structural accents that do not span the full width of a container, suggesting a "blueprint" or "technical drawing" aesthetic.

---

## 5. Components

### Buttons (The "Precision Tools")
- **Primary:** Background: `Signature Gradient` (Primary to Primary Container). Text: `on_primary`. Radius: `md` (0.375rem).
- **Secondary:** Background: `surface_container_high`. Text: `on_surface`. No border.
- **Interaction:** On hover, buttons should subtly scale (1.02x) rather than just changing color.

### Cards (The "Nested Content")
- **Rule:** Forbid the use of divider lines within cards.
- **Layout:** Use `surface_container_lowest`. Separate the "Header" from the "Body" of the card using a vertical spacing of `24px`. Use `label-md` for the eyebrow text to categorize content.

### Inputs (The "Data Ports")
- **Style:** `surface_container_low` background with a `Ghost Border` (outline-variant at 20%). 
- **Focus State:** Transition the border to `primary` at 50% opacity and add a subtle 2px outer glow of `primary_fixed_dim`.

### Chips (The "Metadata Tags")
- **Selection Chips:** Use `secondary_container` with `on_secondary_container` text. These should have a `full` (9999px) roundedness to contrast against the sharper `md` corners of buttons.

### Additional Component: The "Implementation Timeline"
- A bespoke component for Seeker Solutions. A vertical thin line (0.5px) using `outline_variant` at 40% opacity, with `surface_tint` nodes. This represents the "Seeker" logic—tracking progress through complex AI deployments.

---

## 6. Do's and Don'ts

### Do:
- **Use Asymmetry:** Place a `headline-lg` on the left and a `body-md` description on the right with a 60/40 split to break the "centered template" feel.
- **Embrace Whitespace:** If you think there is enough space, add 20% more. High-end consulting is about the luxury of space.
- **Use Tonal Layering:** Always check if a background color shift can replace a border.

### Don't:
- **Don't use pure black:** Use `primary` (#000f22) for deep backgrounds and `on_surface` (#191c1f) for text. Pure black (#000) feels "cheap" and unrefined.
- **Don't use standard icons:** Use "Thin" or "Light" weight stroke icons (1px) to match the Inter typography weight.
- **Don't use aggressive animations:** Transitions should be `cubic-bezier(0.16, 1, 0.3, 1)`—the "Apple" ease-out—feeling smooth and deliberate, never "bouncy."