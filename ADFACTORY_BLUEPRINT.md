# 🚀 AdFactory - Blueprint Completo

## Visão Geral
**AdFactory** é um gerador de criativos para anúncios com IA, focado em infoprodutores brasileiros. Design Apple-style com animações premium européias.

---

## 🎨 DESIGN SYSTEM

### Paleta de Cores (HSL)
```css
:root {
  /* Background Layers */
  --bg-base: 240 10% 3.9%;           /* Preto profundo */
  --bg-elevated: 240 6% 10%;          /* Cards */
  --bg-surface: 240 5% 14%;           /* Inputs, modais */
  
  /* Accent - Violet Premium */
  --accent-primary: 270 95% 65%;      /* Violeta vibrante */
  --accent-secondary: 280 85% 55%;    /* Roxo profundo */
  --accent-glow: 270 100% 70%;        /* Para glows */
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, hsl(270 95% 65%), hsl(320 85% 60%), hsl(40 95% 65%));
  --gradient-card: linear-gradient(180deg, hsl(240 6% 12%), hsl(240 6% 8%));
  --gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
  
  /* Text */
  --text-primary: 0 0% 98%;           /* Branco */
  --text-secondary: 240 5% 64.9%;     /* Cinza claro */
  --text-muted: 240 5% 45%;           /* Cinza escuro */
  
  /* Status */
  --success: 142 76% 46%;
  --warning: 43 96% 56%;
  --error: 0 84% 60%;
  
  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: 20px;
}
```

### Tipografia
```css
/* Fontes */
--font-display: 'SF Pro Display', 'Inter', system-ui;
--font-body: 'SF Pro Text', 'Inter', system-ui;
--font-mono: 'SF Mono', 'JetBrains Mono', monospace;

/* Tamanhos */
--text-hero: clamp(3rem, 8vw, 6rem);      /* 48-96px */
--text-h1: clamp(2.5rem, 5vw, 4rem);      /* 40-64px */
--text-h2: clamp(1.75rem, 3vw, 2.5rem);   /* 28-40px */
--text-h3: clamp(1.25rem, 2vw, 1.75rem);  /* 20-28px */
--text-body: 1rem;                         /* 16px */
--text-small: 0.875rem;                    /* 14px */
--text-xs: 0.75rem;                        /* 12px */

/* Font Weights */
--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-black: 900;

/* Letter Spacing */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.02em;
--tracking-wider: 0.05em;
```

---

## ✨ ANIMAÇÕES PREMIUM

### Keyframes
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

@keyframes glow-pulse {
  0%, 100% { 
    box-shadow: 0 0 20px hsl(var(--accent-glow) / 0.3),
                0 0 40px hsl(var(--accent-glow) / 0.2),
                0 0 60px hsl(var(--accent-glow) / 0.1);
  }
  50% { 
    box-shadow: 0 0 30px hsl(var(--accent-glow) / 0.5),
                0 0 60px hsl(var(--accent-glow) / 0.3),
                0 0 90px hsl(var(--accent-glow) / 0.2);
  }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes reveal-up {
  from { 
    opacity: 0; 
    transform: translateY(60px) scale(0.95);
    filter: blur(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
}

@keyframes text-gradient {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

@keyframes scale-in-bounce {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes slide-in-blur {
  from { 
    transform: translateX(-100px);
    opacity: 0;
    filter: blur(20px);
  }
  to { 
    transform: translateX(0);
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes magnetic-hover {
  0% { transform: translate(0, 0); }
  25% { transform: translate(2px, -2px); }
  50% { transform: translate(-1px, 1px); }
  75% { transform: translate(1px, 2px); }
  100% { transform: translate(0, 0); }
}
```

### Framer Motion Variants
```typescript
// Hero Section Animations
export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  },
  item: {
    hidden: { 
      opacity: 0, 
      y: 60,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100
      }
    }
  }
};

// Card Hover Effects
export const cardVariants = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

// 3D Tilt Effect Hook
export const use3DTilt = () => {
  const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  };
  
  return { handleMouseMove };
};

// Magnetic Button Effect
export const magneticVariants = {
  rest: { x: 0, y: 0 },
  hover: (custom: { x: number; y: number }) => ({
    x: custom.x * 0.3,
    y: custom.y * 0.3,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  })
};

// Page Transitions
export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 20,
    filter: 'blur(10px)'
  },
  animate: { 
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: { duration: 0.3 }
  }
};

// Stagger Children
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Number Counter Animation
export const counterAnimation = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10
    }
  }
};
```

---

## 🗃️ ARQUITETURA DO BANCO DE DADOS

### Schema Supabase
```sql
-- ========================================
-- ENUMS
-- ========================================
CREATE TYPE public.app_role AS ENUM ('user', 'pro', 'admin');
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'expired', 'trial');
CREATE TYPE public.template_category AS ENUM (
  'emagrecimento', 
  'financas', 
  'relacionamento', 
  'marketing_digital',
  'saude',
  'educacao',
  'tecnologia',
  'lifestyle'
);
CREATE TYPE public.creative_format AS ENUM (
  'feed_square',      -- 1080x1080
  'feed_portrait',    -- 1080x1350
  'story',            -- 1080x1920
  'reels',            -- 1080x1920
  'tiktok',           -- 1080x1920
  'youtube_thumb',    -- 1280x720
  'banner_horizontal' -- 1200x628
);
CREATE TYPE public.generation_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- ========================================
-- PROFILES TABLE
-- ========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  niche template_category,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- USER ROLES TABLE (Segurança)
-- ========================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

