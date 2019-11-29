var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  let agedBried;
  let sulphuras;
  let passes;
  let conjured;
  let foo;

  const initConfig = () => {
    agedBried =  new Item("Aged Brie", 5, 10);
    sulphuras =  new Item("Sulphuras", 11, 80);
    passes =  new Item("Backstage passes", 15, 6);
    conjured =  new Item("Conjured", 6, 20);
    foo =  new Item("foo", 4, 8);
  }

  const updateN = (times, shop) => {
    for(let i = 0; i < times; i++) {
      shop.updateQuality();
    }
  }

  beforeEach(() => initConfig());

  it("should foo", function() {
    const gildedRose = new Shop([foo]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it('should quality never be under 0', () => {
    const gildedRose = new Shop([ new Item("quality never be under 0", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it('should quality degrade double on sellin 0', () => {
    const gildedRose = new Shop([ new Item("quality degrade", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });
  


  // it("should foo", function() {
  //   const gildedRose = new Shop([ new Item("Aged Brie", 10, 5) ]);
  //   const items = gildedRose.updateQuality();

  //   const gildedRose2 = new Shop([ new Item("Conjured", 10, 5) ]);
  //   const items2 = gildedRose2.updateQuality();

  //   const gildedRose3 = new Shop([ new Item("foo", 10, 5) ]);
  //   const items3 = gildedRose3.updateQuality();

  // });



  // it('should quality degrade double on sellin 0', () => {
  // });
  // it('should brie increase quality every time', () => {
  // });
  // it ('should passes increase quality by 1 when there is more than 10 days to gig', () => {
  // });
  // it('should passes increase quality by 2 when there is between 10 and 5 days to gig', () => {
  // });
  // it('should passes quality drop to 0 after gig', () => {
  // });
  // it('should pases increase quality by 2 when there is less than 5 days to gig', () => {
  // });
  // it ('quality never pass up 50 units for any item', () => {
  // })
  // it('should sulfuras item be always constant for sellin and quality', () => {
  // });
  // it('should sulfuras item have quality 80 any time', () => {
  // });
  // it('should conjured items decrease queality by 2', () => {
  // });
});
