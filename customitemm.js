/* =====================================================
   RP → PocketMine-MP Plugin Generator
   FINAL v4.1
   Author : Mrchlldev
===================================================== */

const validBox = document.getElementById("result-valid");
const skipBox  = document.getElementById("result-skip");
const genBtn   = document.getElementById("generateBtn");
const dlBtn    = document.getElementById("downloadBtn");

let outputZip;
let registeredItems = [];
let skippedItems = [];

function findTextureKey(identifier, textureData) {
  if (!identifier.includes(":")) return null;
  const [, name] = identifier.split(":");
  const candidates = [identifier.replace(":", "_"), name];
  for (const key of candidates) {
    if (textureData[key]) return key;
  }

  return null;
}

function makeCard(target, title, items, type) {
  const card = document.createElement("div");
  card.className = `card border-${type} mb-3`;

  card.innerHTML = `
    <div class="alert ${type}">
      <b>${title} (${items.length})</b>
      ${items.length ? `<ul>${items.map(v => `<li>${v}</li>`).join("")}</ul>` : "<i>Kosong</i>"}
    </div>
  `;

  target.appendChild(card);
}

function armorTypeFromSetup(text) {
  text = text.toLowerCase();
  if (text.includes("helmet")) return "helmet";
  if (text.includes("chest"))  return "chestplate";
  if (text.includes("leg"))    return "leggings";
  if (text.includes("boot"))   return "boots";
  return null;
}

function armorInvTypeFromSetup(text) {
  text = text.toLowerCase();
  if (text.includes("helmet")) return "head";
  if (text.includes("chest"))  return "chest";
  if (text.includes("leg"))    return "legs";
  if (text.includes("boot"))   return "feet";
  return null;
}

function ensureFolder(zip, path) {
  if (!zip.folder(path)) {
    zip.folder(path);
  }
}

function classNameFromKey(key) {
  return key.split("_").map(v => v[0].toUpperCase() + v.slice(1)).join("");
}

