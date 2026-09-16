# AI-assisted development prompt record

1. “Read the document, understand the requirements, then plan, then set up the projects. You can refer to the Vercel page for UI reference. You need to write code, build, inspect etc. Also I prefer Java and React.”
2. “Read and use the uploaded assignment document as the source of truth. Inspect the reference page in a browser and study its desktop listing page, photo tour, lightbox, interactions, layout, typography, spacing, colors, assets, animations, keyboard behavior, and accessibility.”
3. “Plan the implementation first, then set up and build the project using Java for the backend where useful and React for the frontend. Keep the scope focused on the assignment. Implement an original clone rather than lifting/copying the reference code.”
4. “Include the requested production-scale architecture diagram and AI sub-agent/skill configuration files, plus a record/sequence of prompts used for AI-assisted development. Build and run/inspect the app, fix issues, and verify behavior and visual fidelity against the reference.”
5. Asset-generation prompt: “Create a six-panel coherent set of photorealistic vacation-rental scenes for an original Goa listing: terrace, living room, kitchen, bedroom, bathroom, and exterior; no logos, text, watermarks, or UI.”

## Workflow record

- Requirements were extracted from the provided `.docx`, then the document was rendered and visually reviewed.
- The reference was opened in a browser. The environment received a Vercel security checkpoint, so the assignment’s embedded 1440px screenshots supplied the usable visual evidence.
- An original contact sheet was generated for property photography and split into project-local static assets.
- A React implementation and dependency-free Java API were created, then built and exercised locally.