-- ========================================
-- SUBSCRIPTIONS TABLE
-- ========================================
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan_name TEXT NOT NULL DEFAULT 'free', -- 'free', 'starter', 'pro'
  status subscription_status DEFAULT 'active',
  credits_total INTEGER DEFAULT 5,
  credits_used INTEGER DEFAULT 0,
  credits_reset_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- TEMPLATES TABLE
-- ========================================
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category template_category NOT NULL,
  format creative_format NOT NULL,
  thumbnail_url TEXT,
  prompt_template TEXT NOT NULL,
  style_preset JSONB, -- { colors, fonts, effects }
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- GENERATIONS TABLE
-- ========================================
CREATE TABLE public.generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.templates(id),
  
  -- Input
  product_name TEXT NOT NULL,
  product_description TEXT,
  headline TEXT,
  subheadline TEXT,
  cta_text TEXT,
  custom_prompt TEXT,
  
  -- Settings
  format creative_format NOT NULL,
  style_preset JSONB,
  color_scheme JSONB, -- { primary, secondary, accent, background }
  
  -- Output
  image_url TEXT,
  variations JSONB, -- [{ id, url, selected }]
  
  -- Meta
  status generation_status DEFAULT 'pending',
  credits_cost INTEGER DEFAULT 1,
  processing_time_ms INTEGER,
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- SAVED CREATIVES (Biblioteca do usuário)
-- ========================================
CREATE TABLE public.saved_creatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  generation_id UUID REFERENCES public.generations(id) ON DELETE CASCADE NOT NULL,
  name TEXT,
  folder TEXT DEFAULT 'Sem pasta',
  is_favorite BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- CREDIT TRANSACTIONS (Histórico)
