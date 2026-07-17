-- ============================================================
-- THE CASKET — whisky catalogue expansion 2
-- Adds: Jim Beam variants, Jack Daniel's variants, Sandy Mac,
--       Johnnie Walker Game of Thrones editions,
--       expanded Japanese whiskies
-- Run in Supabase SQL Editor after seed_expansion.sql
-- ============================================================

INSERT INTO whiskies (name, distillery, region, country, style, age, abv, description) VALUES

  -- ----------------------------------------------------------------
  -- JIM BEAM — core and flavoured range
  -- ----------------------------------------------------------------
  ('Jim Beam White Label',        'Jim Beam', 'Kentucky', 'USA', 'Bourbon',          NULL, 40.0, 'The classic. Caramel, vanilla, and light oak. The world''s best-selling bourbon, aged 4 years.'),
  ('Jim Beam Black',              'Jim Beam', 'Kentucky', 'USA', 'Bourbon',             8, 43.0, 'Extra-aged for 8 years. Richer caramel, toasted oak, and dried fruit with a longer finish.'),
  ('Jim Beam Double Oak',         'Jim Beam', 'Kentucky', 'USA', 'Bourbon',          NULL, 43.0, 'Twice-barrelled for extra oak depth. Vanilla, caramel, and a pronounced woody spice.'),
  ('Jim Beam Devil''s Cut',       'Jim Beam', 'Kentucky', 'USA', 'Bourbon',          NULL, 45.0, 'Uses bourbon extracted from the barrel staves. Bold, intense oak, tobacco, and dark caramel.'),
  ('Jim Beam Bonded',             'Jim Beam', 'Kentucky', 'USA', 'Bourbon',             4, 50.0, 'Bottled-in-bond: 100 proof, 4 years, single distillery. Spicier and fuller than the standard expression.'),
  ('Jim Beam Signature Craft 12', 'Jim Beam', 'Kentucky', 'USA', 'Bourbon',            12, 43.0, 'Twelve-year aged expression. Buttery toffee, dried fruit, and a complex spiced oak finish.'),
  ('Jim Beam Honey',              'Jim Beam', 'Kentucky', 'USA', 'Flavored Bourbon', NULL, 32.5, 'Jim Beam bourbon blended with natural honey. Sweet, smooth, and easy-drinking over ice or mixed.'),
  ('Jim Beam Apple',              'Jim Beam', 'Kentucky', 'USA', 'Flavored Bourbon', NULL, 32.5, 'Crisp green apple flavour blended with Jim Beam bourbon. Refreshing and sweet.'),
  ('Jim Beam Vanilla',            'Jim Beam', 'Kentucky', 'USA', 'Flavored Bourbon', NULL, 32.5, 'Creamy vanilla liqueur on a bourbon base. Sweet and dessert-like.'),
  ('Jim Beam Kentucky Fire',      'Jim Beam', 'Kentucky', 'USA', 'Flavored Bourbon', NULL, 32.5, 'Cinnamon spice liqueur on a bourbon base. Sweet heat reminiscent of cinnamon candy.'),
  ('Jim Beam Peach',              'Jim Beam', 'Kentucky', 'USA', 'Flavored Bourbon', NULL, 32.5, 'Ripe peach flavour blended with Kentucky straight bourbon. Summery and fruity.'),

  -- ----------------------------------------------------------------
  -- JACK DANIEL'S — core and flavoured range
  -- Note: Jack Daniel's is Tennessee Whiskey, not legally bourbon,
  -- due to the Lincoln County Process (charcoal mellowing).
  -- ----------------------------------------------------------------
  ('Jack Daniel''s Old No. 7',          'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey', NULL, 40.0, 'The original. Charcoal-mellowed, with vanilla, caramel, and a signature banana-and-oak character.'),
  ('Jack Daniel''s Gentleman Jack',     'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey', NULL, 40.0, 'Double-mellowed through charcoal. Smoother and more refined: honey, toasted oak, and light fruit.'),
  ('Jack Daniel''s Single Barrel Select','Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey', NULL, 47.0, 'Each bottle from a single hand-selected barrel. Rich caramel, toasted nuts, and complex oak spice.'),
  ('Jack Daniel''s Single Barrel Barrel Proof', 'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey', NULL, 62.5, 'Uncut and unfiltered from a single barrel. Intense and bold — exact ABV varies by barrel.'),
  ('Jack Daniel''s Tennessee Rye',      'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Rye',     NULL, 45.0, 'A Tennessee-style rye. Spicy pepper and rye grain, softened by the Lincoln County charcoal process.'),
  ('Jack Daniel''s Bonded',             'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey',    4, 50.0, 'Bottled-in-bond at 100 proof. Bold and structured, with a firm oak backbone and clean vanilla.'),
  ('Jack Daniel''s No. 27 Gold',        'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey', NULL, 40.0, 'Matured in Tennessee whiskey barrels then finished in maple wood barrels. Unusually smooth and sweet.'),
  ('Jack Daniel''s Sinatra Select',     'Jack Daniel''s', 'Tennessee', 'USA', 'Tennessee Whiskey', NULL, 45.0, 'Aged in special ''Sinatra barrels'' with deep grooves to increase wood contact. Rich, oaky, and smooth.'),
  ('Jack Daniel''s Tennessee Fire',     'Jack Daniel''s', 'Tennessee', 'USA', 'Flavored Tennessee Whiskey', NULL, 35.0, 'Cinnamon-spiced liqueur on a Jack Daniel''s base. Sweet, warming, and popular as a shot.'),
  ('Jack Daniel''s Tennessee Honey',    'Jack Daniel''s', 'Tennessee', 'USA', 'Flavored Tennessee Whiskey', NULL, 35.0, 'Jack Daniel''s blended with honey liqueur. Smooth, sweet, and approachable over ice or mixed.'),
  ('Jack Daniel''s Tennessee Apple',    'Jack Daniel''s', 'Tennessee', 'USA', 'Flavored Tennessee Whiskey', NULL, 35.0, 'Crisp green apple flavour layered over the classic Jack Daniel''s Tennessee Whiskey base.'),

  -- ----------------------------------------------------------------
  -- SANDY MAC
  -- ----------------------------------------------------------------
  ('Sandy Mac',  'Sandy Mac', NULL, 'Scotland', 'Blended', NULL, 40.0, 'A popular budget blended Scotch widely available in Uruguay and Argentina. Light, smooth, and affordable — a bar staple across the Río de la Plata.'),

  -- ----------------------------------------------------------------
  -- JOHNNIE WALKER — Game of Thrones & special editions
  -- ----------------------------------------------------------------
  ('Johnnie Walker White Walker',    'Johnnie Walker', NULL, 'Scotland', 'Blended', NULL, 41.7, 'The original Game of Thrones collaboration. Inspired by the White Walkers — cold-activated label reveals hidden text when frozen. Crisp orchard fruit, vanilla, and notes of caramelised sugar.'),
  ('Johnnie Walker A Song of Ice',   'Johnnie Walker', NULL, 'Scotland', 'Blended', NULL, 40.2, 'Inspired by the Wall and the Night''s Watch. Pale and delicate: citrus blossom, green apple, and a cool, clean finish.'),
  ('Johnnie Walker A Song of Fire',  'Johnnie Walker', NULL, 'Scotland', 'Blended', NULL, 40.8, 'Inspired by the dragon fire of House Targaryen. Warm and spicy: dark fruit, smoky wood, and a long, fiery finish.'),

  -- Game of Thrones single malt releases (Diageo x HBO, same campaign)
  ('Lagavulin 9 House Lannister',              'Lagavulin',         'Islay',    'Scotland', 'Single Malt',  9, 46.0, 'A 9-year Lagavulin released as part of the Game of Thrones collection for House Lannister. Intense peat, dark fruit, and a rich, smoky finish.'),
  ('Clynelish Reserve House Stark',            'Clynelish',         'Highlands','Scotland', 'Single Malt', NULL, 51.2, 'A coastal Highland expression honouring House Stark. Waxy, coastal, with orchard fruit and a touch of brine.'),
  ('Cardhu Gold Reserve House Targaryen',      'Cardhu',            'Speyside', 'Scotland', 'Single Malt', NULL, 40.0, 'A Speyside expression for House Targaryen. Sweet and fruity — red apple, toffee, and vanilla.'),
  ('Oban Bay Reserve Night''s Watch',          'Oban',              'Highlands','Scotland', 'Single Malt', NULL, 43.0, 'A special NAS Oban for the Night''s Watch. Fruity, coastal, and warming — classic Oban character in a limited release.'),
  ('Talisker Select Reserve House Greyjoy',    'Talisker',          'Islands',  'Scotland', 'Single Malt', NULL, 45.8, 'Talisker''s entry in the GoT collection for House Greyjoy. Maritime and smoky: sea salt, black pepper, and smoked meat.'),
  ('Dalwhinnie Winter''s Frost House Mormont', 'Dalwhinnie',        'Highlands','Scotland', 'Single Malt', NULL, 43.0, 'A Highland expression for House Mormont. Soft and honeyed with heather and light fruit. Approachable winter warmth.'),
  ('Royal Lochnagar House Baratheon',          'Royal Lochnagar',   'Highlands','Scotland', 'Single Malt', NULL, 40.0, 'A royal Highland malt for House Baratheon. Rich toffee, dried fruit, and a warming oak finish.'),

  -- ----------------------------------------------------------------
  -- JAPANESE WHISKIES — expanded range
  -- ----------------------------------------------------------------

  -- Suntory
  ('Yamazaki Distiller''s Reserve', 'Suntory', NULL, 'Japan', 'Single Malt', NULL, 43.0, 'A no-age-statement Yamazaki blending multiple cask types. Stone fruit, vanilla, and Mizunara oak with a complex, layered character.'),
  ('Yamazaki 18',                   'Suntory', NULL, 'Japan', 'Single Malt',   18, 43.0, 'A benchmark Japanese single malt. Deep and rich: dried mango, plum, coconut, and an exceptionally long Mizunara oak finish.'),
  ('Hakushu Distiller''s Reserve',  'Suntory', NULL, 'Japan', 'Single Malt', NULL, 43.0, 'NAS expression from Suntory''s mountain distillery. Fresh and herbaceous: green apple, basil, and soft peat smoke.'),
  ('Hakushu 18',                    'Suntory', NULL, 'Japan', 'Single Malt',   18, 43.0, 'The premium expression of Hakushu. Elegant herbal complexity with aged oak depth, mint, and a delicate peaty finish.'),
  ('Hibiki 21',                     'Suntory', NULL, 'Japan', 'Blended',        21, 43.0, 'One of the world''s most celebrated blends. Rose, sandalwood, and layered oak from five different cask types including Mizunara.'),
  ('Suntory Toki',                  'Suntory', NULL, 'Japan', 'Blended',      NULL, 43.0, 'A lighter, modern blend designed for highballs. Honeydew melon, green apple, and a subtle spiced finish. Great as a serve.'),

  -- Nikka
  ('Nikka Yoichi Single Malt',      'Nikka',   NULL, 'Japan', 'Single Malt', NULL, 45.0, 'From Nikka''s coastal Yoichi distillery in Hokkaido. Robust and peaty: smoked fruit, briny sea air, and rich malt.'),
  ('Nikka Miyagikyo Single Malt',   'Nikka',   NULL, 'Japan', 'Single Malt', NULL, 45.0, 'From Nikka''s mountain valley distillery in Sendai. Light and elegant: pear, apricot, and a gentle floral character.'),
  ('Nikka Coffey Malt',             'Nikka',   NULL, 'Japan', 'Malt',        NULL, 45.0, 'Made on a continuous Coffey still using malted barley. Unusually rich for grain: tropical fruit, vanilla, and creamy malt.'),
  ('Nikka Pure Malt Black',         'Nikka',   NULL, 'Japan', 'Blended Malt',NULL, 43.0, 'A vatted malt from both Yoichi and Miyagikyo. Robust and smoky with peated fruit and dried oak spice.'),
  ('Nikka Pure Malt Red',           'Nikka',   NULL, 'Japan', 'Blended Malt',NULL, 43.0, 'Sherry-cask-forward blend of Yoichi and Miyagikyo malts. Rich dried fruit, Christmas cake, and spiced oak.'),
  ('Nikka Pure Malt White',         'Nikka',   NULL, 'Japan', 'Blended Malt',NULL, 43.0, 'The lightest of the Nikka Pure Malt trio. Floral, fruity, and delicate — a gentle introduction to Japanese blended malts.'),
  ('Nikka Days',                    'Nikka',   NULL, 'Japan', 'Blended',     NULL, 40.0, 'Nikka''s entry-level blend, designed for everyday drinking. Smooth and accessible: light malt, orchard fruit, and vanilla.'),
  ('Nikka Session',                 'Nikka',   NULL, 'Japan', 'Blended Malt',NULL, 43.0, 'A blended malt that includes Scottish malts alongside Yoichi and Miyagikyo. Fruity, smoky, and complex.'),

  -- Other Japanese
  ('Ichiro''s Malt and Grain',      'Chichibu', NULL, 'Japan', 'Blended',    NULL, 46.5, 'World blended whisky from the acclaimed Chichibu distillery. Tropical fruit, vanilla, and a seamless, complex finish.'),
  ('Mars Iwai',                     'Mars',     NULL, 'Japan', 'Blended',    NULL, 40.0, 'From Hombo Shuzo''s high-altitude distillery in Shinshu. Smooth and mellow: vanilla, cereal, and light caramel. Great value.'),
  ('Mars Shinshu Distiller''s Reserve', 'Mars', NULL, 'Japan', 'Single Malt',NULL, 48.0, 'Single malt from Japan''s highest whisky distillery at 798m. Clean, fresh mountain character with green apple and gentle oak.'),
  ('Akashi White Oak Single Malt',  'White Oak', NULL, 'Japan', 'Single Malt',NULL, 46.0, 'From Eigashima Shuzo, Japan''s oldest whisky licence holder. Fruity and delicate with hints of fresh melon and light spice.'),
  ('Togouchi 9',                    'Chugoku Jozo', NULL, 'Japan', 'Blended', 9, 40.0, 'Aged in a railway tunnel in the mountains of Hiroshima. Smooth and honeyed with vanilla, dried fruit, and a mellow finish.'),
  ('Togouchi 18',                   'Chugoku Jozo', NULL, 'Japan', 'Blended',18, 40.0, 'The premium tunnel-aged expression. Richer and more complex: dark toffee, dried apricot, and layered woody spice.'),
  ('Fuji Sanroku Signature Blend',  'Kirin',    NULL, 'Japan', 'Blended',    NULL, 50.0, 'Bottled at a punchy 50% ABV, unusual for a Japanese blend. Caramel, vanilla, and grain sweetness with a warming finish.'),
  ('Nikka Taketsuru Pure Malt',     'Nikka',    NULL, 'Japan', 'Blended Malt',NULL, 43.0, 'Named after Nikka''s founder Masataka Taketsuru. A classic vatted malt balancing Yoichi''s peatiness with Miyagikyo''s elegance.');
