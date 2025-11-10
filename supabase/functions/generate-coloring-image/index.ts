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
    const { category, isChristianMode, isChristmasMode, difficulty = "easy" } = await req.json();
    console.log('Generating coloring image for category:', category, 'Christian mode:', isChristianMode, 'Christmas mode:', isChristmasMode, 'Difficulty:', difficulty);
    
    // Normalize difficulty to easy or medium only
    const normalizedDifficulty = difficulty === "hard" ? "medium" : difficulty;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // EASY MODE - Christian prompts
    const christianPromptsEasy: Record<string, string> = {
      "Histórias Bíblicas": "BLACK AND WHITE COLORING PAGE ONLY! Create a simple biblical scene: Noah's Ark with 3-4 cute animals, young David with slingshot, Moses with staff, or Daniel with friendly lions. CRITICAL: Use ONLY pure black lines (#000000) on pure white background (#FFFFFF). EXTREMELY THICK outlines (8-10px width). NO GRAY TONES, NO SHADING, NO COLORS - only solid black lines. Large rounded shapes, big friendly eyes, simple cartoon faces. Maximum 4 elements total. Huge empty white spaces for coloring. Like a traditional kids coloring book page. Ages 3-7.",
      "Personagens da Bíblia": "BLACK AND WHITE COLORING PAGE ONLY! One simple biblical character: Jesus with kind smile, Mary with loving expression, Moses with simple robe, or shepherd boy David with one sheep. CRITICAL: ONLY pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO gray, NO colors whatsoever. Big round head, simple body, minimal clothing details, one basic accessory. Traditional coloring book style with thick black contours. Ages 3-7.",
      "Símbolos Cristãos": "BLACK AND WHITE COLORING PAGE ONLY! One large, simple Christian symbol: basic cross (two thick rectangles), or simple praying hands outline, or basic dove shape, or large fish symbol. CRITICAL: Pure black lines ONLY (#000000) on white background (#FFFFFF). SUPER THICK outlines (10-12px). Absolutely NO decorations, NO patterns, NO shading, NO gray tones. Just one bold symbol taking up most of the page. Traditional coloring book format. Ages 3-7.",
      "Versículos": "BLACK AND WHITE COLORING PAGE ONLY! At the TOP of the page write in large bubble letters: 'João 3:16 - Porque Deus amou o mundo'. Below that, draw 4-5 large basic shapes: big heart, simple star, basic cross, round flower, cloud. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px) for both text and shapes. NO patterns, NO shading, NO colors. Simple bold cartoon shapes. Traditional coloring book page with BIBLE VERSE at top. Ages 3-7.",
      "Templo e Igreja": "BLACK AND WHITE COLORING PAGE ONLY! One simple church: basic rectangle building, triangle roof, one large cross on top, 2-3 big windows (circles or rectangles). CRITICAL: Pure black outlines ONLY (#000000) on white (#FFFFFF). EXTREMELY THICK lines (10px). NO architectural details, NO shading, NO gray tones. Just basic geometric shapes. Like traditional kids coloring books. Ages 3-7.",
      "Valores Cristãos": "BLACK AND WHITE COLORING PAGE ONLY! Two simple cartoon children sharing or helping. Big round heads, stick-figure bodies, basic smiling faces with big eyes. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). NO background, NO details, NO shading, NO colors. Just 2 characters with huge empty white spaces. Traditional coloring book style. Ages 3-7."
    };

    // MEDIUM MODE - Christian prompts (poucos detalhes a mais, ainda muito apropriado para crianças)
    const christianPromptsMedium: Record<string, string> = {
      "Histórias Bíblicas": "BLACK AND WHITE COLORING PAGE ONLY! Biblical scene with few extra details: Noah's Ark with 4-5 cute animals, young David with slingshot, Moses with staff, or Daniel with 2-3 friendly lions. CRITICAL: Use ONLY pure black lines (#000000) on pure white background (#FFFFFF). THICK outlines (7-9px). Simple facial expressions, minimal details. NO GRAY TONES, NO SHADING, NO COLORS - only black lines. Traditional coloring book. Ages 4-8.",
      "Personagens da Bíblia": "BLACK AND WHITE COLORING PAGE ONLY! Biblical character with minimal scene: Jesus with kind smile, Mary with simple dress, Moses with basic beard, or David with one simple object. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few basic details. NO shading, NO gray, NO colors. Traditional simple coloring book. Ages 4-8.",
      "Símbolos Cristãos": "BLACK AND WHITE COLORING PAGE ONLY! Christian symbol with minimal decoration: cross with one simple pattern, praying hands with few lines, dove with basic wings, or fish with simple design. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Minimal decorative elements. NO shading, NO gray tones. Simple coloring book. Ages 4-8.",
      "Versículos": "BLACK AND WHITE COLORING PAGE ONLY! At the TOP write in simple bubble letters: 'João 3:16 - Porque Deus amou o mundo'. Below add few simple shapes: basic flowers, hearts, simple crosses. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Minimal patterns. NO shading, NO colors. Simple coloring book page with BIBLE VERSE at top. Ages 4-8.",
      "Templo e Igreja": "BLACK AND WHITE COLORING PAGE ONLY! Simple church: building with few windows, basic roof, cross on top, simple door, 1-2 basic trees. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few basic elements. NO shading, NO gray tones. Simple coloring book. Ages 4-8.",
      "Valores Cristãos": "BLACK AND WHITE COLORING PAGE ONLY! Scene with 2 people: children sharing or helping with simple expressions and minimal details. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Basic facial features. NO shading, NO colors. Simple coloring book. Ages 4-8."
    };

    // EASY MODE - Regular prompts
    const regularPromptsEasy: Record<string, string> = {
      "Animais Fofos": "BLACK AND WHITE COLORING PAGE ONLY! One super cute animal (puppy, kitten, bunny, or panda). CRITICAL: Pure black outlines (#000000) on white background (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO gray, NO colors. Big round head, simple body, huge cute eyes, tiny nose, happy smile. Like traditional coloring books. NO fur texture, NO patterns. Just bold black contours with huge white spaces inside. Ages 3-7.",
      "Natureza": "BLACK AND WHITE COLORING PAGE ONLY! Simple nature: ONE big happy sun (circle + 8 rays), ONE large flower (circle center + 6 round petals), ONE basic tree (round cloud-shape top + rectangle trunk), 2 big simple butterflies. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). VERY THICK outlines (8-10px). NO textures, NO patterns, NO shading, NO colors. Just bold black shapes. Traditional coloring book. Ages 3-7.",
      "Transportes": "BLACK AND WHITE COLORING PAGE ONLY! One cute vehicle (car, train, plane, or boat). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). SUPER THICK lines (10px). Simple geometric shapes: circles for wheels, rectangles for body. Friendly face (2 round headlights, smile bumper). NO mechanical details, NO shading. Traditional kids coloring book page. Ages 3-7.",
      "Espaço": "BLACK AND WHITE COLORING PAGE ONLY! Simple space scene: ONE rocket (triangle + rectangle), ONE big planet (circle), ONE smiling moon (crescent), 6-8 basic stars (5-point). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). NO patterns, NO shading, NO colors. Bold simple shapes with huge white spaces. Traditional coloring book. Ages 3-7.",
      "Profissões": "BLACK AND WHITE COLORING PAGE ONLY! One cute professional (doctor, firefighter, teacher, or chef). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). Big round head, simple body, big smile. ONE basic uniform item (hat). ONE simple tool. NO details, NO shading, NO colors. Traditional coloring book character. Ages 3-7.",
      "Festas": "BLACK AND WHITE COLORING PAGE ONLY! Party items: ONE big cake (2 layers + 3 candles), 4 round balloons with strings, ONE gift box with bow. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). NO patterns, NO decorations, NO shading, NO colors. Just bold black shapes. Traditional coloring book page. Ages 3-7."
    };

    // MEDIUM MODE - Regular prompts (poucos detalhes a mais, apropriado para crianças)
    const regularPromptsMedium: Record<string, string> = {
      "Animais Fofos": "BLACK AND WHITE COLORING PAGE ONLY! Cute animal with few extra details (puppy, kitten, bunny, or panda). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Add simple whiskers, basic eyes, minimal details. NO shading, NO gray, NO colors. Simple traditional coloring book. Ages 4-8.",
      "Natureza": "BLACK AND WHITE COLORING PAGE ONLY! Nature scene with few details: sun with simple rays, 2 flowers with basic petals, simple tree, 2 butterflies. CRITICAL: Pure black lines (#000000) on white (#FFFFFF). THICK outlines (7-9px). Minimal patterns. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Transportes": "BLACK AND WHITE COLORING PAGE ONLY! Vehicle with few details: car with simple windows, train with basic details, airplane with wings, or boat with simple sail. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few basic details. NO shading. Simple coloring book. Ages 4-8.",
      "Espaço": "BLACK AND WHITE COLORING PAGE ONLY! Space scene with few details: rocket with 1-2 windows, 2 planets, few stars, simple moon. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Minimal patterns. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Profissões": "BLACK AND WHITE COLORING PAGE ONLY! Professional with few details: doctor with simple stethoscope, firefighter with basic gear, teacher with one book, chef with simple hat. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few uniform details. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Festas": "BLACK AND WHITE COLORING PAGE ONLY! Party scene with few details: birthday cake with 2 layers, 4-5 balloons, 2 simple presents. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few decorative elements. NO shading, NO colors. Simple coloring book. Ages 4-8."
    };

    // EASY MODE - Christmas prompts
    const christmasPromptsEasy: Record<string, string> = {
      "Papai Noel": "BLACK AND WHITE COLORING PAGE ONLY! Simple Santa Claus: big round face with simple beard, happy smile, basic hat with pom-pom, simple belt. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO gray, NO colors. Traditional coloring book. Ages 3-7.",
      "Árvore de Natal": "BLACK AND WHITE COLORING PAGE ONLY! Simple Christmas tree: big triangle shape, 4-5 basic ornaments (circles), simple star on top, basic trunk. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). NO patterns, NO shading, NO colors. Traditional coloring book. Ages 3-7.",
      "Presentes": "BLACK AND WHITE COLORING PAGE ONLY! 3 simple gift boxes: rectangles with basic bows on top, simple ribbons. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO patterns, NO decorations, NO shading. Traditional coloring book. Ages 3-7.",
      "Renas": "BLACK AND WHITE COLORING PAGE ONLY! One cute reindeer: round head, simple antlers (3 points each), big eyes, round nose, simple body. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). NO details, NO shading, NO colors. Traditional coloring book. Ages 3-7.",
      "Bonecos de Neve": "BLACK AND WHITE COLORING PAGE ONLY! Simple snowman: 3 circles stacked, basic hat, simple scarf, stick arms, basic face (dots for eyes and smile). CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). EXTREMELY THICK lines (8-10px). NO shading, NO patterns. Traditional coloring book. Ages 3-7.",
      "Enfeites Natalinos": "BLACK AND WHITE COLORING PAGE ONLY! Simple Christmas decorations: 3-4 basic ornament balls (circles), candy cane (simple curved stick with stripes), simple bell, basic star. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). VERY THICK lines (8-10px). NO details, NO shading. Traditional coloring book. Ages 3-7."
    };

    // MEDIUM MODE - Christmas prompts (poucos detalhes a mais, apropriado para crianças)
    const christmasPromptsMedium: Record<string, string> = {
      "Papai Noel": "BLACK AND WHITE COLORING PAGE ONLY! Santa with few extra details: simple beard, happy face, basic hat with pom-pom, simple belt, small bag. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few basic patterns. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Árvore de Natal": "BLACK AND WHITE COLORING PAGE ONLY! Christmas tree with few details: simple branches, 5-6 basic ornaments, star on top, simple trunk, 1-2 presents. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few decorations. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Presentes": "BLACK AND WHITE COLORING PAGE ONLY! 3-4 gift boxes with few details: simple boxes, basic bows, simple ribbons. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Minimal patterns. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Renas": "BLACK AND WHITE COLORING PAGE ONLY! Reindeer with few details: simple antlers, basic face, round nose, simple body. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few basic details. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Bonecos de Neve": "BLACK AND WHITE COLORING PAGE ONLY! Snowman with few details: 3 circles, simple hat, basic scarf, stick arms, simple face. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Minimal patterns. NO shading, NO colors. Simple coloring book. Ages 4-8.",
      "Enfeites Natalinos": "BLACK AND WHITE COLORING PAGE ONLY! Christmas decorations with few details: 3-4 simple ornament balls, basic candy cane, simple bell, basic star. CRITICAL: Pure black outlines (#000000) on white (#FFFFFF). THICK lines (7-9px). Few decorative elements. NO shading, NO colors. Simple coloring book. Ages 4-8."
    };

    // Select the right prompt set based on difficulty and mode
    let prompts: Record<string, string>;
    if (isChristmasMode) {
      prompts = normalizedDifficulty === "medium" ? christmasPromptsMedium : christmasPromptsEasy;
    } else if (isChristianMode) {
      prompts = normalizedDifficulty === "medium" ? christianPromptsMedium : christianPromptsEasy;
    } else {
      prompts = normalizedDifficulty === "medium" ? regularPromptsMedium : regularPromptsEasy;
    }

    const defaultPrompt = isChristmasMode 
      ? christmasPromptsEasy["Árvore de Natal"] 
      : (isChristianMode ? christianPromptsEasy["Símbolos Cristãos"] : regularPromptsEasy["Animais Fofos"]);
    
    const prompt = prompts[category] || defaultPrompt;

    console.log('Calling AI gateway with prompt:', prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "system",
            content: "You are a specialist in creating BLACK AND WHITE coloring pages for children. You MUST create images with ONLY pure black lines on pure white background. NEVER use colors, gray tones, or shading. Only solid black outlines. This is CRITICAL - the children need to color the images themselves."
          },
          {
            role: "user",
            content: prompt + " REMINDER: Create ONLY black and white line art. NO colors, NO gray, NO shading - only pure black lines on white background!"
          }
        ],
        modalities: ["image", "text"]
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        return new Response(JSON.stringify({ error: "Limite de uso excedido. Por favor, tente novamente mais tarde." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        console.error('Payment required');
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Por favor, adicione créditos ao workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI gateway response received');
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error('No image URL in response:', data);
      throw new Error("Failed to generate image");
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