-- ========================================
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- positivo = crédito, negativo = débito
  type TEXT NOT NULL, -- 'purchase', 'generation', 'bonus', 'refund'
  description TEXT,
  generation_id UUID REFERENCES public.generations(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- ANALYTICS (Opcional - para dashboard admin)
-- ========================================
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- FUNCTIONS
-- ========================================

-- Função para verificar role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Função para obter créditos disponíveis
CREATE OR REPLACE FUNCTION public.get_available_credits(_user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(credits_total - credits_used, 0)
  FROM public.subscriptions
  WHERE user_id = _user_id
$$;

-- Função para consumir créditos
CREATE OR REPLACE FUNCTION public.consume_credits(_user_id UUID, _amount INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  available INTEGER;
BEGIN
  SELECT (credits_total - credits_used) INTO available
  FROM public.subscriptions
  WHERE user_id = _user_id
  FOR UPDATE;
  
  IF available >= _amount THEN
    UPDATE public.subscriptions
    SET credits_used = credits_used + _amount,
        updated_at = NOW()
    WHERE user_id = _user_id;
    
    INSERT INTO public.credit_transactions (user_id, amount, type, description)
    VALUES (_user_id, -_amount, 'generation', 'Geração de criativo');
    
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Trigger para criar profile e subscription ao signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Criar profile
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  
  -- Criar subscription free
  INSERT INTO public.subscriptions (user_id, plan_name, credits_total)
  VALUES (NEW.id, 'free', 5);
  
  -- Criar role padrão
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- RLS POLICIES
-- ========================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- User Roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Templates (público para leitura)
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active templates"
  ON public.templates FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Generations
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generations"
  ON public.generations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create generations"
  ON public.generations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generations"
  ON public.generations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Saved Creatives
ALTER TABLE public.saved_creatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved creatives"
  ON public.saved_creatives FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Credit Transactions
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON public.credit_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

---

## 📱 ESTRUTURA DE PÁGINAS

### 1. Landing Page (`/`)
```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR (glass effect, fixed)                                │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Logo     Features  Pricing  Login  [Começar Grátis] CTA ││
│ └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│ HERO SECTION (full viewport, animated background)          │
│ ┌─────────────────────────────────────────────────────────┐│
│ │         Badge animado: "🚀 +10.000 criativos gerados"   ││
│ │                                                          ││
│ │    Crie Criativos que                                   ││
│ │    VENDEM em Segundos                                   ││
│ │         (texto gradiente animado)                        ││
│ │                                                          ││
│ │    Descrição com highlight animado                       ││
│ │                                                          ││
│ │    [Começar Grátis →]  [Ver Demo]                       ││
│ │                                                          ││
│ │    ★★★★★ "Revolucionou meus anúncios" - João Silva      ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ FLOATING MOCKUPS (parallax 3D)                             │
│ ┌──────┐        ┌──────┐        ┌──────┐                   │
│ │ Ad 1 │        │ Ad 2 │        │ Ad 3 │                   │
│ │      │        │      │        │      │                   │
│ └──────┘        └──────┘        └──────┘                   │
├─────────────────────────────────────────────────────────────┤
│ LOGOS SCROLL (infinite, grayscale → color on hover)        │
│ ┌─────────────────────────────────────────────────────────┐│
│ │  Meta   Google   TikTok   YouTube   Kwai   Pinterest   ││
│ └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│ FEATURES GRID (stagger reveal on scroll)                   │
│ ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│ │ 🎨            │  │ ⚡            │  │ 📊            │   │
│ │ Templates     │  │ IA Avançada   │  │ Multi-formato │   │
│ │ por Nicho     │  │               │  │               │   │
│ │               │  │               │  │               │   │
│ │ 50+ templates │  │ Gemini 2.5    │  │ Feed, Story,  │   │
│ │ otimizados    │  │ Flash         │  │ Reels, TikTok │   │
│ └───────────────┘  └───────────────┘  └───────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ DEMO INTERATIVA (card 3D com tilt)                         │
│ ┌─────────────────────────────────────────────────────────┐│
│ │                                                          ││
│ │   [Input: Descreva seu produto...]                      ││
│ │                                                          ││
│ │   [Gerar Preview]                                       ││
│ │                                                          ││
│ │   ┌─────────┐ ┌─────────┐ ┌─────────┐                   ││
│ │   │ Result  │ │ Result  │ │ Result  │  (variações)      ││
│ │   └─────────┘ └─────────┘ └─────────┘                   ││
│ └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│ PRICING SECTION (glass cards, popular highlighted)         │
│ ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│ │    FREE       │  │ ✨ STARTER ✨  │  │    PRO        │   │
│ │    R$0        │  │    R$27/mês   │  │   R$67/mês    │   │
│ │               │  │               │  │               │   │
│ │ • 5 créditos  │  │ • 50 créditos │  │ • 200 créditos│   │
│ │ • Marca d'água│  │ • Sem marca   │  │ • Copy IA     │   │
│ │               │  │ • Templates   │  │ • Prioridade  │   │
│ │               │  │   premium     │  │ • API access  │   │
│ │               │  │               │  │               │   │
│ │ [Começar]     │  │ [ESCOLHER]    │  │ [Escolher]    │   │
│ └───────────────┘  └───────────────┘  └───────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ TESTIMONIALS (carousel 3D)                                  │
│                                                             │
│        ← ┌─────────────────────────────┐ →                 │
│          │ "Aumentei meu ROAS em 3x    │                   │
│          │  usando os criativos da     │                   │
│          │  AdFactory"                 │                   │
│          │                             │                   │
│          │  ★★★★★                       │                   │
│          │  Maria Santos               │                   │
│          │  @mariasantos               │                   │
│          └─────────────────────────────┘                   │
├─────────────────────────────────────────────────────────────┤
│ CTA FINAL (gradient background, particles)                  │
│ ┌─────────────────────────────────────────────────────────┐│
│ │                                                          ││
│ │      Pronto para Criar Ads que Convertem?               ││
│ │                                                          ││
│ │      [Começar Grátis Agora →]                           ││
│ │                                                          ││
│ │      Sem cartão de crédito • 5 créditos grátis          ││
│ └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│ FOOTER (minimal, links)                                     │
└─────────────────────────────────────────────────────────────┘
```

### 2. Auth Page (`/auth`)
```
┌─────────────────────────────────────────────────────────────┐
│                    SPLIT LAYOUT                             │
│ ┌──────────────────────┬──────────────────────────────────┐│
│ │                      │                                  ││
│ │   LEFT SIDE          │      RIGHT SIDE                  ││
│ │   (gradient bg,      │      (form)                      ││
│ │    animated shapes)  │                                  ││
│ │                      │      ┌────────────────────┐      ││
│ │   "Bem-vindo ao      │      │    AdFactory       │      ││
│ │    futuro dos        │      │                    │      ││
│ │    criativos"        │      │  [Login] [Signup]  │      ││
│ │                      │      │                    │      ││
│ │   Features list      │      │  Email             │      ││
│ │   with icons         │      │  [____________]    │      ││
│ │                      │      │                    │      ││
│ │   ✓ 5 créditos free  │      │  Senha             │      ││
│ │   ✓ Sem cartão       │      │  [____________]    │      ││
│ │   ✓ Cancel anytime   │      │                    │      ││
│ │                      │      │  [Entrar →]        │      ││
│ │                      │      │                    │      ││
│ │   Floating mockups   │      │  ──── ou ────      │      ││
│ │                      │      │                    │      ││
│ │                      │      │  [G] Google        │      ││
│ │                      │      │                    │      ││
│ │                      │      └────────────────────┘      ││
│ └──────────────────────┴──────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 3. Dashboard (`/dashboard`)
```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR (collapsible, glass effect)      MAIN CONTENT       │
│ ┌────────────┐  ┌─────────────────────────────────────────┐ │
│ │            │  │ HEADER                                  │ │
│ │  AdFactory │  │ ┌───────────────────────────────────┐   │ │
│ │            │  │ │ Olá, João! 👋                     │   │ │
│ │ ──────────│  │ │                     [5] créditos   │   │ │
│ │            │  │ └───────────────────────────────────┘   │ │
│ │ 🏠 Home    │  │                                         │ │
│ │ ✨ Gerar   │  │ STATS CARDS (animated counters)         │ │
│ │ 📁 Biblioteca│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐   │ │
│ │ 📊 Analytics│ │ │ Créditos│ │ Gerados │ │ Salvos  │   │ │
│ │ ⚙️ Config  │  │ │   5     │ │   23    │ │   12    │   │ │
│ │            │  │ └─────────┘ └─────────┘ └─────────┘   │ │
│ │ ──────────│  │                                         │ │
│ │            │  │ QUICK ACTIONS                           │ │
│ │ 💎 Upgrade │  │ ┌────────────────────────────────────┐ │ │
│ │            │  │ │                                    │ │ │
│ │            │  │ │  [+ Novo Criativo]                 │ │ │
│ │            │  │ │                                    │ │ │
│ │            │  │ │  [📁 Ver Biblioteca]               │ │ │
│ │            │  │ │                                    │ │ │
│ │            │  │ └────────────────────────────────────┘ │ │
│ │            │  │                                         │ │
│ │            │  │ RECENT CREATIVES (grid, hover effects) │ │
│ │            │  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │ │
│ │            │  │ │      │ │      │ │      │ │      │   │ │
│ │            │  │ │ Ad 1 │ │ Ad 2 │ │ Ad 3 │ │ Ad 4 │   │ │
│ │            │  │ │      │ │      │ │      │ │      │   │ │
│ │            │  │ └──────┘ └──────┘ └──────┘ └──────┘   │ │
│ │            │  │                                         │ │
│ └────────────┘  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 4. Generator Page (`/generate`)
```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR        GENERATOR                                    │
│ ┌────────┐  ┌─────────────────────────────────────────────┐│
│ │        │  │                                             ││
│ │ (same) │  │  STEP WIZARD (animated progress)            ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │ ① Produto  ② Template  ③ Customize  ④ ✓│││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ │        │  │  STEP 1: PRODUTO                            ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │                                         │││
│ │        │  │  │  Nome do Produto                        │││
│ │        │  │  │  [________________________________]     │││
│ │        │  │  │                                         │││
│ │        │  │  │  Descrição                              │││
│ │        │  │  │  [________________________________]     │││
│ │        │  │  │  [________________________________]     │││
│ │        │  │  │                                         │││
│ │        │  │  │  Nicho                                  │││
│ │        │  │  │  [Emagrecimento ▼]                      │││
│ │        │  │  │                                         │││
│ │        │  │  │  Headline                               │││
│ │        │  │  │  [________________________________]     │││
│ │        │  │  │                                         │││
│ │        │  │  │  CTA                                    │││
│ │        │  │  │  [Compre Agora ▼] ou [___________]      │││
│ │        │  │  │                                         │││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ │        │  │  STEP 2: TEMPLATE                           ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │                                         │││
│ │        │  │  │  Formato: [Feed □] [Story □] [Reels □]  │││
│ │        │  │  │                                         │││
│ │        │  │  │  Templates Grid:                        │││
│ │        │  │  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │││
│ │        │  │  │  │ T1 │ │ T2 │ │ T3 │ │ T4 │           │││
│ │        │  │  │  │ ✓  │ │    │ │ 👑 │ │    │           │││
│ │        │  │  │  └────┘ └────┘ └────┘ └────┘           │││
│ │        │  │  │                                         │││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ │        │  │  STEP 3: CUSTOMIZE                          ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │                                         │││
│ │        │  │  │  Cores:                                 │││
│ │        │  │  │  [●] [●] [●] [●] [+]                    │││
│ │        │  │  │                                         │││
│ │        │  │  │  Estilo:                                │││
│ │        │  │  │  [Moderno] [Minimalista] [Bold]         │││
│ │        │  │  │                                         │││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │ PREVIEW (live, 3D tilt)                 │││
│ │        │  │  │ ┌──────────────────────────────────────┐│││
│ │        │  │  │ │                                      ││││
│ │        │  │  │ │        [CRIATIVO PREVIEW]            ││││
│ │        │  │  │ │                                      ││││
│ │        │  │  │ └──────────────────────────────────────┘│││
│ │        │  │  │                                         │││
│ │        │  │  │ Variações: [1] [2] [3] [4] [5]          │││
│ │        │  │  │                                         │││
│ │        │  │  │ [Gerar Mais] [💾 Salvar] [⬇️ Download]   │││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ └────────┘  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 5. Library Page (`/library`)
```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR        LIBRARY                                      │
│ ┌────────┐  ┌─────────────────────────────────────────────┐│
│ │        │  │                                             ││
│ │ (same) │  │  HEADER                                     ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │ Meus Criativos          [🔍 Buscar...]  │││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ │        │  │  FILTERS                                    ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │ [Todos] [Favoritos ♥] [Feed] [Story]    │││
│ │        │  │  │                                         │││
│ │        │  │  │ Pastas: [Todas ▼]  Ordenar: [Recentes ▼]│││
│ │        │  │  └─────────────────────────────────────────┘││
│ │        │  │                                             ││
│ │        │  │  GRID (masonry layout, hover effects)       ││
│ │        │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       ││
│ │        │  │  │      │ │      │ │      │ │      │       ││
│ │        │  │  │ ♥    │ │      │ │ ♥    │ │      │       ││
│ │        │  │  │      │ │      │ │      │ │      │       ││
│ │        │  │  │ Feed │ │Story │ │ Feed │ │Reels │       ││
│ │        │  │  │ 1080 │ │ 1920 │ │ 1080 │ │ 1920 │       ││
│ │        │  │  └──────┘ └──────┘ └──────┘ └──────┘       ││
│ │        │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       ││
│ │        │  │  │      │ │      │ │      │ │      │       ││
│ │        │  │  │      │ │      │ │      │ │      │       ││
│ │        │  │  └──────┘ └──────┘ └──────┘ └──────┘       ││
│ │        │  │                                             ││
│ │        │  │  DETAIL MODAL (quando clica)                ││
│ │        │  │  ┌─────────────────────────────────────────┐││
│ │        │  │  │ ┌──────────────┐  Detalhes              │││
│ │        │  │  │ │              │  • Criado: 12/06/24    │││
│ │        │  │  │ │   IMAGEM     │  • Formato: Feed       │││
│ │        │  │  │ │              │  • Nicho: Emagrecimento│││
│ │        │  │  │ │              │                        │││
│ │        │  │  │ └──────────────┘  [⬇️] [🗑️] [✏️] [♥]   │││
│ │        │  │  └─────────────────────────────────────────┘││
│ └────────┘  └─────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 EDGE FUNCTIONS

### 1. generate-creative
```typescript
// supabase/functions/generate-creative/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader?.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      productName,
      productDescription,
      headline,
      subheadline,
      ctaText,
      format,
      templateId,
      colorScheme,
      stylePreset,
      variationsCount = 3
    } = await req.json();

    // Verificar créditos
    const { data: hasCredits } = await supabase.rpc('consume_credits', {
      _user_id: user.id,
      _amount: variationsCount
    });

    if (!hasCredits) {
      return new Response(JSON.stringify({ error: 'Créditos insuficientes' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Criar registro de geração
    const { data: generation, error: genError } = await supabase
      .from('generations')
      .insert({
        user_id: user.id,
        template_id: templateId,
        product_name: productName,
        product_description: productDescription,
        headline,
        subheadline,
        cta_text: ctaText,
        format,
        color_scheme: colorScheme,
        style_preset: stylePreset,
        status: 'processing',
        credits_cost: variationsCount
      })
      .select()
      .single();

    if (genError) throw genError;

    // Construir prompt para IA
    const prompt = `
      Crie um anúncio visual profissional para:
      
      Produto: ${productName}
      Descrição: ${productDescription}
      Headline: ${headline}
      Sub-headline: ${subheadline || 'N/A'}
      CTA: ${ctaText}
      
      Estilo: Moderno, limpo, profissional
      Cores: ${JSON.stringify(colorScheme)}
      Formato: ${format}
      
      O anúncio deve ser impactante, com tipografia clara e call-to-action destacado.
      Sem pessoas reais, use elementos gráficos e ilustrações.
    `;

    // Gerar imagens com Lovable AI
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const startTime = Date.now();
    const variations = [];

    for (let i = 0; i < variationsCount; i++) {
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image-preview',
          messages: [
            { role: 'user', content: `${prompt} Variação ${i + 1} de ${variationsCount}. Crie algo único.` }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (!aiResponse.ok) {
        throw new Error(`AI generation failed: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

      if (imageUrl) {
        variations.push({
          id: crypto.randomUUID(),
          url: imageUrl,
          selected: i === 0
        });
      }
    }

    const processingTime = Date.now() - startTime;

    // Atualizar geração com resultados
    await supabase
      .from('generations')
      .update({
        image_url: variations[0]?.url,
        variations,
        status: 'completed',
        processing_time_ms: processingTime
      })
      .eq('id', generation.id);

    return new Response(JSON.stringify({
      success: true,
      generation: {
        ...generation,
        variations,
        image_url: variations[0]?.url
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

### 2. generate-copy
```typescript
// supabase/functions/generate-copy/index.ts
// Gera copy/texto para anúncios usando IA

serve(async (req) => {
  // Similar structure, usando google/gemini-2.5-flash para texto
  const prompt = `
    Crie 5 variações de copy para anúncio:
    
    Produto: ${productName}
    Descrição: ${productDescription}
    Nicho: ${niche}
    Tom: Persuasivo, urgente, benefício-focado
    
    Para cada variação, forneça:
    - Headline (max 40 caracteres)
    - Subheadline (max 80 caracteres)
    - CTA (max 20 caracteres)
    
    Formato: JSON array
  `;
  
  // ... implementation
});
```

---

## 📦 COMPONENTES PRINCIPAIS

### Estrutura de Pastas
```
src/
├── components/
│   ├── ui/                    # shadcn components customizados
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── PricingCards.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── LogoScroll.tsx
│   │   └── CTASection.tsx
│   ├── auth/
│   │   ├── AuthForm.tsx
│   │   ├── SocialButtons.tsx
│   │   └── AuthLayout.tsx
│   ├── dashboard/
│   │   ├── StatsCards.tsx
│   │   ├── RecentCreatives.tsx
│   │   ├── CreditsDisplay.tsx
│   │   └── QuickActions.tsx
│   ├── generator/
│   │   ├── StepWizard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── TemplateSelector.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── StyleSelector.tsx
│   │   ├── PreviewCard.tsx
│   │   └── VariationsGrid.tsx
│   ├── library/
│   │   ├── CreativeGrid.tsx
│   │   ├── CreativeCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── FolderSelector.tsx
│   │   └── CreativeModal.tsx
│   └── shared/
│       ├── LoadingSpinner.tsx
│       ├── GlassCard.tsx
│       ├── AnimatedCounter.tsx
│       ├── GradientText.tsx
│       ├── MagneticButton.tsx
│       ├── ParallaxWrapper.tsx
│       └── Particles.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useCredits.ts
│   ├── useGenerations.ts
│   ├── useTemplates.ts
│   ├── use3DTilt.ts
│   ├── useParallax.ts
│   └── useMagnetic.ts
├── lib/
│   ├── supabase.ts
│   ├── api.ts
│   └── animations.ts
├── pages/
│   ├── Index.tsx            # Landing
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── Generate.tsx
│   ├── Library.tsx
│   ├── Pricing.tsx
│   └── Settings.tsx
├── styles/
│   └── animations.css
└── types/
    └── index.ts
```

---

## 🎯 FLUXO DO USUÁRIO

```
1. VISITANTE
   └─> Landing Page
       ├─> Ver Features
       ├─> Ver Pricing
       ├─> Testar Demo (limitada)
       └─> Signup (CTA)

2. SIGNUP/LOGIN
   └─> Auth Page
       ├─> Email/Senha
       ├─> Google OAuth
       └─> Onboarding (opcional)
           └─> Selecionar nicho

3. DASHBOARD
   └─> Ver créditos
   └─> Ver estatísticas
   └─> Ações rápidas
       ├─> Novo Criativo → Generator
       └─> Ver Biblioteca → Library

4. GENERATOR (Wizard)
   └─> Step 1: Produto
       └─> Nome, descrição, nicho
   └─> Step 2: Template
       └─> Formato, template base
   └─> Step 3: Customize
       └─> Cores, estilo
   └─> Step 4: Generate
       └─> Aguardar IA
       └─> Ver variações
       └─> Salvar/Download

5. LIBRARY
   └─> Ver todos criativos
   └─> Filtrar/Buscar
   └─> Organizar em pastas
   └─> Favoritar
   └─> Download/Compartilhar

6. UPGRADE (quando sem créditos)
   └─> Pricing Page
       └─> Checkout Stripe
           └─> Webhook atualiza subscription
```

---

## 🔐 SEGURANÇA

### Checklist
- [x] RLS em todas as tabelas
- [x] Roles separados em tabela própria
- [x] Security Definer functions
- [x] Validação de créditos server-side
- [x] Rate limiting na edge function
- [x] Input sanitization
- [x] CORS configurado
- [x] JWT validation

---

## 📱 RESPONSIVIDADE

### Breakpoints
```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Mobile Específico
- Sidebar → Bottom nav
- Cards → Full width
- Grid 4 cols → 2 cols → 1 col
- Touch targets: min 44px

---

## 🚀 PRÓXIMOS PASSOS

1. **Fase 1**: Landing + Auth + Design System
2. **Fase 2**: Dashboard + Database
3. **Fase 3**: Generator + Edge Functions
4. **Fase 4**: Library + Polish
5. **Fase 5**: Payments + Launch

---

**Este blueprint deve ser seguido como guia mestre para implementação do AdFactory.**
