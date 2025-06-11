export interface EnchantmentInfo {
  name: string;
  level: number;
}

export function parseItemStack(itemString: string): { raw: string, item: string, count: number, enchants: EnchantmentInfo[] } {
    let raw = "unknown_item";
    let item = "Unknown Item";
    let count = 0;
    let enchants: EnchantmentInfo[] = [];

    console.log(itemString);
    
    // Match pattern: ItemStack{ITEM_NAME x NUMBER}
    const regex = /ItemStack\{([A-Z0-9_]+) x (\d+)(?:,.*?)?\}/;
    const match = itemString.match(regex);

    const enchantRegex = /Minecraft:\{([A-Z_]+) x (\d+)(?:,.*?)?\}/;
    
    if (match && match.length >= 3) {
      const toSplit = match[1].split('_');
      
      raw = toSplit.join('_').toLowerCase();
      
      item = toSplit
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      count = parseInt(match[2], 10);
    }

    const enchantmentRegex = /minecraft:([a-z_]+)=(\d+)/g;
    let enchantMatch;

    while ((enchantMatch = enchantmentRegex.exec(itemString)) !== null) {
      if (enchantMatch && enchantMatch.length >= 3) {
        const enchantName = enchantMatch[1];
        const enchantLevel = parseInt(enchantMatch[2], 10);
        
        const formattedName = enchantName.split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        enchants.push({
          name: formattedName,
          level: enchantLevel
        });
      }
    }
  
  return { raw, item, count, enchants };
}

export const Tools = [
  // Basic tools
  "wooden_sword", "wooden_pickaxe", "wooden_axe", "wooden_shovel", "wooden_hoe",
  "stone_sword", "stone_pickaxe", "stone_axe", "stone_shovel", "stone_hoe",
  "iron_sword", "iron_pickaxe", "iron_axe", "iron_shovel", "iron_hoe",
  "golden_sword", "golden_pickaxe", "golden_axe", "golden_shovel", "golden_hoe",
  "diamond_sword", "diamond_pickaxe", "diamond_axe", "diamond_shovel", "diamond_hoe",
  "netherite_sword", "netherite_pickaxe", "netherite_axe", "netherite_shovel", "netherite_hoe",
  
  // Buckets
  "bucket", "water_bucket", "lava_bucket", "powder_snow_bucket", "milk_bucket",
  "axolotl_bucket", "cod_bucket", "salmon_bucket", "tropical_fish_bucket", "pufferfish_bucket",
  "tadpole_bucket",
  
  // Fishing and utility items
  "fishing_rod", "flint_and_steel", "fire_charge", "bone_meal", "shears",
  "brush", "name_tag", "lead", "bundle",
  
  // Navigation and time tools
  "compass", "recovery_compass", "clock", "spyglass", "map", "empty_map",
  
  // Writing and special items
  "book_and_quill", "writable_book", "ender_pearl", "ender_eye", "elytra",
  
  // Movement items
  "firework_rocket", "saddle", "carrot_on_a_stick", "warped_fungus_on_a_stick",
  
  // Boats
  "oak_boat", "spruce_boat", "birch_boat", "jungle_boat", "acacia_boat", 
  "dark_oak_boat", "mangrove_boat", "cherry_boat", "bamboo_raft",
  "oak_chest_boat", "spruce_chest_boat", "birch_chest_boat", "jungle_chest_boat", 
  "acacia_chest_boat", "dark_oak_chest_boat", "mangrove_chest_boat", "cherry_chest_boat", 
  "bamboo_chest_raft",
  
  // Rails and minecarts
  "rail", "powered_rail", "detector_rail", "activator_rail",
  "minecart", "hopper_minecart", "chest_minecart", "furnace_minecart", "tnt_minecart",
  
  // Musical items
  "goat_horn", "music_disc_13", "music_disc_cat", "music_disc_blocks", "music_disc_chirp",
  "music_disc_far", "music_disc_mall", "music_disc_mellohi", "music_disc_stal", "music_disc_strad",
  "music_disc_ward", "music_disc_11", "music_disc_wait", "music_disc_otherside", "music_disc_5",
  "music_disc_pigstep", "music_disc_relic"
]

