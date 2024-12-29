import {
  GiChelseaBoot,
  GiCowboyBoot,
  GiRubberBoot,
  GiLeatherBoot,
  GiBackpack,
  GiLightBackpack,
  GiConverseShoe,
  GiArmoredPants,
  GiPoloShirt,
  GiShirt,
  GiBandageRoll,
  GiAmpleDress,
  GiAirtightHatch,
  GiBarefoot,
  GiCrystalEarrings,
  GiDoorRingHandle,
  GiDoubleNecklace,
  GiDress,
  GiDropEarrings,
  GiEarrings,
  GiFedora,
  GiGemChain,
  GiGemPendant,
  GiGymBag,
  GiHandBag,
  GiHighHeel,
  GiKnapsack,
  GiLabCoat,
  GiLargeDress,
  GiLegArmor,
  GiMonclerJacket,
  GiOutbackHat,
  GiPearlNecklace,
  GiWinterHat,
  GiTyre,
  GiProtectionGlasses,
  GiSunglasses,
  Gi3dGlasses,
  GiWatch,
  GiTopHat,
  GiWesternHat,
  GiBelt,
} from "react-icons/gi";
import React from "react";

export interface CategoryIcon {
  id: string;
  icon: React.ReactNode;
}

export const categoryIcons: CategoryIcon[] = [
  { id: "01", icon: React.createElement(GiLabCoat, { size: 20 }) },
  { id: "02", icon: React.createElement(GiMonclerJacket, { size: 20 }) },
  { id: "03", icon: React.createElement(GiShirt, { size: 20 }) },
  { id: "04", icon: React.createElement(GiPoloShirt, { size: 20 }) },
  { id: "05", icon: React.createElement(GiArmoredPants, { size: 20 }) },

  { id: "06", icon: React.createElement(GiAmpleDress, { size: 20 }) },
  { id: "07", icon: React.createElement(GiDress, { size: 20 }) },
  { id: "08", icon: React.createElement(GiLargeDress, { size: 20 }) },

  { id: "09", icon: React.createElement(GiBackpack, { size: 20 }) },
  { id: "10", icon: React.createElement(GiLightBackpack, { size: 20 }) },
  { id: "11", icon: React.createElement(GiAirtightHatch, { size: 20 }) },
  { id: "12", icon: React.createElement(GiGymBag, { size: 20 }) },
  { id: "13", icon: React.createElement(GiHandBag, { size: 20 }) },
  { id: "14", icon: React.createElement(GiKnapsack, { size: 20 }) },

  { id: "15", icon: React.createElement(GiBarefoot, { size: 20 }) },
  { id: "16", icon: React.createElement(GiConverseShoe, { size: 20 }) },
  { id: "17", icon: React.createElement(GiHighHeel, { size: 20 }) },
  { id: "18", icon: React.createElement(GiChelseaBoot, { size: 20 }) },
  { id: "19", icon: React.createElement(GiLeatherBoot, { size: 20 }) },
  { id: "20", icon: React.createElement(GiRubberBoot, { size: 20 }) },
  { id: "21", icon: React.createElement(GiCowboyBoot, { size: 20 }) },
  { id: "22", icon: React.createElement(GiLegArmor, { size: 20 }) },

  { id: "23", icon: React.createElement(GiTyre, { size: 20 }) },
  { id: "24", icon: React.createElement(GiDoorRingHandle, { size: 20 }) },

  { id: "25", icon: React.createElement(GiDropEarrings, { size: 20 }) },
  { id: "26", icon: React.createElement(GiCrystalEarrings, { size: 20 }) },
  { id: "27", icon: React.createElement(GiEarrings, { size: 20 }) },

  { id: "28", icon: React.createElement(GiOutbackHat, { size: 20 }) },
  { id: "29", icon: React.createElement(GiFedora, { size: 20 }) },
  { id: "30", icon: React.createElement(GiWinterHat, { size: 20 }) },
  { id: "31", icon: React.createElement(GiTopHat, { size: 20 }) },
  { id: "32", icon: React.createElement(GiWesternHat, { size: 20 }) },

  { id: "33", icon: React.createElement(GiGemChain, { size: 20 }) },
  { id: "34", icon: React.createElement(GiGemPendant, { size: 20 }) },
  { id: "35", icon: React.createElement(GiDoubleNecklace, { size: 20 }) },
  { id: "36", icon: React.createElement(GiPearlNecklace, { size: 20 }) },

  { id: "37", icon: React.createElement(GiProtectionGlasses, { size: 20 }) },
  { id: "38", icon: React.createElement(GiSunglasses, { size: 20 }) },
  { id: "39", icon: React.createElement(Gi3dGlasses, { size: 20 }) },

  { id: "40", icon: React.createElement(GiBandageRoll, { size: 20 }) },
  { id: "41", icon: React.createElement(GiWatch, { size: 20 }) },
  { id: "42", icon: React.createElement(GiBelt, { size: 20 }) },
];

export const getIconById = (id?: string) => {
  const category = categoryIcons.find((icon) => icon.id === id);
  return category ? category.icon : null;
};
