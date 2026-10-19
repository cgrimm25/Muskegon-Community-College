# DOM Manipulation Example — Lesson, Demo & Assignment

A beginner-friendly teaching package for learning **fundamental DOM manipulation** with vanilla JavaScript. It includes a fully commented class demo, a guided student assignment with a starter file, a complete solution, and a full lesson document.

## What's Inside

```
DOM Manipulation Example/
├── dom-basics-demo/     # Class demo — Student Profile Card (fully working)
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── assignment/          # Student assignment — Interactive Study Task List (starter)
│   ├── Assignment.md    # Instructions, rubric, steps, troubleshooting
│   ├── index.html       # Provided — do not edit
│   ├── styles.css       # Provided — do not edit
│   └── script.js        # Student completes 6 TODO markers
├── solution/            # Completed reference version of the assignment
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── DOM Manipulation Example.md   # Full lesson document with annotated code
└── README.md
```

## The Class Demo — Student Profile Card

`dom-basics-demo/` is an interactive profile card with a control panel of buttons that demonstrate every core DOM operation. Each operation is logged to both an on-page **Activity Log** and the browser **DevTools Console**, so students can see exactly what happens when the DOM changes.

Buttons include: Change Name, Toggle Major, Add Course, Remove Last Course, Update GPA, Highlight Skills, and Reset All.

### Concepts demonstrated

| Concept | APIs Used |
|---------|-----------|
| **Element selection** | `getElementById`, `querySelector`, `querySelectorAll` |
| **Content modification** | `textContent` (safe) vs `innerHTML` (with XSS warnings) |
| **Attributes & classes** | `setAttribute`, `getAttribute`, `classList`, `dataset` |
| **Event handling** | `addEventListener`, event delegation, keyboard events |
| **Dynamic creation** | `createElement`, `appendChild`, `insertBefore` |
| **Element removal** | `remove()`, `removeChild()` |
| **DOM traversal** | `parentElement`, `children`, `nextElementSibling`, `closest()` |
| **Form handling** | `input.value`, `keydown` + `Enter` |

### Console helpers

The demo exposes a `DOMDemo` object for live experimentation in the DevTools Console:

```js
DOMDemo.changeStudentName()
DOMDemo.addCourse()
DOMDemo.resetAll()
DOMDemo.elements.studentName.style.color = 'red'
```

## The Assignment — Interactive Study Task List

`assignment/` gives students a finished HTML/CSS page where only the JavaScript is missing. Students complete **6 TODO markers** in `script.js`:

1. **Wire up the buttons** (10 pts) — `addEventListener` with function names
2. **Keep the counter updated** (10 pts) — `querySelectorAll().length`
3. **Add a task** (25 pts) — read input, guard against empty, create & insert `<li>`
4. **Remove the last task** (15 pts) — guard against empty list
5. **Motivate Me!** (15 pts) — random quote from a provided array
6. **Toggle all tasks done** (15 pts) — `classList.toggle('done')`

Worth 100 points plus up to 20 bonus (per-task click toggle, Enter-to-add). Full rubric, self-check checklist, and troubleshooting table are in [`assignment/Assignment.md`](assignment/Assignment.md).

`assignment/script.js` also includes an inline cheat sheet of every pattern used, so students can complete the work without leaving the file.

**Grading rules enforced:** use `textContent` (never `innerHTML`) for user input, never allow empty tasks, never crash on an empty list, and do not edit the provided HTML/CSS.

## Getting Started

No build tools, frameworks, or dependencies — just plain HTML, CSS, and JavaScript.

### Run the demo

```bash
cd dom-basics-demo
# Option 1: just open index.html in your browser

# Option 2: serve locally
python -m http.server 8000
# or: npx serve
```

Then open DevTools (**F12**) → **Console** to watch each DOM operation in real time.

### Work on the assignment

1. Copy the `assignment/` folder (keep all three files together).
2. Open `index.html` in your browser.
3. Open DevTools (**F12**) → **Console** and keep it open.
4. Search `script.js` for **TODO** and complete the six steps.
5. Work in small steps: **edit → save → refresh → test → check the Console.**

### Compare with the solution

`solution/` contains the completed assignment — useful for instructors or for self-review after submitting.

## Learning Objectives

By the end of this lesson, students will be able to:

- Select elements by ID and by CSS selector
- Safely modify page content with `textContent`
- Toggle classes and read/write `data-*` attributes
- Attach event listeners and use event delegation for dynamic content
- Create, insert, and remove elements at runtime
- Traverse the DOM with parent, child, sibling, and `closest()` queries
- Debug live DOM changes using browser DevTools

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Edge, Safari). Uses standard DOM APIs with no transpilation. Includes accessibility touches (`:focus-visible`) and respects `prefers-reduced-motion`.

## License

For educational use. Adapt freely for your classroom.