export const Combats = [
  // Swords
  "wooden_sword", "stone_sword", "iron_sword", "golden_sword", "diamond_sword", "netherite_sword",
  
  // Axes (also used as weapons)
  "wooden_axe", "stone_axe", "iron_axe", "golden_axe", "diamond_axe", "netherite_axe",
  
  // Special weapons
  "trident", "shield",
  
  // Leather armor
  "leather_helmet", "leather_chestplate", "leather_leggings", "leather_boots",
  
  // Chainmail armor
  "chainmail_helmet", "chainmail_chestplate", "chainmail_leggings", "chainmail_boots",
  
  // Iron armor
  "iron_helmet", "iron_chestplate", "iron_leggings", "iron_boots",
  
  // Golden armor
  "golden_helmet", "golden_chestplate", "golden_leggings", "golden_boots",
  
  // Diamond armor
  "diamond_helmet", "diamond_chestplate", "diamond_leggings", "diamond_boots",
  
  // Netherite armor
  "netherite_helmet", "netherite_chestplate", "netherite_leggings", "netherite_boots",
  
  // Special armor
  "turtle_helmet",
  
  // Horse armor
  "leather_horse_armor", "iron_horse_armor", "golden_horse_armor", "diamond_horse_armor",
  
  // Special combat items
  "totem_of_undying", "tnt", "end_crystal",
  
  // Throwable items
  "snowball", "egg",
  
  // Ranged weapons
  "bow", "crossbow",
  
  // Arrows
  "arrow", "spectral_arrow", "tipped_arrow",
  
  // Firework rockets (also used for combat with crossbow)
  "firework_rocket"
]

export const RedstoneItems = [
  // Redstone basics
  "redstone", "redstone_torch", "redstone_block", 
  "repeater", "comparator", "target",
  
  // Activation mechanisms
  "lever", 
  "oak_button", "spruce_button", "birch_button", "jungle_button", "acacia_button", 
  "dark_oak_button", "mangrove_button", "cherry_button", "bamboo_button", "stone_button",
  "crimson_button", "warped_button",
  
  // Pressure plates
  "oak_pressure_plate", "spruce_pressure_plate", "birch_pressure_plate", "jungle_pressure_plate", 
  "acacia_pressure_plate", "dark_oak_pressure_plate", "mangrove_pressure_plate", "cherry_pressure_plate", 
  "bamboo_pressure_plate", "stone_pressure_plate", "polished_blackstone_pressure_plate",
  "light_weighted_pressure_plate", "heavy_weighted_pressure_plate", 
  "crimson_pressure_plate", "warped_pressure_plate",
  
  // Sculk items
  "sculk_sensor", "calibrated_sculk_sensor", "sculk_catalyst",
  
  // Sound-related blocks
  "amethyst_block", "white_wool", "tripwire_hook", "string", 
  
  // Specialty redstone blocks
  "lectern", "daylight_detector", "lightning_rod",
  
  // Mechanical blocks
  "piston", "sticky_piston", "slime_block", "honey_block",
  
  // Containers and item management
  "dispenser", "dropper", "hopper", "chest", "barrel",
  "chiseled_bookshelf", "furnace", "trapped_chest", "jukebox",
  
  // Advanced redstone components
  "observer", "note_block", "composter", "cauldron",
  
  // Rails and transportation
  "rail", "powered_rail", "detector_rail", "activator_rail",
  "minecart", "hopper_minecart", "chest_minecart", "furnace_minecart", "tnt_minecart",
  "oak_chest_boat", "spruce_chest_boat", "birch_chest_boat", "jungle_chest_boat",
  "acacia_chest_boat", "dark_oak_chest_boat", "mangrove_chest_boat", "cherry_chest_boat",
  "bamboo_chest_raft",
  
  // Doors and gates
  "oak_door", "spruce_door", "birch_door", "jungle_door", "acacia_door",
  "dark_oak_door", "mangrove_door", "cherry_door", "bamboo_door",
  "crimson_door", "warped_door", "iron_door",
  
  // Trapdoors
  "oak_trapdoor", "spruce_trapdoor", "birch_trapdoor", "jungle_trapdoor", "acacia_trapdoor",
  "dark_oak_trapdoor", "mangrove_trapdoor", "cherry_trapdoor", "bamboo_trapdoor",
  "crimson_trapdoor", "warped_trapdoor", "iron_trapdoor",
  
  // Fence gates
  "oak_fence_gate", "spruce_fence_gate", "birch_fence_gate", "jungle_fence_gate",
  "acacia_fence_gate", "dark_oak_fence_gate", "mangrove_fence_gate", "cherry_fence_gate",
  "bamboo_fence_gate", "crimson_fence_gate", "warped_fence_gate",
  
  // Miscellaneous redstone components
  "tnt", "redstone_lamp", "bell", "big_dripleaf", "armor_stand", "redstone_ore"
]

