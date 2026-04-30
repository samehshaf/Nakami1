import { useState } from "react";

const T = {
  bg:"#0A0A0A",surface:"#141414",surface2:"#1C1C1C",
  border:"#242424",text:"#F0F0F0",muted:"#666",subtle:"#2E2E2E",
  orange:"#FF6B00",blue:"#3b82f6",green:"#10b981",purple:"#a855f7",
  yellow:"#f0c000",red:"#ef4444",navBg:"#111111",navBorder:"#1e1e1e",
};

const SK = {
  gymLog:"nakami_gym_v2",bjjLog:"nakami_bjj_v2",
  rehabStatus:"nakami_rehab_v2",
};
const load = k=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):{};}catch{return{};}};
const save = (k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};

const quotes = [
  {text:"A black belt is a white belt who never quit.",author:"BJJ Proverb"},
  {text:"The mat is the great equalizer.",author:"Rickson Gracie"},
  {text:"Train hard, tap often, learn always.",author:"BJJ Proverb"},
  {text:"Position before submission.",author:"Helio Gracie"},
  {text:"There is no losing in jiu-jitsu. You either win or you learn.",author:"Carlos Gracie Jr."},
  {text:"The more you sweat in training, the less you bleed in battle.",author:"Navy SEAL Proverb"},
  {text:"Jiu-jitsu is the art of not being where the danger is.",author:"Royce Gracie"},
  {text:"Don't count the days, make the days count.",author:"Muhammad Ali"},
];

const katColor = {
  CHEST:"#FF6B00",SHOULDERS:"#ff8c00",TRICEPS:"#ffaa00",
  BACK:"#3b82f6",BICEPS:"#818cf8",
  QUADS:"#10b981",HAMSTRINGS:"#059669","HIPS/GLUTES":"#34d399",
};

const gymPasses = [
  {
    id:"PUSH",label:"PUSH",day:"Tuesday",color:"#FF6B00",
    focus:"Chest · Shoulders · Triceps · Quads",duration:"40–45 min",
    setsInfo:"Compound: 2 sets RPE 7–8  ·  Isolation: 3 sets to failure",
    warmup:["5 min bike / row","Shoulder circles ×10","Band pull-apart ×15","Empty bar ×8"],
    exercises:[
      {id:"smith-bench",name:"Smith Machine Bench Press",sets:"2",reps:"6–8",rest:"2–3 min",cat:"CHEST",bjj:"Framing · Push-away · Scrambles",why:"Guided bar path protects shoulders. Builds chest, shoulders and triceps simultaneously.",tips:"Retract shoulder blades. Controlled descent, explosive push. Stop 1–2 reps before failure.",alt:"Dumbbell bench press",ytId:"vcBig73ojpE"},
      {id:"shoulder-press",name:"Seated Dumbbell Shoulder Press",sets:"2",reps:"8–10",rest:"2 min",cat:"SHOULDERS",bjj:"Overhead strength · Framing",why:"Natural movement path, activates stabilizers. Seated reduces lower back load.",tips:"Sit tall. Press up, lower to ear height. Full ROM. Stop 1–2 reps before failure.",alt:"Barbell OHP",ytId:"qEwKCR5JCog"},
      {id:"chest-fly",name:"Machine Chest Fly",sets:"3",reps:"To failure",rest:"90 sec",cat:"CHEST",bjj:"Chest isolation · Framing",why:"Isolates the pec in adduction. Constant tension, easy on shoulder joint.",tips:"Slight elbow bend. Feel the stretch at start. Squeeze with chest not arms.",alt:"Dumbbell fly",ytId:"eF4Xgn_WNNY"},
      {id:"cable-fly",name:"Cable Low to High Fly",sets:"3",reps:"To failure",rest:"90 sec",cat:"CHEST",bjj:"Upper chest · Push-away",why:"Targets upper pec. Cable keeps constant tension throughout full range.",tips:"Cables at lowest position. Pull upward in arc. Slight elbow bend.",alt:"Incline dumbbell fly",ytId:"X7_bIlDRGAk"},
      {id:"dips",name:"Dips",sets:"3",reps:"To failure",rest:"90 sec",cat:"TRICEPS",bjj:"Push-away · Arm strength",why:"Compound triceps movement. Better grappling transfer than isolation.",tips:"Upright torso for triceps. Controlled down, full extension up.",alt:"Bench dips",ytId:"2z8JmcrW-As"},
      {id:"overhead-tri",name:"Cable Overhead Triceps Extension",sets:"3",reps:"To failure",rest:"60 sec",cat:"TRICEPS",bjj:"Extension strength",why:"Trains the long head of triceps that pushdowns miss.",tips:"Back to machine. Grip behind head. Extend straight up. Elbows still.",alt:"DB overhead extension",ytId:"YbX7Wd8jQ-Q"},
      {id:"leg-ext",name:"Leg Extension (Machine)",sets:"3",reps:"To failure",rest:"60 sec",cat:"QUADS",bjj:"Knee stability · Guard retention",why:"Isolates quads with zero hip load. Ideal for SI joint issues.",tips:"Full extension at top. Hold 1 sec. Controlled descent.",alt:"Wall sit",ytId:"YyvSfVjQeL0"},
    ],
  },
  {
    id:"PULL",label:"PULL",day:"Thursday",color:"#3b82f6",
    focus:"Back · Biceps · Posterior Chain · Legs",duration:"40–45 min",
    setsInfo:"Compound: 2 sets RPE 7–8  ·  Isolation: 3 sets to failure",
    warmup:["5 min bike / row","Hip circles ×10 each side","Glute bridge ×15","Empty bar ×8"],
    exercises:[
      {id:"trap-deadlift",name:"Trap Bar Deadlift",sets:"2",reps:"5–8",rest:"3–4 min",cat:"HIPS/GLUTES",bjj:"Takedowns · Explosive hips",why:"Best hip hinge for SI joint issues. Builds posterior chain, glutes and back together.",tips:"Stand inside bar, neutral spine. Explosive up, controlled down. Stop 1–2 reps before failure.",alt:"Conventional deadlift",ytId:"r4MzxtBKyNE"},
      {id:"pull-ups",name:"Weighted Pull-Ups",sets:"2",reps:"5–8",rest:"2–3 min",cat:"BACK",bjj:"Arm drags · Back takes · Grip",why:"Best vertical pull for grapplers. Trains lats, biceps, traps and grip together.",tips:"Overhand grip, full ROM. Add belt weight when 8 reps feels easy.",alt:"Band-assisted pull-ups",ytId:"eGo4IYlbE5g"},
      {id:"smith-row",name:"Smith Machine Row",sets:"2",reps:"6–8",rest:"2 min",cat:"BACK",bjj:"Underhook · Clinch · Arm drag",why:"Guided path lets back muscles work without lower back compensation.",tips:"Torso parallel to floor. Explosive pull, controlled down.",alt:"Seated cable row",ytId:"G8l_8chR5BE"},
      {id:"leg-press",name:"Leg Press",sets:"2",reps:"8–10",rest:"2 min",cat:"QUADS",bjj:"Takedown power · Guard retention",why:"Compound leg work without hip load of squats. Adjust depth yourself.",tips:"Feet shoulder-width. Control depth based on how hip feels.",alt:"Goblet squat when hips allow",ytId:"IZxyjW7MBSA"},
      {id:"leg-curl",name:"Leg Curl (Machine)",sets:"3",reps:"To failure",rest:"60 sec",cat:"HAMSTRINGS",bjj:"Heel hooks · Posterior chain",why:"Isolates hamstrings. Completes posterior chain alongside deadlift.",tips:"Controlled down, explosive up. Full ROM. Hold at top.",alt:"Nordic curl",ytId:"1Tq3QdYUuHs"},
      {id:"ez-curl",name:"EZ-Bar Curl",sets:"3",reps:"To failure",rest:"60 sec",cat:"BICEPS",bjj:"Grip strength · Arm drags",why:"Reduces wrist stress. Builds bicep strength for all BJJ pulling.",tips:"Elbows still. Full ROM. Squeeze at top. Run to failure.",alt:"Dumbbell curl",ytId:"av7-8igZwV0"},
      {id:"rope-hammer",name:"Rope Hammer Curl",sets:"3",reps:"To failure",rest:"60 sec",cat:"BICEPS",bjj:"Grip · Forearm · Gi control",why:"Constant tension trains brachialis and forearm. Builds Gi grip.",tips:"Neutral grip. Elbows still. Squeeze up, controlled down.",alt:"Dumbbell hammer curl",ytId:"TwD-YGVP4Bk"},
    ],
  },
  {
    id:"FULL",label:"FULL BODY",day:"Saturday",color:"#10b981",
    focus:"Full body · Heaviest session",duration:"60–70 min",
    setsInfo:"3 sets on everything · Compound RPE 7–8 · Isolation to failure",
    warmup:["5 min bike / row","Hip circles ×10","Shoulder circles ×10","Glute bridge ×15","Empty bar ×8"],
    exercises:[
      {id:"trap-dl-f",name:"Trap Bar Deadlift",sets:"3",reps:"5–8",rest:"3–4 min",cat:"HIPS/GLUTES",bjj:"Takedowns · Posterior chain",why:"Heaviest lift first when freshest. No BJJ today — push harder.",tips:"Neutral spine, explosive up. Heaviest day — keep 1–2 reps in tank.",alt:"Conventional deadlift",ytId:"r4MzxtBKyNE"},
      {id:"smith-bench-f",name:"Smith Machine Bench Press",sets:"3",reps:"6–8",rest:"2–3 min",cat:"CHEST",bjj:"Framing · Push-away",why:"3 sets Saturday = more volume for muscle growth.",tips:"Shoulder blades retracted. Controlled down, explosive up.",alt:"Dumbbell press",ytId:"vcBig73ojpE"},
      {id:"pull-ups-f",name:"Weighted Pull-Ups",sets:"3",reps:"5–8",rest:"2–3 min",cat:"BACK",bjj:"Arm drags · Grip strength",why:"3 sets for extra back volume. No BJJ = better recovery.",tips:"Full ROM, controlled down.",alt:"Lat pulldown",ytId:"eGo4IYlbE5g"},
      {id:"shoulder-press-f",name:"Seated Dumbbell Shoulder Press",sets:"3",reps:"8–10",rest:"2 min",cat:"SHOULDERS",bjj:"Overhead strength",why:"Extra shoulder volume for balanced upper body.",tips:"Full ROM, controlled to ear height.",alt:"Barbell OHP",ytId:"qEwKCR5JCog"},
      {id:"smith-row-f",name:"Smith Machine Row",sets:"3",reps:"6–8",rest:"2 min",cat:"BACK",bjj:"Underhook · Back strength",why:"Horizontal pull complements pull-ups.",tips:"Torso parallel. Explosive up, controlled down.",alt:"Seated cable row",ytId:"G8l_8chR5BE"},
      {id:"chest-fly-f",name:"Machine Chest Fly",sets:"3",reps:"To failure",rest:"90 sec",cat:"CHEST",bjj:"Chest isolation",why:"Extra chest volume on Saturday.",tips:"Feel the stretch at start position.",alt:"Dumbbell fly",ytId:"eF4Xgn_WNNY"},
      {id:"leg-press-f",name:"Leg Press",sets:"3",reps:"8–10",rest:"2 min",cat:"QUADS",bjj:"Leg strength",why:"Heaviest leg session of week.",tips:"Adjust depth by how hip feels.",alt:"Goblet squat",ytId:"IZxyjW7MBSA"},
      {id:"leg-ext-f",name:"Leg Extension",sets:"3",reps:"To failure",rest:"60 sec",cat:"QUADS",bjj:"Quad isolation",why:"Max quad stimulus after leg press.",tips:"Full extension. Hold 1 sec.",alt:"Wall sit",ytId:"YyvSfVjQeL0"},
      {id:"dips-f",name:"Dips",sets:"3",reps:"To failure",rest:"90 sec",cat:"TRICEPS",bjj:"Triceps + Chest",why:"Compound finisher.",tips:"Controlled down, full extension up.",alt:"Bench dips",ytId:"2z8JmcrW-As"},
      {id:"overhead-tri-f",name:"Cable Overhead Triceps Extension",sets:"3",reps:"To failure",rest:"60 sec",cat:"TRICEPS",bjj:"Triceps isolation",why:"Long head triceps that dips miss.",tips:"Elbows still. Extend up.",alt:"DB overhead extension",ytId:"YbX7Wd8jQ-Q"},
      {id:"ez-curl-f",name:"EZ-Bar Curl",sets:"3",reps:"To failure",rest:"60 sec",cat:"BICEPS",bjj:"Biceps · Grip",why:"Biceps finisher.",tips:"Elbows still. Full ROM.",alt:"Dumbbell curl",ytId:"av7-8igZwV0"},
    ],
  },
];

