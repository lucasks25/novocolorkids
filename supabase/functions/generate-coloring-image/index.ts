import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, isChristianMode, isChristmasMode } = await req.json();
    console.log('Generating coloring image for category:', category, 'Christian mode:', isChristianMode, 'Christmas mode:', isChristmasMode);
    
    // Add variety modifiers to randomize prompts
    const perspectives = ["front view", "side view", "three-quarter view", "playful angle"];
    const actions = ["sitting", "standing", "playing", "smiling", "waving", "jumping"];
    const settings = ["on grass", "with clouds", "with flowers", "with stars", "in simple scene"];
    const expressions = ["happy face", "joyful expression", "friendly smile", "cheerful look"];
    
    const randomPerspective = perspectives[Math.floor(Math.random() * perspectives.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomSetting = settings[Math.floor(Math.random() * settings.length)];
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.log('LOVABLE_API_KEY not configured, will use offline library');
    }

    // EASY MODE - Christian prompts with variations
    const christianPromptsEasy: Record<string, string[]> = {
      "Histórias Bíblicas": [
        "BLACK AND WHITE COLORING PAGE ONLY! Noah's Ark floating on waves with 4 cute animals on deck: elephant, giraffe, lion, and bird. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Big friendly animal faces with huge eyes. Simple boat shape. NO shading, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Young shepherd boy David with one cute sheep beside him, holding a simple staff. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Big round head, simple body, happy sheep. NO background details. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Baby Moses in a simple basket floating on water with 2-3 simple reeds around. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Round baby face, simple basket weave pattern. NO shading. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Daniel standing between 2 cute friendly lions with big manes. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Simple cartoon faces, round bodies. NO background. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Jonah and a big friendly whale with a huge smile. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Simple shapes, big eyes. NO water details. Ages 3-7."
      ],
      "Personagens da Bíblia": [
        "BLACK AND WHITE COLORING PAGE ONLY! Jesus with kind smile and open arms welcoming children. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Simple robe, gentle face. NO background. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Mary holding baby Jesus with loving expression. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Simple clothing, peaceful faces. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Moses holding two simple tablets with basic markings. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Simple beard, basic robe. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Angel with big wings and happy smile. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (8-10px). Simple feather pattern, round face. Ages 3-7."
      ],
      "Símbolos Cristãos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Large simple cross with round ends taking up most of page. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). SUPER THICK outlines (10-12px). NO decorations. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Two large praying hands in center of page. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). SUPER THICK outlines (10-12px). Simple fingers, minimal details. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Big dove flying with simple wings spread. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). SUPER THICK outlines (10-12px). Basic feather outline. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Large fish symbol (ichthys) taking up most of page. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). SUPER THICK outlines (10-12px). Simple curved shape. Ages 3-7."
      ],
      "Versículos": [
        "BLACK AND WHITE COLORING PAGE ONLY! TOP: 'João 3:16 - Deus amou o mundo' in bubble letters. BELOW: 3 large hearts. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! TOP: 'Salmos 23 - O Senhor é meu pastor' in bubble letters. BELOW: simple shepherd staff and one sheep. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! TOP: 'Provérbios 3:5 - Confie no Senhor' in bubble letters. BELOW: large star and 2 clouds. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7."
      ],
      "Templo e Igreja": [
        "BLACK AND WHITE COLORING PAGE ONLY! Simple church building: rectangle base, triangle roof, large cross on top, 3 big round windows. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Small chapel with pointed roof, one big door, cross above door, 2 windows. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Church with bell tower, large cross, simple door, 4 windows. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). EXTREMELY THICK outlines (10px). Ages 3-7."
      ],
      "Valores Cristãos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Two children sharing a toy, both smiling with big eyes. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Simple faces. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! One child helping another child stand up. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Happy expressions. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Two children hugging with big smiles. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Round heads. Ages 3-7."
      ]
    };

    // MEDIUM MODE - Christian prompts with variations (more details but still kid-friendly)
    const christianPromptsMedium: Record<string, string[]> = {
      "Histórias Bíblicas": [
        "BLACK AND WHITE COLORING PAGE ONLY! Noah's Ark with rainbow above, 5 animal pairs on deck (elephants, giraffes, lions, birds, rabbits), simple waves. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! David with slingshot facing Goliath (shown as tall figure with armor), 2 small rocks on ground. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Moses parting sea with raised staff, waves on sides, path in middle, few fish visible. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Daniel in lion's den with 3 friendly lions around him, simple cave walls. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Good Samaritan helping injured person, simple donkey nearby, basic road. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8."
      ],
      "Personagens da Bíblia": [
        "BLACK AND WHITE COLORING PAGE ONLY! Jesus with 3 children around him, all smiling, simple robes. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Mary and baby Jesus in manger with simple hay, one star above. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Moses with tablets showing simple commandment lines, basic robe and sandals. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Angel Gabriel with large wings, simple dress, holding scroll. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8."
      ],
      "Símbolos Cristãos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Cross with simple floral vine wrapping around, 4-5 basic flowers. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Praying hands with simple rosary beads, few basic cross designs around. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Dove carrying olive branch, 3-4 simple clouds, basic sun rays. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Fish symbol with simple waves, 2-3 small fish around, basic seaweed. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8."
      ],
      "Versículos": [
        "BLACK AND WHITE COLORING PAGE ONLY! TOP: 'João 3:16' in decorative letters. BELOW: scene with cross, hearts, simple flowers, and sun. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! TOP: 'Salmos 23' in bubble letters. BELOW: shepherd with staff, 2 sheep, simple hills. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! TOP: 'Filipenses 4:13' in decorative letters. BELOW: child with arms raised, stars, simple clouds. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Templo e Igreja": [
        "BLACK AND WHITE COLORING PAGE ONLY! Church with bell tower, cross on top, 5 windows, large door, 2 trees on sides, simple path. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Small chapel on hill, simple fence, 2 clouds, sun, basic flowers in front. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Cathedral with 2 towers, crosses on top, rose window, arched door, few steps. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Valores Cristãos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Two children sharing lunch, sitting together, simple food items, happy faces. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Child helping elderly person carry bag, both smiling, simple background. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Three children praying together in circle, simple clothing, peaceful expressions. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ]
    };

    // EASY MODE - Regular prompts with variations
    const regularPromptsEasy: Record<string, string[]> = {
      "Animais Fofos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Cute puppy sitting with big floppy ears, round eyes, wagging tail. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Happy kitten with big eyes, whiskers, playful pose, little paws. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Bunny rabbit with long ears, cotton tail, sitting position, cute face. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Baby panda eating bamboo, round body, sitting, big eyes. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Little bear cub with round ears, sitting, friendly smile, simple body. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO colors. Ages 3-7."
      ],
      "Natureza": [
        "BLACK AND WHITE COLORING PAGE ONLY! Big smiling sun with 8 rays, 2 large flowers with round petals, simple grass. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK outlines (8-10px). NO textures, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Large tree with round cloud-top, simple trunk, 3 butterflies flying around. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK outlines (8-10px). NO textures, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Rainbow with 5 simple arcs, 2 clouds at ends, happy sun peeking. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK outlines (8-10px). NO patterns, NO colors. Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Big happy daisy with round center, 8 petals, 2 leaves, simple stem. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK outlines (8-10px). NO textures, NO colors. Ages 3-7."
      ],
      "Transportes": [
        "BLACK AND WHITE COLORING PAGE ONLY! Cute car with big round wheels, smiling face (2 round headlights, bumper smile), simple body. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). SUPER THICK lines (10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Happy train with 2 cars, round wheels, simple windows, smiling face on front. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). SUPER THICK lines (10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Friendly airplane with wings, 3 windows, propeller, simple body shape. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). SUPER THICK lines (10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Cute sailboat with one big sail, simple hull, 2 waves, smiling face. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). SUPER THICK lines (10px). Ages 3-7."
      ],
      "Espaço": [
        "BLACK AND WHITE COLORING PAGE ONLY! Rocket ship with triangle top, rectangle body, 3 windows, simple fins, 8 stars around. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Big smiling moon (crescent), 10 simple stars (5-point), 2 clouds. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Happy sun with face, 2 planets (one with rings), 8 stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Cute astronaut with round helmet, simple suit, waving, 6 stars around. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7."
      ],
      "Profissões": [
        "BLACK AND WHITE COLORING PAGE ONLY! Cute doctor with stethoscope, big smile, simple coat, medical bag. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Happy firefighter with helmet, simple uniform, hose, big smile. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Friendly teacher with one book, glasses, simple clothes, pointing. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Cheerful chef with tall hat, apron, spoon, big smile. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7."
      ],
      "Festas": [
        "BLACK AND WHITE COLORING PAGE ONLY! Big birthday cake with 2 layers, 5 candles, simple frosting waves. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! 6 round balloons with strings, floating up, simple shapes. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! 3 gift boxes with big bows on top, simple ribbons, different sizes. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Party hat with dots pattern, 3 balloons, confetti (simple shapes). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7."
      ]
    };

    // MEDIUM MODE - Regular prompts with variations (more details)
    const regularPromptsMedium: Record<string, string[]> = {
      "Animais Fofos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Puppy playing with ball, floppy ears, collar, happy expression, simple grass. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Kitten with yarn ball, whiskers, playful pose, simple background. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Bunny with carrot, long ears, fluffy tail, sitting in simple garden. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Panda family (parent and baby), bamboo, simple forest setting. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Baby elephant with trunk up, big ears, simple body, one flower. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Natureza": [
        "BLACK AND WHITE COLORING PAGE ONLY! Garden scene with sun, 3 different flowers, 2 butterflies, simple fence. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Tree with bird nest, 2 birds, simple leaves, sun behind. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Rainbow over hills, 3 clouds, sun, 2 flowers in foreground. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Flower garden with 4 different flowers, 2 bees, simple grass. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Ages 4-8."
      ],
      "Transportes": [
        "BLACK AND WHITE COLORING PAGE ONLY! Car with family inside (simple faces in windows), wheels, simple road, cloud. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Train with 3 cars, conductor waving, wheels, simple track, smoke puff. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Airplane in sky, pilot visible, wings, 2 clouds, sun. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Sailboat on water, 2 sails, captain, waves, fish jumping. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Espaço": [
        "BLACK AND WHITE COLORING PAGE ONLY! Rocket launching with flames, 2 planets, astronaut in window, 10 stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Moon surface with astronaut, flag, rocket, Earth in sky, stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Solar system with sun and 4 planets (different sizes), comet, stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Space station with astronaut, satellite, Earth, moon, stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Profissões": [
        "BLACK AND WHITE COLORING PAGE ONLY! Doctor with child patient, stethoscope, medical chart, simple clinic. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Firefighter with fire truck, hose, ladder, simple background. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Teacher at board with students (2 kids), books, simple classroom. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Chef cooking with pot, ingredients on table, kitchen items. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Festas": [
        "BLACK AND WHITE COLORING PAGE ONLY! Birthday party scene with cake, balloons, 2 presents, simple banner. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Three-layer cake with candles, decorations, plate, simple table. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Balloon bouquet with ribbons, 3 presents, party hat, confetti. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Party table with cake, presents, balloons, simple banner saying 'Parabéns'. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ]
    };

    // EASY MODE - Christmas prompts with variations
    const christmasPromptsEasy: Record<string, string[]> = {
      "Papai Noel": [
        "BLACK AND WHITE COLORING PAGE ONLY! Santa face with big beard, happy smile, simple hat with pom-pom. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Santa waving with one hand, simple belt, boots, big smile. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Santa head with glasses, beard, hat, jolly expression. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7."
      ],
      "Árvore de Natal": [
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas tree triangle shape with star on top, 5 round ornaments, simple trunk. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Decorated tree with candy canes, 4 balls, simple star, basic trunk, 2 presents at base. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Simple pine tree with garland, 6 ornaments, big star, presents underneath. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas tree with child decorating it, ornaments, simple star. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7."
      ],
      "Presentes": [
        "BLACK AND WHITE COLORING PAGE ONLY! 3 wrapped gift boxes with big bows, different sizes, simple ribbons. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Large present with decorative bow, simple pattern on wrapping. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Stack of 4 presents, various sizes, bows and ribbons. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7."
      ],
      "Renas": [
        "BLACK AND WHITE COLORING PAGE ONLY! Cute reindeer face with big antlers, round nose, happy smile. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Reindeer with red nose (Rudolph), simple body, antlers, friendly face. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Two reindeer together, simple bodies, antlers, smiling. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7."
      ],
      "Bonecos de Neve": [
        "BLACK AND WHITE COLORING PAGE ONLY! Snowman with 3 circles, top hat, carrot nose, stick arms, coal smile. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Happy snowman with scarf, simple hat, broom, button eyes. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Snowman family (2 snowmen), hats, scarves, smiling faces. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Ages 3-7."
      ],
      "Enfeites Natalinos": [
        "BLACK AND WHITE COLORING PAGE ONLY! 4 Christmas ornament balls with simple patterns, hanging ribbons. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Candy cane with stripes, bell with bow, simple star. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7.",
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas wreath with bow, 3 ornaments, simple holly leaves. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). Ages 3-7."
      ]
    };

    // MEDIUM MODE - Christmas prompts with variations (more details)
    const christmasPromptsMedium: Record<string, string[]> = {
      "Papai Noel": [
        "BLACK AND WHITE COLORING PAGE ONLY! Santa with toy bag, checking list, simple belt and boots, jolly face. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Santa in sleigh with 2 presents, simple reins, waving. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Santa delivering presents at chimney, bag of toys, simple rooftop. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Árvore de Natal": [
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas tree with ornaments, lights (circles), star, garland, 3 presents, simple stand. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Decorated tree with family (2 children) decorating, ornaments, star, presents. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas tree in living room, stockings on fireplace, simple window, presents. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Outdoor Christmas tree with snow (simple dots), ornaments, star, woodland animals around. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Presentes": [
        "BLACK AND WHITE COLORING PAGE ONLY! 5 wrapped presents of different sizes, decorative bows, ribbons, simple patterns. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Child opening present with excited face, wrapping paper, bow, simple background. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Presents under tree, stockings nearby, simple fireplace. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Renas": [
        "BLACK AND WHITE COLORING PAGE ONLY! Reindeer pulling sleigh with Santa, simple harness, flying pose, stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Rudolph with glowing nose, other reindeer, simple night sky, moon. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Three reindeer in winter scene, simple snow, trees, stars. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Bonecos de Neve": [
        "BLACK AND WHITE COLORING PAGE ONLY! Snowman with child building it, scarf, hat, carrot, coal buttons, simple background. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Snowman family scene (3 snowmen), hats, scarves, simple winter background, sun. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Snowman with broom, bird on hat, simple fence, snow (dots). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ],
      "Enfeites Natalinos": [
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas wreath on door with bow, holly, ornaments, simple bell. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Garland with ornaments, candy canes, bows, simple mantle. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8.",
        "BLACK AND WHITE COLORING PAGE ONLY! Christmas stockings hanging, names on them, simple fireplace, decorations. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Ages 4-8."
      ]
    };

    // Select the right prompt set based on mode (fixed to easy difficulty)
    let prompts: Record<string, string[]>;
    if (isChristmasMode) {
      prompts = christmasPromptsEasy;
    } else if (isChristianMode) {
      prompts = christianPromptsEasy;
    } else {
      prompts = regularPromptsEasy;
    }

    // Get array of prompts for the category or use defaults
    const categoryPrompts = prompts[category] || (isChristmasMode 
      ? christmasPromptsEasy["Árvore de Natal"] 
      : (isChristianMode ? christianPromptsEasy["Símbolos Cristãos"] : regularPromptsEasy["Animais Fofos"]));
    
    // Select a random prompt from the array and add variety modifiers
    let prompt = Array.isArray(categoryPrompts) 
      ? categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)]
      : categoryPrompts;
    
    // Add random variety to the prompt for more diverse results
    prompt = prompt + ` Variation: ${randomPerspective}, ${randomAction}, ${randomSetting}, ${randomExpression}.`;

    console.log('Calling AI gateway with prompt:', prompt);

    // Try Lovable AI first if available
    let imageUrl = null;
    
    if (LOVABLE_API_KEY) {
      try {
        console.log('Attempting Lovable AI generation...');
        const lovableResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image-preview",
            messages: [
              {
                role: "user",
                content: `CRITICAL INSTRUCTIONS - READ CAREFULLY:
You MUST create a BLACK AND WHITE coloring page ONLY.
- Use ONLY pure black lines (#000000) on pure white background (#FFFFFF)
- NO colors, NO shading, NO gray tones, NO textures
- ONLY solid black outlines for children to color
- This is a COLORING BOOK page - it must be completely uncolored

${prompt}

FINAL REMINDER: The output MUST be black and white line art only. If you add any colors, shading, or gray tones, the image will be rejected.`
              }
            ],
            modalities: ["image", "text"]
          })
        });

        if (lovableResponse.ok) {
          const data = await lovableResponse.json();
          imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          console.log('Lovable AI: Image generated successfully');
        } else if (lovableResponse.status === 402) {
          console.log('Lovable AI: sem créditos disponíveis (402), usando biblioteca offline');
        } else if (lovableResponse.status === 429) {
          console.log('Lovable AI: limite de requisições atingido (429), usando biblioteca offline');
        } else {
          const errorText = await lovableResponse.text();
          console.error("Lovable AI error:", lovableResponse.status, errorText);
        }
      } catch (error) {
        console.error('Lovable AI error:', error);
      }
    }
    
    // Return offline mode signal if generation failed or no credits (200 not 402 to avoid frontend error)
    if (!imageUrl) {
      console.log('Lovable AI: Sem créditos ou falha na geração - usando biblioteca offline');
      return new Response(JSON.stringify({ 
        useOffline: true,
        message: "Usando biblioteca offline"
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({ imageUrl }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in generate-coloring-image function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro ao gerar desenho" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