export const Functionals = [
  // Light sources
  "torch", "soul_torch", "redstone_torch", 
  "lantern", "soul_lantern", "chain",
  "end_rod", "sea_lantern", "redstone_lamp", "glowstone",
  "shroomlight", "ochre_froglight", "verdant_froglight", "pearlescent_froglight",
  "crying_obsidian", "glow_lichen", "magma_block",
  
  // Workstations
  "crafting_table", "stonecutter", "cartography_table", "fletching_table",
  "smithing_table", "grindstone", "loom",
  "furnace", "smoker", "blast_furnace",
  "campfire", "soul_campfire",
  "anvil", "chipped_anvil", "damaged_anvil",
  "composter", "note_block", "jukebox",
  "enchanting_table", "end_crystal", "brewing_stand", "cauldron",
  "bell", "beacon", "conduit", "lodestone",
  
  // Mobility & Access
  "ladder", "scaffolding",
  
  // Bee-related
  "bee_nest", "beehive",
  
  // Special blocks
  "suspicious_sand", "suspicious_gravel",
  "lightning_rod", "flower_pot", "decorated_pot",
  "armor_stand", "item_frame", "glow_item_frame",
  "painting",
  
  // Storage and display
  "bookshelf", "chiseled_bookshelf", "lectern",
  "tinted_glass",
  
  // Signs
  "oak_sign", "spruce_sign", "birch_sign", "jungle_sign", "acacia_sign", 
  "dark_oak_sign", "mangrove_sign", "cherry_sign", "bamboo_sign",
  "crimson_sign", "warped_sign",
  
  // Hanging signs
  "oak_hanging_sign", "spruce_hanging_sign", "birch_hanging_sign", "jungle_hanging_sign", "acacia_hanging_sign", 
  "dark_oak_hanging_sign", "mangrove_hanging_sign", "cherry_hanging_sign", "bamboo_hanging_sign",
  "crimson_hanging_sign", "warped_hanging_sign",
  
  // Storage containers
  "chest", "barrel", "ender_chest", "shulker_box",
  
  // Colored shulker boxes
  "white_shulker_box", "orange_shulker_box", "magenta_shulker_box", "light_blue_shulker_box",
  "yellow_shulker_box", "lime_shulker_box", "pink_shulker_box", "gray_shulker_box",
  "light_gray_shulker_box", "cyan_shulker_box", "purple_shulker_box", "blue_shulker_box",
  "brown_shulker_box", "green_shulker_box", "red_shulker_box", "black_shulker_box",
  
  // Respawn-related
  "respawn_anchor",
  
  // Beds
  "white_bed", "orange_bed", "magenta_bed", "light_blue_bed", "yellow_bed", 
  "lime_bed", "pink_bed", "gray_bed", "light_gray_bed", "cyan_bed", 
  "purple_bed", "blue_bed", "brown_bed", "green_bed", "red_bed", "black_bed",
  
  // Candles
  "candle", "white_candle", "orange_candle", "magenta_candle", "light_blue_candle",
  "yellow_candle", "lime_candle", "pink_candle", "gray_candle", "light_gray_candle",
  "cyan_candle", "purple_candle", "blue_candle", "brown_candle", "green_candle", 
  "red_candle", "black_candle",
  
  // Banners
  "white_banner", "orange_banner", "magenta_banner", "light_blue_banner",
  "yellow_banner", "lime_banner", "pink_banner", "gray_banner",
  "light_gray_banner", "cyan_banner", "purple_banner", "blue_banner",
  "brown_banner", "green_banner", "red_banner", "black_banner",
  "ominous_banner",
  
  // Heads
  "player_head", "zombie_head", "creeper_head", "dragon_head", "skeleton_skull", "wither_skeleton_skull",
  "piglin_head",
  
  // Special end-game items
  "dragon_egg", "end_portal_frame", "ender_eye",
  
  // Infested blocks
  "infested_stone", "infested_cobblestone", "infested_stone_bricks", 
  "infested_mossy_stone_bricks", "infested_cracked_stone_bricks", "infested_chiseled_stone_bricks",
  "infested_deepslate"
]

