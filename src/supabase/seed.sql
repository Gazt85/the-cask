-- ============================================================
-- THE CASKET — seed data for the whiskies catalogue
-- Run this in Supabase SQL Editor after the initial migration
-- ============================================================

INSERT INTO whiskies (name, distillery, region, country, style, age, abv, description) VALUES
  -- Scottish Single Malts
  ('Glenfiddich 12', 'Glenfiddich', 'Speyside', 'Scotland', 'Single Malt', 12, 40.0, 'Fresh pear, subtle oak, and butterscotch. A great entry-level Speyside.'),
  ('Glenfiddich 18', 'Glenfiddich', 'Speyside', 'Scotland', 'Single Malt', 18, 40.0, 'Rich oak, baked apple, and dried fruit with a long, warm finish.'),
  ('The Macallan 12 Sherry Oak', 'The Macallan', 'Speyside', 'Scotland', 'Single Malt', 12, 40.0, 'Rich dried fruit, sherry sweetness, and wood spice. A sherry cask benchmark.'),
  ('The Macallan 18 Sherry Oak', 'The Macallan', 'Speyside', 'Scotland', 'Single Malt', 18, 43.0, 'Complex dried fruits, ginger, chocolate, and cinnamon.'),
  ('Lagavulin 16', 'Lagavulin', 'Islay', 'Scotland', 'Single Malt', 16, 43.0, 'Intense peat smoke, sea salt, and rich sweetness. An Islay classic.'),
  ('Laphroaig 10', 'Laphroaig', 'Islay', 'Scotland', 'Single Malt', 10, 40.0, 'Bold peat, medicinal iodine, seaweed, and a surprising sweetness.'),
  ('Ardbeg 10', 'Ardbeg', 'Islay', 'Scotland', 'Single Malt', 10, 46.0, 'Smoky, citrus, and espresso with a long, peaty finish. Non-chill filtered.'),
  ('Talisker 10', 'Talisker', 'Islands', 'Scotland', 'Single Malt', 10, 45.8, 'Sea salt, black pepper, and smoky sweetness from the Isle of Skye.'),
  ('Highland Park 12', 'Highland Park', 'Islands', 'Scotland', 'Single Malt', 12, 40.0, 'Heather honey, peat smoke, and dried orange. Balanced and versatile.'),
  ('The Glenlivet 12', 'The Glenlivet', 'Speyside', 'Scotland', 'Single Malt', 12, 40.0, 'Tropical fruit, vanilla, and a creamy, smooth texture.'),
  ('Oban 14', 'Oban', 'Highlands', 'Scotland', 'Single Malt', 14, 43.0, 'Sea breeze, honey, and citrus. A bridge between Highland and Island styles.'),
  ('The Dalmore 12', 'The Dalmore', 'Highlands', 'Scotland', 'Single Malt', 12, 40.0, 'Orange marmalade, chocolate, and spice. Sherry cask finished.'),
  ('Aberlour 12', 'Aberlour', 'Speyside', 'Scotland', 'Single Malt', 12, 40.0, 'Rich toffee, double cask matured with sherry and bourbon influences.'),
  ('The Balvenie 12 DoubleWood', 'The Balvenie', 'Speyside', 'Scotland', 'Single Malt', 12, 40.0, 'Smooth honey, vanilla, and sherry-cask sweetness. Approachable and elegant.'),
  ('Springbank 10', 'Springbank', 'Campbeltown', 'Scotland', 'Single Malt', 10, 46.0, 'Complex malt with pear, brine, and light peat. Campbeltown character.'),

  -- Scottish Blended
  ('Johnnie Walker Black Label', 'Johnnie Walker', NULL, 'Scotland', 'Blended', 12, 40.0, 'Smoky, fruity, and vanilla. The world''s best-selling premium Scotch.'),
  ('Johnnie Walker Red Label', 'Johnnie Walker', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Spicy, vibrant blend. Hugely popular in South America.'),
  ('Monkey Shoulder', 'William Grant & Sons', 'Speyside', 'Scotland', 'Blended Malt', NULL, 40.0, 'Smooth, vanilla, and orange zest. Triple malt, great for cocktails.'),
  ('Chivas Regal 12', 'Chivas Brothers', 'Speyside', 'Scotland', 'Blended', 12, 40.0, 'Honey, vanilla, and ripe apple. Smooth and generous.'),
  ('J&B Rare', 'Justerini & Brooks', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Light, smooth, and delicate. A Uruguayan bar staple.'),

  -- Bourbon
  ('Maker''s Mark', 'Maker''s Mark', NULL, 'USA', 'Bourbon', NULL, 45.0, 'Soft wheat, caramel, and vanilla. Hand-dipped in red wax.'),
  ('Buffalo Trace', 'Buffalo Trace', NULL, 'USA', 'Bourbon', NULL, 45.0, 'Toffee, brown sugar, and mint. Excellent value Kentucky bourbon.'),
  ('Woodford Reserve', 'Woodford Reserve', NULL, 'USA', 'Bourbon', NULL, 45.2, 'Rich and complex: dried fruit, vanilla, and toasted oak.'),
  ('Wild Turkey 101', 'Wild Turkey', NULL, 'USA', 'Bourbon', NULL, 50.5, 'Bold and spicy: caramel, cinnamon, and charred oak. High proof.'),
  ('Bulleit Bourbon', 'Bulleit', NULL, 'USA', 'Bourbon', NULL, 45.0, 'High rye content gives it a bold, spicy character with maple and oak.'),
  ('Four Roses Single Barrel', 'Four Roses', NULL, 'USA', 'Bourbon', NULL, 50.0, 'Ripe plum, cocoa, and maple syrup. Full-bodied single barrel.'),
  ('Knob Creek 9', 'Knob Creek', NULL, 'USA', 'Bourbon', 9, 50.0, 'Rich caramel, toasted nuts, and a long, warming finish.'),
  ('Elijah Craig Small Batch', 'Elijah Craig', NULL, 'USA', 'Bourbon', NULL, 47.0, 'Vanilla, caramel, and charred oak. Named after a bourbon pioneer.'),

  -- Irish
  ('Jameson', 'Jameson', NULL, 'Ireland', 'Blended', NULL, 40.0, 'Smooth, light pot still character with vanilla and toasted wood.'),
  ('Redbreast 12', 'Redbreast', NULL, 'Ireland', 'Single Pot Still', 12, 40.0, 'Rich pot still: sherry, dried fruit, and toasted oak. World-class Irish.'),
  ('Green Spot', 'Mitchell & Son', NULL, 'Ireland', 'Single Pot Still', NULL, 40.0, 'Crisp orchard fruit, toasted oak, and barley. A Dublin classic.'),
  ('Tullamore D.E.W.', 'Tullamore D.E.W.', NULL, 'Ireland', 'Blended', NULL, 40.0, 'Gentle grain, malt, and pot still triple blend. Smooth and approachable.'),

  -- Japanese
  ('Hibiki Japanese Harmony', 'Suntory', NULL, 'Japan', 'Blended', NULL, 43.0, 'Rose, lychee, and honey with a subtle Mizunara oak influence.'),
  ('Yamazaki 12', 'Suntory', NULL, 'Japan', 'Single Malt', 12, 43.0, 'Peach, pineapple, and Mizunara oak spice. Japan''s first single malt.'),
  ('Nikka From The Barrel', 'Nikka', NULL, 'Japan', 'Blended', NULL, 51.4, 'Intense fruit, spice, and vanilla at cask strength. Cult favourite.'),
  ('Nikka Coffey Grain', 'Nikka', NULL, 'Japan', 'Grain', NULL, 45.0, 'Bourbon-like sweetness: corn, vanilla, and tropical fruit.'),
  ('Hakushu 12', 'Suntory', NULL, 'Japan', 'Single Malt', 12, 43.0, 'Fresh and herbal: green apple, mint, and gentle smoke.'),

  -- Rye
  ('Rittenhouse Rye', 'Rittenhouse', NULL, 'USA', 'Rye', NULL, 50.0, 'Spicy rye, caramel, and fruit. A bartender favourite for cocktails.'),
  ('Bulleit Rye', 'Bulleit', NULL, 'USA', 'Rye', NULL, 45.0, 'Cherry, vanilla, and spice. High rye mashbill with a clean finish.');
