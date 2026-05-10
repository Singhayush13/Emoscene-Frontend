# Emoscence UI Component Library

Complete reusable UI component system for the Emoscence project. All components support dark mode and animations.

## 📦 Components Overview

### 1. **SectionTitle**
Animated section heading with optional gradient text.

```jsx
import { SectionTitle } from "../components/ui";

<SectionTitle 
  title="Choose Your Mood" 
  subtitle="Select the perfect scent"
  align="center"
  gradient={true}
  animation={true}
/>
```

**Props:**
- `title` (string) - Main heading
- `subtitle` (string) - Optional subtitle
- `align` (string) - "left", "center", "right"
- `gradient` (boolean) - Orange to purple gradient
- `animation` (boolean) - Enable scroll animation

---

### 2. **GlassCard**
Glassmorphism card with blur and backdrop effect.

```jsx
import { GlassCard } from "../components/ui";

<GlassCard hover gradient className="p-6">
  <h3>Premium Quality</h3>
  <p>Handcrafted with natural ingredients</p>
</GlassCard>
```

**Props:**
- `children` (ReactNode) - Card content
- `hover` (boolean) - Hover animation effect
- `gradient` (boolean) - Add gradient background
- `animated` (boolean) - Enable entrance animation
- `onClick` (function) - Click handler
- `className` (string) - Additional classes

---

### 3. **GlowButton**
Animated button with customizable variants and glow effects.

```jsx
import { GlowButton } from "../components/ui";

<GlowButton 
  variant="primary" 
  size="lg"
  glowColor="purple"
  onClick={() => console.log('clicked')}
>
  Shop Now
</GlowButton>
```

**Props:**
- `variant` (string) - "primary", "secondary", "outline"
- `size` (string) - "sm", "md", "lg"
- `glowColor` (string) - "purple", "orange", "pink"
- `isLoading` (boolean) - Show loading state
- `disabled` (boolean) - Disable button
- `fullWidth` (boolean) - 100% width
- `icon` (ReactNode) - Icon element
- `animated` (boolean) - Enable animation

---

### 4. **Modal**
Reusable modal dialog with animations.

```jsx
import { Modal, GlowButton } from "../components/ui";
import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);

<>
  <GlowButton onClick={() => setIsOpen(true)}>Open Modal</GlowButton>
  
  <Modal 
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirm Action"
    size="md"
    footer={
      <>
        <GlowButton variant="outline" onClick={() => setIsOpen(false)}>
          Cancel
        </GlowButton>
        <GlowButton onClick={() => setIsOpen(false)}>
          Confirm
        </GlowButton>
      </>
    }
  >
    <p>Are you sure you want to proceed?</p>
  </Modal>
</>
```

**Props:**
- `isOpen` (boolean) - Control visibility
- `onClose` (function) - Close handler
- `title` (string) - Modal title
- `children` (ReactNode) - Modal content
- `footer` (ReactNode) - Footer actions
- `size` (string) - "sm", "md", "lg", "xl"
- `closeButton` (boolean) - Show close button
- `blur` (boolean) - Blur backdrop

---

### 5. **AnimatedWrapper**
Wrapper component with multiple animation types.

```jsx
import { AnimatedWrapper } from "../components/ui";

<AnimatedWrapper type="fadeInUp" delay={0.2} duration={0.6}>
  <div>Animated content</div>
</AnimatedWrapper>
```

**Animation Types:**
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `slideIn` - Slide in from left
- `scaleIn` - Scale in from center
- `rotateIn` - Rotate in from center

**Props:**
- `type` (string) - Animation type
- `delay` (number) - Delay in seconds
- `duration` (number) - Animation duration
- `whileHover` (object) - Hover animation
- `whileTap` (object) - Tap animation

---

### 6. **AnimatedStaggerContainer**
Animate multiple children with stagger effect.

```jsx
import { AnimatedStaggerContainer } from "../components/ui";

<AnimatedStaggerContainer staggerDelay={0.1} className="grid grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</AnimatedStaggerContainer>
```

**Props:**
- `children` (ReactNode array) - Child elements
- `staggerDelay` (number) - Delay between items
- `delay` (number) - Initial delay
- `className` (string) - Container classes

---

### 7. **Badge**
Small tag/badge component with variants.

```jsx
import { Badge } from "../components/ui";

<Badge variant="primary" size="md">
  New
</Badge>

<Badge variant="success">In Stock</Badge>
<Badge variant="warning">Limited</Badge>
<Badge variant="danger">Sold Out</Badge>
```

**Props:**
- `variant` (string) - "primary", "secondary", "success", "warning", "danger"
- `size` (string) - "sm", "md", "lg"
- `className` (string) - Additional classes

---

### 8. **Input & Textarea**
Form inputs with error states and icons.

