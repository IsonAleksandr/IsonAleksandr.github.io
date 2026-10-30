/* =====================================================================
   ISON CATALOG — the ONLY file you edit to add/change videos.
   Page logic lives in app.js; don't touch it.

   Each entry:
     id        case number on the card (e.g. "DAY-001")
     title     display title
     type      "series" | "short" | "trailer"   (decides which row)
     year      number
     tags      ["Horror", ...]
     synopsis  short description (use ' inside text, never ")
     thumb     16:9 image path, e.g. "assets/featured.jpg"
     episodes  [{ title, runtime, youtube }]
               youtube = the video ID only (the part after "v=" in
               youtube.com/watch?v=XXXXXXXXXXX). Leave "" = "Coming soon".
   Shorts and trailers have exactly one episode.
   FEATURED_ID (bottom) = which entry the banner shows first.
   ===================================================================== */
const CATALOG = [
  {
    id: "DAY-001",
    title: "That Day and Hour",
    type: "series",
    year: 2026,
    tags: ["Apocalyptic", "Horror"],
    synopsis: "A catastrophe of biblical proportions. The dead do not stay dead. Mutated, hungry, and spreading, they come for whatever is left of the world.",
    thumb: "assets/featured.jpg",
    episodes: [
      { title: "Episode 1: Mikhail", runtime: "Coming soon", youtube: "" },
      { title: "Episode 2: Alessandro", runtime: "Coming soon", youtube: "",
        note: "Chicago. Alessandro, Maria and Gianni try to cross the miles between them and safety." },
      { title: "Episode 3: Frank", runtime: "Coming soon", youtube: "" },
      { title: "Episode 4: Greg and Ira", runtime: "Coming soon", youtube: "" },
      { title: "Episode 5: Josh", runtime: "Coming soon", youtube: "" },
    ]
  },
  {
    id: "TRL-001",
    title: "That Day and Hour — Trailer",
    type: "trailer",
    year: 2026,
    tags: ["Trailer"],
    synopsis: "The first look at That Day and Hour.",
    thumb: "assets/trailer.jpg",
    episodes: [ { title: "Official Trailer", runtime: "Coming soon", youtube: "" } ]
  }
  /* Add a short like this (remove the /* and *\/ around it):
  ,{
    id: "SHT-001", title: "My Short", type: "short", year: 2026,
    tags: ["Horror"], synopsis: "One line.", thumb: "assets/ep1.jpg",
    episodes: [ { title: "My Short", runtime: "3 min", youtube: "VIDEO_ID" } ]
  }
  */
];
const FEATURED_ID = "DAY-001";
