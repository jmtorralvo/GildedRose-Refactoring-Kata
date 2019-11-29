const defaultItemSteps = {
  sellInStep: -1,
  qualityStep: -1,
  maxQuality: 50,
};

const specialItems = {
  'Aged Brie': {
    sellInStep: -1,
    qualityStep: 1,
    maxQuality: 50,
  },
  'Sulphuras': {
    sellInStep: 0,
    qualityStep: 0,
    maxQuality: 80,
  },
  'Backstage passes': {
    sellInStep: -1,
    qualityStep: 1,
    maxQuality: 50,
  },
  'Conjured': {
    sellInStep: -1,
    qualityStep: -2,
    maxQuality: 50,
  },
}


class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  transformQualityStep({steps, item}) {
    if (item.name === 'Backstage passes') {
      const transformStep = [0, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2];
      return item.sellIn > 10 ? steps.qualityStep : steps.qualityStep * transformStep[item.sellIn];
    }
    return steps.qualityStep;
  }

  updateQuality() {
    this.items.map(item => {
      let steps = Object.assign({}, specialItems[item.name] || defaultItemSteps);
      steps.qualityStep = this.transformQualityStep({ steps, item });

      //Quality reduces x2 when sellIn is 0
      steps.qualityStep =  item.sellIn === 0 ? steps.qualityStep * 2 : steps.qualityStep;

      item.quality = (item.quality < item.maxQuality || item.quality > 0 ) 
        ? item.quality + steps.qualityStep 
        : item.quality;

      item.sellIn = item.sellIn > 0 
        ? item.sellIn + steps.sellInStep 
        : 0;
      //Quality nover under 0
      item.quality = item.quality < 0 ? 0 : item.quality;
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