```jsx
import { Input, Textarea } from "../components/ui";
import { Mail } from "lucide-react";
import { useState } from "react";

const [email, setEmail] = useState("");
const [error, setError] = useState("");

<Input 
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  icon={<Mail size={18} />}
  error={error}
/>

<Textarea 
  placeholder="Enter your message"
  rows={5}
  error={error}
/>
```

**Props:**
- `type` (string) - Input type
- `placeholder` (string) - Placeholder text
- `value` (string) - Input value
- `onChange` (function) - Change handler
- `error` (string) - Error message
- `disabled` (boolean) - Disable input
- `icon` (ReactNode) - Left icon
- `className` (string) - Additional classes

---

### 9. **Card**
Simple card wrapper with optional animations.

```jsx
import { Card } from "../components/ui";

<Card hover animated className="p-6">
  <h3 className="text-xl font-bold">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</Card>
```

**Props:**
- `children` (ReactNode) - Card content
- `animated` (boolean) - Enable animation
- `hover` (boolean) - Hover effect
- `onClick` (function) - Click handler
- `className` (string) - Additional classes

---

### 10. **LoadingSpinner & SkeletonLoader**
Loading indicators and skeleton screens.

```jsx
import { LoadingSpinner, SkeletonLoader } from "../components/ui";

// Spinner
<LoadingSpinner size="md" color="purple" />

// Skeleton
<SkeletonLoader count={3} type="card" />
```

**LoadingSpinner Props:**
- `size` (string) - "sm", "md", "lg"
- `color` (string) - "purple", "orange", "white"

**SkeletonLoader Props:**
- `count` (number) - Number of skeleton items
- `type` (string) - "text", "card", "image"

---

## 🎨 Usage Examples

### Example 1: Home Page with UI Components
```jsx
import { SectionTitle, GlassCard, GlowButton, AnimatedWrapper, AnimatedStaggerContainer } from "../components/ui";

export const Home = () => {
  return (
    <div>
      <SectionTitle 
        title="Welcome to Emoscence"
        subtitle="Discover your perfect mood"
      />
      
      <AnimatedStaggerContainer className="grid grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <GlassCard key={product.id} hover animated>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <GlowButton variant="primary" fullWidth>
              View Details
            </GlowButton>
          </GlassCard>
        ))}
      </AnimatedStaggerContainer>
    </div>
  );
};
```

### Example 2: Form with Validation
```jsx
import { Input, GlowButton, Badge } from "../components/ui";
import { useState } from "react";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const handleSubmit = () => {
    if (!email.includes("@")) {
      setEmailError("Invalid email");
      return;
    }
    // Submit form
  };
  
  return (
    <div>
      <Input 
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />
      <GlowButton onClick={handleSubmit} fullWidth>
        Send Message
      </GlowButton>
    </div>
  );
};
```

### Example 3: Product Card
```jsx
import { Card, Badge, GlowButton } from "../components/ui";

export const ProductCard = ({ product }) => {
  return (
    <Card hover>
      <div className="relative mb-4">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
        <Badge variant="success" size="sm" className="absolute top-2 right-2">
          {product.discount}% Off
        </Badge>
      </div>
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">${product.price}</p>
      <GlowButton variant="primary" fullWidth>
        Add to Cart
      </GlowButton>
    </Card>
  );
};
```

---

## 🌙 Dark Mode Support

All components automatically support dark mode using Tailwind's `dark:` prefix.

The theme toggle is managed in `App.jsx` and stored in Redux.

---

## 📝 Best Practices

1. **Use SectionTitle** for all major section headings
2. **Use GlassCard** for content containers
3. **Use GlowButton** for all CTAs
4. **Use AnimatedWrapper** to stagger animations
5. **Use Badge** to highlight status/tags
6. **Always include error states** on forms
7. **Use LoadingSpinner** during async operations
8. **Keep components reusable** - avoid hardcoding data

---

## 🔧 Customization

All components accept `className` prop for custom styling:

```jsx
<GlowButton className="w-full mt-4">Custom Button</GlowButton>
```

---

## 📂 File Structure

```
src/components/ui/
├── index.js (exports all components)
├── SectionTitle.jsx
├── GlassCard.jsx
├── GlowButton.jsx
├── Modal.jsx
├── AnimatedWrapper.jsx
├── Badge.jsx
├── Input.jsx
├── Card.jsx
└── LoadingSpinner.jsx
```

---

## ✨ Features

✅ Fully responsive
✅ Dark mode support
✅ Smooth animations with Framer Motion
✅ TypeScript ready (use JSDoc comments)
✅ Accessible (ARIA labels, semantic HTML)
✅ Performance optimized
✅ Tailwind CSS compatible

---

Last Updated: May 9, 2026
