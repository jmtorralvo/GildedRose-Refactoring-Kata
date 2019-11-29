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


  updateQuality() {
    this.items.map(item => {
      console.log('name', item.name);
      let steps = Object.assign({}, specialItems[item.name] || defaultItemSteps);

      item.sellIn = item.sellIn > 0 
        ? item.sellIn + steps.sellInStep 
        : 0;
      item.quality = (item.quality < item.maxQuality || item.quality > 0 ) 
        ? item.quality + steps.qualityStep 
        : item.quality;
    });

    return this.items;
  }
  // updateQuality() {
  //   for (var i = 0; i < this.items.length; i++) {
  //     if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //       if (this.items[i].quality > 0) {
  //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //           this.items[i].quality = this.items[i].quality - 1;
  //         }
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i].quality = this.items[i].quality + 1;
  //         if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].sellIn < 11) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //           if (this.items[i].sellIn < 6) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //       this.items[i].sellIn = this.items[i].sellIn - 1;
  //     }
  //     if (this.items[i].sellIn < 0) {
  //       if (this.items[i].name != 'Aged Brie') {
  //         if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].quality > 0) {
  //             if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //               this.items[i].quality = this.items[i].quality - 1;
  //             }
  //           }
  //         } else {
  //           this.items[i].quality = this.items[i].quality - this.items[i].quality;
  //         }
  //       } else {
  //         if (this.items[i].quality < 50) {
  //           this.items[i].quality = this.items[i].quality + 1;
  //         }
  //       }
  //     }
  //   }

  //   return this.items;
  // }
}
module.exports = {
  Item,
  Shop
}
