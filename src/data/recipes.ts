import { Recipe, Cuisine, DietaryTag } from '../types/mealPlan';

// Generated image assets
import chickenRiceImg from '../assets/images/dish_chicken_rice_1792051810813.jpg';
import steamedFishImg from '../assets/images/dish_steamed_fish_1792051808168.jpg';
import curryChickenImg from '../assets/images/dish_curry_chicken_1792051808040.jpg';
import beefRendangImg from '../assets/images/dish_beef_rendang_1792051808748.jpg';
import mealSpreadImg from '../assets/images/sg_meal_spread_1792051808065.jpg';

export { mealSpreadImg };

export const RECIPES: Recipe[] = [
  {
    id: 'hainanese-chicken-rice',
    title: 'Hainanese Poached Chicken with Fragrant Rice',
    vernacularName: '海南鸡饭',
    cuisine: 'Chinese',
    tags: ['High Protein', 'Kid-Friendly'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    calories: 580,
    proteinGrams: 42,
    carbsGrams: 52,
    fatGrams: 16,
    nutriGrade: 'B',
    servings: 2,
    heroImage: chickenRiceImg,
    description: 'Silky, succulent poached chicken bathed in sesame soy glaze, served with jasmine rice infused with pandan leaves, chicken fat, and fresh ginger-chilli dip.',
    wetMarketTip: 'Ask the poultry stall uncle for fresh kampong chicken (whole or bone-in thigh) rather than frozen for the silkiest skin and rich gelatin.',
    storageTip: 'Save the poaching broth for next-day cabbage soup or congee.',
    ingredients: [
      { id: 'hcr-1', name: 'Fresh Chicken Thighs (Bone-in)', localName: 'Kampong Chicken', amount: 500, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 5.80, shengSiongSGD: 5.20, wetMarketSGD: 4.90 },
      { id: 'hcr-2', name: 'Jasmine Rice', localName: 'Thai Hom Mali Rice', amount: 200, unit: 'g', category: 'Pantry & Sauces', fairpriceSGD: 1.20, shengSiongSGD: 1.10, wetMarketSGD: 1.00 },
      { id: 'hcr-3', name: 'Old Ginger & Garlic', localName: 'Ginger & Garlic cloves', amount: 40, unit: 'g', category: 'Spices & Aromatics', fairpriceSGD: 0.60, shengSiongSGD: 0.50, wetMarketSGD: 0.40 },
      { id: 'hcr-4', name: 'Fresh Pandan Leaves', localName: 'Daun Pandan', amount: 3, unit: 'stalks', category: 'Produce & Herbs', fairpriceSGD: 0.80, shengSiongSGD: 0.70, wetMarketSGD: 0.50 },
      { id: 'hcr-5', name: 'Cucumber & Coriander', localName: 'Garnish', amount: 100, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 0.70, shengSiongSGD: 0.60, wetMarketSGD: 0.50 },
      { id: 'hcr-6', name: 'Sesame Oil & Premium Light Soy', localName: 'Minyak Bijan', amount: 2, unit: 'tbsp', category: 'Pantry & Sauces', fairpriceSGD: 0.90, shengSiongSGD: 0.85, wetMarketSGD: 0.80 }
    ],
    instructions: [
      'Rub chicken with coarse sea salt, rinse, and poach in simmering water with crushed ginger, scallions, and knotted pandan for 25 minutes.',
      'Plunge the cooked chicken immediately into an ice-water bath for 5 minutes to create a delicate gelatinous skin layer.',
      'In a rice cooker, sauté garlic, ginger, and pandan in chicken fat until fragrant, then add rinsed rice and poaching broth to cook.',
      'Carve chicken, drizzle with a warm emulsion of light soy, sesame oil, and chicken broth, and serve with sliced Japanese cucumber and spicy garlic chilli.'
    ]
  },
  {
    id: 'teochew-steamed-seabass',
    title: 'Hong Kong & Teochew Steamed Seabass with Ginger Soy',
    vernacularName: '港蒸 / 潮州清蒸金目鲈',
    cuisine: 'Chinese',
    tags: ['HPB Healthier Choice', 'Quick <25m', 'High Protein'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    calories: 320,
    proteinGrams: 38,
    carbsGrams: 4,
    fatGrams: 8,
    nutriGrade: 'A',
    servings: 2,
    heroImage: steamedFishImg,
    description: 'A weekday Singapore classic: tender whole barramundi steamed to flaky perfection with fine ginger needles, spring onions, red chilli, and sizzling hot sesame-soy reduction.',
    wetMarketTip: 'Pick whole sea bass (Siakap / Jin Mu Lu) with clear bright eyes and red gills at Tekka or Chinatown market; ask the fishmonger to scale, gut, and butterfly it.',
    storageTip: 'Best eaten fresh right out of the steamer.',
    ingredients: [
      { id: 'tss-1', name: 'Fresh Whole Sea Bass', localName: 'Jin Mu Lu (金目鲈)', amount: 600, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 7.50, shengSiongSGD: 6.90, wetMarketSGD: 6.50 },
      { id: 'tss-2', name: 'Young Ginger', localName: 'Halya Muda', amount: 30, unit: 'g', category: 'Spices & Aromatics', fairpriceSGD: 0.50, shengSiongSGD: 0.40, wetMarketSGD: 0.40 },
      { id: 'tss-3', name: 'Spring Onions & Coriander', localName: 'Daun Bawang', amount: 50, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 0.80, shengSiongSGD: 0.70, wetMarketSGD: 0.50 },
      { id: 'tss-4', name: 'Red Chilli (Julienned)', localName: 'Chilli Merah', amount: 1, unit: 'pc', category: 'Produce & Herbs', fairpriceSGD: 0.30, shengSiongSGD: 0.25, wetMarketSGD: 0.20 },
      { id: 'tss-5', name: 'Light Soy Sauce & Shaoxing Wine', localName: 'Kicap Cair', amount: 3, unit: 'tbsp', category: 'Pantry & Sauces', fairpriceSGD: 0.80, shengSiongSGD: 0.75, wetMarketSGD: 0.70 }
    ],
    instructions: [
      'Score both sides of the sea bass gently and stuff the cavity with shredded ginger slices and spring onion whites.',
      'Place fish on an oval steaming plate and steam vigorously over high heat for 9–10 minutes until flesh is opaque and flakes off the bone.',
      'Drain off excess steaming liquid to remove fishiness. Scatter fresh ginger shreds, spring onion curls, and red chilli on top.',
      'In a small pan, heat 2 tbsp oil until smoking hot and pour over the aromatics to sizzle and release fragrance. Pour seasoned light soy sauce around the base.'
    ]
  },
  {
    id: 'nyonya-curry-chicken',
    title: 'Nyonya Kari Ayam with Soft Potatoes',
    vernacularName: '娘惹咖喱鸡',
    cuisine: 'Peranakan',
    tags: ['One-Pot', 'Kid-Friendly'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    calories: 510,
    proteinGrams: 35,
    carbsGrams: 28,
    fatGrams: 22,
    nutriGrade: 'B',
    servings: 2,
    heroImage: curryChickenImg,
    description: 'Comforting Peranakan chicken curry simmered in aromatic freshly pounded rempah, curry leaves, lemongrass, and rich coconut milk with tender potato chunks.',
    wetMarketTip: 'Buy freshly grated coconut milk (santan segar) from the spice miller at Geylang Serai or Little India wet markets for authentic fragrant oil separation.',
    storageTip: 'Curry tastes even better the next day as the potatoes absorb the aromatic gravy overnight.',
    ingredients: [
      { id: 'nca-1', name: 'Chicken Drumsticks & Thighs', localName: 'Ayam Segar', amount: 500, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 4.80, shengSiongSGD: 4.40, wetMarketSGD: 4.20 },
      { id: 'nca-2', name: 'Russet / Holland Potatoes', localName: 'Kentang', amount: 300, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 1.20, shengSiongSGD: 1.00, wetMarketSGD: 0.90 },
      { id: 'nca-3', name: 'Fresh Coconut Milk', localName: 'Kara / Fresh Santan', amount: 200, unit: 'ml', category: 'Pantry & Sauces', fairpriceSGD: 1.40, shengSiongSGD: 1.25, wetMarketSGD: 1.10 },
      { id: 'nca-4', name: 'Curry Powder & Rempah Paste', localName: 'Baba’s Meat Curry Powder', amount: 45, unit: 'g', category: 'Spices & Aromatics', fairpriceSGD: 1.10, shengSiongSGD: 1.00, wetMarketSGD: 0.90 },
      { id: 'nca-5', name: 'Lemongrass & Fresh Curry Leaves', localName: 'Serai & Daun Kari', amount: 2, unit: 'stalks', category: 'Produce & Herbs', fairpriceSGD: 0.70, shengSiongSGD: 0.60, wetMarketSGD: 0.50 }
    ],
    instructions: [
      'Marinate chicken pieces with 1 tablespoon of curry powder, turmeric, and sea salt for 10 minutes.',
      'Sauté pounded shallots, garlic, crushed lemongrass, and curry leaves in 2 tbsp oil until fragrant, then stir in curry paste until oil separates (pecah minyak).',
      'Add chicken pieces and potato chunks, tossing until coated in the golden curry paste.',
      'Pour in thin coconut milk or water, bring to a gentle boil, and simmer covered for 20 minutes until potatoes are fork-tender. Stir in thick santan in the last 2 minutes.'
    ]
  },
  {
    id: 'malay-beef-rendang',
    title: 'Slow-Simmered Malay Daging Rendang with Kerisik',
    vernacularName: 'Rendang Daging Tok',
    cuisine: 'Malay',
    tags: ['Halal-friendly', 'High Protein', 'One-Pot'],
    prepTimeMinutes: 20,
    cookTimeMinutes: 75,
    calories: 590,
    proteinGrams: 46,
    carbsGrams: 14,
    fatGrams: 28,
    nutriGrade: 'B',
    servings: 2,
    heroImage: beefRendangImg,
    description: 'An iconic Southeast Asian feast dish: tender beef chuck caramelized in a rich reduction of coconut milk, toasted kerisik, kaffir lime leaves, and spiced aromatics.',
    wetMarketTip: 'Choose beef shin or chuck roast at the halal butcher at Tekka Market; the intramuscular collagen breaks down into melt-in-mouth tenderness.',
    storageTip: 'Rendang freezes remarkably well for up to 1 month. Perfect for weekend batch cooking.',
    ingredients: [
      { id: 'mbr-1', name: 'Beef Chuck / Shin Cubes', localName: 'Daging Lembu Halal', amount: 500, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 8.90, shengSiongSGD: 8.20, wetMarketSGD: 7.80 },
      { id: 'mbr-2', name: 'Coconut Cream & Milk', localName: 'Santan Pekat', amount: 250, unit: 'ml', category: 'Pantry & Sauces', fairpriceSGD: 1.60, shengSiongSGD: 1.40, wetMarketSGD: 1.20 },
      { id: 'mbr-3', name: 'Toasted Grated Coconut', localName: 'Kerisik', amount: 40, unit: 'g', category: 'Pantry & Sauces', fairpriceSGD: 1.00, shengSiongSGD: 0.90, wetMarketSGD: 0.80 },
      { id: 'mbr-4', name: 'Kaffir Lime Leaves & Turmeric Leaf', localName: 'Daun Limau Purut', amount: 5, unit: 'leaves', category: 'Produce & Herbs', fairpriceSGD: 0.60, shengSiongSGD: 0.50, wetMarketSGD: 0.40 },
      { id: 'mbr-5', name: 'Fresh Galangal, Lemongrass & Dried Chilli', localName: 'Lengkuas & Cili Kering', amount: 60, unit: 'g', category: 'Spices & Aromatics', fairpriceSGD: 0.90, shengSiongSGD: 0.80, wetMarketSGD: 0.70 }
    ],
    instructions: [
      'Blend shallots, garlic, galangal, ginger, lemongrass, and rehydrated dried chilies into a smooth rempah paste.',
      'In a wide heavy-bottomed wok, combine beef cubes, rempah paste, coconut milk, and crushed lemongrass. Bring to a boil over medium heat.',
      'Reduce heat to low and simmer uncovered for 60 minutes, stirring occasionally as the coconut milk reduces and the oil begins to fry the meat.',
      'Add the toasted kerisik, thinly shredded kaffir lime leaves, and palm sugar. Continue stirring gently until the rendang turns deep dark brown and dry.'
    ]
  },
  {
    id: 'claypot-silken-tofu',
    title: 'Claypot Silken Egg Tofu with Minced Pork & Mushrooms',
    vernacularName: '砂煲玉子豆腐',
    cuisine: 'Chinese',
    tags: ['Quick <25m', 'Kid-Friendly'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    calories: 340,
    proteinGrams: 24,
    carbsGrams: 16,
    fatGrams: 14,
    nutriGrade: 'A',
    servings: 2,
    heroImage: mealSpreadImg,
    description: 'Golden lightly seared Japanese egg tofu rounds simmered in savory garlic oyster gravy with shiitake mushrooms, sweet peas, and tender minced pork.',
    wetMarketTip: 'Look for Unicurd or Fortune egg tofu tubes at the chilled dairy section of Sheng Siong or FairPrice.',
    storageTip: 'Best consumed hot with steaming jasmine rice.',
    ingredients: [
      { id: 'cst-1', name: 'Japanese Egg Tofu Tubes', localName: 'Japanese Silken Egg Tofu', amount: 2, unit: 'tubes', category: 'Chilled & Dairy', fairpriceSGD: 1.80, shengSiongSGD: 1.60, wetMarketSGD: 1.50 },
      { id: 'cst-2', name: 'Minced Lean Pork / Chicken', localName: 'Bak Chor (肉碎)', amount: 180, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 2.50, shengSiongSGD: 2.20, wetMarketSGD: 2.00 },
      { id: 'cst-3', name: 'Fresh Shiitake Mushrooms', localName: 'Xiang Gu (香菇)', amount: 100, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 1.60, shengSiongSGD: 1.40, wetMarketSGD: 1.30 },
      { id: 'cst-4', name: 'Snow Peas & Baby Corn', localName: 'Sweet Peas', amount: 80, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 1.20, shengSiongSGD: 1.00, wetMarketSGD: 0.90 },
      { id: 'cst-5', name: 'Oyster Sauce & Sesame Oil', localName: 'Hao You', amount: 2, unit: 'tbsp', category: 'Pantry & Sauces', fairpriceSGD: 0.80, shengSiongSGD: 0.70, wetMarketSGD: 0.70 }
    ],
    instructions: [
      'Slice egg tofu into 2cm thick rounds, dust lightly with cornstarch, and pan-fry in 2 tbsp hot oil until both sides are golden and crispy. Set aside.',
      'In the same claypot or skillet, sauté minced garlic until fragrant, then add minced meat and sliced mushrooms until lightly browned.',
      'Pour in 1 cup chicken broth, oyster sauce, and soy sauce. Bring to a simmer and gently fold in the snow peas and fried tofu.',
      'Stir in a light cornstarch slurry to thicken into a silky glaze. Drizzle sesame oil and garnish with scallions.'
    ]
  },
  {
    id: 'sambal-kang-kong',
    title: 'Wok-Hei Sambal Belacan Kang Kong',
    vernacularName: '叁峇空心菜 / 蕹菜',
    cuisine: 'Malay',
    tags: ['Quick <25m', 'HPB Healthier Choice'],
    prepTimeMinutes: 5,
    cookTimeMinutes: 6,
    calories: 140,
    proteinGrams: 6,
    carbsGrams: 8,
    fatGrams: 7,
    nutriGrade: 'A',
    servings: 2,
    heroImage: mealSpreadImg,
    description: 'Crisp water spinach flash-fried over roaring wok flame with aromatic toasted shrimp paste (belacan), garlic, and spicy red chilli padi.',
    wetMarketTip: 'Select kang kong with slender, tender stems and vibrant green leaves. Wet market vendors often sell 3 bundles for $2.50.',
    storageTip: 'Must be cooked right before dinner for the crispest texture.',
    ingredients: [
      { id: 'skk-1', name: 'Fresh Kang Kong (Water Spinach)', localName: 'Kangkung (蕹菜)', amount: 300, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 1.40, shengSiongSGD: 1.10, wetMarketSGD: 0.90 },
      { id: 'skk-2', name: 'Sambal Belacan Paste', localName: 'Singlong or Homemade Sambal', amount: 2, unit: 'tbsp', category: 'Pantry & Sauces', fairpriceSGD: 1.20, shengSiongSGD: 1.10, wetMarketSGD: 1.00 },
      { id: 'skk-3', name: 'Chilli Padi & Garlic cloves', localName: 'Chilli Padi Burung', amount: 4, unit: 'pcs', category: 'Spices & Aromatics', fairpriceSGD: 0.40, shengSiongSGD: 0.35, wetMarketSGD: 0.30 }
    ],
    instructions: [
      'Wash kang kong thoroughly in water, snap off tough bottom stems, and cut into 6cm lengths. Drain dry.',
      'Heat 2 tbsp oil in a smoking hot wok. Add bruised garlic, sliced chili padi, and sambal belacan, stir-frying for 30 seconds until deeply fragrant.',
      'Toss in stems first for 20 seconds, followed by the leafy portions. Toss rapidly over highest flame.',
      'Splash 1 tablespoon of water or broth along the wok edge, season with a pinch of sugar, and dish out immediately.'
    ]
  },
  {
    id: 'comfort-abc-soup',
    title: 'Nourishing ABC Chicken & Corn Soup',
    vernacularName: 'ABC 营养清鸡汤',
    cuisine: 'Chinese',
    tags: ['HPB Healthier Choice', 'One-Pot', 'Kid-Friendly'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 45,
    calories: 260,
    proteinGrams: 28,
    carbsGrams: 18,
    fatGrams: 6,
    nutriGrade: 'A',
    servings: 2,
    heroImage: mealSpreadImg,
    description: 'Every Singaporean home favorite: sweet, wholesome broth naturally sweetened by juicy sweet corn, carrots, potatoes, and ripe tomatoes with tender chicken bones.',
    wetMarketTip: 'Ask the poultry stall for fresh chicken carcass or pork soup bones for a clear, sweet soup base.',
    storageTip: 'Great for freezing in meal-prep containers for weekday lunches.',
    ingredients: [
      { id: 'abc-1', name: 'Chicken Soup Bones & Thighs', localName: 'Fresh Soup Bones', amount: 400, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 3.50, shengSiongSGD: 3.00, wetMarketSGD: 2.80 },
      { id: 'abc-2', name: 'Sweet Cameron Corn Cob', localName: 'Jagung Manis', amount: 1, unit: 'cob', category: 'Produce & Herbs', fairpriceSGD: 1.20, shengSiongSGD: 1.00, wetMarketSGD: 0.90 },
      { id: 'abc-3', name: 'Carrots & Russet Potatoes', localName: 'Lobak Merah & Kentang', amount: 250, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 1.10, shengSiongSGD: 0.95, wetMarketSGD: 0.85 },
      { id: 'abc-4', name: 'Ripe Vine Tomatoes', localName: 'Tomat Merah', amount: 2, unit: 'pcs', category: 'Produce & Herbs', fairpriceSGD: 0.90, shengSiongSGD: 0.80, wetMarketSGD: 0.70 }
    ],
    instructions: [
      'Blanch chicken bones in boiling water for 3 minutes to remove impurities, then rinse clean.',
      'In a soup pot, combine 1.5 liters of filtered water with chicken bones, sliced corn chunks, carrots, and potatoes.',
      'Bring to a boil, then reduce heat to gentle simmer for 40 minutes.',
      'Add tomato wedges and a handful of wolfberries (goji berries) in the last 10 minutes. Season with sea salt and white pepper.'
    ]
  },
  {
    id: 'south-indian-dal-tadka',
    title: 'Fragrant Yellow Lentil Dal Tadka with Cumin Tempering',
    vernacularName: 'பருப்பு குழம்பு (Dal Tadka)',
    cuisine: 'Indian',
    tags: ['Vegetarian', 'High Protein', 'HPB Healthier Choice'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    calories: 280,
    proteinGrams: 18,
    carbsGrams: 36,
    fatGrams: 5,
    nutriGrade: 'A',
    servings: 2,
    heroImage: curryChickenImg,
    description: 'Protein-packed yellow toor and masoor lentils cooked silky soft, tempered with sizzling ghee, mustard seeds, cumin, fresh curry leaves, and dried red chilies.',
    wetMarketTip: 'Grab toor dal and fresh curry leaves at Tekka Market spice shops or Mustafa Centre in Little India for premium aroma at low prices.',
    storageTip: 'Reheats wonderfully; add a splash of warm water if it thickens.',
    ingredients: [
      { id: 'dt-1', name: 'Yellow Toor & Moong Lentils', localName: 'Paruppu / Toor Dal', amount: 150, unit: 'g', category: 'Pantry & Sauces', fairpriceSGD: 1.50, shengSiongSGD: 1.30, wetMarketSGD: 1.10 },
      { id: 'dt-2', name: 'Ripe Tomatoes & Onions', localName: 'Bawang Merah & Tomato', amount: 150, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 0.90, shengSiongSGD: 0.80, wetMarketSGD: 0.70 },
      { id: 'dt-3', name: 'Mustard Seeds, Cumin & Turmeric', localName: 'Jitra & Kunyit', amount: 15, unit: 'g', category: 'Spices & Aromatics', fairpriceSGD: 0.60, shengSiongSGD: 0.50, wetMarketSGD: 0.40 },
      { id: 'dt-4', name: 'Pure Cow Ghee', localName: 'Ghee Minyak Sapi', amount: 1, unit: 'tbsp', category: 'Chilled & Dairy', fairpriceSGD: 0.90, shengSiongSGD: 0.85, wetMarketSGD: 0.80 },
      { id: 'dt-5', name: 'Fresh Coriander & Curry Leaves', localName: 'Daun Ketumbar', amount: 30, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 0.60, shengSiongSGD: 0.50, wetMarketSGD: 0.40 }
    ],
    instructions: [
      'Rinse lentils and pressure cook (or boil in pot) with turmeric powder, diced tomatoes, and water until soft and creamy.',
      'Whisk cooked lentils gently to create a rich, comforting consistency.',
      'In a small pan, heat ghee until hot. Add mustard seeds, cumin seeds, dried whole chilies, and curry leaves until they crackle and pop.',
      'Pour sizzling aromatic ghee tempering over the warm dal, stir lightly, and finish with freshly chopped coriander.'
    ]
  },
  {
    id: 'singapore-seafood-hor-fun',
    title: 'Silky Egg Gravy Seafood Hor Fun',
    vernacularName: '滑蛋海鲜河粉',
    cuisine: 'Chinese',
    tags: ['Quick <25m', 'High Protein'],
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    calories: 460,
    proteinGrams: 32,
    carbsGrams: 54,
    fatGrams: 10,
    nutriGrade: 'B',
    servings: 2,
    heroImage: steamedFishImg,
    description: 'Charred flat rice noodles seared with dark soy wok aroma, blanketed with luscious egg-flower broth, plump grey prawns, squid rings, and crunchy choy sum.',
    wetMarketTip: 'Buy fresh flat kway teow noodles without preservatives from wet market noodle stalls rather than refrigerated packs for best wok sear.',
    storageTip: 'Serve immediately with pickled green chilies.',
    ingredients: [
      { id: 'shf-1', name: 'Fresh Flat Rice Noodles', localName: 'Kway Teow (河粉)', amount: 350, unit: 'g', category: 'Pantry & Sauces', fairpriceSGD: 1.40, shengSiongSGD: 1.20, wetMarketSGD: 1.00 },
      { id: 'shf-2', name: 'Fresh Tiger Prawns (Peeled)', localName: 'Udang Segar', amount: 160, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 4.20, shengSiongSGD: 3.80, wetMarketSGD: 3.50 },
      { id: 'shf-3', name: 'Choy Sum Greens', localName: 'Choy Sum (菜心)', amount: 120, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 0.90, shengSiongSGD: 0.80, wetMarketSGD: 0.70 },
      { id: 'shf-4', name: 'Farm Fresh Egg (Beaten)', localName: 'Telur Ayam', amount: 1, unit: 'pc', category: 'Chilled & Dairy', fairpriceSGD: 0.35, shengSiongSGD: 0.30, wetMarketSGD: 0.28 },
      { id: 'shf-5', name: 'Dark Caramel Soy & Oyster Sauce', localName: 'Kicap Pekat', amount: 2, unit: 'tbsp', category: 'Pantry & Sauces', fairpriceSGD: 0.60, shengSiongSGD: 0.50, wetMarketSGD: 0.50 }
    ],
    instructions: [
      'Heat wok until smoking hot with 1 tbsp oil. Unravel kway teow, splash dark soy sauce, and sear noodles undisturbed for 1 minute for smoky wok hei char. Dish onto plates.',
      'In the same wok, bring chicken broth to a gentle simmer with sliced garlic, seafood, and choy sum stems.',
      'Stir in cornstarch slurry until the gravy thickens to a glossy sauce.',
      'Turn off heat, slowly swirl in beaten egg to form delicate silk ribbons, and ladle steaming gravy over charred noodles.'
    ]
  },
  {
    id: 'nasi-lemak-set',
    title: 'Fragrant Coconut Pandan Nasi Lemak with Sambal Tumis',
    vernacularName: 'Nasi Lemak Wangi',
    cuisine: 'Malay',
    tags: ['Kid-Friendly', 'Rice Cooker'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    calories: 590,
    proteinGrams: 28,
    carbsGrams: 64,
    fatGrams: 22,
    nutriGrade: 'C',
    servings: 2,
    heroImage: beefRendangImg,
    description: 'Fluffy rice infused with fresh santan, pandan leaves, and bruised ginger, accompanied by caramelized sweet sambal tumis, crispy anchovies, fried eggs, and toasted peanuts.',
    wetMarketTip: 'Grab Grade A Tanjung Pinang ikan bilis (anchovies) at the wet market; they crisp up golden without being overly salty.',
    storageTip: 'Sambal can be prepared in large batches and kept chilled for 3 weeks.',
    ingredients: [
      { id: 'nl-1', name: 'Jasmine Rice & Coconut Milk', localName: 'Beras & Santan', amount: 200, unit: 'g', category: 'Pantry & Sauces', fairpriceSGD: 1.80, shengSiongSGD: 1.60, wetMarketSGD: 1.40 },
      { id: 'nl-2', name: 'Crispy Ikan Bilis & Peanuts', localName: 'Ikan Bilis & Kacang', amount: 80, unit: 'g', category: 'Meat & Seafood', fairpriceSGD: 1.60, shengSiongSGD: 1.40, wetMarketSGD: 1.20 },
      { id: 'nl-3', name: 'Eggs (Sunny Side Up)', localName: 'Telur Goreng', amount: 2, unit: 'pcs', category: 'Chilled & Dairy', fairpriceSGD: 0.70, shengSiongSGD: 0.60, wetMarketSGD: 0.56 },
      { id: 'nl-4', name: 'Sweet Sambal Tumis Paste', localName: 'Sambal Nasi Lemak', amount: 3, unit: 'tbsp', category: 'Pantry & Sauces', fairpriceSGD: 1.10, shengSiongSGD: 1.00, wetMarketSGD: 0.90 },
      { id: 'nl-5', name: 'Cucumber & Pandan Leaves', localName: 'Timun & Pandan', amount: 80, unit: 'g', category: 'Produce & Herbs', fairpriceSGD: 0.60, shengSiongSGD: 0.50, wetMarketSGD: 0.40 }
    ],
    instructions: [
      'In a rice cooker, rinse jasmine rice, add coconut milk, water, knotted pandan leaves, bruised ginger, and salt. Cook until fragrant.',
      'Shallow fry ikan bilis and raw peanuts until golden and crunchy. Drain on paper towels.',
      'Fry eggs with crispy lacy edges in hot oil.',
      'Plate warm coconut rice alongside fiery sweet sambal, crispy ikan bilis, peanuts, cucumber slices, and fried egg.'
    ]
  }
];

export const CUISINES: Cuisine[] = ['Chinese', 'Malay', 'Indian', 'Peranakan', 'Fusion'];

export const DIETARY_TAGS: DietaryTag[] = [
  'HPB Healthier Choice',
  'Quick <25m',
  'One-Pot',
  'Rice Cooker',
  'Halal-friendly',
  'Vegetarian',
  'Kid-Friendly',
  'High Protein'
];
