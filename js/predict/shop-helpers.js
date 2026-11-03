// ==========================================================================
// PREDICTIONS: SHOP HELPERS (ItemQueryResolver RANDOM_ITEMS)
// Shops that stock "random items" (Traveling Cart, Krobus, Sandy, Pierre's
// wallpaper...) shuffle the whole item list with one random key per item
// and keep the first matches. Ported from stardew-predictor's
// getRandomItems() and getRandomWallFloor() (MIT License).
// ==========================================================================

import { P_OBJECTS, P_FURNITURE, P_SHIRTS } from '../../data/predictor-data.js';
import { t, isEn } from '../lib/i18n.js';
import { itemName } from '../lib/item-lookup.js';

// The shuffle draws one number per item in the order of the original data
// literals (whose "_"-prefixed keys kept insertion order). Object.keys() of
// our tables sorts integer-like keys first, which would change every result,
// so the original orders are kept here (taken from stardew-predictor.js).
const OBJECT_ORDER = (
  '0,2,4,6,8,10,12,14,16,18,20,22,24,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,71,72,74,75,76,77,78,79,80,82,84,86,88,90,92,93,94,95,' +
  '96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,136,' +
  '137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,176,' +
  '174,178,180,182,184,186,188,190,191,192,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,218,219,220,221,' +
  '222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,250,251,252,253,254,256,257,258,259,260,' +
  '261,262,264,266,268,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,286,287,288,290,293,294,295,296,297,298,299,300,301,302,303,304,305,' +
  '306,307,308,309,310,311,313,314,315,316,317,318,319,320,321,322,323,324,325,326,328,329,330,331,333,334,335,336,337,338,340,341,342,343,344,346,347,' +
  '348,349,350,351,368,369,370,371,372,373,378,380,382,384,386,388,390,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,' +
  '412,413,414,415,416,417,418,419,420,421,422,423,424,426,428,430,432,433,434,436,437,438,439,440,441,442,444,446,447,449,450,452,454,456,457,458,459,' +
  '460,461,463,464,465,466,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,427,429,453,' +
  '455,431,425,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,' +
  '550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,' +
  '587,588,589,590,591,593,595,597,599,376,604,605,606,607,608,609,610,611,612,613,614,618,621,645,648,649,651,628,629,630,631,632,633,634,635,636,637,' +
  '638,668,670,674,675,676,677,678,679,680,681,682,684,685,686,687,688,689,690,691,692,693,694,695,698,699,700,701,702,703,704,705,706,707,708,709,710,' +
  '715,716,717,718,719,720,721,722,723,724,725,726,727,730,728,729,731,732,733,734,742,745,746,747,748,749,750,751,760,762,764,765,766,767,768,769,770,' +
  '771,772,773,774,775,784,785,786,787,788,789,790,792,793,794,795,796,797,798,799,800,801,802,803,805,807,808,809,810,811,812,445,814,815,267,265,269,' +
  '292,289,25,73,69,91,791,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,' +
  '847,848,849,850,851,852,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,872,873,874,875,876,877,879,880,881,882,883,884,885,886,887,888,' +
  '889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,913,915,917,918,919,920,921,922,923,924,925,926,927,928,' +
  '929,930,FarAwayStone,CalicoEgg,MixedFlowerSeeds,GoldenBobber,CalicoEggStone_0,CalicoEggStone_1,CalicoEggStone_2,MysteryBox,TroutDerbyTag,DeluxeBait,' +
  'Moss,MossySeed,GreenRainWeeds0,GreenRainWeeds1,GreenRainWeeds2,GreenRainWeeds3,GreenRainWeeds4,GreenRainWeeds5,GreenRainWeeds6,GreenRainWeeds7,' +
  'SonarBobber,SpecificBait,TentKit,VolcanoGoldNode,MysticTreeSeed,MysticSyrup,Raisins,DriedFruit,DriedMushrooms,StardropTea,PrizeTicket,GoldCoin,' +
  'TreasureTotem,ChallengeBait,CarrotSeeds,Carrot,SummerSquashSeeds,SummerSquash,BroccoliSeeds,Broccoli,PowdermelonSeeds,Powdermelon,SeedSpot,SmokedFish,' +
  'PurpleBook,SkillBook_0,SkillBook_2,SkillBook_1,SkillBook_3,SkillBook_4,Book_Trash,Book_Crabbing,Book_Bombs,Book_Roe,Book_WildSeeds,Book_Woodcutting,' +
  'Book_Defense,Book_Friendship,Book_Void,Book_Speed,Book_Marlon,Book_PriceCatalogue,Book_QueenOfSauce,Book_Diamonds,Book_Mystery,Book_AnimalCatalogue,' +
  'Book_Speed2,GoldenAnimalCracker,GoldenMysteryBox,SeaJelly,CaveJelly,RiverJelly,Goby,VolcanoCoalNode0,VolcanoCoalNode1,PotOfGold,Book_Artifact,' +
  'Book_Horse,ButterflyPowder,PetLicense,BlueGrassStarter,MossSoup,Book_Grass,BasicCoalNode0,BasicCoalNode1').split(',');
