var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  let agedBrie;
  let sulphuras;
  let passes;
  let conjured;
  let foo;

  const initConfig = () => {
    agedBrie =  new Item("Aged Brie", 5, 10);
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

  it("should decrease by one seelIn value", function() {
    const gildedRose = new Shop([foo]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(3);
  });

  it('should quality never be under 0 - Prev Quality is 0', () => {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  
  it('should quality never be under 0 -  Prev Quality is 1', () => {
    const gildedRose = new Shop([ new Item("foo", 0, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });
  
  it('should quality never be under 0 -  Prev Quality is 2', () => {
    const gildedRose = new Shop([ new Item("foo", 0, 2) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it('should quality degrade double on sellin 0', () => {
    const gildedRose = new Shop([ new Item("quality degrade", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  it('should brie increase quality every time - SellIn is 5', () => {
    const gildedRose = new Shop([ agedBrie ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  it('should brie increase quality every time - SellIn is 0', () => {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it('should sulfuras item be always constant for sellin and quality - SellIn is 1', () => {
    const gildedRose = new Shop([ new Item("Sulphuras", 10, 80) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(80);
  });

  it('should sulfuras item be always constant for sellin and quality - SellIn is 0', () => {
    const gildedRose = new Shop([ new Item("Sulphuras", 0, 80) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });


  it('should conjured items decrease quality by 2', () => {
    const gildedRose = new Shop([ conjured ]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(18);
  });


  it ('should passes increase quality by 1 when there is more than 10 days to gig', () => {
    const gildedRose = new Shop([ passes ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(7);
  });

  it ('should passes increase quality by 2 when there is between 10 and 5 days to gig', () => {
    const gildedRose = new Shop([ new Item("Backstage passes", 7, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  it ('should passes increase quality by 3 when there is under 5 days to gig', () => {
    const gildedRose = new Shop([ new Item("Backstage passes", 4, 10) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
  });
});