export const NaturalBlocks = [
  // Overworld dirt and ground types
  "grass_block", "podzol", "mycelium", "dirt_path", "dirt", "coarse_dirt", 
  "rooted_dirt", "farmland", "mud", "clay", "gravel", "sand", "red_sand",
  
  // Sandstone variants
  "sandstone", "chiseled_sandstone", "cut_sandstone", "smooth_sandstone",
  "red_sandstone", "chiseled_red_sandstone", "cut_red_sandstone", "smooth_red_sandstone",
  
  // Ice and snow
  "ice", "packed_ice", "blue_ice", "snow_block", "snow",
  
  // Moss
  "moss_block", "moss_carpet",
  
  // Stone types
  "stone", "cobblestone", "mossy_cobblestone", "smooth_stone", 
  "stone_bricks", "cracked_stone_bricks", "mossy_stone_bricks", "chiseled_stone_bricks",
  "deepslate", "cobbled_deepslate", "polished_deepslate", "deepslate_bricks", 
  "cracked_deepslate_bricks", "deepslate_tiles", "cracked_deepslate_tiles", "chiseled_deepslate",
  "granite", "polished_granite", "diorite", "polished_diorite", 
  "andesite", "polished_andesite", "calcite", "tuff",
  
  // Dripstone
  "dripstone_block", "pointed_dripstone",
  
  // Prismarine
  "prismarine", "prismarine_bricks", "dark_prismarine",
  
  // Nether blocks
  "magma_block", "obsidian", "crying_obsidian", "netherrack", 
  "nether_bricks", "red_nether_bricks", "cracked_nether_bricks", "chiseled_nether_bricks",
  "crimson_nylium", "warped_nylium", "soul_sand", "soul_soil", "bone_block",
  "blackstone", "gilded_blackstone", "polished_blackstone", 
  "polished_blackstone_bricks", "cracked_polished_blackstone_bricks", "chiseled_polished_blackstone",
  "basalt", "polished_basalt", "smooth_basalt",
  
  // End blocks
  "end_stone", "end_stone_bricks", "purpur_block", "purpur_pillar", "dragon_egg",
  
  // Ores
  "coal_ore", "deepslate_coal_ore", 
  "iron_ore", "deepslate_iron_ore", 
  "copper_ore", "deepslate_copper_ore", 
  "gold_ore", "deepslate_gold_ore", 
  "redstone_ore", "deepslate_redstone_ore", 
  "emerald_ore", "deepslate_emerald_ore", 
  "lapis_ore", "deepslate_lapis_ore", 
  "diamond_ore", "deepslate_diamond_ore", 
  "nether_gold_ore", "nether_quartz_ore", "ancient_debris",
  
  // Raw ore blocks
  "raw_iron_block", "raw_copper_block", "raw_gold_block",
  
  // Special blocks
  "glowstone", "amethyst_block", "budding_amethyst", 
  "small_amethyst_bud", "medium_amethyst_bud", "large_amethyst_bud", "amethyst_cluster",
  
  // Wood and plant blocks
  "oak_log", "spruce_log", "birch_log", "jungle_log", "acacia_log", "dark_oak_log", 
  "mangrove_log", "cherry_log", "bamboo_block",
  "crimson_stem", "warped_stem",
  "oak_wood", "spruce_wood", "birch_wood", "jungle_wood", "acacia_wood", "dark_oak_wood",
  "mangrove_wood", "cherry_wood", "bamboo_mosaic",
  "crimson_hyphae", "warped_hyphae", 
  "mangrove_roots", "muddy_mangrove_roots", 
  "mushroom_stem", "brown_mushroom_block", "red_mushroom_block", 
  "nether_wart_block", "warped_wart_block", "shroomlight",
  
  // Leaves
  "oak_leaves", "spruce_leaves", "birch_leaves", "jungle_leaves", 
  "acacia_leaves", "dark_oak_leaves", "mangrove_leaves", "cherry_leaves",
  "azalea_leaves", "flowering_azalea_leaves",
  
  // Saplings and small plants
  "oak_sapling", "spruce_sapling", "birch_sapling", "jungle_sapling", 
  "acacia_sapling", "dark_oak_sapling", "cherry_sapling", "mangrove_propagule",
  "azalea", "flowering_azalea",
  "brown_mushroom", "red_mushroom", 
  "crimson_fungus", "warped_fungus",
  "grass", "fern", "dead_bush",
  
  // Flowers
  "dandelion", "poppy", "blue_orchid", "allium", "azure_bluet", 
  "red_tulip", "orange_tulip", "white_tulip", "pink_tulip", 
  "oxeye_daisy", "cornflower", "lily_of_the_valley", "wither_rose",
  "sunflower", "lilac", "rose_bush", "peony",
  "pink_petals", "spore_blossom", "torchflower",
  
  // Crops and plants
  "bamboo", "sugar_cane", "cactus", 
  "crimson_roots", "warped_roots", "nether_sprouts", 
  "weeping_vines", "twisting_vines", "vines", 
  "tall_grass", "large_fern", "pitcher_plant", 
  "big_dripleaf", "small_dripleaf", 
  "chorus_flower", "chorus_plant", "glow_lichen", 
  "hanging_roots", "frogspawn",
  
  // Eggs
  "turtle_egg", "sniffer_egg",
  
  // Seeds and small edibles
  "wheat_seeds", "cocoa_beans", "pumpkin_seeds", "melon_seeds", 
  "beetroot_seeds", "torchflower_seeds", "pitcher_pod", 
  "glow_berries", "sweet_berries", "nether_wart",
  
  // Underwater plants
  "lily_pad", "seagrass", "sea_pickle", "kelp", "dried_kelp_block",
  
  // Coral
  "tube_coral_block", "brain_coral_block", "bubble_coral_block", 
  "fire_coral_block", "horn_coral_block", 
  "dead_tube_coral_block", "dead_brain_coral_block", "dead_bubble_coral_block", 
  "dead_fire_coral_block", "dead_horn_coral_block",
  "tube_coral", "brain_coral", "bubble_coral", "fire_coral", "horn_coral",
  "dead_tube_coral", "dead_brain_coral", "dead_bubble_coral", "dead_fire_coral", "dead_horn_coral", 
  "tube_coral_fan", "brain_coral_fan", "bubble_coral_fan", "fire_coral_fan", "horn_coral_fan", 
  "dead_tube_coral_fan", "dead_brain_coral_fan", "dead_bubble_coral_fan", 
  "dead_fire_coral_fan", "dead_horn_coral_fan",
  
  // Sponges
  "sponge", "wet_sponge",
  
  // Gourds and hay
  "melon", "pumpkin", "carved_pumpkin", "jack_o_lantern", "hay_block",
  
  // Bee/honey blocks
  "bee_nest", "beehive", "honeycomb_block",
  
  // Special blocks
  "slime_block", "honey_block", 
  "ochre_froglight", "verdant_froglight", "pearlescent_froglight",
  
  // Sculk blocks
  "sculk", "sculk_vein", "sculk_catalyst", "sculk_shrieker", "sculk_sensor", "calibrated_sculk_sensor",
  
  // Misc blocks
  "cobweb", "bedrock"
]