const FURNITURE_ORDER = (
  '0,3,6,9,12,15,18,21,24,27,30,31,64,67,70,73,76,79,82,85,88,91,94,95,128,131,192,197,202,207,212,288,294,300,306,312,416,424,432,440,512,520,528,536,' +
  '704,709,714,719,724,727,800,807,814,821,1120,1122,1124,1126,1128,1130,1132,1134,1136,1138,1140,1142,1144,1146,1148,1150,1216,1218,1220,1222,1224,1226,' +
  '1280,1283,1285,1287,1289,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1362,1363,1364,1365,1366,1367,' +
  '1368,1369,1376,1377,1378,1379,1380,1381,1382,1383,1384,1385,1386,1387,1388,1389,1390,1391,1393,1395,1397,1399,1400,1401,1402,1440,1443,1445,1447,1449,' +
  '1451,1456,1461,1466,1468,1539,1541,1543,1545,1547,1550,1552,1554,1557,1559,1561,1563,1565,1567,1600,1601,1602,1603,1604,1605,1606,1607,1609,1612,1614,' +
  '1616,1618,1623,1628,1630,1664,1669,1733,1671,1673,1675,1676,1678,1680,1682,1737,1742,1744,1745,1747,1748,1749,1751,1753,1755,1758,1777,1811,1812,1814,' +
  '1838,1840,1842,1844,1846,1848,1850,1852,1854,1792,1794,1796,1798,1800,1802,1866,1900,1902,1964,1971,1907,1909,1914,1978,1915,1916,1952,1953,1954,1955,' +
  '1956,1957,1958,1959,1960,1961,1760,1761,1762,1763,1764,1371,1373,1375,1471,985,984,986,989,1917,1918,2048,2052,2058,2064,2070,2076,2176,2180,2186,2192,' +
  '2304,2312,2322,1228,2326,2329,2331,2393,134,2400,2414,2496,2502,2508,2514,2418,2419,2421,2423,2425,2427,2396,2332,2334,2397,2398,1973,1974,1975,1684,' +
  '2624,2625,2626,2627,2628,2629,2630,2631,2632,2633,2634,2635,2636,1817,1818,1819,1820,1821,1687,1692,2637,2638,2639,2640,2641,2642,2643,2644,2645,2646,' +
  '2647,2648,2649,2650,2651,2652,2488,2584,2720,2784,2790,2794,2798,2730,2653,2654,2655,2802,2732,2734,2736,2738,2740,2748,2812,2750,2742,2870,2875,2814,' +
  'FreeCactus,HangingFish,RetroTV,ArtPhoto,ArtPhoto2,ShortBookcase,PierresSign,SamsSkateboard,ChickenDecal,ExoticPalace,PeriodicTable,DustySkull,' +
  'RadioDesk,ModelPlanes,CatStatue,SunDunes,DesertTable,DesertChair,DesertFireplace,SandyRug,DesertRug,DesertEndTable,DesertFlags,DecorativeBarrel,' +
  'MountedTrout_Painting,SquidKid_Painting,CowDecal,BluePinstripeBed,JungleTank,CCFishTank,BluePinstripeDoubleBed,JojaBed,JojaVault,JojaChair,J,' +
  'JojaColaTeaTable,JojaTable,JPainting,JLight,JojaCatalogue,JojaColaPainting,JojaColaOrnament,JojaFireplace,JojaColaCans,CashRegister,PlasticPlant,' +
  'PlasticSapling,GrayJojaCushion,JojaCushion,StackedJojaCrates,JojaCouch,MorrisPortrait,JojaHQPainting,JojaCrate,JojaShoppingCart,LargeJojaCrate,' +
  'JojaColaFridge,JojaDresser,GrayJojaDresser,LargeJojaRug,SmallJojaRug,SquareJojaRug,JojaRug,JojaCoffeeTable,GrayJojaCoffeeTable,JojaLamp,' +
  'GrayJojaBookcase,JojaBookcase,JojaStool,JojaEndTable,GrayJojaEndTable,DecorativeJojaDoor,WizardBed,LargeWizardBookcase,WizardBookcase,' +
  'ShortWizardBookcase,SmallWizardBookcase,WizardStool,WizardFireplace,WizardDresser,WizardStudy,WizardEndTable,WitchBroom,Cauldron,CurlyTree,LeafyPlant,' +
  'WizardChair,WizardTable,WizardCushion,DarkWizardCushion,WizardTeaTable,SmallElixirShelf,ElixirShelf,SmallStackedElixirShelf,StackedElixirShelf,' +
  'ElixirBundle,CoupleElixirs,ElixirTable,LongElixirTable,WizardLamp,Runes,WizardTower,PottedRedMushroom,WizardCatalogue,VoidSwirls,WizardBookshelf,Glyph,' +
  'StoneFlooring,RuneRug,SwirlRug,StarryMoonRug,CrystalBall,AmethystCrystalBall,TopazCrystalBall,AquamarineCrystalBall,EmeraldCrystalBall,RubyCrystalBall,' +
  'SmallBookStack,BookStack,LargeBookStack,PurpleBook,BlueBook,YellowBook,RedBook,GreenBook,BrownBook,FallenPurpleBook,FallenBlueBook,FallenYellowBook,' +
  'FallenRedBook,FallenGreenBook,FallenBrownBook,SmallBookPile,BookPile,LargeBookPile,DecorativeWizardDoor,JunimoBed,JunimoHut,LargeJunimoHut,' +
  'SmallJunimoHut,JunimoFireplace,JunimoBookcase,JunimoPot,JunimoBag,JunimoBundle,JunimoStool,JunimoTable,JunimoChair,SmallJunimoPot,JunimoFlower,' +
  'JunimoEndTable,JunimoCatalogue,JunimoTeaTable,JunimoDresser,JunimoLamp,JunimoPlant,JunimoWallPlaque,JunimoPlaque,JunimoCushion,DarkJunimoCushion,' +
  'JunimoTree,JunimoCouch,GreenSleepingJunimo,BlueSleepingJunimo,RedSleepingJunimo,PurpleSleepingJunimo,YellowSleepingJunimo,OrangeSleepingJunimo,' +
  'GraySleepingJunimo,SquareJunimoRug,JunimoRug,JunimoMat,CircularJunimoRug,SmallJunimoMat,CommunityCenter,LittleBuddies,Stardrop,Hut,AbigailPortrait,' +
  'EmilyPortrait,HaleyPortrait,LeahPortrait,MaruPortrait,PennyPortrait,AlexPortrait,ElliottPortrait,HarveyPortrait,SamPortrait,SebastianPortrait,' +
  'ShanePortrait,KrobusPortrait,JunimoStar,BulletinBoard,BrochureCabinet,LeafyWallPanel,LightLeafyWallPanel,DarkLeafyWallPanel,DecorativeJunimoDoor,' +
  'RetroBed,RetroDresser,RetroBookcase,RetroFireplace,RetroCouch,RetroCushion,DarkRetroCushion,RetroStool,RetroFlower,RetroChair,RetroTable,RetroPlant,' +
  'RetroEndTable,RetroTeaTable,RetroCatalogue,RetroCabinet,RetroRadio,RetroBanner,Groovy,RetroLamp,RetroRug,RetroSquareRug,RetroMat,LargeRetroRug,' +
  'Abstract,Starship,Binary,Checkers,UFO,DecorativeRetroDoor,DecorativeDoor1,DecorativeDoor2,DecorativeDoor3,DecorativeDoor4,DecorativeDoor5,' +
  'DecorativeDoor6,WallClock,DecorativeHatch,DecorativeOakLadder,DecorativeWalnutLadder,UprightPiano,CoatStand,BirdHouse,DecorativeShovel,WallSword,' +
  'DecorativeSword,WineTable,SpiritsTable,TallHousePlant,CornPlant,BlueCushion,YellowCushion,GreenCushion,RedCushion,BrownCushion,BlackCushion,' +
  'FoodPetBowl,WaterPetBowl,OakLampEndTable,WalnutLampEndTable,BirchLampEndTable,MahoganyLampEndTable,TriangleWindow,Clothesline,TrashCatalogue,' +
  'ElegantVase,CatTree,DarkCatTree,LightSwitch,Outlet,Doghouse,DarkDoghouse,BountifulDiningTable,PlasticLawnEndTable,PlasticLawnChair,BrokenTelevision,' +
  'SixPackRings,GreenBottle,PlasticBag,AluminumCan,BlueBottle,BuriedTire,Tire,Wrapper,SpilledBeverage,MessyShirt,MessyShorts,MoldyCouch,FancyTree1,' +
  'FancyTree2,FancyTree3,FancyHousePlant3,FancyHousePlant1,FancyHousePlant2,FancyHousePlant4,FancyHousePlant5,PigPainting,MidnightBeachBed,' +
  'MidnightBeachDoubleBed,DarkPiano').split(',');

