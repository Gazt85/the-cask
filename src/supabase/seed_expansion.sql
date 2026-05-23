-- ============================================================
-- THE CASKET — whisky catalogue expansion
-- Adds: JW variants, Jameson variants, popular LATAM brands,
--       regional/local brands (Criadores, etc.)
-- Run in Supabase SQL Editor after seed.sql
-- ============================================================

INSERT INTO whiskies (name, distillery, region, country, style, age, abv, description) VALUES

  -- ----------------------------------------------------------------
  -- JOHNNIE WALKER — additional variants
  -- ----------------------------------------------------------------
  ('Johnnie Walker Double Black',       'Johnnie Walker', NULL, 'Scotland', 'Blended',      NULL, 40.0, 'A bolder, smokier take on Black Label. Peat-forward with dark fruit and deep, smoky warmth.'),
  ('Johnnie Walker Green Label',        'Johnnie Walker', NULL, 'Scotland', 'Blended Malt',   15, 43.0, 'Four single malt whiskies blended together. Grassy, floral, and gently spicy with good complexity.'),
  ('Johnnie Walker Gold Label Reserve', 'Johnnie Walker', NULL, 'Scotland', 'Blended',      NULL, 40.0, 'Honey, vanilla, and sandalwood. Inspired by the Walker family''s legendary 1920s centenary blend.'),
  ('Johnnie Walker Blue Label',         'Johnnie Walker', NULL, 'Scotland', 'Blended',      NULL, 40.0, 'Ultra-premium blend of rare whiskies. Dark dried fruit, silky smoke, and a long, luxurious finish.'),
  ('Johnnie Walker XR 21',              'Johnnie Walker', NULL, 'Scotland', 'Blended',        21, 40.0, 'Butterscotch, dark chocolate, and dried plum. A prestige expression with real age.'),
  ('Johnnie Walker Swing',              'Johnnie Walker', NULL, 'Scotland', 'Blended',      NULL, 43.0, 'Rich fruit, candied orange, and gentle smoke. Named for its distinctive rounded bottle.'),

  -- ----------------------------------------------------------------
  -- JAMESON — additional variants
  -- ----------------------------------------------------------------
  ('Jameson Black Barrel',              'Jameson', NULL, 'Ireland', 'Blended',         NULL, 40.0, 'Pot still character deepened by double-charred bourbon barrels. Vanilla, toasted wood, and sweet spice.'),
  ('Jameson Caskmates Stout Edition',   'Jameson', NULL, 'Ireland', 'Blended',         NULL, 40.0, 'Finished in craft stout-seasoned casks. Cocoa, roasted coffee, and hops layered over the classic Jameson base.'),
  ('Jameson Caskmates IPA Edition',     'Jameson', NULL, 'Ireland', 'Blended',         NULL, 40.0, 'Finished in IPA-seasoned casks. Citrus, floral hops, and herbal notes over the smooth triple-distilled base.'),
  ('Jameson Cold Brew',                 'Jameson', NULL, 'Ireland', 'Blended',         NULL, 30.0, 'Triple-distilled Jameson blended with cold brew coffee. Smooth, bittersweet, and easy-drinking.'),
  ('Jameson 18 Bow Street',             'Jameson', NULL, 'Ireland', 'Single Pot Still',  18, 46.0, 'Bottled at the historic Bow Street Distillery. Rich pot still character, sherry sweetness, and dark fruits. Non-chill filtered.'),

  -- ----------------------------------------------------------------
  -- OLD PARR — iconic in Uruguay and Colombia
  -- ----------------------------------------------------------------
  ('Old Parr 12',  'Old Parr', NULL, 'Scotland', 'Blended', 12, 40.0, 'Rich and full-bodied: dried fruit, sherry, and gentle smoke. An institution in Uruguayan and Colombian bars.'),
  ('Old Parr 18',  'Old Parr', NULL, 'Scotland', 'Blended', 18, 40.0, 'A step up in luxury: dark fruit compote, toffee, and subtle oak. Complex and satisfying finish.'),

  -- ----------------------------------------------------------------
  -- BALLANTINE'S
  -- ----------------------------------------------------------------
  ('Ballantine''s Finest', 'Ballantine''s', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Smooth, round, and approachable. Honey, vanilla, and creamy malt. The entry-level expression of the range.'),
  ('Ballantine''s 12',     'Ballantine''s', NULL, 'Scotland', 'Blended',   12, 40.0, 'Elegant and balanced: cereal sweetness, butterscotch, and a hint of vanilla.'),
  ('Ballantine''s 17',     'Ballantine''s', NULL, 'Scotland', 'Blended',   17, 43.0, 'Rich and complex: dried fruit, toasted oak, and a long, satisfying finish.'),
  ('Ballantine''s 21',     'Ballantine''s', NULL, 'Scotland', 'Blended',   21, 40.0, 'Silky and luxurious: dark chocolate, rose, and layered wood spice. A special occasion dram.'),

  -- ----------------------------------------------------------------
  -- THE FAMOUS GROUSE
  -- ----------------------------------------------------------------
  ('The Famous Grouse', 'The Famous Grouse', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Scotland''s best-selling blend. Smooth, rounded, and reliably good. Fruity, malty, and well-balanced.'),
  ('The Black Grouse',  'The Famous Grouse', NULL, 'Scotland', 'Blended', NULL, 40.0, 'A smokier sibling of The Famous Grouse. Peat-forward with richer, darker fruit and a warming finish.'),

  -- ----------------------------------------------------------------
  -- WILLIAM LAWSON'S — hugely popular across South America
  -- ----------------------------------------------------------------
  ('William Lawson''s Finest', 'William Lawson''s', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Light, fresh, and approachable. Great value and one of the most popular blended Scotches in South America.'),
  ('William Lawson''s 13',     'William Lawson''s', NULL, 'Scotland', 'Blended',   13, 40.0, 'More body and complexity than the standard Finest. Caramel, cereal, and a gentle spiced finish.'),

  -- ----------------------------------------------------------------
  -- LABEL 5 — common supermarket staple in Uruguay
  -- ----------------------------------------------------------------
  ('Label 5 Classic Black',      'Label 5', NULL, 'Scotland', 'Blended',  NULL, 40.0, 'Light and easy-drinking. A very common and affordable supermarket staple in Uruguay.'),
  ('Label 5 Extra Quality 12',   'Label 5', NULL, 'Scotland', 'Blended',    12, 40.0, 'A step up: more cereal character, round sweetness, and a smooth finish.'),

  -- ----------------------------------------------------------------
  -- BLACK & WHITE — strong legacy in Argentina
  -- ----------------------------------------------------------------
  ('Black & White', 'Buchanan''s', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Light, delicate, and very approachable. Subtle smoke and vanilla. An Argentine classic with a long local history.'),

  -- ----------------------------------------------------------------
  -- BUCHANAN'S — growing in Argentina and Uruguay
  -- ----------------------------------------------------------------
  ('Buchanan''s Deluxe 12', 'Buchanan''s', NULL, 'Scotland', 'Blended', 12, 40.0, 'Smooth and slightly fruity: pear, honey, and a gentle vanilla finish. Very popular in Latin America.'),
  ('Buchanan''s Special Reserve 18', 'Buchanan''s', NULL, 'Scotland', 'Blended', 18, 40.0, 'Elegant and full: dried fruit, oak, and a long, warming finish. A prestige Buchanan''s expression.'),

  -- ----------------------------------------------------------------
  -- GRANT'S
  -- ----------------------------------------------------------------
  ('Grant''s Family Reserve',   'William Grant & Sons', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Triple wood matured: light and sweet with cereal and vanilla notes. An approachable everyday blend.'),
  ('Grant''s Triple Wood 12',   'William Grant & Sons', NULL, 'Scotland', 'Blended',   12, 40.0, 'Aged 12 years across three cask types. Richer and more complex than Family Reserve, with nutty oak.'),

  -- ----------------------------------------------------------------
  -- DEWAR'S
  -- ----------------------------------------------------------------
  ('Dewar''s White Label',       'Dewar''s', NULL, 'Scotland', 'Blended', NULL, 40.0, 'Smooth and honey-sweet. Double-aged for extra softness. A reliable everyday Scotch.'),
  ('Dewar''s 12 The Ancestor',   'Dewar''s', NULL, 'Scotland', 'Blended',   12, 40.0, 'Double aged in sherry and bourbon casks. Honey, dried apricot, and smooth oak.'),

  -- ----------------------------------------------------------------
  -- OTHER POPULAR LATAM BRANDS
  -- ----------------------------------------------------------------
  ('Teacher''s Highland Cream',  'Teacher''s',         NULL,       'Scotland', 'Blended', NULL, 40.0, 'High malt content gives a noticeably richer character. Malty, slightly smoky, and warming.'),
  ('Passport Scotch',            'Chivas Brothers',    NULL,       'Scotland', 'Blended', NULL, 40.0, 'Light-bodied and easy to drink. Very popular in Latin American on-trade and off-trade.'),
  ('White Horse',                'White Horse',        NULL,       'Scotland', 'Blended', NULL, 40.0, 'Anchored by Lagavulin malt, giving it a distinct peaty edge. Widely available across South America.'),
  ('Clan Campbell',              'Clan Campbell',      NULL,       'Scotland', 'Blended', NULL, 40.0, 'Light and smooth with subtle floral notes. Widely distributed in Argentina and Uruguay.'),
  ('Something Special',          'Seagram''s',         NULL,       'Scotland', 'Blended', NULL, 40.0, 'Sweet, soft, and smooth. A Uruguayan everyday Scotch with a long-standing local following.'),
  ('100 Pipers',                 'Seagram''s',         NULL,       'Scotland', 'Blended', NULL, 40.0, 'Light and easy-drinking. A favourite in Argentine bars and restaurants.'),
  ('Old Smuggler',               'Old Smuggler',       NULL,       'Scotland', 'Blended', NULL, 40.0, 'A classic blended Scotch with deep roots in Argentina. Smooth, light, and widely affordable.'),
  ('Dimple 12',                  'Haig',               NULL,       'Scotland', 'Blended',   12, 40.0, 'Recognisable by its distinctive pinch bottle. Light floral notes, honey, and a mellow finish.'),
  ('Chivas Regal 15 The Icon',   'Chivas Brothers',    'Speyside', 'Scotland', 'Blended',   15, 40.0, 'Smooth and generous: dark fruit, hazelnuts, and creamy vanilla. A step above the 12.'),
  ('Chivas Regal 18',            'Chivas Brothers',    'Speyside', 'Scotland', 'Blended',   18, 40.0, 'Rich gold: dried fruit, dark chocolate, and toasted hazelnut. An elegant prestige expression.'),

  -- ----------------------------------------------------------------
  -- REGIONAL / LOCAL
  -- ----------------------------------------------------------------
  ('Criadores',                  'Criadores',          NULL, 'Argentina', 'Blended', NULL, 40.0, 'Argentina''s own blended whisky. Smooth and light, crafted locally for the South American palate. An accessible everyday dram.'),
  ('Old Smuggler Destilado',     'Old Smuggler',       NULL, 'Argentina', 'Blended', NULL, 40.0, 'Locally produced variant of Old Smuggler, widely available in Argentine supermarkets at accessible price points.');