export const ColoredBlocks = [
  // Wool blocks
  "white_wool", "orange_wool", "magenta_wool", "light_blue_wool",
  "yellow_wool", "lime_wool", "pink_wool", "gray_wool",
  "light_gray_wool", "cyan_wool", "purple_wool", "blue_wool",
  "brown_wool", "green_wool", "red_wool", "black_wool",
  
  // Carpets
  "white_carpet", "orange_carpet", "magenta_carpet", "light_blue_carpet",
  "yellow_carpet", "lime_carpet", "pink_carpet", "gray_carpet",
  "light_gray_carpet", "cyan_carpet", "purple_carpet", "blue_carpet",
  "brown_carpet", "green_carpet", "red_carpet", "black_carpet",
  
  // Terracotta
  "terracotta", 
  "white_terracotta", "orange_terracotta", "magenta_terracotta", "light_blue_terracotta",
  "yellow_terracotta", "lime_terracotta", "pink_terracotta", "gray_terracotta",
  "light_gray_terracotta", "cyan_terracotta", "purple_terracotta", "blue_terracotta",
  "brown_terracotta", "green_terracotta", "red_terracotta", "black_terracotta",
  
  // Concrete
  "white_concrete", "orange_concrete", "magenta_concrete", "light_blue_concrete",
  "yellow_concrete", "lime_concrete", "pink_concrete", "gray_concrete",
  "light_gray_concrete", "cyan_concrete", "purple_concrete", "blue_concrete",
  "brown_concrete", "green_concrete", "red_concrete", "black_concrete",
  
  // Concrete powder
  "white_concrete_powder", "orange_concrete_powder", "magenta_concrete_powder", "light_blue_concrete_powder",
  "yellow_concrete_powder", "lime_concrete_powder", "pink_concrete_powder", "gray_concrete_powder",
  "light_gray_concrete_powder", "cyan_concrete_powder", "purple_concrete_powder", "blue_concrete_powder",
  "brown_concrete_powder", "green_concrete_powder", "red_concrete_powder", "black_concrete_powder",
  
  // Glazed terracotta
  "white_glazed_terracotta", "orange_glazed_terracotta", "magenta_glazed_terracotta", "light_blue_glazed_terracotta",
  "yellow_glazed_terracotta", "lime_glazed_terracotta", "pink_glazed_terracotta", "gray_glazed_terracotta",
  "light_gray_glazed_terracotta", "cyan_glazed_terracotta", "purple_glazed_terracotta", "blue_glazed_terracotta",
  "brown_glazed_terracotta", "green_glazed_terracotta", "red_glazed_terracotta", "black_glazed_terracotta",
  
  // Glass
  "glass", "tinted_glass",
  "white_stained_glass", "orange_stained_glass", "magenta_stained_glass", "light_blue_stained_glass",
  "yellow_stained_glass", "lime_stained_glass", "pink_stained_glass", "gray_stained_glass",
  "light_gray_stained_glass", "cyan_stained_glass", "purple_stained_glass", "blue_stained_glass",
  "brown_stained_glass", "green_stained_glass", "red_stained_glass", "black_stained_glass",
  
  // Glass panes
  "glass_pane",
  "white_stained_glass_pane", "orange_stained_glass_pane", "magenta_stained_glass_pane", "light_blue_stained_glass_pane",
  "yellow_stained_glass_pane", "lime_stained_glass_pane", "pink_stained_glass_pane", "gray_stained_glass_pane",
  "light_gray_stained_glass_pane", "cyan_stained_glass_pane", "purple_stained_glass_pane", "blue_stained_glass_pane",
  "brown_stained_glass_pane", "green_stained_glass_pane", "red_stained_glass_pane", "black_stained_glass_pane"
]

