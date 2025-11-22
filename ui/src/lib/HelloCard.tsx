// ui/src/lib/HelloCard.tsx
import "./styles.css";

export function HelloCard() {
  return (
    <div className="bb-card">
      <p className="bb-eyebrow">
        <span className="bb-dot-wrapper">
          <span className="bb-dot-ring" />
          <span className="bb-dot-core" />
        </span>
        Blackbird UI
      </p>

      <h1 className="bb-title">Hello from Blackbird OS UI</h1>

      <p className="bb-body">
        This card is rendered through the shared design system and styled with
        the Blackbird theme. It is our sanity-check that Storybook and the app
        share the same components.
      </p>

      <div className="bb-divider" />

      <div className="bb-section">
        <p className="bb-section-title">What this proves</p>
        <ul className="bb-list">
          <li>Storybook is wired to the shared Blackbird UI library</li>
          <li>Components render consistently across app and stories</li>
          <li>We have a safe place to iterate on the design system</li>
        </ul>
      </div>

      <div className="bb-footer">
        <span>Live from Storybook</span>
      </div>
    </div>
  );
}

export default HelloCard;