genBtn.onclick = async () => {
  validBox.innerHTML = "";
  skipBox.innerHTML = "";
  dlBtn.disabled = true;

  registeredItems = [];
  skippedItems = [];
  outputZip = new JSZip();

  const rpFile = document.getElementById("rpFile").files[0];
  if (!rpFile) {
    skippedItems.push("Resource pack belum diupload");
    renderResult();
    return;
  }

  const pluginName = document.getElementById("pluginName").value || "MrchlldevPlugin";
  const root = `${pluginName}/`;
  const defense = parseInt(document.getElementById("defense").value);
  const durability = parseInt(document.getElementById("durability").value);

  const rpZip = await JSZip.loadAsync(rpFile);

  /* ===== item_texture ===== */
  let textureFile = null;
  if (rpZip.file("textures/item_texture.json")) textureFile = "textures/item_texture.json";
  if (rpZip.file("textures/item_textures.json")) textureFile = "textures/item_textures.json";

  if (!textureFile) {
    skippedItems.push("item_texture.json tidak ditemukan");
    renderResult();
    return;
  }

  const textureJson = JSON.parse(await rpZip.file(textureFile).async("string"));
  const textureData = textureJson.texture_data;

  if (!textureData) {
    skippedItems.push("texture_data tidak ditemukan");
    renderResult();
    return;
  }

  /* ===== plugin.yml ===== */
  outputZip.file(`${pluginName}/plugin.yml`,
`name: ${pluginName}
main: Mrchlldev\\${pluginName}\\${pluginName}
version: 1.0.0
api: 5.0.0
author: Mrchlldev
depend: [Customies]
`);

  /* ===== attachables ===== */
  const attachables = Object.keys(rpZip.files).filter(path =>
    path.startsWith("attachables/") &&
    path.endsWith(".json") &&
    !path.endsWith(".player.json")
  );

  for (const file of attachables) {
    const json = JSON.parse(await rpZip.file(file).async("string"));
    const desc = json["minecraft:attachable"]?.description;

    if (!desc?.identifier) {
      skippedItems.push(`${file} → identifier tidak ditemukan`);
      continue;
    }

    const identifier = desc.identifier;
    const textureKey = findTextureKey(identifier, textureData);

    if (!textureKey) {
      skippedItems.push(`${identifier} → texture tidak ditemukan`);
      continue;
    }

    let setup = desc.scripts?.parent_setup ?? "";
    if (Array.isArray(setup)) setup = setup.join("\n");

    const type = armorTypeFromSetup(setup);
    if (!type) {
      skippedItems.push(`${identifier} → armor type tidak terdeteksi`);
      continue;
    }
    const typeInv = armorInvTypeFromSetup(setup);

    const baseClass = classNameFromKey(textureKey);
    const className = baseClass;
    const displayName = className.replace(/([A-Z])/g, " $1").trim();

    ensureFolder(outputZip, `${root}src/Mrchlldev/${pluginName}/item/${type}`);
    outputZip.file(
`${root}src/Mrchlldev/${pluginName}/item/${type}/${baseClass}.php`,
`<?php

declare(strict_types=1);

namespace Mrchlldev\\${pluginName}\\item\\${type};

use customiesdevs\\customies\\item\\CreativeInventoryInfo;
use customiesdevs\\customies\\item\\ItemComponents;
use customiesdevs\customies\\item\\ItemComponentsTrait;
use pocketmine\\item\\Armor;
use pocketmine\\item\\ArmorTypeInfo;
use pocketmine\\inventory\\ArmorInventory;
use pocketmine\\item\\CreativeInventoryInfo;
use pocketmine\\item\\ItemIdentifier;

class ${className} extends Armor implements ItemComponents {

    use ItemComponentsTrait;

    public function __construct(ItemIdentifier $identifier, string $name = "Unknown") {
        parent::__construct($identifier, $name, new ArmorTypeInfo(${defense}, ${durability}, ArmorInventory::SLOT_${typeInv.toUpperCase()}, 3.0, true));
        $this->initComponent("${textureKey}", new CreativeInventoryInfo(CreativeInventoryInfo::CATEGORY_EQUIPMENT, CreativeInventoryInfo::GROUP_${type.toUpperCase()}));
        // hayyukkkkkkk
        // jangan ganti author woy!!!!
        // yang ganti author kaya anjing
        // created by Mrchlldev ganteng
    }
}
`
    );

    registeredItems.push({
      className,
      type,
      identifier,
      displayName
    });
  }

  /* ===== MAIN CLASS ===== */
  const useItems = registeredItems.map(i =>
    `use Mrchlldev\\${pluginName}\\item\\${i.type}\\${i.className};`
  ).join("\n");

  const itemsConst = registeredItems.map(i =>
    `        ${i.className}::class => ["${i.identifier}", "${i.displayName}"],`
  ).join("\n");

  outputZip.file(
`${root}src/Mrchlldev/${pluginName}/${pluginName}.php`,
`<?php

declare(strict_types=1);

namespace Mrchlldev\\${pluginName};

use pocketmine\\utils\\Config;
use pocketmine\\plugin\\PluginBase;
use customiesdevs\\customies\\item\\CustomiesItemFactory;

${useItems}

class ${pluginName} extends PluginBase {

    /**
     * ItemClass::class => [identifier, displayName]
     */
    public const ITEMS = [
${itemsConst}
    ];

    /**
     * This plugin was created by tools made by Mrchlldev.
     * Please don't change the author!
     * 
     * @return void
     */
    public function onEnable() : void {
        foreach (self::ITEMS as $class => $itemData) {
            CustomiesItemFactory::getInstance()->registerItem($class, $itemData[0], $itemData[1]);
            $itemList = new Config($this->getDataFolder() . "item_list.yml", Config::YAML);
            $data[] = [
                "item_name" => strtolower(str_replace(" ", "_", $itemData[1])),
                "item_id" => $itemData[0]
            ];
            $itemList->set("item_list", $data);
            $itemList->save();
        }
    }
}
`
  );

  renderResult();
  dlBtn.disabled = false;
};

function renderResult() {
  validBox.innerHTML = "";
  skipBox.innerHTML = "";

  makeCard(
    validBox,
    "Registered Items",
    registeredItems.map(i => `${i.identifier} → ${i.type}`),
    "success"
  );

  makeCard(
    skipBox,
    "Skipped Items",
    skippedItems,
    "error"
  );
}

dlBtn.onclick = async () => {
  const pluginName = document.getElementById("pluginName").value || "MrchlldevPlugin";
  const blob = await outputZip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${pluginName}_V1.0.0_byMrchlldev.zip`;
  a.click();
};