export const BuildingBlocks = [
  // Oak wood variants
  "oak_planks", "oak_stairs", "oak_slab", "oak_fence", "oak_fence_gate", "oak_door", "oak_trapdoor",
  "stripped_oak_log", "stripped_oak_wood",
  
  // Spruce wood variants
  "spruce_planks", "spruce_stairs", "spruce_slab", "spruce_fence", "spruce_fence_gate", "spruce_door", "spruce_trapdoor",
  "stripped_spruce_log", "stripped_spruce_wood",
  
  // Birch wood variants
  "birch_planks", "birch_stairs", "birch_slab", "birch_fence", "birch_fence_gate", "birch_door", "birch_trapdoor",
  "stripped_birch_log", "stripped_birch_wood",
  
  // Jungle wood variants
  "jungle_planks", "jungle_stairs", "jungle_slab", "jungle_fence", "jungle_fence_gate", "jungle_door", "jungle_trapdoor",
  "stripped_jungle_log", "stripped_jungle_wood",
  
  // Acacia wood variants
  "acacia_planks", "acacia_stairs", "acacia_slab", "acacia_fence", "acacia_fence_gate", "acacia_door", "acacia_trapdoor",
  "stripped_acacia_log", "stripped_acacia_wood",
  
  // Dark Oak wood variants
  "dark_oak_planks", "dark_oak_stairs", "dark_oak_slab", "dark_oak_fence", "dark_oak_fence_gate", "dark_oak_door", "dark_oak_trapdoor",
  "stripped_dark_oak_log", "stripped_dark_oak_wood",
  
  // Mangrove wood variants
  "mangrove_planks", "mangrove_stairs", "mangrove_slab", "mangrove_fence", "mangrove_fence_gate", "mangrove_door", "mangrove_trapdoor",
  "stripped_mangrove_log", "stripped_mangrove_wood",
  
  // Cherry wood variants
  "cherry_planks", "cherry_stairs", "cherry_slab", "cherry_fence", "cherry_fence_gate", "cherry_door", "cherry_trapdoor",
  "stripped_cherry_log", "stripped_cherry_wood",
  
  // Bamboo wood variants
  "bamboo_planks", "bamboo_stairs", "bamboo_slab", "bamboo_fence", "bamboo_fence_gate", "bamboo_door", "bamboo_trapdoor",
  "stripped_bamboo_block",
  
  // Bamboo mosaic
  "bamboo_mosaic", "bamboo_mosaic_stairs", "bamboo_mosaic_slab",
  
  // Crimson wood variants
  "crimson_planks", "crimson_stairs", "crimson_slab", "crimson_fence", "crimson_fence_gate", "crimson_door", "crimson_trapdoor",
  "stripped_crimson_stem", "stripped_crimson_hyphae",
  
  // Warped wood variants
  "warped_planks", "warped_stairs", "warped_slab", "warped_fence", "warped_fence_gate", "warped_door", "warped_trapdoor",
  "stripped_warped_stem", "stripped_warped_hyphae",
  
  // Stone variants
  "stone_stairs", "stone_slab", "stone_brick_stairs", "stone_brick_slab", "stone_brick_wall",
  "cobblestone_stairs", "cobblestone_slab", "cobblestone_wall",
  "mossy_cobblestone_stairs", "mossy_cobblestone_slab", "mossy_cobblestone_wall",
  "mossy_stone_brick_stairs", "mossy_stone_brick_slab", "mossy_stone_brick_wall",
  
  // Granite variants
  "granite_stairs", "granite_slab", "granite_wall",
  "polished_granite_stairs", "polished_granite_slab", "polished_granite",
  
  // Diorite variants
  "diorite_stairs", "diorite_slab", "diorite_wall",
  "polished_diorite_stairs", "polished_diorite_slab", "polished_diorite",
  
  // Andesite variants
  "andesite_stairs", "andesite_slab", "andesite_wall",
  "polished_andesite_stairs", "polished_andesite_slab", "polished_andesite",
  
  // Deepslate variants
  "deepslate_stairs", "deepslate_slab", "deepslate_wall",
  "cobbled_deepslate_stairs", "cobbled_deepslate_slab", "cobbled_deepslate_wall",
  "polished_deepslate_stairs", "polished_deepslate_slab", "polished_deepslate_wall",
  "deepslate_brick_stairs", "deepslate_brick_slab", "deepslate_brick_wall",
  "deepslate_tile_stairs", "deepslate_tile_slab", "deepslate_tile_wall",
  "reinforced_deepslate",
  
  // Brick variants
  "brick_stairs", "brick_slab", "brick_wall", "bricks",
  
  // Mud variants
  "packed_mud", "mud_brick_stairs", "mud_brick_slab", "mud_brick_wall", "mud_bricks",
  
  // Sandstone variants
  "sandstone_stairs", "sandstone_slab", "sandstone_wall", 
  "smooth_sandstone_stairs", "smooth_sandstone_slab",
  "cut_sandstone_slab",
  
  // Red sandstone variants
  "red_sandstone_stairs", "red_sandstone_slab", "red_sandstone_wall",
  "smooth_red_sandstone_stairs", "smooth_red_sandstone_slab",
  "cut_red_sandstone_slab",
  
  // Prismarine variants
  "sea_lantern",
  "prismarine_stairs", "prismarine_slab", "prismarine_wall",
  "prismarine_brick_stairs", "prismarine_brick_slab", "prismarine_bricks",
  "dark_prismarine_stairs", "dark_prismarine_slab",
  
  // Nether materials
  "netherrack",
  "nether_brick_stairs", "nether_brick_slab", "nether_brick_wall", "nether_bricks",
  "red_nether_brick_stairs", "red_nether_brick_slab", "red_nether_brick_wall", "red_nether_bricks",
  
  // Basalt variants
  "basalt", "polished_basalt", "smooth_basalt",
  
  // Blackstone variants
  "blackstone_stairs", "blackstone_slab", "blackstone_wall",
  "polished_blackstone_stairs", "polished_blackstone_slab", "polished_blackstone_wall",
  "polished_blackstone_brick_stairs", "polished_blackstone_brick_slab", "polished_blackstone_brick_wall", 
  "polished_blackstone_bricks", "cracked_polished_blackstone_bricks",
  
  // End stone variants
  "end_stone", 
  "end_stone_brick_stairs", "end_stone_brick_slab", "end_stone_brick_wall", "end_stone_bricks",
  
  // Purpur variants
  "purpur_block", "purpur_pillar", "purpur_stairs", "purpur_slab",
  
  // Mineral blocks
  "coal_block", 
  "iron_block", "raw_iron_block",
  "gold_block", "raw_gold_block",
  "redstone_block",
  "emerald_block",
  "lapis_block",
  "diamond_block",
  "netherite_block",
  
  // Quartz variants
  "quartz_block", "quartz_bricks", "quartz_pillar", "quartz_stairs", "quartz_slab",
  "smooth_quartz", "smooth_quartz_stairs", "smooth_quartz_slab",
  "chiseled_quartz_block",
  
  // Amethyst
  "amethyst_block",
  
  // Copper variants
  "copper_block", "exposed_copper", "weathered_copper", "oxidized_copper",
  "waxed_copper_block", "waxed_exposed_copper", "waxed_weathered_copper", "waxed_oxidized_copper",
  "cut_copper", "exposed_cut_copper", "weathered_cut_copper", "oxidized_cut_copper",
  "waxed_cut_copper", "waxed_exposed_cut_copper", "waxed_weathered_cut_copper", "waxed_oxidized_cut_copper",
  "cut_copper_stairs", "exposed_cut_copper_stairs", "weathered_cut_copper_stairs", "oxidized_cut_copper_stairs",
  "waxed_cut_copper_stairs", "waxed_exposed_cut_copper_stairs", "waxed_weathered_cut_copper_stairs", "waxed_oxidized_cut_copper_stairs",
  "cut_copper_slab", "exposed_cut_copper_slab", "weathered_cut_copper_slab", "oxidized_cut_copper_slab",
  "waxed_cut_copper_slab", "waxed_exposed_cut_copper_slab", "waxed_weathered_cut_copper_slab", "waxed_oxidized_cut_copper_slab"
]