const catColors={Stretch:"#a855f7",Activation:"#FF6B00",Core:"#3b82f6"};
const rehabWeeks=[
  {week:1,label:"Week 1",focus:"Hip flexor stretching + basic glute activation",freq:"Daily · 10–12 min",exercises:[
    {name:"Hip Flexor Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"Lunge with back knee on floor. Push hips forward until you feel a stretch front of the back leg.",ytId:"YqgGvFpSn_0"},
    {name:"90/90 Hip Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"One leg 90° front, one 90° behind. Lean forward over front leg. Breathe deeply.",ytId:"HSCGzFvKDEM"},
    {name:"Pigeon Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"One leg bent in front, back leg straight. Sink toward floor. Direct SI joint relief.",ytId:"GDIguR6gMWs"},
    {name:"Glute Squeeze (Lying)",sets:"3",reps:"10 × 10 sec",category:"Activation",tips:"Lie on back. Squeeze glutes hard 10 sec, fully relax. No other movement.",ytId:"0muSzRHJzMU"},
    {name:"Clamshell with Band",sets:"3",reps:"15 each side",category:"Activation",tips:"Lie on side, band around knees. Open knees like a clamshell. Keep pelvis still.",ytId:"HG5LWNXl48M"},
  ]},
  {week:2,label:"Week 2",focus:"Build glute activation + introduce core work",freq:"Daily · 12–14 min",exercises:[
    {name:"Hip Flexor Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"Lunge with back knee on floor. Push hips forward. Hold and breathe.",ytId:"YqgGvFpSn_0"},
    {name:"90/90 Hip Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"Lean forward over front leg. Breathe into the hip.",ytId:"HSCGzFvKDEM"},
    {name:"Clamshell with Band",sets:"3",reps:"15 each side",category:"Activation",tips:"Keep pelvis completely still. Focus on outer glute.",ytId:"HG5LWNXl48M"},
    {name:"Donkey Kick",sets:"3",reps:"12 each side",category:"Activation",tips:"On all fours. Kick leg up toward ceiling. Drive heel up.",ytId:"SJ4JXgHqXBk"},
    {name:"Single Leg Glute Bridge",sets:"3",reps:"10 each side",category:"Activation",tips:"One leg extended. Drive up with the other. Squeeze glutes hard at top for 2 sec.",ytId:"pumBXpJ6jbc"},
    {name:"Dead Bug",sets:"3",reps:"8 each side",category:"Core",tips:"Arms up, knees 90°. Lower opposite arm and leg without lower back lifting. Exhale during.",ytId:"4XLEnwUr1d8"},
  ]},
  {week:3,label:"Week 3",focus:"Full routine + plank and bird dog",freq:"Daily · 14–15 min",exercises:[
    {name:"Hip Flexor Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"Lunge. Push hips forward. Hold and breathe.",ytId:"YqgGvFpSn_0"},
    {name:"90/90 Hip Stretch",sets:"2 sides",reps:"45 sec",category:"Stretch",tips:"Lean forward. Relax into stretch.",ytId:"HSCGzFvKDEM"},
    {name:"Clamshell with Band",sets:"3",reps:"15 each side",category:"Activation",tips:"Pelvis still. Slow and controlled.",ytId:"HG5LWNXl48M"},
    {name:"Single Leg Glute Bridge",sets:"3",reps:"12 each side",category:"Activation",tips:"Squeeze glutes at top. Notice left vs right difference.",ytId:"pumBXpJ6jbc"},
    {name:"Dead Bug",sets:"3",reps:"10 each side",category:"Core",tips:"Lower back flat the entire time. Exhale during movement.",ytId:"4XLEnwUr1d8"},
    {name:"Bird Dog",sets:"3",reps:"8 each side",category:"Core",tips:"Extend opposite arm and leg. Hold pelvis completely still. Hold 2 sec.",ytId:"wiFNA3sqjCA"},
    {name:"Plank",sets:"3",reps:"30–45 sec",category:"Core",tips:"Forearms on floor. Body straight. Pull navel toward spine.",ytId:"pvIjrtngAIc"},
  ]},
  {week:4,label:"Week 4",focus:"Add Ab Wheel + increase intensity",freq:"Daily · 15 min",exercises:[
    {name:"Hip Flexor Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"Lunge. Push hips forward.",ytId:"YqgGvFpSn_0"},
    {name:"90/90 Hip Stretch",sets:"2 sides",reps:"45 sec",category:"Stretch",tips:"Lean forward over front leg.",ytId:"HSCGzFvKDEM"},
    {name:"Single Leg Glute Bridge",sets:"3",reps:"15 each side",category:"Activation",tips:"Slow and controlled. Squeeze hard at top.",ytId:"pumBXpJ6jbc"},
    {name:"Donkey Kick",sets:"3",reps:"15 each side",category:"Activation",tips:"Heel toward ceiling. Squeeze glutes at top.",ytId:"SJ4JXgHqXBk"},
    {name:"Dead Bug",sets:"3",reps:"12 each side",category:"Core",tips:"Lower back flat. Exhale during.",ytId:"4XLEnwUr1d8"},
    {name:"Bird Dog",sets:"3",reps:"10 each side",category:"Core",tips:"No pelvis rotation. Hold 2 sec.",ytId:"wiFNA3sqjCA"},
    {name:"Plank",sets:"3",reps:"45–60 sec",category:"Core",tips:"Core active. Breathe calmly.",ytId:"pvIjrtngAIc"},
    {name:"Ab Wheel Rollout (Knees)",sets:"3",reps:"8–10",category:"Core",tips:"Roll out only as far as neutral lower back. Pull back with lats.",ytId:"S7pkaHSMvNI"},
  ]},
  {week:5,label:"Maintenance",focus:"Every other day · Keep what you built",freq:"Every other day · 8–10 min",exercises:[
    {name:"Hip Flexor Stretch",sets:"2 sides",reps:"60 sec",category:"Stretch",tips:"Lunge. Push hips forward.",ytId:"YqgGvFpSn_0"},
    {name:"90/90 Hip Stretch",sets:"2 sides",reps:"45 sec",category:"Stretch",tips:"Lean forward over front leg.",ytId:"HSCGzFvKDEM"},
    {name:"Single Leg Glute Bridge",sets:"2",reps:"12 each side",category:"Activation",tips:"Quality over quantity. Squeeze at top.",ytId:"pumBXpJ6jbc"},
    {name:"Clamshell with Band",sets:"2",reps:"15 each side",category:"Activation",tips:"Pelvis still. Slow.",ytId:"HG5LWNXl48M"},
    {name:"Dead Bug",sets:"2",reps:"10 each side",category:"Core",tips:"Lower back flat. Exhale.",ytId:"4XLEnwUr1d8"},
    {name:"Plank",sets:"2",reps:"45–60 sec",category:"Core",tips:"Core active. Breathe.",ytId:"pvIjrtngAIc"},
  ]},
];

const bjjTechniques = [
  // SUBMISSIONS - Beginner
  {id:1,name:"Rear Naked Choke",level:"Beginner",category:"Submissions",ytId:"hdkMOhBBbMI",desc:"Most fundamental submission. Applied from back control with body triangle.",archetype:true},
  {id:2,name:"Guillotine Choke",level:"Beginner",category:"Submissions",ytId:"cwQsYe7NLTE",desc:"Front headlock choke — your #1 weapon as a long-armed outfighter. Attack from standing and guard.",archetype:true},
  {id:3,name:"Armbar from Guard",level:"Beginner",category:"Submissions",ytId:"5eBfcV3RBNE",desc:"Classic armbar attacking the elbow from closed guard."},
  {id:4,name:"Triangle Choke",level:"Beginner",category:"Submissions",ytId:"6Pk3k9bCHYg",desc:"Your primary weapon. Long legs = easier to lock in. Attack from closed guard and K-guard.",archetype:true},
  {id:5,name:"Kimura",level:"Beginner",category:"Submissions",ytId:"mj_tqPpN8lU",desc:"Shoulder lock attacking rotator cuff from various positions. Works great from front headlock."},
  {id:6,name:"Americana",level:"Beginner",category:"Submissions",ytId:"T8DIb4JVESI",desc:"Shoulder lock from top position, also called the key lock."},
  // GUARD - Beginner
  {id:7,name:"Closed Guard Basics",level:"Beginner",category:"Guard",ytId:"7PLZS0HXQRU",desc:"Fundamental control and attack principles from closed guard. Your first home."},
  {id:8,name:"K-Guard (Kneeshield)",level:"Beginner",category:"Guard",ytId:"2u6EEjTHv-I",desc:"Half guard variant using your knee as a frame. Suits your body type for triangles and sweeps.",archetype:true},
  {id:9,name:"Guard Pull",level:"Beginner",category:"Guard",ytId:"Gv2r2AVNQQM",desc:"Pulling opponent into your guard from standing. Learn this early for competition."},
  // ESCAPES - Beginner
  {id:10,name:"Hip Escape (Shrimping)",level:"Beginner",category:"Escapes",ytId:"1VFZM7sTgIE",desc:"The most important movement in BJJ. Foundation of all guard retention. Drill daily.",archetype:true},
  {id:11,name:"Bridge and Roll (Upa)",level:"Beginner",category:"Escapes",ytId:"U3YHoEnFUlA",desc:"Escape from mount using explosive hip bridge and roll."},
  {id:12,name:"Framing Against Mount",level:"Beginner",category:"Escapes",ytId:"hzHKU3oM-Ic",desc:"Use your long arms as frames to keep heavier opponents off your chest. Your defensive archetype.",archetype:true},
  // TAKEDOWNS - Beginner
  {id:13,name:"Double Leg Takedown",level:"Beginner",category:"Takedowns",ytId:"Tq_VE_ks7CE",desc:"Most common wrestling takedown — drives both legs."},
  {id:14,name:"Single Leg Takedown",level:"Beginner",category:"Takedowns",ytId:"dDAfCHlXwWQ",desc:"Attack one leg to bring opponent to the ground."},
  {id:15,name:"Front Headlock System",level:"Beginner",category:"Takedowns",ytId:"cwQsYe7NLTE",desc:"Control opponent's head and arm from front. Your main takedown system — leads to guillotines and D'Arce.",archetype:true},
  // SWEEPS - Beginner
  {id:16,name:"Scissor Sweep",level:"Beginner",category:"Sweeps",ytId:"SiRTJkBBcEk",desc:"Classic sweep from closed guard using scissoring leg motion."},
  {id:17,name:"Hip Bump Sweep",level:"Beginner",category:"Sweeps",ytId:"TkpVlgxKAQA",desc:"Simple sweep from closed guard. Sets up triangle and kimura perfectly."},
  // GUARD PASSING - Beginner
  {id:18,name:"Toreando Pass",level:"Beginner",category:"Guard Passing",ytId:"OyOY_hNfloE",desc:"Bullfighter pass — control ankles and move around guard. Your primary passing style as a speed passer.",archetype:true},
  // SUBMISSIONS - Intermediate
  {id:19,name:"D'Arce Choke",level:"Intermediate",category:"Submissions",ytId:"3s4MJpTBhEk",desc:"No-gi choke from front headlock and side control. Your archetype weapon — pairs with guillotine.",archetype:true},
  {id:20,name:"Anaconda Choke",level:"Intermediate",category:"Submissions",ytId:"yQWOhvdqJXY",desc:"Arm-in choke when opponent turtles. Works great after a failed double leg."},
  {id:21,name:"Omoplata",level:"Intermediate",category:"Submissions",ytId:"KKXJbxIk0HM",desc:"Shoulder lock using your legs — can be used as sweep or submission."},
  {id:22,name:"Arm Triangle (Head & Arm)",level:"Intermediate",category:"Submissions",ytId:"q3PMSQXG5mY",desc:"Choke from side control or mount trapping arm against opponent's neck."},
  {id:23,name:"Rear Naked Choke Setup",level:"Intermediate",category:"Submissions",ytId:"HZ5DW9NbHYU",desc:"Full back control system — seatbelt grip, body triangle, and RNC finish.",archetype:true},
  // GUARD - Intermediate
  {id:24,name:"De La Riva Guard",level:"Intermediate",category:"Guard",ytId:"PsNbWjb0-pE",desc:"Outside hook guard — foundation of many modern sweeps. Works well for longer players."},
  {id:25,name:"X-Guard",level:"Intermediate",category:"Guard",ytId:"wGXBAtcDSMY",desc:"Dynamic guard system controlling opponent from below. Great for taller players."},
  {id:26,name:"Butterfly Guard",level:"Intermediate",category:"Guard",ytId:"3X7sBOvHy6I",desc:"Hooks inside thighs — excellent for sweeps and elevations. Good with long legs.",archetype:true},
  // BACK TAKES - Intermediate
  {id:27,name:"Back Take from Turtle",level:"Intermediate",category:"Back Takes",ytId:"GBbqfKXcn9g",desc:"Taking the back when opponent turtles up. Your archetype — the back hunter.",archetype:true},
  {id:28,name:"Back Take from Single Leg",level:"Intermediate",category:"Back Takes",ytId:"xJ0M7hPXhpc",desc:"Transition from single leg to back control. Extremely effective."},
  {id:29,name:"Body Triangle from Back",level:"Intermediate",category:"Back Takes",ytId:"hHFINk3dapI",desc:"Lock your legs in a triangle around opponent's body. With long legs this is devastating.",archetype:true},
  // GUARD PASSING - Intermediate
  {id:30,name:"Leg Drag Pass",level:"Intermediate",category:"Guard Passing",ytId:"Ql7YJ2sHuWE",desc:"Drag opponent's leg to pass guard efficiently. Your secondary passing style.",archetype:true},
  {id:31,name:"Knee Slice Pass",level:"Intermediate",category:"Guard Passing",ytId:"J3RtGUjjMkI",desc:"Slice knee through guard. One of the most reliable passes in BJJ."},
  {id:32,name:"Headquarters Position",level:"Intermediate",category:"Guard Passing",ytId:"bkJA1E6A1aY",desc:"Base position for launching multiple passes. Learn the HQ game."},
  // SWEEPS - Intermediate
  {id:33,name:"Flower Sweep (Pendulum)",level:"Intermediate",category:"Sweeps",ytId:"R01T8YPAVVY",desc:"Underhook sweep from closed guard using pendulum motion."},
  {id:34,name:"Butterfly Sweep",level:"Intermediate",category:"Sweeps",ytId:"tT3jVmVtFe0",desc:"Elevator sweep using butterfly hooks. Works beautifully with long legs."},
  {id:35,name:"De La Riva Sweep",level:"Intermediate",category:"Sweeps",ytId:"qJNFwDdHHVs",desc:"Sweep from De La Riva guard — trip the far leg."},
  // ADVANCED
  {id:36,name:"Heel Hook (Outside)",level:"Advanced",category:"Leg Locks",ytId:"J_vVeXaYUOI",desc:"Attacks the knee by rotating the heel. Train with care and a trusted partner."},
  {id:37,name:"Kneebar",level:"Advanced",category:"Leg Locks",ytId:"HgjS8bXajgs",desc:"Hyperextends the knee joint. Advanced leg lock."},
  {id:38,name:"Berimbolo",level:"Advanced",category:"Guard",ytId:"5GOaIXC3bD0",desc:"Inverted rolling technique to take the back from De La Riva."},
  {id:39,name:"50/50 Guard",level:"Advanced",category:"Guard",ytId:"VCd8hVGjV8s",desc:"Entangled leg position — common in competition leg lock exchanges."},
  {id:40,name:"Saddle / Inside Sankaku",level:"Advanced",category:"Leg Locks",ytId:"9x0xYI1l5aM",desc:"Entangled position for heel hooks. The most dangerous leg lock position."},
  {id:41,name:"Back Take from Guard",level:"Advanced",category:"Back Takes",ytId:"2VdXG9-gBvE",desc:"Take the back directly from your guard. High percentage at advanced level."},
];

const archetype = {
  title:"The Versatile Outfighter",
  subtitle:"Your personal game plan based on your body type",
  body:"At 179cm and 75kg (target weight), you are long and lean for your weight class. This gives you a reach advantage over shorter, more compact opponents. Your game is built around controlling distance, threatening with long-limb submissions, and hunting the back.",
  pillars:[
    {icon:"🔺",title:"Guard: The Triangler",color:"#FF6B00",desc:"Your long legs are your primary weapon. Focus on Closed Guard and K-Guard. You can lock in triangles and front headlock systems that shorter opponents struggle to escape."},
    {icon:"⚡",title:"Passing: The Speed Passer",color:"#3b82f6",desc:"Don't try to smash through people. Be fast and work the outside. Toreando passes and Leg Drags — circle around guards instead of getting stuck in them."},
    {icon:"🎯",title:"Top: The Back Hunter",color:"#10b981",desc:"In No-Gi, the back is the most dominant position. With your body type, taking the back is often easier than holding a heavy Side Control. Once there, lock a Body Triangle — with long legs it's devastating."},
    {icon:"🛡️",title:"Defense: The Framer",color:"#a855f7",desc:"As a beginner you'll end up on the bottom. Use your long arms and legs as frames to keep heavier opponents off your chest. Create space immediately — never let them flatten you out."},
  ],
  weapons:["Triangle Choke","Guillotine / D'Arce Choke","Rear Naked Choke from Body Triangle","Toreando Pass","Leg Drag Pass"],
};

const blueprintPath = [
  {phase:"Phase 1",title:"Survival",weeks:"Weeks 1–8",color:"#10b981",items:["Hip escape (shrimping) — drill daily","Framing against mount and side control","Closed guard basics","Rear naked choke","Bridge and roll escape from mount"]},
  {phase:"Phase 2",title:"Your Weapons",weeks:"Weeks 9–20",color:"#FF6B00",items:["Triangle choke from closed guard","Guillotine from front headlock","Toreando pass","Guard pull","Hip bump sweep + scissor sweep"]},
  {phase:"Phase 3",title:"The Back Hunter",weeks:"Weeks 21–40",color:"#3b82f6",items:["Back take from turtle","Body triangle control","Rear naked choke finish","D'Arce choke","Leg drag pass + knee slice pass"]},
  {phase:"Phase 4",title:"Compete",weeks:"Weeks 41–78",color:"#a855f7",items:["Develop your A-game","Enter local competition","Butterfly guard sweeps","De La Riva guard","Blue belt examination"]},
];

function getRec(history){
  if(!history?.length) return null;
  const last=history[history.length-1];
  const n=history.filter(h=>h.vikt===last.vikt).length;
  if(last.rpe&&last.rpe<=6) return{up:true,text:`RPE ${last.rpe} last time — increase 2.5–5 kg`};
  if(n===1) return{up:false,text:"First session — feel it out"};
  if(n===2) return last.rpe<=7?{up:true,text:"2 sessions, RPE ≤7 — try +2.5 kg"}:{up:false,text:"Focus on technique"};
  if(n>=3) return{up:true,text:`${n} sessions at ${last.vikt} kg — time to increase`};
  return null;
}

function getToday(){return new Date().toISOString().split("T")[0];}
function getDayName(){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];}
function getWeekKey(date){const d=new Date(date);const day=d.getDay();const diff=d.getDate()-day+(day===0?-6:1);return new Date(d.setDate(diff)).toISOString().split("T")[0];}
function getMonthKey(date){return date.slice(0,7);}

function VThumb({ytId,name,color}){
  return(
    <a href={`https://www.youtube.com/watch?v=${ytId}`} target="_blank" rel="noopener noreferrer" style={{display:"block"}}>
      <div style={{position:"relative",width:"100%",aspectRatio:"16/9",borderRadius:10,overflow:"hidden",background:"#111"}}>
        <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{width:48,height:48,borderRadius:"50%",background:color||T.orange,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 20px ${color||T.orange}70`}}>
            <div style={{width:0,height:0,borderTop:"8px solid transparent",borderBottom:"8px solid transparent",borderLeft:"14px solid #fff",marginLeft:3}}/>
          </div>
        </div>
        <div style={{position:"absolute",bottom:8,right:10,fontSize:9,color:"rgba(255,255,255,0.4)"}}>YOUTUBE ↗</div>
      </div>
    </a>
  );
}

function Divider({label,color}){
  return(
    <div style={{fontSize:9,color:color||T.muted,letterSpacing:"0.12em",marginBottom:8,marginTop:4,display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:14,height:1,background:color||T.muted}}/>{label}<div style={{flex:1,height:1,background:T.border}}/>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({bjjLog,gymLog}){
  const today=getToday();const dayName=getDayName();
  const quote=quotes[new Date().getDate()%quotes.length];
  const bjjSessions=bjjLog.sessions||[];const gymSessions=gymLog.sessions||[];
  const weekKey=getWeekKey(today);
  const weekBjj=bjjSessions.filter(s=>getWeekKey(s.date)===weekKey);
  const weekGym=gymSessions.filter(s=>getWeekKey(s.date)===weekKey);
  const monthBjj=bjjSessions.filter(s=>getMonthKey(s.date)===getMonthKey(today));
  const monthGym=gymSessions.filter(s=>getMonthKey(s.date)===getMonthKey(today));
  let streak=0;const allDates=[...new Set([...bjjSessions.map(s=>s.date),...gymSessions.map(s=>s.date)])].sort().reverse();
  let checkDate=new Date(today);
  for(let i=0;i<365;i++){const ds=checkDate.toISOString().split("T")[0];if(allDates.includes(ds)){streak++;checkDate.setDate(checkDate.getDate()-1);}else break;}
  const todaySuggestion={Monday:{label:"BJJ — Gi",sub:"12:00 – 13:00",color:T.orange},Tuesday:{label:"Gym — PUSH",sub:"Chest · Shoulders · Triceps",color:"#FF6B00"},Wednesday:{label:"BJJ — Gi",sub:"12:00 – 13:00",color:T.orange},Thursday:{label:"Gym — PULL",sub:"Back · Biceps · Posterior Chain",color:T.blue},Friday:{label:"BJJ — No-Gi",sub:"19:00 – 20:00",color:T.orange},Saturday:{label:"Gym — Full Body",sub:"Heaviest session of the week",color:T.green},Sunday:{label:"Rest Day",sub:"Recovery & sleep",color:T.muted}}[dayName]||{label:"Rest Day",sub:"Recovery",color:T.muted};
  const hr=new Date().getHours();const greeting=hr<12?"morning":hr<18?"afternoon":"evening";
  return(
    <div style={{padding:"0 20px 20px"}}>
      <div style={{marginBottom:24}}>
        <div style={{fontSize:13,color:T.muted,marginBottom:4}}>Good {greeting}</div>
        <div style={{fontSize:28,fontWeight:700,color:T.text,letterSpacing:"-0.02em"}}>Hey Sameh 👋</div>
      </div>
      <div style={{background:`${todaySuggestion.color}15`,border:`1px solid ${todaySuggestion.color}30`,borderRadius:14,padding:"16px",marginBottom:16}}>
        <div style={{fontSize:10,color:todaySuggestion.color,letterSpacing:"0.12em",marginBottom:8}}>TODAY · {dayName.toUpperCase()}</div>
        <div style={{fontSize:18,fontWeight:600,color:T.text,marginBottom:4}}>{todaySuggestion.label}</div>
        <div style={{fontSize:13,color:T.muted}}>{todaySuggestion.sub}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
        {[{label:"BJJ this week",value:weekBjj.length,sub:`${weekBjj.length}h`,color:T.orange},{label:"Gym this week",value:weekGym.length,sub:"sessions",color:T.blue},{label:"Streak",value:streak,sub:"days",color:T.green}].map((s,i)=>(
          <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"12px 10px"}}>
            <div style={{fontSize:22,fontWeight:700,color:s.color}}>{s.value}</div>
            <div style={{fontSize:9,color:T.muted,marginTop:2}}>{s.sub}</div>
            <div style={{fontSize:9,color:T.subtle,marginTop:3,lineHeight:1.3}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"16px",marginBottom:16}}>
        <div style={{fontSize:11,color:T.muted,marginBottom:14}}>This month</div>
        <div style={{display:"flex"}}>
          {[{label:"BJJ sessions",value:monthBjj.length,color:T.orange},{label:"BJJ hours",value:monthBjj.length,color:T.orange},{label:"Gym sessions",value:monthGym.length,color:T.blue}].map((s,i)=>(
            <div key={i} style={{flex:1,textAlign:"center",borderRight:i<2?`1px solid ${T.border}`:"none"}}>
              <div style={{fontSize:24,fontWeight:700,color:s.color}}>{s.value}</div>
              <div style={{fontSize:10,color:T.muted,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"16px"}}>
        <div style={{fontSize:10,color:T.subtle,letterSpacing:"0.1em",marginBottom:10}}>DAILY QUOTE</div>
        <div style={{fontSize:14,color:T.text,lineHeight:1.6,fontStyle:"italic",marginBottom:8}}>"{quote.text}"</div>
        <div style={{fontSize:11,color:T.muted}}>— {quote.author}</div>
      </div>
    </div>
  );
}

// ─── GYM ─────────────────────────────────────────────────────────────────────
function GymExCard({ex,passColor}){
  const[open,setOpen]=useState(false);const cc=katColor[ex.cat]||passColor;
  return(
    <div style={{background:T.surface,borderRadius:12,border:`1px solid ${open?T.subtle:T.border}`,marginBottom:6,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:3,height:34,borderRadius:2,background:open?cc:T.subtle,flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
            <span style={{fontSize:13,fontWeight:500,color:open?T.text:"#aaa"}}>{ex.name}</span>
            <span style={{fontSize:8,color:cc,background:`${cc}15`,border:`1px solid ${cc}25`,borderRadius:3,padding:"1px 5px"}}>{ex.cat}</span>
          </div>
          <div style={{display:"flex",gap:12}}>
            {[["Sets",ex.sets],["Reps",ex.reps],["Rest",ex.rest]].map(([l,v])=>(
              <span key={l} style={{fontSize:10,color:T.muted}}><span style={{color:T.subtle}}>{l} </span>{v}</span>
            ))}
          </div>
        </div>
        <div style={{color:T.subtle,fontSize:10}}>{open?"▲":"▼"}</div>
      </div>
      {open&&(
        <div style={{borderTop:`1px solid ${T.border}`}}>
          <div style={{padding:"12px 15px"}}><VThumb ytId={ex.ytId} name={ex.name} color={passColor}/></div>
          <div style={{padding:"0 15px 15px",display:"flex",flexDirection:"column",gap:10}}>
            <div style={{background:`${cc}10`,borderLeft:`2px solid ${cc}`,borderRadius:"0 6px 6px 0",padding:"9px 12px"}}>
              <div style={{fontSize:9,color:cc,letterSpacing:"0.1em",marginBottom:3}}>BJJ RELEVANCE</div>
              <div style={{fontSize:12,color:"#ccc"}}>{ex.bjj}</div>
            </div>
            <div><div style={{fontSize:9,color:T.subtle,letterSpacing:"0.1em",marginBottom:4}}>WHY</div><div style={{fontSize:12,color:T.muted,lineHeight:1.65}}>{ex.why}</div></div>
            <div style={{background:T.surface2,borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:9,color:T.subtle,letterSpacing:"0.1em",marginBottom:4}}>TECHNIQUE</div>
              <div style={{fontSize:12,color:T.muted,lineHeight:1.6}}>{ex.tips}</div>
            </div>
            <div style={{fontSize:11,color:T.subtle}}>Alternative — <span style={{color:"#555"}}>{ex.alt}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

function GymScreen({gymLog,onGymUpdate}){
  const[subTab,setSubTab]=useState("exercises");
  const[pid,setPid]=useState("PUSH");
  const[datum,setDatum]=useState(getToday);
  const[entries,setEntries]=useState({});
  const[saved,setSaved]=useState(false);
  const pass=gymPasses.find(p=>p.id===pid);
  const katOrder={PUSH:["CHEST","SHOULDERS","TRICEPS","QUADS"],PULL:["HIPS/GLUTES","BACK","HAMSTRINGS","QUADS","BICEPS"],FULL:["HIPS/GLUTES","CHEST","BACK","SHOULDERS","TRICEPS","QUADS","BICEPS"]};
  const grouped=(katOrder[pid]||[]).reduce((acc,kat)=>{const ovs=pass.exercises.filter(o=>o.cat===kat);if(ovs.length)acc.push({kat,ovs});return acc;},[]);
  function hChange(ovId,field,val){setEntries(p=>({...p,[ovId]:{...(p[ovId]||{}),[field]:val}}));}
  function hSave(){
    const nl={...gymLog};const exLog=nl.exLog||{};
    Object.entries(entries).forEach(([ovId,data])=>{
      if(!data.vikt)return;if(!exLog[ovId])exLog[ovId]=[];
      exLog[ovId]=exLog[ovId].filter(e=>e.date!==datum);
      exLog[ovId].push({date:datum,vikt:parseFloat(data.vikt),reps:data.reps||"",rpe:data.rpe?parseInt(data.rpe):null,pass:pid});
      exLog[ovId]=exLog[ovId].slice(-20);
    });
    const sessions=nl.sessions||[];
    if(!sessions.find(s=>s.date===datum&&s.type===pid)){sessions.push({date:datum,type:pid,duration:1});}
    onGymUpdate({...nl,exLog,sessions});setEntries({});setSaved(true);setTimeout(()=>setSaved(false),2500);
  }
  const hasEntries=Object.values(entries).some(e=>e.vikt);
  const exLog=gymLog.exLog||{};

  // Log gym session without weight
  function logGymSession(){
    const nl={...gymLog};const sessions=nl.sessions||[];
    if(!sessions.find(s=>s.date===datum&&s.type===pid)){
      sessions.push({date:datum,type:pid,duration:1});
      onGymUpdate({...nl,sessions});
    }
  }
  const todayLogged=(gymLog.sessions||[]).find(s=>s.date===datum&&s.type===pid);

  return(
    <div>
      <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,paddingLeft:20,paddingRight:20}}>
        {[["exercises","Exercises"],["progression","Progression"]].map(([id,label])=>(
          <button key={id} onClick={()=>setSubTab(id)} style={{flex:1,padding:"10px 8px 12px",background:"transparent",color:subTab===id?T.text:T.muted,border:"none",borderBottom:`2px solid ${subTab===id?T.orange:"transparent"}`,fontSize:13,fontWeight:subTab===id?600:400}}>{label}</button>
        ))}
      </div>
      <div style={{padding:"16px 20px 20px"}}>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {gymPasses.map(p=>(
            <button key={p.id} onClick={()=>setPid(p.id)} style={{flex:1,padding:"11px 6px",borderRadius:10,cursor:"pointer",textAlign:"center",background:pid===p.id?p.color:T.surface,border:`1px solid ${pid===p.id?p.color:T.border}`,color:pid===p.id?"#fff":T.muted,fontSize:10,fontWeight:pid===p.id?600:400}}>
              <div>{p.label}</div><div style={{fontSize:9,opacity:0.7,marginTop:1}}>{p.day}</div>
            </button>
          ))}
        </div>

        {/* Quick log today */}
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
          <div style={{fontSize:10,color:T.muted,marginBottom:8}}>Quick log — {datum}</div>
          {todayLogged?(
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:T.green}}/>
              <span style={{fontSize:12,color:T.green,fontWeight:500}}>{pass.label} session logged ✓</span>
            </div>
          ):(
            <button onClick={logGymSession} style={{width:"100%",padding:"10px",background:`${pass.color}15`,border:`1px solid ${pass.color}35`,borderRadius:7,color:pass.color,fontSize:12,fontWeight:600,cursor:"pointer"}}>
              + Log {pass.label} session today
            </button>
          )}
        </div>

        {subTab==="exercises"&&<>
          <div style={{background:`${pass.color}10`,border:`1px solid ${pass.color}20`,borderRadius:8,padding:"9px 13px",marginBottom:12,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
            <div style={{fontSize:10,color:pass.color}}>{pass.setsInfo}</div>
            <div style={{fontSize:10,color:T.muted}}>{pass.duration}</div>
          </div>
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 13px",marginBottom:14}}>
            <div style={{fontSize:10,color:T.muted,marginBottom:7}}>Warm-up — 5–8 min</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {pass.warmup.map((item,i)=>(<div key={i} style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:5,padding:"3px 8px",fontSize:10,color:T.muted}}>{item}</div>))}
            </div>
          </div>
          {grouped.map(({kat,ovs})=>(
            <div key={kat} style={{marginBottom:16}}>
              <Divider label={kat} color={katColor[kat]||pass.color}/>
              {ovs.map(ov=><GymExCard key={ov.id} ex={ov} passColor={pass.color}/>)}
            </div>
          ))}
        </>}

        {subTab==="progression"&&<>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <span style={{fontSize:12,color:T.muted}}>Date</span>
            <input type="date" value={datum} onChange={e=>setDatum(e.target.value)} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:8,color:"#aaa",padding:"6px 10px",fontSize:12,fontFamily:"inherit",outline:"none"}}/>
          </div>
          {pass.exercises.map(ex=>{
            const hist=(exLog[ex.id]||[]).slice(-8);const rec=getRec(hist);const entry=entries[ex.id]||{};
            return(
              <div key={ex.id} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"13px 15px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:6}}>
                  <div style={{fontSize:12,fontWeight:500,color:"#bbb"}}>{ex.name}</div>
                  {rec&&<div style={{background:rec.up?`${pass.color}15`:T.surface2,border:`1px solid ${rec.up?pass.color+"35":T.border}`,borderRadius:5,padding:"3px 9px",fontSize:10,color:rec.up?"#FF9A3C":T.muted}}>{rec.up?"↑ ":"→ "}{rec.text}</div>}
                </div>
                <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:hist.length>0?10:0}}>
                  {[["Weight (kg)","vikt","number","80",85],["Reps done","reps","text","7,6,6",105],["RPE 1–10","rpe","number","7",72]].map(([label,field,type,ph,w])=>(
                    <div key={field}>
                      <div style={{fontSize:9,color:T.subtle,marginBottom:3}}>{label}</div>
                      <input type={type} placeholder={ph} value={entry[field]||""} onChange={e=>hChange(ex.id,field,e.target.value)} style={{width:w,background:T.surface2,border:`1px solid ${entry[field]?pass.color+"55":T.border}`,borderRadius:7,color:T.text,padding:"7px 9px",fontSize:12,fontFamily:"inherit",outline:"none"}}/>
                    </div>
                  ))}
                </div>
                {hist.length>0&&(
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {hist.slice(-5).map((h,i)=>{const il=i===Math.min(hist.length,5)-1;return(
                      <div key={i} style={{background:il?`${pass.color}15`:T.surface2,border:`1px solid ${il?pass.color+"35":T.border}`,borderRadius:5,padding:"4px 8px"}}>
                        <div style={{fontSize:9,color:il?"#FF9A3C":T.subtle}}>{h.date.slice(5)}</div>
                        <div style={{fontSize:11,color:il?pass.color:"#555",marginTop:1}}>{h.vikt}kg{h.rpe?` · RPE${h.rpe}`:""}</div>
                      </div>
                    );})}
                  </div>
                )}
              </div>
            );
          })}
          <button onClick={hSave} disabled={!hasEntries} style={{width:"100%",marginTop:6,padding:"14px",background:saved?"#1a2800":hasEntries?pass.color:T.surface,color:saved?"#8FCC00":hasEntries?"#fff":T.subtle,border:`1px solid ${saved?"#8FCC00":hasEntries?pass.color:T.border}`,borderRadius:10,fontSize:13,fontWeight:600,cursor:hasEntries?"pointer":"not-allowed",transition:"all 0.25s"}}>
            {saved?"✓ Saved!":"Save session & weights"}
          </button>
          <div style={{marginTop:12,background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontSize:10,color:T.muted,marginBottom:8}}>RPE scale</div>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              {[["6","#4caf50","Easy"],["7","#f0c000","Moderate"],["8","#FF6B00","Hard"],["9","#ff4444","Very hard"],["10","#cc0000","Failure"]].map(([r,c,t])=>(
                <div key={r} style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:13,fontWeight:700,color:c}}>{r}</span><span style={{fontSize:10,color:T.subtle}}>{t}</span></div>
              ))}
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── BJJ ─────────────────────────────────────────────────────────────────────
function BJJScreen(){
  const[subTab,setSubTab]=useState("archetype");
  const[levelFilter,setLevelFilter]=useState("All");
  const[catFilter,setCatFilter]=useState("All");
  const[openTech,setOpenTech]=useState(null);
  const[archetypeFilter,setArchetypeFilter]=useState(false);
  const levels=["All","Beginner","Intermediate","Advanced"];
  const categories=["All",...[...new Set(bjjTechniques.map(t=>t.category))]];
  const filtered=bjjTechniques.filter(t=>(levelFilter==="All"||t.level===levelFilter)&&(catFilter==="All"||t.category===catFilter)&&(!archetypeFilter||t.archetype));
  const levelColors={Beginner:T.green,Intermediate:T.blue,Advanced:T.orange};

  return(
    <div>
      <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,paddingLeft:20,paddingRight:20}}>
        {[["archetype","Your Game"],["techniques","Techniques"],["blueprint","Blueprint"]].map(([id,label])=>(
          <button key={id} onClick={()=>setSubTab(id)} style={{flex:1,padding:"10px 6px 12px",background:"transparent",color:subTab===id?T.text:T.muted,border:"none",borderBottom:`2px solid ${subTab===id?T.orange:"transparent"}`,fontSize:12,fontWeight:subTab===id?600:400}}>{label}</button>
        ))}
      </div>
      <div style={{padding:"16px 20px 20px"}}>

        {subTab==="archetype"&&<>
          <div style={{background:`${T.orange}12`,border:`1px solid ${T.orange}30`,borderRadius:14,padding:"18px",marginBottom:16}}>
            <div style={{fontSize:10,color:T.orange,letterSpacing:"0.12em",marginBottom:8}}>YOUR ARCHETYPE</div>
            <div style={{fontSize:20,fontWeight:700,color:T.text,marginBottom:6}}>{archetype.title}</div>
            <div style={{fontSize:12,color:T.muted,lineHeight:1.7}}>{archetype.body}</div>
          </div>
          {archetype.pillars.map((p,i)=>(
            <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderLeft:`3px solid ${p.color}`,borderRadius:12,padding:"15px",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <span style={{fontSize:20}}>{p.icon}</span>
                <div style={{fontSize:14,fontWeight:600,color:T.text}}>{p.title}</div>
              </div>
              <div style={{fontSize:12,color:T.muted,lineHeight:1.7}}>{p.desc}</div>
            </div>
          ))}
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"15px",marginTop:6}}>
            <div style={{fontSize:10,color:T.subtle,letterSpacing:"0.1em",marginBottom:10}}>YOUR WEAPONS</div>
            {archetype.weapons.map((w,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<archetype.weapons.length-1?`1px solid ${T.border}`:"none"}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:T.orange,flexShrink:0}}/>
                <span style={{fontSize:12,color:T.muted}}>{w}</span>
              </div>
            ))}
          </div>
        </>}

        {subTab==="techniques"&&<>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            {levels.map(l=>(
              <button key={l} onClick={()=>setLevelFilter(l)} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",background:levelFilter===l?(levelColors[l]||T.orange):T.surface,border:`1px solid ${levelFilter===l?(levelColors[l]||T.orange):T.border}`,color:levelFilter===l?"#fff":T.muted,fontSize:11,fontWeight:levelFilter===l?600:400}}>{l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>
            {categories.map(c=>(
              <button key={c} onClick={()=>setCatFilter(c)} style={{padding:"4px 10px",borderRadius:20,cursor:"pointer",background:catFilter===c?T.surface2:T.surface,border:`1px solid ${catFilter===c?T.orange:T.border}`,color:catFilter===c?T.orange:T.muted,fontSize:10}}>{c}</button>
            ))}
          </div>
          <button onClick={()=>setArchetypeFilter(!archetypeFilter)} style={{marginBottom:14,padding:"6px 14px",borderRadius:20,cursor:"pointer",background:archetypeFilter?`${T.orange}20`:T.surface,border:`1px solid ${archetypeFilter?T.orange:T.border}`,color:archetypeFilter?T.orange:T.muted,fontSize:11,fontWeight:archetypeFilter?600:400,display:"flex",alignItems:"center",gap:6}}>
            <span>{archetypeFilter?"★":"☆"}</span> Your archetype moves only
          </button>
          <div style={{fontSize:11,color:T.subtle,marginBottom:10}}>{filtered.length} techniques</div>
          {filtered.map(tech=>{
            const lc=levelColors[tech.level]||T.orange;const isOpen=openTech===tech.id;
            return(
              <div key={tech.id} style={{background:T.surface,borderRadius:12,border:`1px solid ${isOpen?T.subtle:T.border}`,marginBottom:6,overflow:"hidden"}}>
                <div onClick={()=>setOpenTech(isOpen?null:tech.id)} style={{padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:3,height:34,borderRadius:2,background:isOpen?lc:T.subtle,flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4,flexWrap:"wrap"}}>
                      <span style={{fontSize:13,fontWeight:500,color:isOpen?T.text:"#aaa"}}>{tech.name}</span>
                      {tech.archetype&&<span style={{fontSize:8,color:T.orange,background:`${T.orange}15`,border:`1px solid ${T.orange}30`,borderRadius:3,padding:"1px 5px"}}>YOUR GAME</span>}
                      <span style={{fontSize:8,color:lc,background:`${lc}15`,border:`1px solid ${lc}25`,borderRadius:3,padding:"1px 5px"}}>{tech.level}</span>
                      <span style={{fontSize:8,color:T.muted,background:T.surface2,borderRadius:3,padding:"1px 5px"}}>{tech.category}</span>
                    </div>
                    <div style={{fontSize:11,color:T.muted}}>{tech.desc}</div>
                  </div>
                  <div style={{color:T.subtle,fontSize:10}}>{isOpen?"▲":"▼"}</div>
                </div>
                {isOpen&&(<div style={{borderTop:`1px solid ${T.border}`,padding:"12px 15px"}}><VThumb ytId={tech.ytId} name={tech.name} color={lc}/></div>)}
              </div>
            );
          })}
        </>}

        {subTab==="blueprint"&&<>
          <div style={{fontSize:13,color:T.muted,marginBottom:20,lineHeight:1.6}}>Your structured path to blue belt, built around your archetype as The Versatile Outfighter.</div>
          {blueprintPath.map((phase,i)=>(
            <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderLeft:`3px solid ${phase.color}`,borderRadius:12,padding:"16px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:10,color:phase.color,letterSpacing:"0.1em",marginBottom:4}}>{phase.phase} · {phase.weeks}</div>
                  <div style={{fontSize:17,fontWeight:600,color:T.text}}>{phase.title}</div>
                </div>
                <div style={{background:`${phase.color}15`,borderRadius:6,padding:"4px 10px",fontSize:10,color:phase.color}}>{phase.items.length} skills</div>
              </div>
              {phase.items.map((item,j)=>(
                <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:j<phase.items.length-1?`1px solid ${T.border}`:"none"}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:phase.color,flexShrink:0}}/>
                  <span style={{fontSize:12,color:T.muted}}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ─── REHAB ────────────────────────────────────────────────────────────────────
function RehabExCard({ex}){
  const[open,setOpen]=useState(false);const cc=catColors[ex.category]||T.purple;
  return(
    <div style={{background:T.surface,borderRadius:10,border:`1px solid ${open?T.subtle:T.border}`,marginBottom:6,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"11px 13px",cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:3,height:30,borderRadius:2,background:open?cc:T.subtle,flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{fontSize:12,fontWeight:500,color:open?T.text:"#aaa"}}>{ex.name}</span>
            <span style={{fontSize:8,color:cc,background:`${cc}15`,border:`1px solid ${cc}25`,borderRadius:3,padding:"1px 5px"}}>{ex.category}</span>
          </div>
          <div style={{display:"flex",gap:10}}>
            <span style={{fontSize:10,color:T.muted}}><span style={{color:T.subtle}}>Sets </span>{ex.sets}</span>
            <span style={{fontSize:10,color:T.muted}}><span style={{color:T.subtle}}>Duration </span>{ex.reps}</span>
          </div>
        </div>
        <div style={{color:T.subtle,fontSize:10}}>{open?"▲":"▼"}</div>
      </div>
      {open&&(<div style={{borderTop:`1px solid ${T.border}`}}>
        <div style={{padding:"11px 13px"}}><VThumb ytId={ex.ytId} name={ex.name} color={cc}/></div>
        <div style={{padding:"0 13px 13px"}}><div style={{background:T.surface2,borderRadius:7,padding:"9px 11px"}}><div style={{fontSize:9,color:T.subtle,letterSpacing:"0.1em",marginBottom:3}}>TECHNIQUE</div><div style={{fontSize:11,color:T.muted,lineHeight:1.6}}>{ex.tips}</div></div></div>
      </div>)}
    </div>
  );
}

const STATUS_LIST=[{key:"notStarted",label:"Not started",color:"#555",dot:"#333"},{key:"inProgress",label:"In progress",color:T.yellow,dot:T.yellow},{key:"done",label:"Completed",color:T.green,dot:T.green}];

function RehabScreen(){
  const[selWeek,setSelWeek]=useState(1);
  const[statuses,setStatuses]=useState(()=>load(SK.rehabStatus));
  const weekData=rehabWeeks.find(w=>w.week===selWeek);
  const curStatusKey=statuses[selWeek]||"notStarted";
  const curStatus=STATUS_LIST.find(s=>s.key===curStatusKey)||STATUS_LIST[0];
  function cycleStatus(){const order=["notStarted","inProgress","done"];const next=order[(order.indexOf(curStatusKey)+1)%order.length];const ns={...statuses,[selWeek]:next};setStatuses(ns);save(SK.rehabStatus,ns);}
  return(
    <div style={{padding:"0 20px 20px"}}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:10,color:T.muted,marginBottom:8,letterSpacing:"0.1em"}}>SELECT WEEK</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {rehabWeeks.map(w=>{const wst=statuses[w.week]||"notStarted";const wstObj=STATUS_LIST.find(s=>s.key===wst)||STATUS_LIST[0];const isSel=selWeek===w.week;return(
            <button key={w.week} onClick={()=>setSelWeek(w.week)} style={{padding:"7px 13px",borderRadius:8,cursor:"pointer",background:isSel?T.purple:T.surface,border:`1px solid ${isSel?T.purple:T.border}`,color:isSel?"#fff":T.muted,fontSize:11,fontWeight:isSel?600:400,display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:isSel?"#fff":wstObj.dot}}/>{w.label}
            </button>
          );})}
        </div>
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"15px",marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:14}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:T.text,marginBottom:3}}>{weekData.label}</div>
            <div style={{fontSize:12,color:T.muted,lineHeight:1.5}}>{weekData.focus}</div>
            <div style={{fontSize:10,color:T.purple,marginTop:4}}>{weekData.freq}</div>
          </div>
          <button onClick={cycleStatus} style={{background:`${curStatus.dot}15`,border:`1px solid ${curStatus.dot}35`,borderRadius:8,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:curStatus.dot}}/>
            <span style={{fontSize:11,color:curStatus.color,fontWeight:500}}>{curStatus.label}</span>
          </button>
        </div>
        <div style={{display:"flex",gap:3}}>
          {rehabWeeks.map(w=>{const wst=statuses[w.week]||"notStarted";const c=wst==="done"?T.green:wst==="inProgress"?T.yellow:T.border;return <div key={w.week} style={{flex:1,height:2,borderRadius:2,background:c}}/>;} )}
        </div>
      </div>
      {["Stretch","Activation","Core"].map(cat=>{const exs=weekData.exercises.filter(e=>e.category===cat);if(!exs.length)return null;return(<div key={cat} style={{marginBottom:18}}><Divider label={cat.toUpperCase()} color={catColors[cat]}/>{exs.map(ex=><RehabExCard key={ex.name} ex={ex}/>)}</div>);})}
    </div>
  );
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
function ProgressScreen({bjjLog,gymLog,onBjjUpdate,onGymUpdate}){
  const[subTab,setSubTab]=useState("bjj");
  const[selMonth,setSelMonth]=useState(getToday().slice(0,7));
  const bjjSessions=bjjLog.sessions||[];const gymSessions=gymLog.sessions||[];
  const today=getToday();
  const todayBjj=bjjSessions.find(s=>s.date===today);
  function logBjj(){if(todayBjj)return;onBjjUpdate({sessions:[...bjjSessions,{date:today,duration:1,type:"bjj"}]});}
  function removeBjj(){onBjjUpdate({sessions:bjjSessions.filter(s=>s.date!==today)});}
  const[year,month]=selMonth.split("-").map(Number);
  const firstDay=new Date(year,month-1,1).getDay();
  const daysInMonth=new Date(year,month,0).getDate();
  const adjustedFirst=firstDay===0?6:firstDay-1;
  const bjjDays=new Set(bjjSessions.map(s=>s.date));const gymDays=new Set(gymSessions.map(s=>s.date));
  const activeSessions=subTab==="bjj"?bjjSessions:gymSessions;
  const activeColor=subTab==="bjj"?T.orange:T.blue;
  function weekSessions(tab){return(tab==="bjj"?bjjSessions:gymSessions).filter(s=>getWeekKey(s.date)===getWeekKey(today));}
  function monthSessions(tab){return(tab==="bjj"?bjjSessions:gymSessions).filter(s=>s.date.startsWith(selMonth));}
  function yearSessions(tab){return(tab==="bjj"?bjjSessions:gymSessions).filter(s=>s.date.startsWith(today.slice(0,4)));}
  function prevMonth(){const d=new Date(year,month-2,1);setSelMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`);}
  function nextMonth(){const d=new Date(year,month,1);setSelMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`);}
  return(
    <div>
      <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,paddingLeft:20,paddingRight:20}}>
        {[["bjj","BJJ"],["gym","Gym"]].map(([id,label])=>(
          <button key={id} onClick={()=>setSubTab(id)} style={{flex:1,padding:"10px 8px 12px",background:"transparent",color:subTab===id?T.text:T.muted,border:"none",borderBottom:`2px solid ${subTab===id?T.orange:"transparent"}`,fontSize:13,fontWeight:subTab===id?600:400}}>{label}</button>
        ))}
      </div>
      <div style={{padding:"16px 20px 20px"}}>
        {subTab==="bjj"&&(
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px",marginBottom:16}}>
            <div style={{fontSize:11,color:T.muted,marginBottom:10}}>Today — {today}</div>
            {todayBjj?(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:7,height:7,borderRadius:"50%",background:T.green}}/><span style={{fontSize:12,color:T.green,fontWeight:500}}>BJJ session logged ✓</span></div>
                <button onClick={removeBjj} style={{background:"transparent",border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",fontSize:11,color:T.muted,cursor:"pointer"}}>Remove</button>
              </div>
            ):(
              <button onClick={logBjj} style={{width:"100%",padding:"12px",background:`${T.orange}15`,border:`1px solid ${T.orange}35`,borderRadius:8,color:T.orange,fontSize:13,fontWeight:600,cursor:"pointer"}}>+ Log today's BJJ session</button>
            )}
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
          {[{label:"This week",value:weekSessions(subTab).length,sub:subTab==="bjj"?`${weekSessions(subTab).length}h`:"sessions"},{label:"This month",value:monthSessions(subTab).length,sub:subTab==="bjj"?`${monthSessions(subTab).length}h`:"sessions"},{label:"This year",value:yearSessions(subTab).length,sub:subTab==="bjj"?`${yearSessions(subTab).length}h`:"sessions"}].map((s,i)=>(
            <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"12px 10px"}}>
              <div style={{fontSize:22,fontWeight:700,color:activeColor}}>{s.value}</div>
              <div style={{fontSize:9,color:T.muted,marginTop:1}}>{s.sub}</div>
              <div style={{fontSize:9,color:T.subtle,marginTop:3,lineHeight:1.3}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:"14px",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <button onClick={prevMonth} style={{background:"transparent",border:"none",color:T.muted,fontSize:18,cursor:"pointer",padding:"0 8px"}}>‹</button>
            <div style={{fontSize:14,fontWeight:600,color:T.text}}>{new Date(year,month-1,1).toLocaleString("en",{month:"long",year:"numeric"})}</div>
            <button onClick={nextMonth} style={{background:"transparent",border:"none",color:T.muted,fontSize:18,cursor:"pointer",padding:"0 8px"}}>›</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:6}}>
            {["M","T","W","T","F","S","S"].map((d,i)=>(<div key={i} style={{textAlign:"center",fontSize:10,color:T.subtle,padding:"3px 0"}}>{d}</div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
            {Array.from({length:adjustedFirst}).map((_,i)=><div key={`e${i}`}/>)}
            {Array.from({length:daysInMonth}).map((_,i)=>{
              const day=i+1;const dateStr=`${selMonth}-${String(day).padStart(2,"0")}`;
              const isBjj=bjjDays.has(dateStr);const isGym=gymDays.has(dateStr);const isToday=dateStr===today;const hasBoth=isBjj&&isGym;
              return(
                <div key={day} style={{aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8,background:hasBoth?`linear-gradient(135deg,${T.orange} 50%,${T.blue} 50%)`:isBjj?T.orange:isGym?T.blue:"transparent",border:isToday?`1px solid ${T.orange}`:`1px solid ${(isBjj||isGym)?T.border:"transparent"}`}}>
                  <span style={{fontSize:11,fontWeight:(isBjj||isGym||isToday)?600:400,color:(isBjj||isGym)?"#fff":isToday?T.orange:T.muted}}>{day}</span>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:14,marginTop:12,justifyContent:"center"}}>
            {[[T.orange,"BJJ"],[T.blue,"Gym"]].map(([c,l])=>(<div key={l} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:2,background:c}}/><span style={{fontSize:10,color:T.muted}}>{l}</span></div>))}
          </div>
        </div>
        {activeSessions.length>0&&(
          <div>
            <div style={{fontSize:10,color:T.muted,letterSpacing:"0.1em",marginBottom:10}}>RECENT SESSIONS</div>
            {activeSessions.slice(-5).reverse().map((s,i)=>(
              <div key={i} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 13px",marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:6,height:6,borderRadius:"50%",background:activeColor}}/><span style={{fontSize:12,color:T.text}}>{s.date}</span></div>
                <span style={{fontSize:11,color:T.muted}}>{s.type} · {s.duration||1}h</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LOGO & NAV ───────────────────────────────────────────────────────────────
function NakamiLogo({size=26}){
  return(
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#FF6B00" strokeWidth="1.5" fill="none"/>
      <circle cx="14" cy="14" r="7" fill="#FF6B00" fillOpacity="0.12" stroke="#FF6B00" strokeWidth="1"/>
      <circle cx="14" cy="14" r="2.5" fill="#FF6B00"/>
      <line x1="14" y1="1" x2="14" y2="7" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="21" x2="14" y2="27" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="14" x2="7" y2="14" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="21" y1="14" x2="27" y2="14" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function NavIcon({tab,active}){
  const c=active?T.orange:T.muted;const s={width:22,height:22};
  const icons={
    home:<svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    bjj:<svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8c-2 0-4 1.5-4 4s2 4 4 4 4-1.5 4-4-2-4-4-4z"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>,
    gym:<svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12"/></svg>,
    rehab:<svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    progress:<svg {...s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  };
  return icons[tab]||null;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App(){
  const[tab,setTab]=useState("home");
  const[bjjLog,setBjjLog]=useState(()=>load(SK.bjjLog));
  const[gymLog,setGymLog]=useState(()=>load(SK.gymLog));
  function updateBjj(nl){setBjjLog(nl);save(SK.bjjLog,nl);}
  function updateGym(nl){setGymLog(nl);save(SK.gymLog,nl);}
  const navItems=[{id:"home",label:"Home"},{id:"bjj",label:"BJJ"},{id:"gym",label:"Gym"},{id:"rehab",label:"Rehab"},{id:"progress",label:"Progress"}];
  const tabTitles={home:null,bjj:"BJJ",gym:"Gym",rehab:"Rehab",progress:"Progress"};
  return(
    <div style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Inter',system-ui,sans-serif",display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button{cursor:pointer;font-family:inherit;}
        input::placeholder{color:#2a2a2a;}
        input[type=number]::-webkit-inner-spin-button{opacity:0.2;}
        a{color:inherit;text-decoration:none;}
        ::-webkit-scrollbar{width:0;}
      `}</style>
      <div style={{background:T.bg,borderBottom:`1px solid ${T.navBorder}`,padding:"16px 20px 14px",position:"sticky",top:0,zIndex:50}}>
        {tab==="home"?(
          <div style={{display:"flex",alignItems:"center",gap:10}}><NakamiLogo size={26}/><span style={{fontSize:18,fontWeight:700,color:T.text,letterSpacing:"-0.01em"}}>NAKAMI</span></div>
        ):(
          <div style={{display:"flex",alignItems:"center",gap:10}}><NakamiLogo size={20}/><span style={{fontSize:16,fontWeight:600,color:T.text}}>{tabTitles[tab]}</span></div>
        )}
      </div>
      <div style={{flex:1,overflowY:"auto",paddingBottom:80}}>
        {tab==="home"&&<HomeScreen bjjLog={bjjLog} gymLog={gymLog}/>}
        {tab==="bjj"&&<BJJScreen/>}
        {tab==="gym"&&<GymScreen gymLog={gymLog} onGymUpdate={updateGym}/>}
        {tab==="rehab"&&<RehabScreen/>}
        {tab==="progress"&&<ProgressScreen bjjLog={bjjLog} gymLog={gymLog} onBjjUpdate={updateBjj} onGymUpdate={updateGym}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:T.navBg,borderTop:`1px solid ${T.navBorder}`,display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
        {navItems.map(item=>(
          <button key={item.id} onClick={()=>setTab(item.id)} style={{flex:1,padding:"10px 4px 12px",background:"transparent",border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
            <NavIcon tab={item.id} active={tab===item.id}/>
            <span style={{fontSize:9,color:tab===item.id?T.orange:T.muted,fontWeight:tab===item.id?600:400,letterSpacing:"0.02em"}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
