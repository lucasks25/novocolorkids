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
    const { category, isChristianMode } = await req.json();
    console.log('Generating coloring image for category:', category, 'Christian mode:', isChristianMode);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Christian prompts
    const christianPrompts: Record<string, string> = {
      "Histórias Bíblicas": "Create a detailed biblical scene coloring page: Noah's Ark with animals, David and Goliath, Moses parting the Red Sea, or Daniel in the lion's den. ULTRA DETAILED black and white line art with thick, bold outlines (3-4px). Include biblical details, traditional clothing, and symbolic elements. Professional children's coloring book style. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, reverent cartoon style.",
      "Personagens da Bíblia": "Illustrate a beloved biblical character: Jesus Christ with children, Mary mother of Jesus, Moses with tablets, or shepherd David with sheep. ULTRA DETAILED black and white line art with thick, clear outlines (3-4px). Include traditional robes, halos, and biblical setting details. Professional children's coloring book quality with kind, peaceful expressions. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, sacred art style.",
      "Símbolos Cristãos": "Design a sacred Christian symbols coloring page: ornate cross with decorative patterns, praying hands with rosary, dove with olive branch, fish symbol (ichthys), Bible with pages, or chalice and bread. ULTRA DETAILED black and white line art with thick, prominent outlines (3-4px). Include intricate decorative elements and patterns. Professional children's coloring book style. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, reverent style.",
      "Versículos": "Create a beautiful Bible verse illustration: decorative border with flowers and vines surrounding the text area 'God is Love' or 'Jesus Loves Me', include hearts, stars, and crosses. ULTRA DETAILED black and white line art with thick, bold outlines (3-4px). Include ornamental patterns and decorative calligraphy elements. Professional children's coloring book quality. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, inspirational style.",
      "Templo e Igreja": "Illustrate a beautiful church or temple scene: church building with stained glass windows, bell tower with cross on top, altar with candles, or Garden of Gethsemane. ULTRA DETAILED black and white line art with thick, clear outlines (3-4px). Include architectural details, religious symbols, and peaceful surroundings. Professional children's coloring book style. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, sacred architecture style.",
      "Valores Cristãos": "Design a scene showing Christian values: children helping others, family praying together, sharing food with the needy, or showing kindness and compassion. ULTRA DETAILED black and white line art with thick, prominent outlines (3-4px). Include hearts, helping hands, and biblical symbols. Professional children's coloring book quality with warm, loving expressions. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, heartwarming cartoon style."
    };

    // Regular prompts
    const regularPrompts: Record<string, string> = {
      "Animais Fofos": "Create a detailed, high-quality coloring page featuring an adorable animal (puppy, kitten, bunny, or panda). ULTRA DETAILED black and white line art with thick, bold outlines (3-4px). Include intricate patterns like fur texture, facial features, and playful details. Professional children's coloring book style with well-defined sections perfect for coloring. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, cartoon style with expressive features.",
      "Natureza": "Design a stunning nature coloring page with diverse elements: large detailed flowers with petals and centers, leafy trees with visible branches, smiling sun with rays, fluffy clouds, butterflies, and grass. ULTRA DETAILED black and white line art with thick, clear outlines (3-4px). Include decorative patterns in flower centers and leaf veins. Professional children's coloring book quality with well-separated elements. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, whimsical cartoon style.",
      "Transportes": "Illustrate a detailed, exciting vehicle (race car, steam train, jet airplane, or sailboat). ULTRA DETAILED black and white line art with thick, prominent outlines (3-4px). Include mechanical details like wheels, windows, doors, propellers, or sails. Add background elements like clouds, tracks, or waves. Professional children's coloring book style with clear sections. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, dynamic cartoon style with motion elements.",
      "Espaço": "Create an epic space adventure coloring page with a detailed rocket ship, multiple planets with surface patterns, twinkling stars, a friendly astronaut, Saturn's rings, and a smiling moon. ULTRA DETAILED black and white line art with thick, bold outlines (3-4px). Include patterns on planets, details on the rocket, and decorative space elements. Professional children's coloring book quality. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, imaginative cartoon style.",
      "Profissões": "Design a cheerful professional character (doctor with stethoscope, firefighter with helmet and hose, teacher with books, or chef with hat and spoon) with detailed uniform and tools. ULTRA DETAILED black and white line art with thick, clear outlines (3-4px). Include workplace elements and accessories. Professional children's coloring book style with expressive facial features. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, friendly cartoon style with action pose.",
      "Festas": "Illustrate a joyful party scene with detailed elements: birthday cake with candles and decorations, colorful balloons with strings, wrapped presents with bows, confetti, party hats, and streamers. ULTRA DETAILED black and white line art with thick, prominent outlines (3-4px). Include patterns on wrapping paper, cake layers, and decorative details. Professional children's coloring book quality. NO SHADING, NO GRAY TONES - only pure black lines on white background. High resolution, festive cartoon style."
    };

    const prompts = isChristianMode ? christianPrompts : regularPrompts;
    const prompt = prompts[category] || (isChristianMode ? christianPrompts["Símbolos Cristãos"] : regularPrompts["Animais Fofos"]);

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
            role: "user",
            content: prompt
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