export const Food = [
  // Fruits and berries
  "apple", "golden_apple", "enchanted_golden_apple",
  "melon_slice", "sweet_berries", "glow_berries", "chorus_fruit",
  
  // Vegetables and crops
  "carrot", "golden_carrot", 
  "potato", "baked_potato", "poisonous_potato",
  "beetroot", "dried_kelp",
  
  // Raw and cooked meats
  "beef", "cooked_beef",
  "porkchop", "cooked_porkchop",
  "mutton", "cooked_mutton",
  "chicken", "cooked_chicken",
  "rabbit", "cooked_rabbit",
  "cod", "cooked_cod",
  "salmon", "cooked_salmon",
  "tropical_fish", "pufferfish",
  
  // Baked goods
  "bread", "cookie", "cake", "pumpkin_pie",
  
  // Monster drops
  "rotten_flesh", "spider_eye",
  
  // Stews and soups
  "mushroom_stew", "beetroot_soup", "rabbit_stew", 
  "suspicious_stew",
  
  // Drinkable items
  "milk_bucket", "honey_bottle",
  
  // Water bottles and potions
  "potion", "splash_potion", "lingering_potion", "water_bottle",
  
  // Special foods
  "enchanted_golden_apple", "golden_carrot", "glistering_melon_slice"
]