// Each table as [id, name, price, offlimits, category, type] in shuffle order
const row = (id, name, price, off, category, type) => ({ id, name, price, off, category, type });
const TABLES = {
  objects: () => OBJECT_ORDER.map(id => { const o = P_OBJECTS[id]; return row(id, o[0], o[3], o[4], o[2], o[1]); }),
  furniture: () => FURNITURE_ORDER.map(id => { const f = P_FURNITURE[id]; return row(id, f[0], f[1], f[2]); }),
  shirts: () => Object.keys(P_SHIRTS).map(id => { const s = P_SHIRTS[id]; return row(id, s[0], s[1], s[2]); })
};
const cache = {};
const list = type => (cache[type] ||= TABLES[type]());

// RANDOM_ITEMS: ids from `type` (objects, furniture, shirts) numbered
// min..max, shuffled with `rng`. `requirePrice` skips items without a price,
// `isRandomSale` skips "off-limits" items, `cartChecks` applies the cart's
// extra conditions (no Arch/Minerals/Quest, only negative categories).
export function randomItems(rng, type, min, max, requirePrice, isRandomSale, cartChecks = false, howMany = 1) {
  // Integer keys of a plain object iterate in ascending order: the shuffle.
  // A repeated key overwrites the earlier item, as in the original.
  const shuffled = {};
  for (const item of list(type)) {
    const key = rng.Next();
    if (isNaN(item.id)) continue;
    if (requirePrice && item.price == 0) continue;
    if (isRandomSale && item.off) continue;
    const index = parseInt(item.id);
    if (index >= min && index <= max) shuffled[key] = item;
  }
  const picked = [];
  for (const key in shuffled) {
    const item = shuffled[key];
    if (cartChecks && (item.category >= 0 || item.category === -999)) continue;
    if (cartChecks && (item.type === 'Arch' || item.type === 'Minerals' || item.type === 'Quest')) continue;
    picked.push(item);
    if (picked.length >= howMany) break;
  }
  return picked;
}

// Same shuffle for wallpapers and floors (ids min..max plus `extra` ids from
// mods data that are never picked); `exclude` is a set of skipped ids
export function randomWallFloor(rng, min, max, extra, exclude = {}, howMany = 1) {
  const shuffled = {};
  for (let id = min; id <= max + extra; id++) shuffled[rng.Next()] = id;
  const picked = [];
  for (const key in shuffled) {
    const id = shuffled[key];
    if (id in exclude || id > max) continue;
    picked.push(id);
    if (picked.length >= howMany) break;
  }
  return picked;
}

// ---------- Rendering helpers ----------
export const gold = n => `${Number(n).toLocaleString('en-US')}g`;
export const none = () => '<span class="predict-none">—</span>';

// Does an item (English name) match a search? Checks the English and the
// Vietnamese names, ignoring case and accents.
const fold = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
export function matcher(query) {
  const q = fold(query.trim());
  return en => !!q && (fold(en).includes(q) || fold(itemName(en)).includes(q));
}

// Search results line: "N kết quả"
export const foundLine = n => `<p class="muted">${isEn ? `Found ${n} matching item(s)` : `${t('Tìm thấy')} ${n} ${t('kết quả')}`}</p>`;
