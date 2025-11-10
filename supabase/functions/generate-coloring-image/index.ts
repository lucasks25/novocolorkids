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

    // Christian prompts - DESENHOS INFANTIS FÁCEIS DE COLORIR
    const christianPrompts: Record<string, string> = {
      "Histórias Bíblicas": "Create a SIMPLE, CUTE biblical scene coloring page perfect for young children: Noah's Ark with big friendly animals, David with slingshot, Moses with staff, or Daniel with cute lions. Use VERY THICK BLACK OUTLINES (5-6px). LARGE, SIMPLE SHAPES with minimal details. Big eyes, round faces, adorable cartoon style like children's TV animation. FEW elements (3-5 objects max). LOTS OF WHITE SPACE. NO fine details, NO patterns, NO textures. Pure black bold lines on white background. Kawaii animated style, super easy for kids 3-7 years old to color.",
      "Personagens da Bíblia": "Illustrate ONE adorable biblical character in SIMPLE cartoon style: Jesus with big kind eyes and simple robe, Mary with sweet smile, Moses with basic tablet, or shepherd David with one cute sheep. EXTREMELY THICK BLACK OUTLINES (5-6px). MINIMAL DETAILS - just face, simple clothing, and one accessory. Large basic shapes perfect for toddlers. Friendly animated TV show style. NO patterns, NO decorations, NO background details. Only pure black thick lines on white. Cute anime/cartoon style for children 3-7 years old.",
      "Símbolos Cristãos": "Design ONE big, simple Christian symbol perfect for kids: large basic cross (just two rectangles), or simple praying hands, or basic dove shape, or big fish symbol. SUPER THICK BLACK OUTLINES (6-7px). ZERO decorative patterns or ornaments. Just the main shape, HUGE and SIMPLE. Like a symbol from children's cartoons. Perfect for ages 3-7. NO intricate details. Only bold black lines on white. Extremely easy to color.",
      "Versículos": "Create a cute frame with the words 'DEUS É AMOR' or 'JESUS ME AMA' in big simple letters. Add 3-4 LARGE, SIMPLE elements around it: big heart, simple star, basic cross, round flower. VERY THICK BLACK OUTLINES (5-6px). NO decorative patterns. Friendly cartoon style like children's animation. Big open spaces perfect for young kids to color. Ages 3-7. Pure black bold lines on white.",
      "Templo e Igreja": "Illustrate ONE simple church building: basic rectangular building with triangular roof, one big cross on top, 2-3 large windows. EXTREMELY THICK BLACK OUTLINES (6-7px). Like a building from children's cartoons. MINIMAL DETAILS - just basic shapes. NO architectural complexity. Perfect for toddlers. Friendly animated style. Only pure black thick lines on white. Super easy for ages 3-7.",
      "Valores Cristãos": "Design a SIMPLE scene with 2-3 cute cartoon children: sharing, helping, or praying together. Big round heads, simple bodies, basic clothes. VERY THICK BLACK OUTLINES (5-6px). Large basic shapes. Happy expressions with big eyes and smiles. Like characters from kids TV animation. NO background details. Only 2-3 characters maximum. LOTS OF WHITE SPACE. Pure black bold lines on white. Perfect for ages 3-7 to color easily."
    };

    // Regular prompts - DESENHOS INFANTIS FÁCEIS DE COLORIR
    const regularPrompts: Record<string, string> = {
      "Animais Fofos": "Create ONE super cute, simple animal (puppy, kitten, bunny, or panda) in adorable cartoon style. EXTREMELY THICK BLACK OUTLINES (5-6px). LARGE BASIC SHAPES - big round head, simple body, cute big eyes, small nose and smile. Like characters from children's animated shows. MINIMAL DETAILS - no fur texture, no patterns. Just clean, bold shapes perfect for kids 3-7 years old. LOTS OF WHITE SPACE. NO background. Pure black bold lines on white. Kawaii animated style, super easy to color.",
      "Natureza": "Design a SIMPLE nature scene: ONE big happy sun with simple rays, ONE large simple flower (circle center + 5-6 round petals), ONE basic tree (round top + rectangle trunk), 1-2 big butterflies with basic wing shapes. VERY THICK BLACK OUTLINES (5-6px). ZERO intricate patterns or textures. Large basic shapes like in children's cartoons. Perfect for ages 3-7. LOTS OF WHITE SPACE between elements. Pure black bold lines on white. Friendly animated TV style.",
      "Transportes": "Illustrate ONE simple, cute vehicle (basic car, train, plane, or boat) in cartoon style. SUPER THICK BLACK OUTLINES (6-7px). LARGE BASIC SHAPES - rectangles, circles, simple forms. Big friendly face on the vehicle (2 round headlights as eyes, bumper as smile). MINIMAL DETAILS - just windows, wheels, and basic features. Like vehicles from kids TV shows. Perfect for toddlers. NO mechanical complexity. Only pure black thick lines on white. Ages 3-7.",
      "Espaço": "Create a cute space scene: ONE simple rocket (triangle top + rectangle body), ONE big planet with simple circle shape, ONE smiling moon face, 5-7 simple stars (just basic star shapes). VERY THICK BLACK OUTLINES (5-6px). LARGE, BASIC SHAPES. Friendly cartoon style like children's animation. NO patterns on planets, NO complex details. Just bold, simple shapes. LOTS OF WHITE SPACE. Pure black lines on white. Perfect for ages 3-7.",
      "Profissões": "Design ONE adorable professional character (doctor, firefighter, teacher, or chef) in simple cartoon style. EXTREMELY THICK BLACK OUTLINES (5-6px). Big round head, simple body, cute big eyes and smile. ONE basic uniform element (hat or simple clothing). ONE simple tool (stethoscope, helmet, book, or spoon). Like characters from kids TV animation. MINIMAL DETAILS. Large basic shapes. Perfect for toddlers ages 3-7. Pure black bold lines on white.",
      "Festas": "Illustrate a simple party scene: ONE big birthday cake (2-3 simple layers + 3 candles), 3-4 round balloons with strings, ONE wrapped present box with bow. VERY THICK BLACK OUTLINES (5-6px). LARGE, BASIC SHAPES. NO intricate patterns or decorations. Simple, bold forms like in children's cartoons. Friendly animated style. LOTS OF WHITE SPACE. Perfect for ages 3-7 to color easily. Only pure black lines on white."
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