export const Materials = [
  // Mining resources
  "coal", "charcoal", 
  "raw_iron", "raw_copper", "raw_gold",
  "emerald", "lapis_lazuli", "diamond", "ancient_debris", "nether_quartz", "amethyst_shard",
  
  // Processed metals
  "iron_nugget", "gold_nugget",
  "iron_ingot", "copper_ingot", "gold_ingot",
  "netherite_scrap", "netherite_ingot",
  
  // Crafting basics
  "stick", "flint", "wheat", 
  "bone", "bone_meal", "string", "feather",
  "snowball", "egg", "leather", "rabbit_hide",
  "honeycomb", "ink_sac", "glow_ink_sac",
  "scute", "slimeball", "clay_ball",
  
  // Special materials
  "prismarine_shard", "prismarine_crystals",
  "nautilus_shell", "heart_of_the_sea",
  "fire_charge", "blaze_rod", "nether_star",
  "ender_pearl", "ender_eye", "shulker_shell",
  "popped_chorus_fruit", "echo_shard", "disc_fragment_5",
  
  // Dyes
  "white_dye", "orange_dye", "magenta_dye", "light_blue_dye",
  "yellow_dye", "lime_dye", "pink_dye", "gray_dye",
  "light_gray_dye", "cyan_dye", "purple_dye", "blue_dye",
  "brown_dye", "green_dye", "red_dye", "black_dye",
  
  // Crafting components
  "bowl", "brick", "nether_brick", "paper", "book", "firework_star",
  "glass_bottle", "nether_wart", "redstone", "glowstone_dust", "gunpowder",
  
  // Brewing ingredients
  "dragon_breath", "fermented_spider_eye", "blaze_powder", 
  "sugar", "rabbit_foot", "glistering_melon_slice",
  "spider_eye", "pufferfish", "magma_cream", 
  "golden_carrot", "ghast_tear", "turtle_shell", "phantom_membrane",
  
  // Pattern items
  "globe_banner_pattern", "creeper_banner_pattern", "skull_banner_pattern",
  "mojang_banner_pattern", "flower_banner_pattern", "piglin_banner_pattern",
  
  // Pottery shards
  "angler_pottery_sherd", "archer_pottery_sherd", "arms_up_pottery_sherd",
  "blade_pottery_sherd", "brewer_pottery_sherd", "burn_pottery_sherd",
  "danger_pottery_sherd", "explorer_pottery_sherd", "friend_pottery_sherd",
  "heart_pottery_sherd", "heartbreak_pottery_sherd", "howl_pottery_sherd",
  "miner_pottery_sherd", "mourner_pottery_sherd", "plenty_pottery_sherd",
  "prize_pottery_sherd", "sheaf_pottery_sherd", "shelter_pottery_sherd",
  "skull_pottery_sherd", "snort_pottery_sherd",
  
  // Smithing templates
  "netherite_upgrade_smithing_template", "armor_trim_smithing_template", 
  "coast_armor_trim_smithing_template", "dune_armor_trim_smithing_template", 
  "eye_armor_trim_smithing_template", "host_armor_trim_smithing_template", 
  "raiser_armor_trim_smithing_template", "rib_armor_trim_smithing_template",
  "sentry_armor_trim_smithing_template", "shaper_armor_trim_smithing_template",
  "silence_armor_trim_smithing_template", "snout_armor_trim_smithing_template",
  "spire_armor_trim_smithing_template", "tide_armor_trim_smithing_template",
  "vex_armor_trim_smithing_template", "ward_armor_trim_smithing_template",
  "wayfinder_armor_trim_smithing_template", "wild_armor_trim_smithing_template",
  
  // Special items
  "experience_bottle", "enchanted_book"
]

